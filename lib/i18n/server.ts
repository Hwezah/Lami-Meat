import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "./config";
import { getDict, type Dict } from "./dict";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Resolve the route's locale and its dictionary (server components). */
export async function getPageDict({ params }: LocaleParams): Promise<{ locale: Locale; t: Dict }> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  return { locale, t: getDict(locale) };
}

/** Per-page metadata with hreflang alternates. `path` is the unprefixed route, e.g. "/range". */
export async function pageMetadata(props: LocaleParams, key: keyof Dict["meta"]["pages"], path: string, extra: Metadata = {}): Promise<Metadata> {
  const { t } = await getPageDict(props);
  const m = t.meta.pages[key];
  return {
    title: m.title,
    description: m.description,
    alternates: { languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` } },
    ...extra,
  };
}
