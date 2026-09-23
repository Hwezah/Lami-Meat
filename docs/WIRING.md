# LAMI MEAT: wiring and flows

How every page, control and piece of state connects. The values here are taken from the logic in `design/Lami-*.dc.html`. Where this file and `README.md` disagree, this file wins for behaviour.

---

## 1. Route map

| Design file | Next.js route | Nav label |
|---|---|---|
| `Lami-Home.dc.html` | `/` | Home |
| `Lami-Products.dc.html` | `/range` (anchors `#smoked-sausages`, `#hot-dogs`, `#minced-beef`, `#lean-minced-beef`) | The Range |
| `Lami-About.dc.html` | `/our-story` | Our Story |
| `Lami-Order.dc.html` | `/contact` (anchor `#wholesale`) | Contact |
| `Lami-Cart.dc.html` | `/cart` | cart icon |
| `Lami-Recipes.dc.html` | `/recipes` | menu / footer |
| `Lami-Careers.dc.html` | `/careers` (anchor `#roles`) | menu / footer |
| `Lami-Auth.dc.html` | `/account` | account page (the nav icon opens the modal instead) |

`menuLinks` (the side-panel pages list, the mobile numbered menu and the footer "Explore" list) = Home, The Range, Our Story, Recipes, Careers, Contact.

### Link graph (every navigating control)
```
Nav logo ─────────────► /
Nav links ────────────► / · /range · /our-story · /contact      (active link = brass #B8955A)
Nav search icon ──────► opens SearchSheet
Nav account icon ─────► opens AuthModal (login, or sign-out confirmation if signed in)
Nav cart icon ────────► /cart            (badge = total pack count)
Nav "Order" button ───► WhatsApp (default message)
Nav menu button ──────► opens MenuPanel
Search "Popular" chips ► /range
Toast "View cart →" ──► /cart

Home hero "See the range →" ► #range (same page)
Home hero "Wholesale" ─────► /contact#wholesale
Home range row "Add" ──────► cart +1 × 500g → toast
Home range row WA icon ────► WhatsApp (product message)
Home "Full product details →" ► /range
Home order card: WhatsApp ► WA default · phone ► tel:+256773828552
Home newsletter "Subscribe →" ► validate → lm-newsletter

/range "Wholesale enquiry →" ► /contact#wholesale · "WhatsApp" ► WA default
/our-story "Join the team →" ► /careers · closer "See the range" ► /range · "WhatsApp" ► WA
/cart empty "See the range" ► /range · "← Keep shopping" ► /range · "Clear cart" ► empties lm-box · checkout ► WhatsApp (cart message)
/careers role "Apply by email" ► mailto:<EMAIL>?subject=Application — <Role> · "Ask on WhatsApp" ► WA (role message)
/account signed-in "View cart (n)" ► /cart · "The range" ► /range
Footer links ► menuLinks · phone ► tel: · email ► mailto: · WhatsApp ► WA default
```
All WhatsApp links open in a new tab (`target="_blank" rel="noopener"`).

---

## 2. Global state and persistence

| Key | Storage | Shape | Written by | Read by |
|---|---|---|---|---|
| `lm-box` | localStorage | `{ "<Product Name>__500g" \| "<Product Name>__1kg": qty }` | Add buttons (Home, Range, Cart extras, Recipes), cart steppers / remove | Nav badge (every page), /cart, /contact "Fill from my cart" |
| `lm-order-draft` | localStorage | `{ name, phone, area, day, items }` | /contact order form (on every keystroke); /cart "Deliver to" writes `area` | /contact (restores the form), /cart (restores `area`) |
| `lm-newsletter` | localStorage | `{ email, at }` | Home newsletter | every page (shows the "You're on the list" state) |
| `lm-session` | **sessionStorage** | `{ name, email, at }` | AuthModal / /account | nav account dot, /account |

### Cart sanitising (always apply on read)
```ts
function sanitizeBox(raw: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (raw && typeof raw === 'object' && !Array.isArray(raw))
    for (const k in raw as any) {
      const q = Math.floor(Number((raw as any)[k]));
      if (/__(?:500g|1kg)$/.test(k) && Number.isFinite(q) && q > 0) out[k] = q;
    }
  return out;
}
```
- Keys use the product **name** (not the id), e.g. `"Minced Beef__1kg"`. Keep this format, or migrate it once and switch to ids.
- Badge count = the sum of all quantities.
- Line price = `qty × (size === '1kg' ? p1k : p500)`.
- Price format: `'UGX ' + n.toLocaleString('en-US')` → `UGX 15,000`.
- In Next.js the cart is a client store (Zustand + `persist`, or context + `useEffect`). The badge must hydrate on the client to avoid a server/client mismatch; render 0 on the server.

