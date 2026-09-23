import { Eyebrow } from "./Eyebrow";

/** Inner-page header: eyebrow + two-line H1 (second line brass) on the left, intro on the right. */
export function PageHeader({ eyebrow, line1, line2, children }: { eyebrow: string; line1: string; line2: string; children?: React.ReactNode }) {
  return (
    <header className="px-[clamp(18px,4vw,46px)] pt-[clamp(56px,7vw,110px)] pb-[clamp(44px,5vw,72px)] max-xs:px-6 mp:px-3.5 mp:text-center">
      <div className="lm-wrap grid grid-cols-[1.2fr_.8fr] items-end gap-x-[clamp(36px,5vw,90px)] gap-y-6 border-b border-bone/16 pb-[clamp(36px,4vw,56px)] max-lg:grid-cols-1">
        <div data-reveal className="flex flex-col items-start mp:items-center">
          <Eyebrow rule className="mb-[clamp(22px,2.6vw,34px)]">
            {eyebrow}
          </Eyebrow>
          <h1 className="lm-h1 text-bone">
            {line1}
            <br />
            <span className="text-brass">{line2}</span>
          </h1>
        </div>
        <div data-reveal data-reveal-delay="120" className="max-w-[440px] text-[clamp(16px,1.3vw,18px)] leading-[1.66] text-dark-body mp:mx-auto">
          {children}
        </div>
      </div>
    </header>
  );
}
