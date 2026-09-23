/** Space Mono eyebrow. `rule` adds the 36×1 brass rule used on hero/page headers. */
export function Eyebrow({ children, tone = "dark", rule, className = "" }: { children: React.ReactNode; tone?: "dark" | "bone"; rule?: boolean; className?: string }) {
  return (
    <div data-eyebrow className={`lm-eyebrow flex items-center gap-3.5 mp:justify-center ${tone === "bone" ? "text-brass-deep" : "text-brass"} ${className}`}>
      {rule && <span className="h-px w-9 shrink-0 bg-brass" />}
      <span>{children}</span>
    </div>
  );
}
