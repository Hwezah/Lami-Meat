# LAMI MEAT: log of commands and how each was carried out

This file records every instruction given during the design phase and how it was implemented. Read it together with `README.md`, which is the build spec.

> Note: items 1–9 come from the running project summary; the earliest turns are condensed there. Items 10 onward are listed individually.

---

## Phase 1: Foundation (condensed)

### 1. Build a new LAMI MEAT site: a premium butcher, not a GrillMark copy
- **Did:** created the direction: deep charcoal `#16171A` + brass `#B8955A`, an editorial layout (masthead with a framed photo, ledger rows, numbered "No. 0X" sections, a product index list, hairline rules, 2px square buttons).
- **Kept from GrillMark, at the user's request:** fonts (Peridot PE body, Hanken Grotesk 900 uppercase headings, Space Mono eyebrows, Anton numerals), the line-icon set, and the responsive + mobile-portrait contract (`Build-Playbook.md`).
- **Files:** `Lami-Home.dc.html` (master). The old iterations were moved to `_ref/`. The rules are recorded in `CLAUDE.md`.

### 2. Roll the Home system out to all pages
- **Did:** built Products (The Range), About (Our Story), Order (Contact + wholesale + FAQ), Cart, Recipes, Careers and Auth. They share the same top bar, sticky nav, slide-in panel, search sheet, toast and footer.
- **Storage:** `lm-box` (cart), `lm-session` (auth), `lm-newsletter`. Auth modals are in `lm-auth.js`.

### 3. Side-menu behaviour by device
- **Did:** on desktop, tablet and landscape the panel shows contact details + a WhatsApp button. At ≤920px (where the nav links hide) a "Pages" list is added. Mobile portrait shows a numbered main menu (01–06) instead.
- **CSS hooks:** `[data-menu-alt]`, `[data-menu-pages]`, `[data-menu-main]`.

### 4. Menu button style
- **Did:** two long stripes on larger screens; a 42px circle with a 1.5px border and a round glyph on mobile portrait.

### 5. Remove the brass border from the menu panel
- **Did:** removed the border on all pages.

### 6. Phone number everywhere
- **Did:** `+256 773 828 552` is used in the WhatsApp links (`wa.me/256773828552` with pre-filled messages), `tel:` buttons, the menu and the footer on all 8 pages. It is driven by the `whatsappNumber` prop.

### 7. Email
- **Status:** `hello@lamimeat.co.ug` is still a **placeholder**, waiting for the real address.

### 8. Logo
- **Status:** temporary SVGs are in use. The **real logo is pending** from the client.

### 9. Placeholder copy
- **Status:** delivery areas, payment methods, minimum order, storage, job listings, recipes and the Our Story chapters still need the client's real copy.

---

## Phase 2: Mobile optimisation (this session)

### 10. "Finish up what was left and fully optimise for mobile. On mobile portrait, centre all text except bulleted, numbered, text in a styled div or separate box, and structured text that behaves like steps."
- **Did:** added one shared mobile-portrait block (`max-width:600px and orientation:portrait`) to all 8 pages.
  - **Centred:** every top-level section and header, paragraphs (auto margins), figcaptions, eyebrows and headings.
  - **Kept left-aligned:** `ul/ol/li/dl`, labels/forms, and `[data-steps]`: the Home butchery process, the Products care steps (both marked by adding the attribute), and About "Four rules" / Careers "Why join" (via `ledger4`).
  - **Also left-aligned:** accordions `[data-fold]`, range rows, cart lines and contact rows, and boxed content (`[data-cta-card]`, `aside` cart summary, the `p[data-quote]` pull quote). The Order-page wholesale form is marked `[data-form]`.
  - Inside boxes, headings, eyebrows and button rows are realigned to the left.
- **Checked:** at 390×844. Two defects were found and fixed (item 12).

### 11. "On mobile portrait, centre all buttons, make them 80vw; for 2 buttons, flex them with justify-between."
- **Did:** every `[data-cta-actions]` row became `display:flex; width:80vw; margin:0 auto; justify-content:space-between; gap:10px; flex-wrap:nowrap`. Each button gets `flex:1 1 0`, with centred content. This also applies inside boxes.
- The cart checkout link and the newsletter Subscribe button are also 80vw and centred.
- **Unchanged:** icon buttons, chips, size pills and qty steppers.

