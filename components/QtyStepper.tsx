"use client";

import { useT } from "@/lib/i18n/provider";

/** − qty + stepper with 46px hit targets. Inherits text colour; border is currentColor at 30%. */
export function QtyStepper({ value, onChange, min = 1, label }: { value: number; onChange: (n: number) => void; min?: number; label?: string }) {
  const t = useT();
  const btn = "flex size-[46px] items-center justify-center text-xl disabled:opacity-40";
  return (
    <div className="inline-flex items-center rounded-lm border border-current/30" role="group" aria-label={label ?? t.common.qty.label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={t.common.qty.dec}>
        −
      </button>
      <span className="min-w-[30px] text-center text-base font-extrabold" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label={t.common.qty.inc}>
        +
      </button>
    </div>
  );
}
