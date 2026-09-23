import type { CSSProperties } from "react";

const MASK = "linear-gradient(to bottom, transparent 0%, #000 45%, #000 88%, transparent 100%)";
const SECONDS_PER_LINE = 5;
const line = "m-0 pb-[22px] text-[clamp(16px,1.3vw,18px)] leading-[1.6]";

/**
 * Page-header ticker: lines rise continuously and fade into the background, then loop.
 * Line 1 is the page intro (bone); the rest are muted. CSS-only (see .lm-ticker in globals.css).
 * Hover pauses it. Under prefers-reduced-motion only line 1 is shown, as a plain paragraph.
 */
export function Ticker({ lines }: { lines: string[] }) {
  const copy = (key: string) =>
    lines.map((l, i) => (
      <p key={`${key}${i}`} className={`${line} ${i === 0 ? "text-bone" : "text-dark-body"}`}>
        {l}
      </p>
    ));

  return (
    <>
      <div
        role="region"
        aria-label={lines.join(" ")}
        className="lm-ticker relative h-[clamp(220px,20vw,300px)] w-full max-w-[440px] overflow-hidden motion-reduce:hidden mp:mx-auto mp:text-center"
        style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      >
        <div
          aria-hidden
          className="lm-ticker-track"
          style={{ "--ticker-duration": `${lines.length * SECONDS_PER_LINE}s` } as CSSProperties}
        >
          {copy("a")}
          {copy("b")}
        </div>
      </div>
      <p className={`${line} hidden !pb-0 text-bone motion-reduce:block mp:mx-auto mp:text-center`}>{lines[0]}</p>
    </>
  );
}