---

## 3. WhatsApp: single builder
```ts
const WA = process.env.NEXT_PUBLIC_WHATSAPP ?? '256773828552';
export const wa = (msg: string) => `https://wa.me/${WA.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`;
```
### Exact message templates
| Trigger | Message |
|---|---|
| Default (nav Order, footer, CTAs) | `Hi LAMI MEAT! I'd like to place an order.` |
| Home range row WA icon | `Hi LAMI MEAT! I'd like to order {name} (500g, {UGX price500}).` |
| /range article WA button (uses the selected size/qty) | `Hi LAMI MEAT! I'd like to order {qty} × {name} ({size}, {UGX unit×qty}).` |
| /cart checkout | `Hi LAMI MEAT! I'd like to order:\n- {qty} × {name} ({size}) — {UGX}\n…\n\nSubtotal: {UGX}\nDeliver to: {area or —}` |
| /contact order form | `Hi LAMI MEAT! New order:\nName: {name}\nPhone: {phone}\nArea: {area or —}\nDelivery: {day}\n\nOrder: {items}` |
| /contact wholesale | `Hi LAMI MEAT! Wholesale enquiry:\nBusiness: {biz}\nContact: {contact}\nVolume: {vol or "Not sure yet"}\nProducts: {prods joined ", " or "Full range"}` |
| /careers role | `Hi LAMI MEAT! I'm interested in the {Role} role.` |

The form sends use `window.open(url, '_blank')` after validation passes.

---

## 4. Page flows

### 4.1 Add to cart (Home, Range, Cart extras, Recipes)
```
click Add
 → box = sanitize(read lm-box)
 → box["{name}__{size}"] += qty         (Home / extras / recipes: size 500g, qty 1; Range: selected size + qty)
 → write lm-box
 → toast = "{qty} × {name} ({size}) added"   (Home: "{name} (500g) added to cart")
 → toast auto-hides after 3200 ms (a new add restarts the timer)
 → nav badge re-counts
```
Recipes "Add … to cart" maps to these products: r0 Smoked Beef Sausages, r1 Beef Hot Dogs, r2 Minced Beef, r3 Lean Minced Beef, r4 Minced Beef, r5 Smoked Beef Sausages (all 500g × 1).

### 4.2 The Range (`/range`)
- `filter` ∈ `All | Smoked | Fresh` (single-select chips). Products are filtered by `kind`. The count label reads `"0{n} product(s)"`.
- Per product: `size` (default `500g`) and `qty` (default 1, min 1) are stored per product id.
  - The stepper changes qty. "Add — {UGX unit×qty}" adds the current size × qty.
  - The WA button uses the current size/qty.

### 4.3 Cart (`/cart`)
```
mount → box = read lm-box; area = lm-order-draft.area
line: [–] qty [+]   (– at 1 removes the line) · [×] removes the line
empty (no lines) → "Nothing here yet." + See the range; the summary shows a disabled "Cart is empty" block
"Deliver to" input → state.area + writes lm-order-draft.area
checkout (only when there are lines) → WhatsApp cart message
header intro: n>0 → "{n} pack(s) ready to send. …" ; n=0 → "Your cart is empty. …"
"Add to the order" list → each row adds 500g × 1
```

### 4.4 Contact (`/contact`)
**Order form** (dark card)
- Fields: `name`, `phone`, `area`, `day` (select, default `Today`), `items` (textarea). Every change saves `lm-order-draft` and clears `err`.
- "+ Fill from my cart" is shown only when the cart count > 0. It sets `items` = `"{qty} × {name} {size}, …"`.
- On send, validate that `name`, `phone` and `items` are non-empty.
  - Failure: `err = "Please add your name, phone and what you'd like to order."`
  - Success: open the WhatsApp order message.

**Wholesale** (`#wholesale`)
- `biz`, `contact` (text). `vol`: single-select chips (`Under 10kg / week`, `10–50kg / week`, `50kg+ / week`). `prods`: multi-select toggle chips (the 4 products).
- On send, validate that `biz` and `contact` are non-empty.
  - Failure: `werr = "Please add your business name and a contact."`
  - Success: open the WhatsApp wholesale message.

**FAQ:** see accordions (§5). The default open item is `q0`.

### 4.5 Recipes (`/recipes`)
- The featured recipe (r0) is always expanded.
- The index is an accordion, `r1–r5`, with `r1` open by default.
- The header ticker is a pure presentational loop (see README).

