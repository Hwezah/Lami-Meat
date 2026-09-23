# Handoff: LAMI MEAT — marketing & ordering site (Next.js scaffold)

> **Flat package.** Every file is in this one folder: the docs, the 8 page designs (`Lami-*.dc.html`), `products.json` and `LAMI-Site-Screenshots.html`. The photos, logos and font are in the separate **LAMI-assets-flat** download (one folder); put them in `public/images`, `public/brand` and `public/fonts`. In the designs, image paths start with `uploads/`; map them to those folders.

## Overview
LAMI MEAT is a smokehouse and butchery in Kampala, Uganda. The site sells 4 beef products: Smoked Beef Sausages, Beef Hot Dogs, Minced Beef and Lean Minced Beef. Each comes in a 500g or 1kg pack. There is no online payment. Orders go out on **WhatsApp** as a pre-filled message, and the team confirms price and delivery by chat.

The site has 8 pages: Home, The Range (products), Our Story, Contact/Order (with wholesale form + FAQ), Cart, Recipes, Careers and Account.

## About the design files
The files in `design/` are **design references built in HTML**. They are prototypes that show the intended look and behaviour, not production code. Each `.dc.html` opens directly in a browser: serve the folder with any static server, e.g. `npx serve design`. The templates use inline styles plus a small `<style>` block per page for media queries.
**Task:** rebuild these designs in **Next.js (App Router) + TypeScript**. Do not ship or wrap the HTML.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy, breakpoints and interactions are final (except the placeholder copy flagged below). Recreate them pixel-accurately.

## Recommended stack
- Next.js 15 App Router, TypeScript, `next/font` (Google: Hanken Grotesk, Space Mono, Anton; local: Peridot PE), `next/image`.
- Styling: **Tailwind CSS v4** with the tokens below in `@theme`, or CSS Modules. Pick one, and don't carry over the inline styles.
- State: a small client cart store (Zustand or React context), persisted to `localStorage` key `lm-box`.
- No backend is needed for v1. Keep auth as a stub. It can later move to a real provider (NextAuth / Clerk / Supabase).

### Suggested structure
```
app/
  layout.tsx            // fonts, <TopBar/>, <Nav/>, <Footer/>, <MenuPanel/>, <SearchSheet/>, <Toast/>
  page.tsx              // Home
  range/page.tsx        // Lami-Products
  our-story/page.tsx    // Lami-About
  contact/page.tsx      // Lami-Order  (#wholesale anchor)
  cart/page.tsx
  recipes/page.tsx
  careers/page.tsx
  account/page.tsx      // Lami-Auth
components/  Nav, TopBar, MenuPanel, SearchSheet, Footer, Toast, Eyebrow, Button, Fold (accordion),
             RangeRow, ProductArticle, QtyStepper, Chip, Ticker, RotatingWord, Reveal
lib/         cart.ts (store + lm-box persistence), whatsapp.ts (wa.me builder), format.ts (UGX)
data/        products.json (included), recipes.ts, roles.ts, faq.ts
public/      images/, brand/, fonts/ (included)
```

## Design tokens
**Colours**
| Role | Hex |
|---|---|
| Charcoal (page bg) | `#16171A` |
| Charcoal-2 (panels, menu, cards on dark) | `#202226` |
| Hero bg | `#0E1316` |
| Footer bg | `#0F1012` |
| Bone (light sections) | `#EFE9DF` |
| Bone-2 (image wells on bone) | `#E4DCCF` |
| Brass (accent, primary button) | `#B8955A` |
| Brass hover | `#D2B27A` |
| Deep brass on bone (eyebrows / numerals) | `#7D5E2A` / `#8A6A33` |
| Text on dark: body / muted | `#BDB6AA` / `#9C958A` |
| Text on bone: body / muted | `#4A4640` / `#6E685F` |
| Ink on bone | `#16171A` |
| WhatsApp | `#1FA855` (hover `#178F47`) |
| Error on dark / on bone | `#E3A27A` / `#9A3A26` |
| Rotating-word red | `#C8372D` |
| Hairlines on dark | `rgba(239,233,223,0.10–0.20)` |
| Hairlines on bone | `rgba(22,23,26,0.18)`; strong rule `1.5px solid #16171A` |

