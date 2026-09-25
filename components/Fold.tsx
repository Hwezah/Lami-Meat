"use client";

import { PlusIcon } from "./Icons";

type Props = {
  id: string;
  open: string;
  onToggle: (id: string) => void;
  title: React.ReactNode;
  num?: string;
  meta?: React.ReactNode;
  tone?: "bone" | "dark";
  /** "row": num | title | meta | +  (FAQ, roles).  "stacked": meta line above title | + (recipes). */
  layout?: "row" | "stacked";
  children: React.ReactNode;
};

/**
 * Accordion item. The parent owns which id is open (one per page; "" = none).
 * The + rotates 45° when open; the body is removed when closed.
 */
export function Fold({ id, open, onToggle, title, num, meta, tone = "bone", layout = "row", children }: Props) {
  const isOpen = open === id;
  const dark = tone === "dark";
  const rule = dark ? "border-bone/16" : "border-ink/18";
  const muted = dark ? "text-dark-muted" : "text-bone-muted";
  const numCls = `font-numeral ${dark ? "text-brass" : "text-brass-deep-2"}`;
  const titleCls = "min-w-0 text-[clamp(19px,1.9vw,26px)] leading-[1.2] font-extrabold tracking-[-0.015em] [overflow-wrap:anywhere]";
  const plus = (
    <span
      aria-hidden
      className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-transform duration-250 ${dark ? "border-bone/30" : "border-ink/30"} ${isOpen ? "rotate-45" : ""} ${layout === "row" ? "max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1" : ""}`}
    >
      <PlusIcon size={18} />
    </span>
  );

  return (
    <div data-fold className={`border-b ${rule} text-start`}>
      <button
        type="button"
        onClick={() => onToggle(isOpen ? "" : id)}
        aria-expanded={isOpen}
        className={`grid w-full items-center py-[clamp(18px,2vw,26px)] text-start font-display whitespace-normal ${dark ? "text-bone" : "text-ink"} ${
          layout === "row"
            ? "grid-cols-[64px_minmax(0,1fr)_auto_44px] gap-x-[clamp(14px,2vw,28px)] gap-y-1.5 max-sm:grid-cols-[36px_minmax(0,1fr)_44px]"
            : "grid-cols-[minmax(0,1fr)_44px] gap-x-[clamp(14px,2vw,28px)] gap-y-4"
        }`}
      >
        {layout === "row" ? (
          <>
            <span className={`${numCls} text-[clamp(20px,2vw,26px)]`}>{num}</span>
            <span className={titleCls}>{title}</span>
            <span className={`${monoMeta} ${muted} max-sm:col-start-2 max-sm:row-start-2`}>{meta}</span>
            {plus}
          </>
        ) : (
          <>
            <span className="flex min-w-0 flex-col gap-2">
              <span className={`${monoMeta} ${muted} flex flex-wrap items-center gap-2.5`}>
                <span className={`${numCls} text-base tracking-[.04em]`}>{num}</span>
                <span aria-hidden className="h-px w-[22px] shrink-0 bg-brass-deep-2" />
                <span>{meta}</span>
              </span>
              <span className={titleCls}>{title}</span>
            </span>
            {plus}
          </>
        )}
      </button>
      {isOpen && <div className={layout === "row" ? "pb-[clamp(26px,3vw,40px)] ps-[clamp(0px,5.6vw,92px)]" : "pt-1 pb-[clamp(28px,3vw,44px)]"}>{children}</div>}
    </div>
  );
}

const monoMeta = "font-mono text-[11px] uppercase tracking-[.14em]";