### 4.6 Careers (`/careers`)
- The roles accordion is `j0–j3` (Butchery Assistant, Smokehouse Operator, Delivery Rider, Sales & Customer Care), with `j0` open by default.
- Each role has two buttons: mailto (`subject=Application — {Role}`) and WhatsApp (role message).

### 4.7 Auth
There are two surfaces sharing one session: the **modal** (`design/lm-auth.js`, opened from the nav account icon on every page) and the **/account page**.
```
state: mode ∈ login|signup, name, email, pass, showPass, err, session
validate (in order):
  signup && !name            → "Please enter your name."
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) → "Enter a valid email address."
  pass.length < 6            → "Password must be at least 6 characters."
success → session = { name: signup ? name : email.split('@')[0], email, at: Date.now() }
        → sessionStorage lm-session; clear the password; close the modal
nav icon when signed in → opens the "Sign out?" confirmation → Sign out removes lm-session
signed-in indicator → 9px green dot (#7BE38B) top-right of the account icon
/account signed-in view → "Good to see you." + "Signed in as {email}" + View cart / The range / Sign out
```
**This is a UI stub.** Nothing is sent to a server. Replace it with a real provider and keep the same validation messages.

### 4.8 Newsletter (Home order card)
```
Subscribe → email must match the email regex, else emailBad → "Please enter a valid email address."
success → lm-newsletter = { email, at }; show "You're on the list — thank you."
on mount → if lm-newsletter exists, show the subscribed state
```
In production, POST the email to the ESP (Mailchimp / Brevo); keep localStorage only as a UI flag.

### 4.9 Search sheet
- It opens from the nav search icon and focuses the input. It closes on Esc, on an overlay click or with the close button.
- **The design has no search logic.** It has only the input and three "Popular" chips (→ /range).
- **Recommended:** filter products and recipes by name on the client as the user types, and show the results under the input with links to `/range#id` and `/recipes`.

---

## 5. Shared UI behaviour

| Component | Behaviour |
|---|---|
| **MenuPanel** | Opening sets `body{overflow:hidden}` and slides the panel `translateX(100%→0)` over 520 ms `cubic-bezier(.16,1,.3,1)`. Closing reverses it, then restores scroll. It closes on the overlay, the X, Esc, or any link click. Content switches by breakpoint (README §Global chrome). |
| **SearchSheet** | The sheet `translateY(-100% → 0)` over 600 ms, same easing. Overlay `rgba(0,0,0,.5)`. |
| **Accordion (Fold)** | Only one item is open per page (`fold` = key or `''`). Clicking the open item closes it. The + icon rotates 45°; the body is `display:none` when closed. The head grid collapses at ≤620px (README). |
| **Toast** | One at a time. It shows `{message}` + "View cart →" and hides after 3200 ms. |
| **Reveal** | `[data-reveal]` starts at `opacity:0; translateY(24px)` and animates to rest once its top is < 92% of the viewport height. `data-reveal-delay` is in ms. A safety timeout shows everything after 4 s. Use an IntersectionObserver in Next.js. |
| **RotatingWord** (Home) | See README; the interval is cleared on unmount. |
| **Ticker** (Recipes) | See README; CSS-only loop. |
| **Esc key** | Closes the menu, the search sheet and the auth modal. |
| **Chips / size pills** | Active = `background #16171A; color #EFE9DF`. |
| **Tabs** (/account) | Active = bone text + brass underline. |
| **Inputs** | Focus changes the border to brass (on dark) or ink (on bone). |

---

## 6. Config and environment
```
NEXT_PUBLIC_WHATSAPP=256773828552
NEXT_PUBLIC_PHONE_DISPLAY=+256 773 828 552
NEXT_PUBLIC_EMAIL=hello@lamimeat.co.ug        # PLACEHOLDER — client to supply
NEXT_PUBLIC_SITE_URL=https://lamimeat.co.ug    # assumption
```

## 7. Suggested build order for Claude Code
1. Scaffold Next.js + TS + Tailwind v4; tokens in `@theme`; fonts via `next/font`.
2. `lib/` (`wa.ts`, `format.ts`, `cart.ts` with `sanitizeBox` + persist) and `data/`.
3. Layout chrome: TopBar, Nav (+ badge), MenuPanel, SearchSheet, Toast, Footer.
4. Pages in this order: Home → Range → Cart → Contact → Recipes → Our Story → Careers → Account.
5. Responsive + mobile-portrait pass (README contract), then test at 1440/1024/768/390/360 + landscape.
6. Metadata / OG / JSON-LD, then swap the placeholders.
