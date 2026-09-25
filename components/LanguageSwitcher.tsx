"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, stripLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

/** Header toggle between English and Arabic. Keeps the current page and remembers the choice. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  const other = locale === "en" ? "ar" : "en";
  const path = stripLocale(usePathname() || "/");
  const href = `/${other}${path === "/" ? "" : path}`;

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={t.nav.switchAria}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
      }}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lm border border-bone/25 px-3 text-bone transition-colors hover:border-brass hover:text-brass ${className}`}
    >
      <span className={`max-[1180px]:hidden ${other === "ar" ? "font-[family-name:var(--font-plex-arabic)] text-[15px] font-semibold" : "font-[family-name:var(--font-hanken)] text-[12.5px] font-bold tracking-[.1em] uppercase"}`}>
        {t.nav.switchTo}
      </span>
      <span className={`hidden max-[1180px]:inline ${other === "ar" ? "font-[family-name:var(--font-plex-arabic)] text-base font-semibold" : "font-[family-name:var(--font-hanken)] text-[12px] font-bold tracking-[.08em]"}`}>
        {t.nav.switchToShort}
      </span>
    </Link>
  );
}
