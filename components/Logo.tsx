/**
 * LAMI MEAT lockup: red speech-bubble badge with an italic "Lami" + stacked LAMI / MEAT wordmark.
 * Inline SVG (crisp at any size, uses the page's fonts). `size` is the badge height in px.
 * If the client supplies a final vector logo, swap it in here.
 */
export function LogoMark({ size = 46, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={(size * 48) / 50} height={size} viewBox="0 0 48 50" className={className} aria-hidden>
      {/* bubble + pointer */}
      <path d="M24 2C11.3 2 1.5 10.3 1.5 20.5c0 8.9 7.4 16.3 17.3 18.1L24 49l5.2-10.4C39.1 36.8 46.5 29.4 46.5 20.5 46.5 10.3 36.7 2 24 2Z" fill="#D82828" />
      {/* inner hairline oval */}
      <ellipse cx="24" cy="20.5" rx="18.6" ry="14.2" fill="none" stroke="#EFE9DF" strokeWidth="0.9" opacity="0.9" />
      <text
        x="24"
        y="25.2"
        textAnchor="middle"
        fill="#EFE9DF"
        fontSize="13.5"
        fontStyle="italic"
        style={{ fontFamily: "var(--font-logo-serif), Georgia, 'Times New Roman', serif" }}
      >
        Lami
      </text>
    </svg>
  );
}

export function Logo({ variant = "nav", className = "" }: { variant?: "nav" | "footer"; className?: string }) {
  const nav = variant === "nav";
  return (
    <span className={`inline-flex items-center ${nav ? "gap-2.5 max-lg:gap-2" : "gap-3.5"} ${className}`} role="img" aria-label="LAMI MEAT">
      <LogoMark size={nav ? 46 : 72} className={nav ? "max-lg:h-10 max-lg:w-auto" : ""} />
      <span
        aria-hidden
        className={`flex flex-col font-display font-black tracking-[-0.01em] text-bone uppercase ${nav ? "text-[17px] leading-[.95] max-lg:text-[15px]" : "text-[26px] leading-[.95]"}`}
      >
        <span>Lami</span>
        <span>Meat</span>
      </span>
    </span>
  );
}