**Type**
- Body/UI: **Peridot PE** (variable 100–900, `public/fonts/peridot-pe-variable.otf`), fallback Hanken Grotesk.
- H1/H2: **Hanken Grotesk 900**, uppercase, letter-spacing −0.045em (h1) / −0.04em (h2), line-height .86–.92.
  - Home H1 `clamp(54px,8.4vw,136px)`; inner-page H1 `clamp(50px,7.4vw,124px)`; H2 `clamp(38px,4.8vw,72px)`.
- Eyebrows: **Space Mono** 12px, letter-spacing .18em, uppercase, brass (`#B8955A` on dark, `#7D5E2A` on bone). The hero eyebrow has a 36×1px brass rule before it.
- Numerals ("01", step numbers): **Anton**, 22–30px, brass.
- Body copy: 15.5–18px, line-height 1.6–1.7. Nav links: 13px/600, .1em, uppercase.

**Shape and layout**
- Radius: **2px everywhere** (buttons, inputs, toast, panels). No rounded cards.
- Buttons: square-cornered, `padding 17px 24–28px`, 13–15px/700 uppercase, .08em tracking. There are 3 styles: primary (brass fill, charcoal text), outline (1px brass or bone border), and WhatsApp (green fill).
- Section padding `clamp(72px,9vw,128px) clamp(18px,4vw,46px)`. Content max-width **1320px**.
- Framed photo motif: an image with an offset 1px brass outline box behind it (`inset:16px -16px -16px 16px`).
- Every hit target is at least 44px.

## Global chrome (all pages)
- **Top bar:** Space Mono 11px brass strip, "Smokehouse & butchery · Kampala" + "Cold delivery Mon–Sat". The second item is hidden at ≤760px.
- **Nav (sticky):** links on the left (Home, The Range, Our Story, Contact), logo absolutely centred (`/brand/lami-nav-cream.svg`, 46px tall, 40px at ≤920px). On the right: the search, account and cart icons (28px line icons, stroke 1.6), cart badge, a brass-outline "Order" button (WhatsApp) and the menu button.
  - Menu button: two long stripes on desktop; on **mobile portrait** a 42px circle with a 1.5px border.
  - ≤920px: links hidden, logo goes static. ≤760px: Order button hidden.
- **Side panel** (slides in from the right, 520ms `cubic-bezier(.16,1,.3,1)`, `#202226`, width `min(500px,100%)`, no border):
  - Desktop, tablet and landscape: contact details (phone, WhatsApp button, email, hours). At ≤920px a "Pages" link list is added.
  - Mobile portrait: a numbered main menu instead (01–06, 44px number column, hairline rows).
  - Esc closes it, and body scroll locks while it's open.
- **Search sheet:** a bone sheet that drops from the top, with an underlined large input.
- **Toast:** bottom-centre, bone bg, "N × Product (size) added" + "View cart →". Auto-hides after 3.2s.
- **Footer:** `#0F1012` bg. Logo column plus Explore and Contact columns, then a bottom bar. It goes to 3 columns at ≤920px and 1 column at ≤620px.
- **Reveal-on-scroll:** `[data-reveal]` elements fade up as they enter the viewport, with an optional `data-reveal-delay`. A safety timeout shows everything after 4s.

## Screens

