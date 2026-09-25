"use client";

import { useEffect, useState } from "react";
import Link from "@/components/LocaleLink";
import { menuLinks } from "@/data/nav";
import { mailHref, site, telHref } from "@/lib/config";
import { useT } from "@/lib/i18n/provider";
import { useUI } from "@/lib/ui";
import { wa } from "@/lib/whatsapp";
import { ugx } from "@/lib/format";
import { CloseIcon, SearchIcon, WhatsAppIcon } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSearchHits } from "./SearchSheet";

const rowLabel = "font-mono text-[10.5px] uppercase tracking-[.14em] text-dark-muted";
const rowValue = "text-base font-semibold text-bone [overflow-wrap:anywhere]";

/**
 * Slide-in side panel (from the inline end: right in English, left in Arabic).
 * Desktop / tablet / landscape: contact details (+ "Pages" list at ≤920px).
 * Phones (portrait or landscape): numbered main menu 01–06 instead.
 */
export function MenuPanel() {
  const isOpen = useUI((s) => s.overlay === "menu");
  const close = useUI((s) => s.close);
  const t = useT();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const r = t.menu.rows;
  const rows: [string, React.ReactNode][] = [
    [r.call, <a key="c" href={telHref} className={`${rowValue} hover:text-brass`}><span dir="ltr">{site.phoneDisplay}</span></a>],
    [r.email, <a key="e" href={mailHref} className={`${rowValue} hover:text-brass`}>{site.email}</a>],
    [r.hours, <span key="h" className={rowValue}>{t.common.hours}</span>],
    [r.kitchen, <span key="k" className={rowValue}>{t.common.location}</span>],
    [r.delivery, <span key="d" className={rowValue}>{t.common.deliveryArea}</span>],
    [r.instagram, <a key="i" href={site.instagram} target="_blank" rel="noopener" className={`${rowValue} hover:text-brass`}><span dir="ltr">{site.instagramHandle}</span></a>],
    [r.parent, <a key="p" href={site.parent.url} target="_blank" rel="noopener" className={`${rowValue} hover:text-brass`}>{site.parent.name}</a>],
  ];

  return (
    <div className={`fixed inset-0 z-60 transition-[opacity,visibility] duration-250 ${isOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`} aria-hidden={!isOpen}>
      <div onClick={close} className="absolute inset-0 bg-black/55" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.menu.dialog}
        className={`absolute top-0 end-0 bottom-0 flex w-[min(500px,100%)] flex-col overflow-y-auto phone:bottom-auto phone:h-screen phone:h-dvh bg-charcoal-2 p-[clamp(28px,4vw,52px)] transition-transform ease-lm phone:p-5 ${isOpen ? "translate-x-0 duration-[520ms]" : "translate-x-full duration-300 rtl:-translate-x-full"}`}
      >
        <button onClick={close} aria-label={t.menu.close} className="absolute top-[18px] end-[18px] flex size-[52px] items-center justify-center text-bone">
          <CloseIcon size={36} />
        </button>

        {/* Contact view (hidden on mobile portrait) */}
        <div className="flex min-h-0 flex-1 flex-col phone:hidden">
          <div className="font-mono text-[11px] tracking-[.16em] text-brass uppercase">{t.menu.getInTouch}</div>
          <h2 className="mt-[clamp(28px,5vh,52px)] font-display text-[clamp(36px,3.6vw,52px)] leading-[.9] font-black tracking-[-0.04em] text-bone uppercase">
            {t.menu.title1}
            <br />
            <span className="text-brass">{t.menu.title2}</span>
          </h2>
          <p className="mt-4 max-w-[360px] text-[15.5px] leading-[1.6] text-dark-body">{t.menu.intro}</p>
          <div className="mt-6 border-t border-bone/14">
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[96px_1fr] items-baseline gap-3.5 border-b border-bone/12 py-[13px]">
                <span className={rowLabel}>{label}</span>
                {value}
              </div>
            ))}
          </div>
          <a href={wa(t.wa.default)} target="_blank" rel="noopener" className="mt-7 flex min-h-[52px] items-center justify-center gap-2.5 rounded-lm bg-whatsapp px-[22px] py-[15px] text-[15px] font-extrabold tracking-[.01em] whitespace-nowrap text-white hover:bg-whatsapp-hover">
            <WhatsAppIcon />
            {t.menu.enquire}
          </a>
          <div className="mt-auto hidden pt-7 max-lg:block">
            <div className={`${rowLabel} mb-3`}>{t.menu.pages}</div>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1">
              {menuLinks.map((m) => (
                <Link key={m.href} href={m.href} onClick={close} className="inline-flex min-h-11 items-center text-[15px] font-semibold text-bone hover:text-brass">
                  {t.nav[m.key]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Numbered main menu + WhatsApp (phones, portrait or landscape) */}
        <div className="hidden flex-1 flex-col phone:flex">
          <div className="font-mono text-[11px] tracking-[.16em] text-brass uppercase">{t.menu.menu}</div>
          {/* Mobile portrait: search lives here instead of the header. */}
          <MenuSearch isOpen={isOpen} onPick={close} />
          <nav className="mt-[clamp(34px,7vh,72px)] flex flex-col mp:mt-[clamp(20px,3.5vh,36px)]">
            {menuLinks.map((m) => (
              <Link key={m.href} href={m.href} onClick={close} className="grid grid-cols-[44px_1fr] items-baseline border-b border-bone/12 py-3.5 text-bone hover:text-brass">
                <span className="font-numeral text-sm text-brass">{m.num}</span>
                <span className="font-display text-[clamp(28px,3vw,36px)] font-light tracking-[-0.01em]">{t.nav[m.key]}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex justify-center">
            <LanguageSwitcher />
          </div>
          <div className="mt-auto flex flex-col items-center gap-2.5 pt-7 text-center font-mono text-xs tracking-[.06em] whitespace-nowrap text-dark-muted">
            <span>
              {t.common.location} · {t.common.hoursShort}
            </span>
            <span>
              <span dir="ltr">{site.phoneDisplay}</span> · {site.email}
            </span>
          </div>
          {/* Pinned to the bottom of the panel, so it stays reachable when the list scrolls on short screens. */}
          <div className="sticky bottom-[-20px] -mb-5 bg-charcoal-2 pt-5 pb-5">
            <a
              href={wa(t.wa.default)}
              target="_blank"
              rel="noopener"
              className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-lm bg-whatsapp px-[22px] py-[15px] text-[15px] font-extrabold tracking-[.01em] whitespace-nowrap text-white hover:bg-whatsapp-hover"
            >
              <WhatsAppIcon />
              {t.menu.enquire}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inline product search for the phone menu (mobile portrait only). Cleared each time the menu closes. */
function MenuSearch({ isOpen, onPick }: { isOpen: boolean; onPick: () => void }) {
  const t = useT();
  const [q, setQ] = useState("");
  const term = q.trim();
  const hits = useSearchHits(term);

  useEffect(() => {
    if (!isOpen) setQ("");
  }, [isOpen]);

  return (
    <div className="mt-[clamp(28px,5vh,48px)] hidden mp:block" role="search">
      <label className="flex items-center gap-3 border-b-[1.5px] border-bone/40 focus-within:border-brass">
        <SearchIcon size={22} className="shrink-0 text-brass" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          enterKeyHint="search"
          placeholder={t.search.placeholder}
          aria-label={t.search.placeholder}
          className="min-h-12 min-w-0 flex-1 bg-transparent py-2.5 text-lg text-bone outline-none placeholder:text-dark-faint [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label={t.search.clear} className="-me-2.5 flex size-11 shrink-0 items-center justify-center text-dark-muted hover:text-bone">
            <CloseIcon size={20} />
          </button>
        )}
      </label>
      {term && (
        <ul className="divide-y divide-bone/12" aria-live="polite">
          {hits.length === 0 && <li className="py-3 text-[15px] text-dark-muted">{t.search.noMatch}</li>}
          {hits.map((p) => (
            <li key={p.id}>
              <Link href={`/range#${p.id}`} onClick={onPick} className="flex min-h-11 items-baseline justify-between gap-4 py-3 text-bone hover:text-brass">
                <span className="text-base font-bold">{t.products[p.id].name}</span>
                <span className="font-mono text-xs whitespace-nowrap text-dark-muted">
                  {ugx(p.p500)} / {t.common.sizes["500g"]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