### 12. Fixes from the check
- **Accordion heads overflowed at ≤620px:** the column `1fr` was changed to `36px minmax(0,1fr) 44px`, and the title spans got `min-width:0` + `overflow-wrap:anywhere`.
- **Buttons inside open accordions were off-centre:** set `[data-fold-body]{padding-left:0}` in portrait.

### 13. "For 2 side-by-side buttons on mobile portrait, make sure their text doesn't wrap; use alternative text if needed; increase the vertical gap."
- **Did:** buttons are `white-space:nowrap`, 13px, letter-spacing .04em, with 10px side padding.
- **Short labels:** added `<span data-full>` / `<span data-short>` pairs. The short label shows only inside button rows on mobile portrait:
  - "+256 773 828 552" → "Call us" (Home)
  - "Wholesale enquiry →" → "Wholesale →" (Products)
  - "Apply by email" → "Email us", "Ask on WhatsApp" → "WhatsApp" (Careers)
- **Gap:** button rows got `margin-top: clamp(34px,9vw,44px)`. This was read as more space above the buttons.
- **Check fix:** short labels are `text-transform:uppercase` so "Call us" matches "WHATSAPP".

### 14. "In the Recipes header, increase the text on the right: a lot, auto-scrolling upward as it disappears into the background's gradient." / "And then loop back."
- **Did:** replaced the intro paragraph with a `Ticker`: 12 cooking-tip lines. The first is the original intro, highlighted in bone.
  - Box height `clamp(220px,20vw,300px)`, overflow hidden, with a mask of `linear-gradient(to bottom, transparent 0%, #000 45%, #000 88%, transparent 100%)`.
  - The list is rendered twice and animated `translateY(0 → -50%)` over 60s, linear and infinite, for a seamless loop.
  - Pauses on hover; disabled under `prefers-reduced-motion`; centred on mobile portrait.
- **File:** `Lami-Recipes.dc.html` (`tickerEl()` + the `@keyframes lm-rise`).
- **Status:** the tips are placeholder copy and need client review.

### 15. "Make 'Mastered' dynamic with other words" (Home hero)
- **Did:** "Mastered." became a `RotatingWord` cycling through `Mastered., Perfected., Trusted., Delivered., Sealed., Loved.` every 2.6s.
  - Enter animation: opacity 0, translateY(.35em), blur(6px) → rest over 0.7s `cubic-bezier(.16,1,.3,1)`. It respects reduced motion.
- **File:** `Lami-Home.dc.html` (`static WORDS`, `state.wi`, an interval set in `componentDidMount` and cleared on unmount).

### 16. "'See the range' should become 'See range' on mobile portrait"
- **Did:** added a short label on Home, About and Cart (the `data-full` / `data-short` pattern).

### 17. "The dynamic words should be red, grey and the current colour" → 18. "Make the grey white"
- **Did:** the colour cycles by index % 3: brass `#B8955A` → red `#C8372D` → bone `#EFE9DF`.
- **Note:** the red is not a brand token. It should be matched to the logo red once the logo is final.

### 19. "Can we use a thick underline below them?"
- **Did:** added a currentColor underline, 0.085em thick, that draws in from left to right.

### 20. "What do you advise?"
- **Advice:** drop the underline; keep red for one word only; slow the rotation to about 3.5s with about 4 stronger words. Other priorities: the real logo, the real copy, the email, and SEO/OG images.

### 21. "Drop underline"
- **Did:** removed the underline and its `lm-uline` keyframes. The colour cycle and fade-in stay.

### 22. "Provide files for Claude Code to begin the Next.js scaffold"
- **Did:** created `design_handoff_lami_nextjs/`:
  - `README.md`: full build spec (stack, structure, tokens, screens, behaviour, responsive contract, assets, open items).
  - `data/products.json`: the 4 products with prices and specs.
  - `public/images`, `public/brand`, `public/fonts`: the client photos, logos and the Peridot font.
  - `design/`: the 8 `.dc.html` references + `support.js` + `lm-auth.js`.

### 23. "Add an md file that holds every command and how it was executed"
- **Did:** this file (`COMMAND-LOG.md`).

---

## Open items
- [ ] Real email address (replace `hello@lamimeat.co.ug`)
- [ ] Final logo (and the exact logo red to replace `#C8372D`)
- [ ] Real copy: delivery areas, payments, minimum order, storage, jobs, recipes, ticker tips, Our Story chapters, testimonials, rotating-word list
- [ ] SEO metadata, OG images, LocalBusiness JSON-LD