### Home — `Lami-Home.dc.html`
1. **Hero (masthead):** `#0E1316` bg, photo on the right at 62% width, fading into the bg through a gradient. Text on the left:
   - Eyebrow, then H1 "Smoked. / Minced. / **{RotatingWord}**".
   - Intro paragraph, then 2 buttons: "See the range →" (primary, scrolls to #range) and "Wholesale" (outline → /contact#wholesale). Caption "Fig. 01 — The smokehouse".
   - Below it, a 3-column ledger with a top hairline: No. 01 Smoked over wood / No. 02 Minced every morning / No. 03 Cold to your door.
   - **RotatingWord:** cycles `Mastered., Perfected., Trusted., Delivered., Sealed., Loved.` every 2.6s. Colour cycles brass → `#C8372D` → bone by index % 3. Each word enters with `opacity 0, translateY(.35em), blur(6px)` → rest over 0.7s `cubic-bezier(.16,1,.3,1)`. It respects `prefers-reduced-motion`.
2. **The Range** (bone): split heading, then a product index list. Each row is a 5-column grid (`64px 132px 1fr 170px auto`): Anton number, square image, kind/name/description, price (500g + 1kg), and actions. The actions are "Add" (500g to cart) plus a WhatsApp icon button. Below the list, a "Full product details →" link.
3. **No. 01 Smokehouse:** a square photo beside the H2 "Real fire. No liquid smoke.", a pull quote with a 1px brass left border, and a paragraph.
4. **No. 02 Butchery** (bone): 3 step cards, each an image, then Anton number + title, then description.
5. **No. 03 Voices:** 3 testimonials with a top hairline and a large Anton quote mark.
6. **Order card:** `#202226` box. On the left, the H2 "Send us a message.", WhatsApp and phone buttons. On the right, "The LAMI letter" newsletter: an underlined email input + "Subscribe →", with validation. Sign-ups persist to `lm-newsletter`.

### The Range — `Lami-Products.dc.html`
- Header: H1 "The Range." with an intro.
- Filter chips (All / Smoked / Fresh) and a count.
- One `<article>` per product: framed image, number + kind, H2 name, long description, and a spec `<dl>` (2 columns).
- Size chips 500g/1kg with prices, a qty stepper, "Add — UGX total", and a WhatsApp button.
- Then a "Kitchen quantities" split (wholesale CTA) and "Store. Thaw. Cook." 3 steps.

### Our Story — `Lami-About.dc.html`
- Header, then a 21:9 figure.
- 3 chapters: a grid of `200px 1fr 1fr` (Chapter label | H2 + text | image).
- "Four rules" numbered 01–04 in a 4-column ledger.
- People: text + a 6-image mosaic (the first image is big).
- Closer CTA card.

### Contact / Order — `Lami-Order.dc.html`
- **Reach us:** label/value contact rows (phone, WhatsApp, email, area, hours…).
- **Order form card:** Name, Phone, Area, Delivery day (select), Your order (textarea). "+ Fill from my cart" appears if the cart has items. "Send on WhatsApp" validates, then opens a `wa.me` link with the order written out.
- **#wholesale:** Business, Contact, a Weekly volume chip set (single-select), and a Products chip set (multi-select). "Send enquiry →" opens WhatsApp.
- **FAQ:** accordion with 4 items. Only one is open at a time, and the + icon rotates 45° when open.

### Cart — `Lami-Cart.dc.html`
- The header intro changes with the count.
- Line items use a 5-column grid (`96px 1fr auto 120px 46px`): image, name, qty stepper, total and remove. At ≤620px this reflows to `72px 1fr auto` over 2 rows.
- Empty state: "Nothing here yet."
- Sticky summary `<aside>` (charcoal): packs, delivery, subtotal, a "Deliver to" input and a checkout button. Checkout opens WhatsApp with the lines + total.
- "Add to the order" extras list.

### Recipes — `Lami-Recipes.dc.html`
- **Header right column: `<Ticker>`.** About 12 tip lines scroll up continuously.
  - Box height `clamp(220px,20vw,300px)`, overflow hidden, with a mask of `linear-gradient(to bottom, transparent 0%, #000 45%, #000 88%, transparent 100%)`.
  - The list is rendered twice and animated `translateY(0 → -50%)` over 60s, linear and infinite, for a seamless loop.
  - Pauses on hover; disabled under reduced motion.
- **Featured recipe:** framed photo; a "You need" `<ul>` and a numbered "Method" `<ol>`; "Add … to cart".
- **Index:** an accordion (recipes 02–06). Each item has ingredients + method and its own add-to-cart button.

### Careers — `Lami-Careers.dc.html`
- Header, a 3-photo row, and "Why join" as 4 numbered items.
- Open roles: an accordion with 4 roles. Each has "Apply by email" + "Ask on WhatsApp".

### Account — `Lami-Auth.dc.html`
- Sign in / Create account tabs, validated fields (email format, password of 6+ characters), then a signed-in state with "View cart" / "The range" and "Sign out".
- The right column is a framed image + 3 benefits.
- The nav account icon opens modals (see `design/lm-auth.js`). The session is kept in `sessionStorage` key `lm-session`, and a 9px green dot shows on the icon when signed in. **Treat this as a UI stub.**

## Behaviour and state
- **Cart:** `{ "<Product Name>__500g|1kg": qty }` in `localStorage["lm-box"]`. It is shared by every page, and the nav badge = total qty. Prices come from `products.json`. Format prices as `UGX 15,000`.
- **WhatsApp:** `https://wa.me/256773828552?text=<encodeURIComponent(msg)>`. Make the number a single config value (`NEXT_PUBLIC_WHATSAPP`).
  - Default message: "Hi LAMI MEAT! I'd like to place an order."
  - Product message: "Hi LAMI MEAT! I'd like to order <Name> (500g)."
  - Cart and forms: multi-line, with one line per item, then the total and the delivery area.
- **Phone:** `tel:+256773828552`, displayed as "+256 773 828 552".
- **Other storage keys:** `lm-newsletter` for newsletter sign-ups; `lm-order-draft` (optional) to persist the form.

## Responsive contract (must keep)
Breakpoints: **1060 / 920 / 760 / 620 / 480** and **mobile portrait = `(max-width:600px) and (orientation:portrait)`**.
- ≤1060: 3-column card grids go to 2 columns; `ledger4` goes to 2 columns.
- ≤920: nav links hidden; every split goes to 1 column; the sticky summary becomes static; the mosaic goes to 2 columns; chapters go to 2 columns.
- ≤760: section padding `clamp(64px,14vw,96px)`; card grids go to 1 column; range rows go to `44px 88px 1fr` and the price/buy cells wrap under the name; the hero image moves on top (full width) with the text under it.
- ≤620: ledgers, forms, chapters and fold columns go to 1 column; the footer goes to 1 column; accordion heads go to `36px minmax(0,1fr) 44px`.
- ≤480: side padding 24px.
- **Mobile portrait:**
  - Side padding 14px.
  - **Centre all text** (headings, eyebrows, paragraphs, captions, hero), **except**: `ul/ol/li/dl`, labels/forms, step sequences (Home process, Products care steps, About rules, Careers why), accordions, structured rows (range rows, cart lines, contact rows) and boxed content (CTA cards, order form card, cart summary, pull quote). Those stay left-aligned.
  - **Button rows:** centred, **80vw** wide. With 2 buttons, each takes `flex:1` with `justify-content:space-between`, 10px gap. Button text **never wraps** (13px, .04em). Use short labels in portrait:
    - "See the range" → "See range"
    - "+256 773 828 552" → "Call us"
    - "Wholesale enquiry →" → "Wholesale →"
    - "Apply by email" → "Email us"
    - "Ask on WhatsApp" → "WhatsApp"
  - Button rows sit `clamp(34px,9vw,44px)` below the preceding text.
  - Footer: centred, Explore links in a 3-column grid, contact in a 2-column grid.
  - Newsletter: stacked; the button is 80vw.
  - Toast: spans the viewport with 16px side insets.
- Test at 1440 / 1024 / 768 / 390 / 360, plus phone landscape.

## Assets
- `public/brand/`: logo SVGs. The **real final logo is still pending** from the client, so keep the logo a swappable component.
  - `lami-nav-cream.svg`: nav, on dark.
  - `lami-logo-light.svg`: footer.
  - `lami-nav-full.svg`, `lami-logo-full.svg`, `lami-logo-cream.svg`: alternates.
- `public/images/`: the client's product, smokehouse and team photos. Use them with `next/image` and `object-fit: cover`.
- `public/fonts/peridot-pe-variable.otf`: load with `next/font/local`.
- Icons: inline line icons (search, account, cart/trolley, menu, WhatsApp, close, +). Copy the SVG paths from the HTML, or use Lucide at stroke 1.6.

## Open items / placeholder content
- The email `hello@lamimeat.co.ug` is a **placeholder**, so read it from config.
- Placeholder copy to be replaced by the client: delivery areas, payment methods, minimum order, storage details, job listings, recipes, recipe ticker tips, Our Story chapters, testimonials, and the rotating-word list.
- SEO: add page `metadata`, Open Graph images (for WhatsApp link previews), `LocalBusiness` JSON-LD (Kampala), a sitemap and robots.

## Screenshots
`screenshots/desktop/` holds viewport-by-viewport captures (about 924px wide) of every page, top to bottom, plus the two overlays:
01-home · 02-range · 03-our-story · 04-contact · 05-cart (2 packs in the cart) · 06-recipes · 07-careers · 08-account · 09-overlay-menu-panel · 10-overlay-search.
The files within each page are numbered in scroll order. Reveal animations were forced visible for the captures. For mobile, open `design/*.dc.html` in browser devtools at 390×844.

## Files
- `design/Lami-*.dc.html`: the 8 page references. The markup is in `<x-dc>` and the logic class is in `<script data-dc-script>`. That script holds the product/recipe/FAQ data and the WhatsApp message builders.
- `design/support.js`: the runtime needed to open the references locally. It is not part of the build.
- `design/lm-auth.js`: the auth modal reference.
- `data/products.json`: canonical product data.
