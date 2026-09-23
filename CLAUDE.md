# LAMI MEAT — notes for Claude

- Spec: `docs/HANDOFF.md`. Behaviour and exact WhatsApp messages: `docs/WIRING.md` (wins on conflicts).
- Design references: `design/Lami-*.dc.html`. Markup is inside `<x-dc>`; data and logic in `<script data-dc-script>`. Rebuild in React + Tailwind; never ship or wrap the HTML.
- Fidelity is high: copy colours, type, spacing and copy from the references. Radius is 2px everywhere (`rounded-lm`). Hit targets ≥ 44px.
- Tokens live in `app/globals.css` `@theme`. Don't hard-code hex values that already have a token.
- Breakpoints are max-width: use `max-xl|lg|md|sm|xs:` and the `mp:` (mobile portrait) variant. On `mp`, centre text except lists, forms, steps, accordions, structured rows and boxed content.
- Storage keys must stay: `lm-box` (cart, raw object), `lm-order-draft`, `lm-newsletter` (localStorage), `lm-session` (sessionStorage).
- All WhatsApp links go through `lib/whatsapp.ts` and open in a new tab. Contact values come from `lib/config.ts`.
- Anything read from storage must not render on the server (use `useHydrated`).
- Run `npm run lint && npm run typecheck && npm run build` before pushing.
