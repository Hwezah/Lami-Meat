export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (v: unknown): v is Locale => typeof v === "string" && (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** "/range" → "/ar/range"; leaves external links, hashes and already-prefixed paths alone. */
export function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const first = href.split(/[/?#]/)[1];
  if (isLocale(first)) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** "/ar/range#x" → "/range#x" */
export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) return "/" + parts.slice(2).join("/");
  return pathname;
}
