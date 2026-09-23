# LAMI MEAT

Marketing and ordering site for LAMI MEAT, a smokehouse and butchery in Kampala.
Four beef products, 500g / 1kg packs. No online payment: orders go out as a pre-filled **WhatsApp** message.

## Stack
- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4**: design tokens in `@theme` (`app/globals.css`)
- **Zustand**: cart (persisted to `localStorage["lm-box"]`), UI overlays, auth stub
- `next/font` (Hanken Grotesk, Space Mono, Anton) + Peridot PE via `@font-face`
- `next/image` for all photos

## Getting started
```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm run build
```

## Structure
```
app/            routes: / · /range · /our-story · /contact · /cart · /recipes · /careers · /account
                + robots.ts, sitemap.ts, LocalBusiness JSON-LD in layout.tsx
components/     chrome (TopBar, Nav, MenuPanel, SearchSheet, Toast, Footer, AuthModal)
                + shared UI (Button, Eyebrow, PageHeader, Fold, QtyStepper, Photo, RangeRow, RotatingWord, Ticker, Reveal)
lib/            config, whatsapp (wa.me builder), format (UGX), cart store, session stub, ui store
data/           products.json (canonical), nav, home copy, tips, roles
design/         the 8 .dc.html design references (open with `npx serve design`) — reference only, not shipped
docs/           HANDOFF.md (build spec), WIRING.md (behaviour; wins over HANDOFF), COMMAND-LOG.md
public/         images/ (client photos), brand/ (logos), fonts/
```

## Responsive contract
Breakpoints are **max-width** in the design → use Tailwind `max-*` variants:
`max-xl` ≤1060 · `max-lg` ≤920 · `max-md` ≤760 · `max-sm` ≤620 · `max-xs` ≤480.
Mobile portrait `(max-width:600px) and (orientation:portrait)` → the custom `mp:` variant.
Button rows marked `data-cta-actions` get the 80vw / 2-up / no-wrap treatment automatically;
use `<span data-full>` / `<span data-short>` for short portrait labels.

## Status
All 8 pages are built from the design references: Home, The Range, Our Story, Contact (order form, wholesale, FAQ), Cart, Recipes, Careers, Account.
Recipes, jobs, FAQ answers, Our Story chapters and testimonials are placeholder copy (in `data/`).

## Open items (client)
- Real email (replace `hello@lamimeat.co.ug` via `NEXT_PUBLIC_EMAIL`)
- Final logo (+ exact logo red to replace `#C8372D`) → `public/brand/`
- Photos: in place. A plated food shot would suit the featured recipe (it currently uses the smokehouse photo). Still needed: a Beef Hot Dogs pack shot and a Lean Minced Beef pack shot (both use temporary copies, see `public/images/README.md`)
- Peridot font → `public/fonts/`
- Real copy: delivery areas, payments, minimum order, storage, jobs, recipes, ticker tips, Our Story, testimonials, rotating words
- OG images for WhatsApp link previews
