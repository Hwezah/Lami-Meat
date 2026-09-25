import { useId } from "react";

/**
 * LAMI MEAT lockup: the client's Lami badge + stacked wordmark (LAMI in red, MEAT in cream).
 * The badge is a vector trace of the logo the client sent (black heart, red plaque with a white rim,
 * "Lami" + "Crafted for the Finest Taste"), with no background so it sits on any surface.
 * `height` is the badge height in px; the badge is 1000×640, so width = height × 1.5625.
 * If the client supplies their master vector file, swap it in here.
 */
export function LogoMark({ height = 58, className = "" }: { height?: number; className?: string }) {
  const gap = useId();
  const font = "Arial, 'Helvetica Neue', Helvetica, var(--font-hanken), sans-serif";
  return (
    <svg width={height * 1.5625} height={height} viewBox="0 0 1000 640" className={className} aria-hidden>
      <defs>
        {/* the two slits that separate the heart's lobes from its point */}
        <mask id={gap}>
          <rect width="1000" height="640" fill="#fff" />
          <path d="M352 392 L416 520 M648 392 L584 520" stroke="#000" strokeWidth="26" />
        </mask>
      </defs>
      <g mask={`url(#${gap})`} fill="#000">
        <ellipse cx="240" cy="256" rx="215" ry="232" />
        <ellipse cx="760" cy="256" rx="215" ry="232" />
        <path d="M380 380 L620 380 L500 630 Z" />
      </g>
      <path
        d="M500 95C520 130 545 150 590 160C650 172 690 120 790 118C870 116 902 200 902 262C902 340 862 386 760 393Q500 410 240 393C138 386 98 340 98 262C98 200 130 116 210 118C310 120 350 172 410 160C455 150 480 130 500 95Z"
        fill="#D8352A"
        stroke="#fff"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <text x="496" y="318" textAnchor="middle" fill="#fff" fontSize="238" fontWeight="700" letterSpacing="-2" style={{ fontFamily: font }}>
        Lami
      </text>
      <text x="496" y="368" textAnchor="middle" fill="#fff" fontSize="40" textLength="590" lengthAdjust="spacingAndGlyphs" style={{ fontFamily: font }}>
        “Crafted for the Finest Taste”
      </text>
    </svg>
  );
}

export function Logo({ variant = "nav", className = "" }: { variant?: "nav" | "footer"; className?: string }) {
  const nav = variant === "nav";
  return (
    <span dir="ltr" className={`inline-flex items-center ${nav ? "gap-3 max-lg:gap-2.5" : "gap-4"} ${className}`} role="img" aria-label="LAMI MEAT">
      <LogoMark height={nav ? 58 : 96} className={nav ? "max-lg:h-[50px] max-lg:w-[78px] phone:h-[46px] phone:w-[72px]" : ""} />
      <span
        aria-hidden
        className={`flex flex-col font-[family-name:var(--font-hanken)] font-black tracking-[-0.01em] text-bone uppercase ${nav ? "text-[20px] leading-[.95] max-lg:text-[17px]" : "text-[30px] leading-[.95]"}`}
      >
        <span className="text-lami-red">Lami</span>
        <span>Meat</span>
      </span>
    </span>
  );
}
