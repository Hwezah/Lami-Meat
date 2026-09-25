# LAMI MEAT — notes for Claude

- Spec: `docs/HANDOFF.md`. Behaviour and exact WhatsApp messages: `docs/WIRING.md` (wins on conflicts).
- Design references: `design/Lami-*.dc.html`. Markup is inside `<x-dc>`; data and logic in `<script data-dc-script>`. Rebuild in React + Tailwind; never ship or wrap the HTML.
- Fidelity is high: copy colours, type, spacing and copy from the references. Radius is 2px everywhere (`rounded-lm`). Hit targets ≥ 44px.
- Tokens live in `app/globals.css` `@theme`. Don't hard-code hex values that already have a token.
- Breakpoints are max-width: use `max-xl|lg|md|sm|xs:` and the `mp:` (mobile portrait) variant. `phone:` = mobile portrait OR landscape phones (≤500px tall); the menu button and panel use it. On `mp`, centre text except lists, forms, steps, accordions, structured rows and boxed content.
- Storage keys must stay: `lm-box` (cart, raw object), `lm-order-draft`, `lm-newsletter` (localStorage), `lm-session` (sessionStorage).
- All WhatsApp links go through `lib/whatsapp.ts` and open in a new tab. Contact values come from `lib/config.ts`.
- Anything read from storage must not render on the server (use `useHydrated`).
- Run `npm run lint && npm run typecheck && npm run build` before pushing.

## Languages (English / Arabic)
- Routes live under `app/[locale]/` → `/en/...` and `/ar/...`. `middleware.ts` redirects bare paths using the `NEXT_LOCALE` cookie, then `Accept-Language`.
- Every visible string comes from `lib/i18n/en.ts`; `lib/i18n/ar.ts` is typed against it, so a missing Arabic key fails the build. Never hard-code copy in components.
- Server components: `const { t } = await getPageDict(props)` (`lib/i18n/server.ts`). Client components: `const t = useT()`.
- Internal links use `@/components/LocaleLink` (adds the locale prefix), never `next/link` directly.
- Use logical utilities (`ms-/me-/ps-/pe-/start-/end-/text-start/text-end/border-s`) so layouts mirror in RTL; add `rtl:` variants for anything physical (transforms, gradients).
- Cart keys and WhatsApp item names stay in English product names so the Kampala team can fulfil; display names come from `t.products[id]`.
- Arabic styling lives at the end of `app/globals.css` (fonts, no letter-spacing, looser heading leading).
