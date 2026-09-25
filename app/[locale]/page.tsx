import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Newsletter } from "@/components/home/Newsletter";
import Link from "@/components/LocaleLink";
import { Photo } from "@/components/Photo";
import { RangeRow } from "@/components/RangeRow";
import { RotatingWord } from "@/components/RotatingWord";
import { site, telHref } from "@/lib/config";
import { getPageDict, type LocaleParams } from "@/lib/i18n/server";
import { products } from "@/lib/products";
import { wa } from "@/lib/whatsapp";

export default async function Home(props: LocaleParams) {
  const { t, locale } = await getPageDict(props);
  const h = t.home;
  return (
    <>
      {/* MASTHEAD */}
      <header className="pb-[clamp(56px,6vw,84px)] mp:text-center">
        <div className="relative flex min-h-[min(88vh,880px)] items-center overflow-hidden border-b border-brass/35 bg-hero px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,120px)] max-md:min-h-0 max-md:items-end max-md:pt-[clamp(250px,66vw,440px)] max-md:pb-[clamp(44px,10vw,64px)] mp:px-3.5">
          <div className="absolute top-0 end-0 h-full w-[62%] max-md:h-[clamp(300px,82vw,520px)] max-md:w-full">
            <Photo src="/images/smoked-rack.jpg" alt={h.heroAlt} priority sizes="(max-width:760px) 100vw, 62vw" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,#0E1316_0%,#0E1316_38%,rgba(14,19,22,0.82)_48%,rgba(14,19,22,0)_70%),linear-gradient(0deg,rgba(14,19,22,0.9)_0%,rgba(14,19,22,0)_26%)] rtl:-scale-x-100 max-md:bg-[linear-gradient(180deg,rgba(14,19,22,0)_0%,rgba(14,19,22,0.1)_30%,#0E1316_clamp(300px,82vw,520px))]"
          />
          <div className="relative mx-auto w-full max-w-[1320px]">
            <div data-reveal className="flex max-w-[640px] flex-col items-start mp:items-center">
              <Eyebrow rule className="mb-[clamp(24px,3vw,40px)]">
                {h.heroEyebrow}
              </Eyebrow>
              <h1 className="m-0 font-display text-[clamp(54px,8.4vw,136px)] leading-[.86] font-black tracking-[-0.045em] text-bone uppercase">
                {h.heroLine1}
                <br />
                {h.heroLine2}
                <br />
                <RotatingWord />
              </h1>
              <p className="mt-[clamp(26px,3vw,40px)] max-w-[470px] text-[clamp(16px,1.3vw,18.5px)] leading-[1.66] text-dark-body">{h.heroIntro}</p>
              <div data-cta-actions className="mt-[34px] flex flex-wrap gap-3">
                <ButtonLink href="#range" className="px-7">
                  <span data-full>{t.common.seeRange}</span>
                  <span data-short>{t.common.seeRangeShort}</span> <span>{t.common.arrow}</span>
                </ButtonLink>
                <ButtonLink href="/contact#wholesale" variant="outline" className="font-bold">
                  {t.common.wholesale}
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="absolute end-[clamp(18px,4vw,46px)] bottom-[22px] font-mono text-[11px] tracking-[.12em] text-dark-body uppercase max-md:hidden">{h.heroCaption}</div>
        </div>
        <div className="mx-auto mt-[clamp(40px,5vw,64px)] grid w-[calc(100%-2*clamp(18px,4vw,46px))] max-w-[1320px] grid-cols-3 border-t border-bone/16 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {h.ledger.map((l, i) => (
            <div key={l.num} data-reveal data-reveal-delay={i * 90} className="pe-[clamp(0px,2vw,28px)] pt-[26px]">
              <div className="font-mono text-[11px] tracking-[.16em] text-brass uppercase">{l.num}</div>
              <div className="mt-3 text-[19px] font-extrabold text-bone">{l.title}</div>
              <div className="mt-1.5 text-[14.5px] leading-[1.55] text-dark-muted">{l.desc}</div>
            </div>
          ))}
        </div>
      </header>

      {/* THE RANGE */}
      <section id="range" className="lm-section scroll-mt-20 bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,64px)] grid grid-cols-2 items-end gap-x-[clamp(36px,5vw,90px)] gap-y-6 max-lg:grid-cols-1">
            <div>
              <Eyebrow tone="bone" className="mb-4">
                {h.rangeEyebrow}
              </Eyebrow>
              <h2 data-reveal className="m-0 font-display text-[clamp(40px,5.6vw,88px)] leading-[.9] font-black tracking-[-0.04em] uppercase">
                {h.rangeTitle1}
                <br />
                {h.rangeTitle2}
              </h2>
            </div>
            <p data-reveal className="max-w-[440px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body mp:mx-auto">
              {h.rangeIntro}
            </p>
          </div>
          <div className="border-t-[1.5px] border-ink">
            {products.map((p) => (
              <RangeRow key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-7 flex justify-end mp:justify-center">
            <Link href="/range" className="border-b border-ink pb-1 text-sm font-bold tracking-[.08em] text-ink uppercase">
              {h.fullDetails}
            </Link>
          </div>
        </div>
      </section>

      {/* No. 01 SMOKEHOUSE */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap grid grid-cols-2 items-center gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <div data-reveal className="relative aspect-square">
            <Photo src="/images/hero-smokehouse.jpg" alt={h.smokeAlt} sizes="(max-width:920px) 100vw, 50vw" />
          </div>
          <div data-reveal data-reveal-delay="120">
            <Eyebrow className="mb-4">{h.smokeEyebrow}</Eyebrow>
            <h2 className="lm-h2 text-bone">
              {h.smokeTitle1}
              <br />
              {h.smokeTitle2}
            </h2>
            <p data-quote className="mt-[clamp(26px,3vw,38px)] border-s border-brass ps-[22px] text-start font-display text-[clamp(20px,1.9vw,27px)] leading-[1.4] font-light text-bone italic rtl:not-italic">
              {h.smokeQuote}
            </p>
            <p className="mt-6 max-w-[470px] text-base leading-[1.66] text-dark-body mp:mx-auto">{h.smokeBody}</p>
          </div>
        </div>
      </section>

      {/* No. 02 BUTCHERY */}
      <section className="lm-section bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,64px)] max-w-[720px] mp:mx-auto">
            <Eyebrow tone="bone" className="mb-4">
              {h.butcheryEyebrow}
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              {h.butcheryTitle1}
              <br />
              {h.butcheryTitle2}
            </h2>
          </div>
          <div data-steps className="grid grid-cols-3 gap-[clamp(22px,2.6vw,40px)] text-start max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-y-[clamp(24px,7vw,40px)]">
            {h.steps.map((s, i) => (
              <div key={s.num} data-reveal data-reveal-delay={i * 90} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-bone-2">
                  <Photo src={s.img} alt={s.title} sizes="(max-width:760px) 100vw, 33vw" />
                </div>
                <div className="mt-5 flex items-baseline gap-3.5 border-t-[1.5px] border-ink pt-4">
                  <span className="font-numeral text-[28px] leading-none text-brass-deep-2">{s.num}</span>
                  <h3 className="m-0 text-[19px] font-extrabold">{s.title}</h3>
                </div>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-bone-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No. 03 VOICES */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap">
          <Eyebrow className="mb-[clamp(30px,4vw,52px)]">{h.voicesEyebrow}</Eyebrow>
          <div className="grid grid-cols-3 gap-[clamp(28px,3.4vw,56px)] max-xl:grid-cols-2 max-md:grid-cols-1">
            {h.testimonials.map((q, i) => (
              <figure key={q.name} data-reveal data-reveal-delay={i * 90} className="m-0 flex flex-col gap-5 border-t border-bone/20 pt-6">
                <span aria-hidden className="font-numeral text-[54px] leading-[.6] text-brass">
                  {locale === "ar" ? "”" : "“"}
                </span>
                <blockquote className="m-0 text-[clamp(19px,1.6vw,23px)] leading-[1.45] font-light text-bone">{q.text}</blockquote>
                <figcaption className="font-mono text-[11.5px] tracking-[.12em] text-dark-muted uppercase">
                  {q.name} · {q.where}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER CARD */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(72px,9vw,128px)] mp:px-3.5">
        <div data-cta-card className="lm-wrap grid grid-cols-[1.1fr_.9fr] items-center gap-[clamp(36px,5vw,80px)] border border-brass/45 bg-charcoal-2 p-[clamp(36px,5vw,72px)] max-lg:grid-cols-1 mp:px-[22px] mp:text-center">
          <div>
            <Eyebrow className="mb-4">{h.orderEyebrow}</Eyebrow>
            <h2 data-reveal className="m-0 font-display text-[clamp(40px,5.4vw,84px)] leading-[.9] font-black tracking-[-0.04em] text-bone uppercase">
              {h.orderTitle1}
              <br />
              {h.orderTitle2}
            </h2>
            <p data-reveal className="mt-[22px] max-w-[440px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-dark-body mp:mx-auto">
              {h.orderIntro}
            </p>
            <div data-cta-actions className="mt-[30px] flex flex-wrap gap-3">
              <ButtonLink href={wa(t.wa.default)} variant="whatsapp" className="tracking-[.06em]">
                {t.common.whatsapp}
              </ButtonLink>
              <ButtonLink href={telHref} variant="outline" className="font-bold tracking-[.06em]">
                <span data-full dir="ltr">
                  {site.phoneDisplay}
                </span>
                <span data-short>{t.common.callUs}</span>
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <Eyebrow className="mb-3">{h.letterEyebrow}</Eyebrow>
            <p className="mb-[18px] max-w-[380px] text-[15.5px] leading-[1.6] text-dark-body mp:mx-auto">{h.letterIntro}</p>
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  );
}
