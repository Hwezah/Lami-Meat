"use client";

import Link from "next/link";
import { useEffect } from "react";
import { menuLinks } from "@/data/nav";
import { mailHref, site, telHref } from "@/lib/config";
import { useUI } from "@/lib/ui";
import { waDefault } from "@/lib/whatsapp";
import { CloseIcon, WhatsAppIcon } from "./Icons";

const rowLabel = "font-mono text-[10.5px] uppercase tracking-[.14em] text-dark-muted";
const rowValue = "text-base font-semibold text-bone [overflow-wrap:anywhere]";

/**
 * Slide-in side panel.
 * Desktop / tablet / landscape: contact details (+ "Pages" list at ≤920px).
 * Mobile portrait: numbered main menu 01–06 instead.
 */
export function MenuPanel() {
  const isOpen = useUI((s) => s.overlay === "menu");
  const close = useUI((s) => s.close);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const rows: [string, React.ReactNode][] = [
    ["Call", <a key="c" href={telHref} className={`${rowValue} hover:text-brass`}>{site.phoneDisplay}</a>],
    ["Email", <a key="e" href={mailHref} className={`${rowValue} hover:text-brass`}>{site.email}</a>],
    ["Hours", <span key="h" className={rowValue}>{site.hours}</span>],
    ["Kitchen", <span key="k" className={rowValue}>{site.location}</span>],
    ["Delivery", <span key="d" className={rowValue}>Across Kampala, kept cold</span>],
    ["Instagram", <a key="i" href={site.instagram} target="_blank" rel="noopener" className={`${rowValue} hover:text-brass`}>{site.instagramHandle}</a>],
  ];

  return (
    <div className={`fixed inset-0 z-60 transition-[opacity,visibility] duration-250 ${isOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`} aria-hidden={!isOpen}>
      <div onClick={close} className="absolute inset-0 bg-black/55" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute top-0 right-0 bottom-0 flex w-[min(500px,100%)] flex-col overflow-y-auto bg-charcoal-2 p-[clamp(28px,4vw,52px)] transition-transform ease-lm mp:p-5 ${isOpen ? "translate-x-0 duration-[520ms]" : "translate-x-full duration-300"}`}
      >
        <button onClick={close} aria-label="Close menu" className="absolute top-[18px] right-[18px] flex size-[52px] items-center justify-center text-bone">
          <CloseIcon size={36} />
        </button>

        {/* Contact view (hidden on mobile portrait) */}
        <div className="flex min-h-0 flex-1 flex-col mp:hidden">
          <div className="font-mono text-[11px] tracking-[.16em] text-brass uppercase">Get in touch</div>
          <h2 className="mt-[clamp(28px,5vh,52px)] font-display text-[clamp(36px,3.6vw,52px)] leading-[.9] font-black tracking-[-0.04em] text-bone uppercase">
            Order by
            <br />
            <span className="text-brass">message.</span>
          </h2>
          <p className="mt-4 max-w-[360px] text-[15.5px] leading-[1.6] text-dark-body">Tell us what you need. We confirm price and delivery time on WhatsApp — usually within the hour.</p>
          <div className="mt-6 border-t border-bone/14">
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[96px_1fr] items-baseline gap-3.5 border-b border-bone/12 py-[13px]">
                <span className={rowLabel}>{label}</span>
                {value}
              </div>
            ))}
          </div>
          <a href={waDefault()} target="_blank" rel="noopener" className="mt-7 flex min-h-[52px] items-center justify-center gap-2.5 rounded-lm bg-whatsapp px-[22px] py-[15px] text-sm font-extrabold tracking-[.06em] whitespace-nowrap text-white uppercase hover:bg-whatsapp-hover">
            <WhatsAppIcon />
            WhatsApp {site.phoneDisplay}
          </a>
          <div className="mt-auto hidden pt-7 max-lg:block">
            <div className={`${rowLabel} mb-3`}>Pages</div>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1">
              {menuLinks.map((m) => (
                <Link key={m.href} href={m.href} onClick={close} className="inline-flex min-h-11 items-center text-[15px] font-semibold text-bone hover:text-brass">
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Numbered main menu (mobile portrait only) */}
        <div className="hidden flex-1 flex-col mp:flex">
          <div className="font-mono text-[11px] tracking-[.16em] text-brass uppercase">Menu</div>
          <nav className="mt-[clamp(34px,7vh,72px)] flex flex-col">
            {menuLinks.map((m) => (
              <Link key={m.href} href={m.href} onClick={close} className="grid grid-cols-[44px_1fr] items-baseline border-b border-bone/12 py-3.5 text-bone hover:text-brass">
                <span className="font-numeral text-sm text-brass">{m.num}</span>
                <span className="font-display text-[clamp(28px,3vw,36px)] font-light tracking-[-0.01em]">{m.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col items-center gap-2.5 pt-7 text-center font-mono text-xs tracking-[.06em] whitespace-nowrap text-dark-muted">
            <span>
              {site.location} · Mon–Sat · 8–6
            </span>
            <span>
              {site.phoneDisplay} · {site.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
