"use client";

import Link from "@/components/LocaleLink";
import { menuLinks } from "@/data/nav";
import { mailHref, site } from "@/lib/config";
import { useT } from "@/lib/i18n/provider";
import { wa } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const colHead = "mb-4 font-mono text-[11.5px] uppercase tracking-[.14em] text-brass mp:text-center";
const link = "text-[15px] text-bone hover:text-brass mp:text-[12.5px] mp:[overflow-wrap:anywhere]";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-bone/10 bg-footer px-[clamp(18px,4vw,46px)] pt-[clamp(54px,6vw,80px)] pb-[30px] text-dark-body">
      <div className="lm-wrap">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-[clamp(28px,4vw,56px)] border-b border-bone/12 pb-[clamp(36px,4vw,52px)] max-lg:grid-cols-3 max-lg:gap-x-[18px] max-lg:gap-y-[26px] max-sm:grid-cols-1 mp:gap-[30px]">
          <div className="flex flex-col items-start max-lg:col-span-full mp:items-center mp:text-center">
            <div className="mb-[18px]">
              <Logo variant="footer" />
            </div>
            <p className="m-0 max-w-[320px] text-[14.5px] leading-[1.6] text-dark-muted">{t.footer.blurb}</p>
            <p className="m-0 mt-3 max-w-[320px] text-[14.5px] leading-[1.6] text-dark-muted">
              {t.footer.parentBefore}
              <a href={site.parent.url} target="_blank" rel="noopener" className="text-bone underline decoration-brass/60 underline-offset-4 hover:text-brass">
                {site.parent.name}
              </a>
              {t.footer.parentAfter}
            </p>
          </div>
          <div>
            <div className={colHead}>{t.footer.explore}</div>
            <div className="flex flex-col gap-[11px] mp:grid mp:grid-cols-3 mp:gap-x-1.5 mp:gap-y-3 mp:text-center">
              {menuLinks.map((m) => (
                <Link key={m.href} href={m.href} className={link}>
                  {t.nav[m.key]}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className={colHead}>{t.footer.getInTouch}</div>
            <div className="flex flex-col gap-[11px] mp:grid mp:grid-cols-2 mp:gap-x-1.5 mp:gap-y-3 mp:text-center">
              <a href={wa(t.wa.default)} target="_blank" rel="noopener" className={link}>
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
              <a href={mailHref} className={link}>
                {site.email}
              </a>
              <a href={site.instagram} target="_blank" rel="noopener" className={link}>
                {t.footer.instagram}
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-[18px] gap-y-2.5 pt-[22px] text-center font-mono text-[11.5px] tracking-[.06em] text-dark-faint">
          <span>{t.footer.copyright(new Date().getFullYear())}</span>
          <span aria-hidden className="text-brass mp:hidden">
            ·
          </span>
          <span>{t.footer.crafted}</span>
        </div>
      </div>
    </footer>
  );
}
