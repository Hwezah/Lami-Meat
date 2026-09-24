import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { FoldList } from "@/components/FoldList";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Ticker } from "@/components/Ticker";
import { tickers } from "@/data/tickers";
import { cta, ctaSm } from "@/components/ui";
import { perks, roles } from "@/data/roles";
import { site } from "@/lib/config";
import { wa } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work at LAMI MEAT, a Kampala smokehouse and butchery. Open roles and how to apply.",
};

const photos = ["/images/team-2.jpg", "/images/team-8.jpg", "/images/team-line-3.jpg"];

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Careers" line1="Join the" line2="counter.">
        <Ticker lines={tickers.careers} />
      </PageHeader>

      <section className="px-[clamp(18px,4vw,46px)] max-xs:px-6 mp:px-3.5">
        <div className="lm-wrap grid grid-cols-3 gap-[clamp(10px,1.4vw,18px)] max-md:grid-cols-1">
          {photos.map((src, i) => (
            <div key={src} data-reveal data-reveal-delay={i * 90} className="relative aspect-[4/5]">
              <Photo src={src} alt="LAMI team at work" sizes="(max-width:760px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* No. 01 Why */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,60px)] max-w-[720px]">
            <Eyebrow className="mb-4">No. 01 — Working here</Eyebrow>
            <h2 data-reveal className="lm-h2 text-bone">
              What you
              <br />
              can expect.
            </h2>
          </div>
          <div data-steps className="grid grid-cols-4 gap-[clamp(24px,3vw,44px)] text-left max-xl:grid-cols-2 max-sm:grid-cols-1">
            {perks.map((p, i) => (
              <div key={p.num} data-reveal data-reveal-delay={i * 80} className="border-t-[1.5px] border-brass pt-[18px]">
                <div className="font-numeral text-[28px] leading-none text-brass">{p.num}</div>
                <h3 className="mt-3.5 text-[19px] font-extrabold text-bone">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-dark-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No. 02 Roles */}
      <section id="roles" className="lm-section scroll-mt-20 bg-bone text-ink mp:text-center">
        <div className="lm-stick lm-wrap grid grid-cols-[.8fr_1.2fr] items-start gap-x-[clamp(36px,5vw,90px)] gap-y-6 max-lg:grid-cols-1">
          <div>
            <Eyebrow tone="bone" className="mb-4">
              No. 02 — Open roles
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              Open
              <br />
              roles.
            </h2>
            <p data-reveal className="mt-5 max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body mp:mx-auto">
              Don’t see your role? Send your CV to {site.email} and tell us what you’d bring.
            </p>
          </div>
          <div className="border-t-[1.5px] border-ink">
            <FoldList
              initial="j0"
              items={roles.map((r) => ({
                id: r.id,
                num: r.num,
                title: r.title,
                meta: r.meta,
                body: (
                  <>
                    <p className="max-w-[560px] text-base leading-[1.7] text-bone-body">{r.summary}</p>
                    <div className="mt-[22px] mb-1.5 font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase">What we look for</div>
                    <ul className="m-0 max-w-[560px] list-none p-0">
                      {r.lookFor.map((l) => (
                        <li key={l} className="border-b border-ink/14 py-[9px] text-[15.5px]">
                          {l}
                        </li>
                      ))}
                    </ul>
                    <div data-cta-actions className="mt-6 flex flex-wrap gap-2.5">
                      <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Application — ${r.title}`)}`} className={`${cta.ink} ${ctaSm}`}>
                        <span data-full>Apply by email</span>
                        <span data-short>Email us</span>
                      </a>
                      <a href={wa(`Hi LAMI MEAT! I'm interested in the ${r.title} role.`)} target="_blank" rel="noopener" className={`${cta.outlineInk} ${ctaSm}`}>
                        <span data-full>Ask on WhatsApp</span>
                        <span data-short>WhatsApp</span>
                      </a>
                    </div>
                  </>
                ),
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
