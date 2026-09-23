"use client";

import { useState } from "react";
import { FramedPhoto } from "@/components/FramedPhoto";
import { WhatsAppIcon } from "@/components/Icons";
import { QtyStepper } from "@/components/QtyStepper";
import { chip, cta } from "@/components/ui";
import { ugx } from "@/lib/format";
import { priceOf, products, SIZES, type Product, type Size } from "@/lib/products";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { wa } from "@/lib/whatsapp";

const FILTERS = ["All", "Smoked", "Fresh"] as const;

function ProductArticle({ p }: { p: Product }) {
  const [size, setSize] = useState<Size>("500g");
  const [qty, setQty] = useState(1);
  const addToCart = useAddToCart();
  const total = priceOf(p, size) * qty;

  return (
    <article id={p.id} data-reveal className="grid scroll-mt-[90px] grid-cols-[.95fr_1.05fr] items-center gap-[clamp(36px,5vw,84px)] border-b border-ink/18 py-[clamp(40px,5vw,72px)] max-lg:grid-cols-1">
      <FramedPhoto src={p.img} alt={p.name} aspect="aspect-[5/4]" offset={16} line="border-brass-deep-2" />
      <div className="flex min-w-0 flex-col items-start mp:items-center">
        <div className="flex items-baseline gap-3.5">
          <span className="font-numeral text-[30px] leading-none text-brass-deep-2">{p.num}</span>
          <span className="font-mono text-[11px] tracking-[.14em] text-brass-deep uppercase">{p.kind}</span>
        </div>
        <h2 className="mt-3.5 font-display text-[clamp(34px,3.8vw,58px)] leading-[.92] font-black tracking-[-0.04em] text-ink uppercase">{p.name}</h2>
        <p className="mt-4 max-w-[480px] text-base leading-[1.66] text-bone-body">{p.desc}</p>
        <dl className="mt-[26px] grid w-full grid-cols-2 gap-x-5 border-t border-ink/18 text-left">
          {p.specs.map(([k, v]) => (
            <div key={k} className="border-b border-ink/18 py-[13px]">
              <dt className="font-mono text-[10.5px] tracking-[.14em] text-brass-deep uppercase">{k}</dt>
              <dd className="m-0 mt-[5px] text-[15px] font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        {/* Purchase: size + qty → one total → two actions */}
        <div className="mt-7 w-full max-w-[480px] text-left mp:mx-auto mp:w-[80vw]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lm border border-ink/30 p-[1px]" role="group" aria-label="Pack size">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-h-11 min-w-[64px] rounded-[1px] px-4 font-display text-[13px] font-bold tracking-[.06em] uppercase transition-colors ${size === s ? "bg-ink text-bone" : "text-ink hover:bg-ink/6"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="text-ink">
              <QtyStepper value={qty} onChange={setQty} />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-ink/18 pt-4">
            <span className="font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase">
              {qty} × {size}
            </span>
            <span className="text-[clamp(22px,2vw,26px)] font-extrabold tracking-[-0.01em] text-ink" aria-live="polite">
              {ugx(total)}
            </span>
          </div>

          <div data-cta-actions className="mt-4 flex gap-2.5 [&>*]:flex-1">
            <button type="button" onClick={() => addToCart(p.name, size, qty)} className={cta.ink}>
              Add to cart
            </button>
            <a
              href={wa(`Hi LAMI MEAT! I'd like to order ${qty} × ${p.name} (${size}, ${ugx(total)}).`)}
              target="_blank"
              rel="noopener"
              className={`${cta.outlineInk} !border-whatsapp !text-whatsapp-hover hover:!bg-whatsapp hover:!text-white`}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = products.filter((p) => filter === "All" || p.kind === filter);
  return (
    <section className="lm-section bg-bone !pt-[clamp(40px,5vw,64px)] text-ink mp:text-center">
      <div className="lm-wrap">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-[1.5px] border-ink pb-[22px] mp:justify-center">
          <div className="flex flex-wrap gap-2 mp:justify-center" role="group" aria-label="Filter products">
            {FILTERS.map((f) => (
              <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={chip(filter === f)}>
                {f}
              </button>
            ))}
          </div>
          <span className="font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase">
            0{list.length} product{list.length === 1 ? "" : "s"}
          </span>
        </div>
        {list.map((p) => (
          <ProductArticle key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
