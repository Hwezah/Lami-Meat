"use client";

export function QtyStepper({ value, onChange, min = 1, label = "Quantity" }: { value: number; onChange: (n: number) => void; min?: number; label?: string }) {
  const btn = "flex size-11 items-center justify-center text-lg font-bold disabled:opacity-40";
  return (
    <div className="inline-flex items-center rounded-lm border border-current/25" role="group" aria-label={label}>
      <button className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease">
        –
      </button>
      <span className="min-w-8 text-center font-mono text-sm font-bold">{value}</span>
      <button className={btn} onClick={() => onChange(value + 1)} aria-label="Increase">
        +
      </button>
    </div>
  );
}
