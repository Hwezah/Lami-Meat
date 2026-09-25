import { Eyebrow } from "@/components/Eyebrow";
import Link from "@/components/LocaleLink";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { ProductList } from "@/components/range/ProductList";
import { Ticker } from "@/components/Ticker";
import { cta } from "@/components/ui";
import { getPageDict, pageMetadata, type LocaleParams } from "@/lib/i18n/server";
import { wa } from "@/lib/whatsapp";

export const generateMetadata = (props: LocaleParams) => pageMetadata(props, "range", "/range");

export default async function RangePage(props: LocaleParams) {
  const { t } = await getPageDict(props);
  const r = t.range;
  return (
    <>
      <PageHeader eyebrow={r.eyebrow} line1={r.title1} line2={r.title2}>
        <Ticker lines={t.tickers.range} />
      </PageHeader>

      <ProductList />

      {/* No. 01 Kitchen quantities */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap grid grid-cols-2 items-center gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <div className="flex flex-col items-start mp:items-center">
            <Eyebrow className="mb-4">{r.kitchenEyebrow}</Eyebrow>
            <h2 data-reveal className="lm-h2 text-bone">
              {r.kitchenTitle1}
              <br />
              {r.kitchenTitle2}
            </h2>
            <p data-reveal className="mt-[22px] max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-dark-body">
              {r.kitchenBody}
            </p>
            <div data-cta-actions data-reveal className="mt-[30px] flex flex-wrap gap-3">
              <Link href="/contact#wholesale" className={cta.brass}>
                <span data-full>{r.wholesaleEnquiry}</span>
                <span data-short>{r.wholesaleShort}</span>
              </Link>
              <a href={wa(t.wa.default)} target="_blank" rel="noopener" className={cta.outline}>
                {t.common.whatsapp}
              </a>
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/3]">
            <Photo src="/images/minced-tray.jpg" alt={r.kitchenAlt} sizes="(max-width:920px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* No. 02 Care steps */}
      <section className="lm-section bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,60px)] max-w-[720px]">
            <Eyebrow tone="bone" className="mb-4">
              {r.careEyebrow}
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              {r.careTitle1}
              <br />
              {r.careTitle2}
            </h2>
          </div>
          <div data-steps className="grid grid-cols-3 gap-[clamp(24px,3vw,44px)] text-start max-lg:grid-cols-2 max-sm:grid-cols-1">
            {r.careSteps.map((s, i) => (
              <div key={s.num} data-reveal data-reveal-delay={i * 90} className="border-t-[1.5px] border-ink pt-[18px]">
                <div className="font-mono text-[11px] tracking-[.14em] text-brass-deep uppercase">{s.num}</div>
                <h3 className="mt-3 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-bone-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
