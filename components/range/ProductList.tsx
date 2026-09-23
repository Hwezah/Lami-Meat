"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { QtyStepper } from "@/components/QtyStepper";
import { ugx } from "@/lib/format";
import { priceOf, products, SIZES, type Product, type Size } from "@/lib/products";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { wa } from "@/lib/whatsapp";

const FILTERS = ["All", "Smoked", "Fresh"] as const;
const chip = (on: boolean) => `min-h-11 rounded-lm border px-4 text-[13.5px] font-semibold ${on ? "border-ink bg-ink text-bone" : "border-bone/30 text-bone"}`;

function ProductArticle({ p }: { p: Product }) {
  const [size, setSize] = useState<Size>("500g");
  const [qty, setQty] = useState(1);
  const addToCart = useAddToCart();
  const total = priceOf(p, size) * qty;

  return (
    <article id={p.id} data-reveal className="grid scroll-mt-24 grid-cols-2 items-center gap-[clamp(36px,5vw,90px)] border-b border-bone/16 py-[clamp(48px,6vw,88px)] text-left max-lg:grid-cols-1">
      <div className="relative">
        <div aria-hidden className="absolute inset-[16px_-16px_-16px_16px] border border-brass" />
        <div className="relative aspect-[4/3] overflow-hidden bg-bone-2">
          <Photo src={p.img} alt={p.name} sizes="(max-width:920px) 100vw, 50vw" />
        </div>
      </div>
      <div>
        <div className="lm-eyebrow flex gap-3 text-brass">
          <span className="font-numeral text-2xl leading-none">{p.num}</span>
          <span>{p.kind}</span>
        </div>
        <h2 className="lm-h2 mt-4 text-bone">{p.name}</h2>
        <p className="mt-5 max-w-[520px] text-[16px] leading-[1.66] text-dark-body">{p.desc}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 border-t border-bone/16 max-sm:grid-cols-1">
          {p.specs.map(([k, v]) => (
            <div key={k} className="border-b border-bone/12 py-3">
              <dt className="font-mono text-[10.5px] tracking-[.14em] text-dark-muted uppercase">{k}</dt>
              <dd className="m-0 mt-1 font-semibold text-bone">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {SIZES.map((s) => (
            <button key={s} onClick={() => setSize(s)} className={`${chip(size === s)} ${size === s ? "!bg-bone !text-ink" : ""}`} aria-pressed={size === s}>
              {s} · {ugx(priceOf(p, s))}
            </button>
          ))}
          <span className="text-bone">
            <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <button onClick={() => addToCart(p.name, size, qty)} className="inline-flex min-h-[52px] items-center rounded-lm bg-brass px-6 text-sm font-extrabold tracking-[.08em] text-charcoal uppercase hover:bg-brass-hover">
            Add — {ugx(total)}
          </button>
          <a
            href={wa(`Hi LAMI MEAT! I'd like to order ${qty} × ${p.name} (${size}, ${ugx(total)}).`)}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-lm bg-whatsapp px-6 text-sm font-extrabold tracking-[.06em] text-white uppercase hover:bg-whatsapp-hover"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProductList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = products.filter((p) => filter === "All" || p.kind === filter);
  return (
    <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(72px,9vw,128px)] max-xs:px-6 mp:px-3.5">
      <div className="lm-wrap">
        <div className="flex flex-wrap items-center justify-between gap-4 mp:justify-center">
          <div className="flex gap-2.5" role="group" aria-label="Filter products">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`${chip(filter === f)} ${filter === f ? "!border-bone !bg-bone !text-ink" : ""}`} aria-pressed={filter === f}>
                {f}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs tracking-[.14em] text-dark-muted uppercase">
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
