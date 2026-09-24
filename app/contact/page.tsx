import type { Metadata } from "next";
import { OrderForm } from "@/components/contact/OrderForm";
import { WholesaleForm } from "@/components/contact/WholesaleForm";
import { Eyebrow } from "@/components/Eyebrow";
import { FoldList } from "@/components/FoldList";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Ticker } from "@/components/Ticker";
import { tickers } from "@/data/tickers";
import { faq } from "@/data/faq";
import { mailHref, site, telHref } from "@/lib/config";
import { waDefault } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Order",
  description: "Order LAMI MEAT on WhatsApp, call, or send a wholesale enquiry. Cold delivery across Kampala.",
};

const value = "text-[clamp(17px,1.5vw,21px)] font-semibold text-bone [overflow-wrap:anywhere]";
const link = `${value} hover:text-brass`;

export default function ContactPage() {
  const rows: [string, React.ReactNode][] = [
    ["WhatsApp", <a key="w" href={waDefault()} target="_blank" rel="noopener" className={link}>{site.phoneDisplay}</a>],
    ["Call", <a key="c" href={telHref} className={link}>{site.phoneDisplay}</a>],
    ["Email", <a key="e" href={mailHref} className={link}>{site.email}</a>],
    ["Hours", <span key="h" className={value}>{site.hours}</span>],
    ["Kitchen", <span key="k" className={value}>{site.location}</span>],
    ["Delivery", <span key="d" className={value}>Across Kampala, kept cold</span>],
  ];

  return (
    <>
      <PageHeader eyebrow="Contact & order" line1="Send us" line2="a message.">
        <Ticker lines={tickers.contact} />
      </PageHeader>

      {/* No. 01 Reach us + order form */}
      <section className="lm-section !pt-0">
        <div className="lm-stick lm-wrap grid grid-cols-[.9fr_1.1fr] items-start gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <div>
            <Eyebrow className="mb-2.5">No. 01 — Reach us</Eyebrow>
            <div className="border-t border-bone/16">
              {rows.map(([label, v]) => (
                <div key={label} data-reveal className="grid grid-cols-[120px_1fr] items-baseline gap-4 border-b border-bone/14 py-[18px] max-sm:grid-cols-1 max-sm:gap-1 mp:text-center">
                  <span className="font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase">{label}</span>
                  {v}
                </div>
              ))}
            </div>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* No. 02 Wholesale */}
      <section id="wholesale" className="lm-section scroll-mt-20 bg-bone text-ink mp:text-center">
        <div className="lm-stick lm-wrap grid grid-cols-2 items-start gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <div className="flex flex-col items-start mp:items-center">
            <Eyebrow tone="bone" className="mb-4">
              No. 02 — Wholesale
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              For kitchens
              <br />
              &amp; counters.
            </h2>
            <p data-reveal className="mt-[22px] max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body">
              Restaurants, hotels, schools, caterers and shops. Regular deliveries, consistent packs and one person to call.
            </p>
            <div data-reveal className="relative mt-[34px] aspect-[4/3] w-full">
              <Photo src="/images/team-line-3.jpg" alt="Packing a wholesale order" sizes="(max-width:920px) 100vw, 50vw" />
            </div>
          </div>
          <WholesaleForm />
        </div>
      </section>

      {/* No. 03 FAQ */}
      <section className="lm-section mp:text-center">
        <div className="lm-stick lm-wrap grid grid-cols-[.8fr_1.2fr] items-start gap-x-[clamp(36px,5vw,90px)] gap-y-6 max-lg:grid-cols-1">
          <div>
            <Eyebrow className="mb-4">No. 03 — Good to know</Eyebrow>
            <h2 data-reveal className="lm-h2 text-bone">
              Questions.
            </h2>
          </div>
          <div className="border-t border-bone/16">
            <FoldList
              tone="dark"
              initial="q0"
              items={faq.map((q) => ({
                id: q.id,
                num: q.num,
                title: q.q,
                meta: q.meta,
                body: <p className="max-w-[560px] text-base leading-[1.7] text-dark-body">{q.a}</p>,
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
