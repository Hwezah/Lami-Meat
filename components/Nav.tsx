"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/LocaleLink";
import { navLinks } from "@/data/nav";
import { countOf, useCart } from "@/lib/cart";
import { useSession } from "@/lib/session";
import { useUI } from "@/lib/ui";
import { stripLocale } from "@/lib/i18n/config";
import { useT } from "@/lib/i18n/provider";
import { useHydrated } from "@/lib/use-hydrated";
import { wa } from "@/lib/whatsapp";
import { AccountIcon, CartIcon, MenuStripes, MenuThree, SearchIcon } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

const iconBtn = "flex p-1.5 text-bone hover:text-brass [&>svg]:mp:size-6";

export function Nav() {
  const pathname = stripLocale(usePathname() || "/");
  const t = useT();
  const hydrated = useHydrated();
  const count = countOf(useCart((s) => s.box));
  const session = useSession((s) => s.session);
  const { open, openAuth } = useUI();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-bone/10 bg-charcoal/94 px-[clamp(18px,4vw,46px)] py-4 backdrop-blur-md">
      <div className="flex min-w-0 flex-1 items-center gap-[clamp(18px,2.4vw,36px)] max-lg:hidden">
        {navLinks.map((l) => {
          const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={`whitespace-nowrap text-[13px] font-semibold uppercase tracking-[.1em] hover:text-brass ${active ? "text-brass" : "text-bone"}`}>
              {t.nav[l.key]}
            </Link>
          );
        })}
      </div>

      <Link href="/" aria-label={t.nav.homeAria} className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 max-lg:static max-lg:translate-none">
        <Logo />
      </Link>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-[clamp(6px,1.1vw,14px)]">
        <LanguageSwitcher className="me-1 max-sm:me-0" />
        <button onClick={() => open("search")} aria-label={t.nav.search} className={iconBtn}>
          <SearchIcon />
        </button>
        <button onClick={() => openAuth(session ? "signout" : "login")} aria-label={t.nav.account} className={`relative ${iconBtn}`}>
          <AccountIcon />
          {hydrated && session && <span className="pointer-events-none absolute top-0.5 end-0 size-[9px] rounded-full bg-online shadow-[0_0_0_2px_rgba(40,12,9,.35)]" />}
        </button>
        <Link href="/cart" aria-label={t.nav.cart} className={`relative ${iconBtn}`}>
          <CartIcon />
          {hydrated && count > 0 && (
            <span className="absolute -top-px -end-[3px] h-[18px] min-w-[18px] rounded-[9px] bg-brass px-[5px] text-center font-mono text-[11px] leading-[18px] font-bold text-charcoal">{count}</span>
          )}
        </Link>
        <a href={wa(t.wa.default)} target="_blank" rel="noopener" className="ms-1 inline-flex items-center rounded-lm border border-brass px-[18px] py-[11px] text-[13px] font-bold tracking-[.08em] text-brass uppercase hover:bg-brass hover:text-charcoal max-md:hidden">
          {t.nav.order}
        </a>
        <button onClick={() => open("menu")} aria-label={t.nav.menu} className="flex h-11 w-[52px] shrink-0 items-center justify-center text-bone hover:text-brass mp:w-11">
          <span className="mp:hidden">
            <MenuStripes />
          </span>
          <span className="hidden mp:block">
            <MenuThree />
          </span>
        </button>
      </div>
    </nav>
  );
}
