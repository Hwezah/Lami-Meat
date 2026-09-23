"use client";

/** − qty + stepper with 46px hit targets. Inherits text colour; border is currentColor at 30%. */
export function QtyStepper({ value, onChange, min = 1, label = "Quantity" }: { value: number; onChange: (n: number) => void; min?: number; label?: string }) {
  const btn = "flex size-[46px] items-center justify-center text-xl disabled:opacity-40";
  return (
    <div className="inline-flex items-center rounded-lm border border-current/30" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease">
        −
      </button>
      <span className="min-w-[30px] text-center text-base font-extrabold" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Increase">
        +
      </button>
    </div>
  );
}
