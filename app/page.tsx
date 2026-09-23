import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Newsletter } from "@/components/home/Newsletter";
import { Photo } from "@/components/Photo";
import { RangeRow } from "@/components/RangeRow";
import { RotatingWord } from "@/components/RotatingWord";
import { homeRangeDesc, ledger, steps, testimonials } from "@/data/home";
import { site, telHref } from "@/lib/config";
import { products } from "@/lib/products";
import { waDefault } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      {/* MASTHEAD */}
      <header className="pb-[clamp(56px,6vw,84px)] mp:text-center">
        <div className="relative flex min-h-[min(88vh,880px)] items-center overflow-hidden border-b border-brass/35 bg-hero px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,120px)] max-md:min-h-0 max-md:items-end max-md:pt-[clamp(250px,66vw,440px)] max-md:pb-[clamp(44px,10vw,64px)] mp:px-3.5">
          <div className="absolute top-0 right-0 h-full w-[62%] max-md:h-[clamp(300px,82vw,520px)] max-md:w-full">
            <Photo src="/images/smoked-rack.jpg" alt="Beef sausages hanging in the LAMI smokehouse" priority sizes="(max-width:760px) 100vw, 62vw" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,#0E1316_0%,#0E1316_38%,rgba(14,19,22,0.82)_48%,rgba(14,19,22,0)_70%),linear-gradient(0deg,rgba(14,19,22,0.9)_0%,rgba(14,19,22,0)_26%)] max-md:bg-[linear-gradient(180deg,rgba(14,19,22,0)_0%,rgba(14,19,22,0.1)_30%,#0E1316_clamp(300px,82vw,520px))]"
          />
          <div className="relative mx-auto w-full max-w-[1320px]">
            <div data-reveal className="flex max-w-[640px] flex-col items-start mp:items-center">
              <Eyebrow rule className="mb-[clamp(24px,3vw,40px)]">
                Est. in Kampala
              </Eyebrow>
              <h1 className="m-0 font-display text-[clamp(54px,8.4vw,136px)] leading-[.86] font-black tracking-[-0.045em] text-bone uppercase">
                Smoked.
                <br />
                Minced.
                <br />
                <RotatingWord />
              </h1>
              <p className="mt-[clamp(26px,3vw,40px)] max-w-[470px] text-[clamp(16px,1.3vw,18.5px)] leading-[1.66] text-dark-body">
                A Kampala smokehouse and butchery. Beef sausages smoked over real fire, and beef minced fresh every morning — sealed, kept cold, and brought to your door.
              </p>
              <div data-cta-actions className="mt-[34px] flex flex-wrap gap-3">
                <ButtonLink href="#range" className="px-7">
                  <span data-full>See the range</span>
                  <span data-short>See range</span> <span>→</span>
                </ButtonLink>
                <ButtonLink href="/contact#wholesale" variant="outline" className="font-bold">
                  Wholesale
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="absolute right-[clamp(18px,4vw,46px)] bottom-[22px] font-mono text-[11px] tracking-[.12em] text-dark-body uppercase max-md:hidden">Fig. 01 — The smokehouse</div>
        </div>
        <div className="mx-auto mt-[clamp(40px,5vw,64px)] grid w-[calc(100%-2*clamp(18px,4vw,46px))] max-w-[1320px] grid-cols-3 border-t border-bone/16 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {ledger.map((l, i) => (
            <div key={l.num} data-reveal data-reveal-delay={i * 90} className="pt-[26px] pr-[clamp(0px,2vw,28px)]">
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
                The range · Four cuts
              </Eyebrow>
              <h2 data-reveal className="m-0 font-display text-[clamp(40px,5.6vw,88px)] leading-[.9] font-black tracking-[-0.04em] uppercase">
                From the
                <br />
                counter
              </h2>
            </div>
            <p data-reveal className="max-w-[440px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body mp:mx-auto">
              Every pack is weighed, sealed and labelled with its batch and dates. Choose 500g or 1kg — and message us for larger kitchen quantities.
            </p>
          </div>
          <div className="border-t-[1.5px] border-ink">
            {products.map((p) => (
              <RangeRow key={p.id} p={p} desc={homeRangeDesc[p.id] ?? p.desc} />
            ))}
          </div>
          <div className="mt-7 flex justify-end mp:justify-center">
            <Link href="/range" className="border-b border-ink pb-1 text-sm font-bold tracking-[.08em] text-ink uppercase">
              Full product details →
            </Link>
          </div>
        </div>
      </section>

      {/* No. 01 SMOKEHOUSE */}
      <section className="lm-section mp:text-center">
        <div className="lm-wrap grid grid-cols-2 items-center gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <div data-reveal className="relative aspect-square">
            <Photo src="/images/hero-smokehouse.jpg" alt="Sausages smoking over an open fire" sizes="(max-width:920px) 100vw, 50vw" />
          </div>
          <div data-reveal data-reveal-delay="120">
            <Eyebrow className="mb-4">No. 01 — The smokehouse</Eyebrow>
            <h2 className="lm-h2 text-bone">
              Real fire.
              <br />
              No liquid smoke.
            </h2>
            <p data-quote className="mt-[clamp(26px,3vw,38px)] border-l border-brass pl-[22px] text-left font-display text-[clamp(20px,1.9vw,27px)] leading-[1.4] font-light text-bone italic">
              “We hang every batch over a wood fire and wait. The colour tells you when it’s ready — you can’t rush that.”
            </p>
            <p className="mt-6 max-w-[470px] text-base leading-[1.66] text-dark-body mp:mx-auto">
              Our sausages and hot dogs are fully smoked before they’re packed, so at home they only need warming through on the grill or pan.
            </p>
          </div>
        </div>
      </section>

      {/* No. 02 BUTCHERY */}
      <section className="lm-section bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(36px,5vw,64px)] max-w-[720px] mp:mx-auto">
            <Eyebrow tone="bone" className="mb-4">
              No. 02 — The butchery
            </Eyebrow>
            <h2 data-reveal className="lm-h2">
              Clean room.
              <br />
              Careful hands.
            </h2>
          </div>
          <div data-steps className="grid grid-cols-3 gap-[clamp(22px,2.6vw,40px)] text-left max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-y-[clamp(24px,7vw,40px)]">
            {steps.map((s, i) => (
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
          <Eyebrow className="mb-[clamp(30px,4vw,52px)]">No. 03 — At the table</Eyebrow>
          <div className="grid grid-cols-3 gap-[clamp(28px,3.4vw,56px)] max-xl:grid-cols-2 max-md:grid-cols-1">
            {testimonials.map((t, i) => (
              <figure key={t.name} data-reveal data-reveal-delay={i * 90} className="m-0 flex flex-col gap-5 border-t border-bone/20 pt-6">
                <span aria-hidden className="font-numeral text-[54px] leading-[.6] text-brass">
                  “
                </span>
                <blockquote className="m-0 text-[clamp(19px,1.6vw,23px)] leading-[1.45] font-light text-bone">{t.text}</blockquote>
                <figcaption className="font-mono text-[11.5px] tracking-[.12em] text-dark-muted uppercase">
                  {t.name} · {t.where}
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
            <Eyebrow className="mb-4">Order</Eyebrow>
            <h2 data-reveal className="m-0 font-display text-[clamp(40px,5.4vw,84px)] leading-[.9] font-black tracking-[-0.04em] text-bone uppercase">
              Send us
              <br />a message.
            </h2>
            <p data-reveal className="mt-[22px] max-w-[440px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-dark-body mp:mx-auto">
              Tell us what you need on WhatsApp. We confirm the order, price and delivery time — usually within the hour.
            </p>
            <div data-cta-actions className="mt-[30px] flex flex-wrap gap-3">
              <ButtonLink href={waDefault()} variant="whatsapp" className="tracking-[.06em]">
                WhatsApp
              </ButtonLink>
              <ButtonLink href={telHref} variant="outline" className="font-bold tracking-[.06em]">
                <span data-full>{site.phoneDisplay}</span>
                <span data-short>Call us</span>
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <Eyebrow className="mb-3">The LAMI letter</Eyebrow>
            <p className="mb-[18px] max-w-[380px] text-[15.5px] leading-[1.6] text-dark-body mp:mx-auto">New cuts, recipes and member offers. Once or twice a month.</p>
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  );
}
