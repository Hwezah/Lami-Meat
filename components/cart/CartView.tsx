"use client";

import { useEffect, useState } from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/Icons";
import Link from "@/components/LocaleLink";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { QtyStepper } from "@/components/QtyStepper";
import { Ticker } from "@/components/Ticker";
import { cta, ctaSm, field, fieldLabel } from "@/components/ui";
import { countOf, linesOf, useCart } from "@/lib/cart";
import { ugx } from "@/lib/format";
import { useT } from "@/lib/i18n/provider";
import { productByName, products } from "@/lib/products";
import { readJSON, writeJSON } from "@/lib/storage";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { useHydrated } from "@/lib/use-hydrated";
import { wa } from "@/lib/whatsapp";

type Draft = { name?: string; phone?: string; area?: string; day?: string; items?: string };

export function CartView() {
  const t = useT();
  const c = t.cart;
  const hydrated = useHydrated();
  const { box, setQty, remove, clear } = useCart();
  const addToCart = useAddToCart();
  const lines = hydrated ? linesOf(box) : [];
  const n = hydrated ? countOf(box) : 0;
  const subtotal = lines.reduce((a, l) => a + l.total, 0);
  const [area, setArea] = useState("");
  const label = (englishName: string) => {
    const p = productByName(englishName);
    return p ? t.products[p.id].name : englishName;
  };

  useEffect(() => setArea(readJSON<Draft>("local", "lm-order-draft")?.area ?? ""), []);
  const onArea = (v: string) => {
    setArea(v);
    writeJSON("local", "lm-order-draft", { ...(readJSON<Draft>("local", "lm-order-draft") ?? {}), area: v });
  };

  // Item names stay in English in the message so the team can fulfil.
  const checkout = wa(t.wa.cart(lines.map((l) => `- ${l.qty} × ${l.name} (${l.size}) — ${ugx(l.total)}`), ugx(subtotal), area));

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} line1={c.title1} line2={c.title2}>
        <Ticker lines={[n ? c.ready(n) : t.tickers.cart[0], ...t.tickers.cart.slice(1)]} />
      </PageHeader>

      <section className="lm-section bg-bone !pt-[clamp(40px,5vw,64px)] text-ink">
        <div className="lm-stick lm-wrap grid grid-cols-[1.45fr_.85fr] items-start gap-[clamp(32px,4vw,64px)] max-lg:grid-cols-1">
          <div>
            <div className="flex justify-between border-b-[1.5px] border-ink pb-3.5 font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase">
              <span>{c.item}</span>
              <span>{c.total}</span>
            </div>

            {lines.length === 0 && (
              <div className="flex flex-col items-start py-[clamp(40px,5vw,64px)] mp:items-center mp:text-center">
                <h2 className="font-display text-[clamp(30px,3.4vw,50px)] leading-[.92] font-black tracking-[-0.04em] uppercase">{c.emptyTitle}</h2>
                <p className="mt-3.5 max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body">{c.emptyBody}</p>
                <div data-cta-actions className="mt-[26px] flex">
                  <Link href="/range" className={cta.ink}>
                    <span data-full>{t.common.seeRange}</span>
                    <span data-short>{t.common.seeRangeShort}</span> {t.common.arrow}
                  </Link>
                </div>
              </div>
            )}

            {lines.map((l) => (
              <div
                key={l.key}
                className="grid grid-cols-[96px_1fr_auto_120px_46px] items-center gap-x-[clamp(12px,2vw,24px)] gap-y-3 border-b border-ink/18 py-5 max-[1180px]:grid-cols-[72px_1fr_auto]"
              >
                <div className="relative aspect-square overflow-hidden bg-bone-2 max-[1180px]:row-span-2">{l.img && <Photo src={l.img} alt={label(l.name)} sizes="96px" />}</div>
                <div className="min-w-0 max-[1180px]:col-start-2 max-[1180px]:row-start-1">
                  <div className="font-mono text-[10.5px] tracking-[.14em] text-brass-deep uppercase">{t.common.kinds[productByName(l.name)?.kind ?? "Smoked"]}</div>
                  <h3 className="mt-[5px] text-[clamp(17px,1.6vw,21px)] leading-[1.15] font-extrabold tracking-[-0.01em]">{label(l.name)}</h3>
                  <div className="mt-1 font-mono text-[11.5px] text-bone-muted">
                    {t.common.sizes[l.size]} · {ugx(l.unit)}
                  </div>
                </div>
                <div className="max-[1180px]:col-start-2 max-[1180px]:row-start-2">
                  <QtyStepper value={l.qty} min={0} onChange={(q) => setQty(l.key, q)} label={c.qtyOf(label(l.name))} />
                </div>
                <div className="text-end text-[17px] font-extrabold max-[1180px]:col-start-3 max-[1180px]:row-start-2">{ugx(l.total)}</div>
                <button
                  type="button"
                  onClick={() => remove(l.key)}
                  aria-label={c.remove(label(l.name))}
                  className="flex size-[46px] items-center justify-center text-bone-muted hover:text-ink max-[1180px]:col-start-3 max-[1180px]:row-start-1 max-[1180px]:justify-self-end"
                >
                  <CloseIcon size={22} />
                </button>
              </div>
            ))}

            {lines.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-between gap-3">
                <Link href="/range" className="border-b border-ink pb-[3px] text-[13.5px] font-bold tracking-[.08em] whitespace-nowrap uppercase">
                  {c.keepShopping}
                </Link>
                <button type="button" onClick={clear} className="font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase hover:text-ink">
                  {c.clear}
                </button>
              </div>
            )}
          </div>

          <aside data-reveal className="bg-charcoal p-[clamp(26px,3vw,40px)] text-start text-bone">
            <div className="lm-eyebrow text-brass">{c.summary}</div>
            <div className="mt-5 border-t border-bone/16 text-[15px] text-dark-body">
              <div className="flex justify-between border-b border-bone/12 py-3.5">
                <span>{c.packs}</span>
                <span>{n}</span>
              </div>
              <div className="flex justify-between gap-3 border-b border-bone/12 py-3.5">
                <span>{c.delivery}</span>
                <span className="text-end">{c.deliveryValue}</span>
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase">{c.subtotal}</span>
              <span className="text-[clamp(26px,2.4vw,34px)] font-black tracking-[-0.02em]">{ugx(subtotal)}</span>
            </div>
            <label className="mt-6 block">
              <span className={fieldLabel()}>{c.deliverTo}</span>
              <input value={area} onChange={(e) => onArea(e.target.value)} placeholder={c.deliverPlaceholder} className={field()} />
            </label>
            {lines.length > 0 ? (
              <a href={checkout} target="_blank" rel="noopener" className={`${cta.whatsapp} mt-6 w-full`}>
                <WhatsAppIcon /> {c.send}
              </a>
            ) : (
              <div className="mt-6 flex min-h-12 w-full items-center justify-center rounded-lm border border-bone/20 px-[26px] py-[15px] text-sm font-extrabold tracking-[.08em] text-dark-faint uppercase">{c.empty}</div>
            )}
            <p className="mt-4 text-[13.5px] leading-[1.55] text-dark-muted">{c.note}</p>
          </aside>
        </div>
      </section>

      <section className="lm-section">
        <div className="lm-wrap">
          <div data-reveal className="lm-eyebrow mb-[clamp(20px,3vw,32px)] text-brass mp:text-center">
            {c.addMore}
          </div>
          <div className="border-t border-bone/16">
            {products.map((p, i) => (
              <div key={p.id} className="grid grid-cols-[52px_72px_1fr_auto] items-center gap-[clamp(14px,2vw,28px)] border-b border-bone/12 py-4 max-xs:grid-cols-[56px_1fr_auto]">
                <span className="font-numeral text-[22px] text-brass max-xs:hidden">0{i + 1}</span>
                <div className="relative aspect-square overflow-hidden bg-charcoal-2">
                  <Photo src={p.img} alt={t.products[p.id].name} sizes="72px" />
                </div>
                <div className="min-w-0">
                  <div className="text-[clamp(17px,1.6vw,21px)] font-extrabold">{t.products[p.id].name}</div>
                  <div className="mt-[3px] font-mono text-[11.5px] text-dark-muted">
                    {t.common.sizes["500g"]} · {ugx(p.p500)}
                  </div>
                </div>
                <button type="button" onClick={() => addToCart(p.name, "500g", 1)} className={`${cta.outline} ${ctaSm}`}>
                  {c.add500}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
