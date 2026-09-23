import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { ProductList } from "@/components/range/ProductList";
import { Ticker } from "@/components/Ticker";
import { tickers } from "@/data/tickers";
import { cta } from "@/components/ui";
import { careSteps } from "@/data/care";
import { waDefault } from "@/lib/whatsapp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Range",
  description: "Smoked beef sausages, hot dogs and fresh minced beef from LAMI MEAT, Kampala. 500g and 1kg packs.",
};

export default function RangePage() {
  return (
    <>
      <PageHeader eyebrow="The range · Four cuts" line1="The" line2="Range.">
        <Ticker lines={tickers.range} />
      </PageHeader>

      <ProductList />

      {/* No. 01 Kitchen quantities */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap grid grid-cols-2 items-center gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <div className="flex flex-col items-start mp:items-center">
            <Eyebrow className="mb-4">No. 01 — Kitchen quantities</Eyebrow>
            <h2 data-reveal className="lm-h2 text-bone">
              Cooking for
              <br />a crowd?
            </h2>
            <p data-reveal className="mt-[22px] max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-dark-body">
              Restaurants, hotels, schools and events order in larger lots. Tell us the volume and the day — we’ll quote and schedule a cold delivery.
            </p>
            <div data-cta-actions data-reveal className="mt-[30px] flex flex-wrap gap-3">
              <Link href="/contact#wholesale" className={cta.brass}>
                <span data-full>Wholesale enquiry →</span>
                <span data-short>Wholesale →</span>
              </Link>
              <a href={waDefault()} target="_blank" rel="noopener" className={cta.outline}>
                WhatsApp
              </a>
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/3]">
            <Photo src="/images/minced-tray.jpg" alt="Trays of fresh minced beef" sizes="(max-width:920px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* No. 02 Care steps */}
      <section className="lm-section bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,60px)] max-w-[720px]">
            <Eyebrow tone="bone" className="mb-4">
              No. 02 — Keeping it right
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              Store. Thaw.
              <br />
              Cook.
            </h2>
          </div>
          <div data-steps className="grid grid-cols-3 gap-[clamp(24px,3vw,44px)] text-left max-lg:grid-cols-2 max-sm:grid-cols-1">
            {careSteps.map((s, i) => (
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
