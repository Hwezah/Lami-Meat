"use client";

import { PlusIcon } from "./Icons";

/**
 * Accordion item. The parent owns which key is open (only one per page):
 *   const [open, setOpen] = useState("q0");
 *   <Fold id="q0" open={open} onToggle={setOpen} …/>
 */
export function Fold({ id, num, title, meta, open, onToggle, tone = "bone", children }: {
  id: string;
  num?: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  open: string;
  onToggle: (id: string) => void;
  tone?: "bone" | "dark";
  children: React.ReactNode;
}) {
  const isOpen = open === id;
  const rule = tone === "bone" ? "border-ink/18" : "border-bone/14";
  return (
    <div data-fold className={`border-b ${rule} text-left`}>
      <button
        onClick={() => onToggle(isOpen ? "" : id)}
        aria-expanded={isOpen}
        className="grid w-full grid-cols-[56px_minmax(0,1fr)_auto_44px] items-center gap-4 py-5 text-left whitespace-normal max-sm:grid-cols-[36px_minmax(0,1fr)_44px]"
      >
        <span className="font-numeral text-[22px] text-brass-deep-2">{num}</span>
        <span className="min-w-0 font-display text-[clamp(20px,2vw,28px)] font-extrabold tracking-[-0.02em] [overflow-wrap:anywhere]">{title}</span>
        {meta ? <span className="font-mono text-[11px] uppercase tracking-[.12em] opacity-70 max-sm:col-start-2 max-sm:row-start-2">{meta}</span> : <span />}
        <span className={`flex justify-end transition-transform ${isOpen ? "rotate-45" : ""}`}>
          <PlusIcon />
        </span>
      </button>
      {isOpen && <div className="pb-7 pl-[72px] max-sm:pl-0">{children}</div>}
    </div>
  );
}
