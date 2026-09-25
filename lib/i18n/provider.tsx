"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import { getDict, type Dict } from "./dict";

const Ctx = createContext<{ locale: Locale; t: Dict }>({ locale: "en", t: getDict("en") });

/** Client-side access to the current locale's dictionary (both dictionaries ship in the client bundle). */
export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={{ locale, t: getDict(locale) }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;
export const useLocale = () => useContext(Ctx).locale;
