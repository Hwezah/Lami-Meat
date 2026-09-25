import { Eyebrow } from "@/components/Eyebrow";
import Link from "@/components/LocaleLink";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Ticker } from "@/components/Ticker";
import { cta } from "@/components/ui";
import { mosaic } from "@/data/story";
import { getPageDict, pageMetadata, type LocaleParams } from "@/lib/i18n/server";
import { wa } from "@/lib/whatsapp";

export const generateMetadata = (props: LocaleParams) => pageMetadata(props, "ourStory", "/our-story");

export default async function OurStoryPage(props: LocaleParams) {
  const { t } = await getPageDict(props);
  const S = t.story;
  return (
    <>
      <PageHeader eyebrow={S.eyebrow} line1={S.title1} line2={S.title2}>
        <Ticker lines={t.tickers.ourStory} />
      </PageHeader>

      {/* Figure */}
      <section className="px-[clamp(18px,4vw,46px)] max-xs:px-6 mp:px-3.5">
        <figure data-reveal className="lm-wrap m-0">
          <div className="relative aspect-[21/9] max-sm:aspect-[4/3]">
            <Photo src="/images/team-line-2.jpg" alt={S.figAlt} priority />
          </div>
          <figcaption className="mt-4 flex justify-between gap-3 font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase">
            <span>{S.figCaption}</span>
            <span>{S.figPlace}</span>
          </figcaption>
        </figure>
      </section>

      {/* Chapters */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap">
          {S.chapters.map((c) => (
            <div
              key={c.label}
              data-reveal
              className="lm-stick grid grid-cols-[200px_1fr_1fr] items-start gap-x-[clamp(24px,4vw,64px)] gap-y-6 border-t border-bone/16 py-[clamp(36px,4vw,56px)] max-lg:grid-cols-2 max-sm:grid-cols-1"
            >
              <Eyebrow className="max-lg:col-span-full">{c.label}</Eyebrow>
              <div>
                <h2 className="font-display text-[clamp(30px,3.4vw,52px)] leading-[.92] font-black tracking-[-0.04em] text-bone uppercase">{c.title}</h2>
                <p className="mt-5 max-w-[460px] text-base leading-[1.7] text-dark-body mp:mx-auto">{c.text}</p>
              </div>
              <div className="relative aspect-[4/3]">
                <Photo src={c.img} alt={c.title} sizes="(max-width:620px) 100vw, (max-width:920px) 50vw, 33vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* No. 01 Four rules */}
      <section className="lm-section bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,60px)] max-w-[720px]">
            <Eyebrow tone="bone" className="mb-4">
              {S.rulesEyebrow}
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              {S.rulesTitle1}
              <br />
              {S.rulesTitle2}
            </h2>
          </div>
          <div data-steps className="grid grid-cols-4 gap-[clamp(24px,3vw,44px)] text-start max-xl:grid-cols-2 max-sm:grid-cols-1">
            {S.rules.map((r, i) => (
              <div key={r.num} data-reveal data-reveal-delay={i * 80} className="border-t-[1.5px] border-ink pt-[18px]">
                <div className="font-numeral text-[28px] leading-none text-brass-deep-2">{r.num}</div>
                <h3 className="mt-3.5 text-[19px] font-extrabold">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-bone-body">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No. 02 People */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,60px)] grid grid-cols-2 items-end gap-x-[clamp(36px,5vw,90px)] gap-y-6 max-lg:grid-cols-1">
            <div>
              <Eyebrow className="mb-4">{S.peopleEyebrow}</Eyebrow>
              <h2 data-reveal className="lm-h2 text-bone">
                {S.peopleTitle1}
                <br />
                {S.peopleTitle2}
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 mp:items-center">
              <p data-reveal className="max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-dark-body">
                {S.peopleBody}
              </p>
              <Link data-reveal href="/careers" className="border-b border-brass pb-1 text-sm font-bold tracking-[.08em] text-brass uppercase hover:text-brass-hover">
                {S.joinTeam}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[clamp(8px,1vw,14px)] max-lg:grid-cols-2">
            {mosaic.map((src, i) => (
              <div
                key={src}
                data-reveal
                className={`relative ${i === 0 ? "col-span-2 row-span-2 max-lg:row-span-1 max-lg:aspect-[16/10]" : "aspect-square"}`}
              >
                <Photo src={src} alt={t.common.teamAlt} sizes={i === 0 ? "(max-width:920px) 100vw, 50vw" : "(max-width:920px) 50vw, 25vw"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(72px,9vw,128px)] max-xs:px-6 mp:px-3.5">
        <div
          data-cta-card
          className="lm-wrap grid grid-cols-[1.1fr_.9fr] items-end gap-x-[clamp(36px,5vw,80px)] gap-y-6 border border-brass/45 bg-charcoal-2 p-[clamp(36px,5vw,72px)] max-lg:grid-cols-1 mp:px-[22px] mp:text-center"
        >
          <h2 data-reveal className="font-display text-[clamp(38px,5vw,76px)] leading-[.92] font-black tracking-[-0.04em] text-bone uppercase">
            {S.closerTitle1}
            <br />
            {S.closerTitle2}
          </h2>
          <div data-reveal className="flex flex-col items-start gap-6 mp:items-center">
            <p className="max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-dark-body">
              {S.closerBody}
            </p>
            <div data-cta-actions className="flex flex-wrap gap-3">
              <Link href="/range" className={cta.brass}>
                <span data-full>{t.common.seeRange}</span>
                <span data-short>{t.common.seeRangeShort}</span> {t.common.arrow}
              </Link>
              <a href={wa(t.wa.default)} target="_blank" rel="noopener" className={cta.outline}>
                {t.common.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
