// Shared class strings matching the design references' standard controls.

const ctaBase =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lm px-[26px] py-[15px] font-display text-sm font-extrabold uppercase tracking-[.08em] whitespace-nowrap transition-colors";

export const cta = {
  ink: `${ctaBase} bg-ink text-bone hover:bg-brass-deep-2`,
  brass: `${ctaBase} bg-brass text-charcoal hover:bg-brass-hover`,
  whatsapp: `${ctaBase} bg-whatsapp text-white hover:bg-whatsapp-hover`,
  /** Outline on dark backgrounds */
  outline: `${ctaBase} border border-bone/40 text-bone hover:border-bone`,
  /** Outline on bone backgrounds */
  outlineInk: `${ctaBase} border border-ink/40 text-ink hover:border-ink`,
};
/** Compact size used inside accordions and list rows. */
export const ctaSm = "!min-h-[46px] !px-5 !py-3 !text-[13px]";

export const monoLabel = "font-mono text-[11px] uppercase tracking-[.14em]";

/** Underlined form field (dark card / bone section). */
export const fieldLabel = (tone: "dark" | "bone" = "dark") =>
  `mb-0.5 block font-mono text-[10.5px] uppercase tracking-[.14em] ${tone === "dark" ? "text-dark-muted" : "text-bone-muted"}`;
export const field = (tone: "dark" | "bone" = "dark") =>
  `w-full rounded-none border-0 border-b bg-transparent px-0.5 py-3 font-display text-base outline-none transition-colors ${
    tone === "dark"
      ? "border-bone/30 text-bone placeholder:text-dark-faint focus:border-brass"
      : "border-ink/35 text-ink placeholder:text-bone-muted focus:border-ink"
  }`;

/** Filter / size / option chip. Active = ink fill. */
export const chip = (on: boolean) =>
  `min-h-11 rounded-lm border px-[18px] py-2.5 font-display text-[13px] font-bold uppercase tracking-[.06em] transition-colors ${
    on ? "border-ink bg-ink text-bone" : "border-ink/30 bg-transparent text-ink hover:border-ink"
  }`;

/** Split H2 used across sections. */
export const h2 = "lm-h2";
