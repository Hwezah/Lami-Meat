"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { Ticker } from "@/components/Ticker";
import { tickers } from "@/data/tickers";
import { Photo } from "@/components/Photo";
import { QtyStepper } from "@/components/QtyStepper";
import { cta, ctaSm, field, fieldLabel } from "@/components/ui";
import { countOf, linesOf, useCart } from "@/lib/cart";
import { ugx } from "@/lib/format";
import { productByName, products } from "@/lib/products";
import { readJSON, writeJSON } from "@/lib/storage";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { useHydrated } from "@/lib/use-hydrated";
import { wa } from "@/lib/whatsapp";

type Draft = { name?: string; phone?: string; area?: string; day?: string; items?: string };

export function CartView() {
  const hydrated = useHydrated();
  const { box, setQty, remove, clear } = useCart();
  const addToCart = useAddToCart();
  const lines = hydrated ? linesOf(box) : [];
  const n = hydrated ? countOf(box) : 0;
  const subtotal = lines.reduce((a, l) => a + l.total, 0);
  const [area, setArea] = useState("");

  useEffect(() => setArea(readJSON<Draft>("local", "lm-order-draft")?.area ?? ""), []);
  const onArea = (v: string) => {
    setArea(v);
    writeJSON("local", "lm-order-draft", { ...(readJSON<Draft>("local", "lm-order-draft") ?? {}), area: v });
  };

  const checkout = wa(
    "Hi LAMI MEAT! I'd like to order:\n" +
      lines.map((l) => `- ${l.qty} × ${l.name} (${l.size}) — ${ugx(l.total)}`).join("\n") +
      `\n\nSubtotal: ${ugx(subtotal)}\nDeliver to: ${area || "—"}`,
  );

  return (
    <>
      <PageHeader eyebrow="Your cart" line1="The" line2="order.">
        <Ticker
          lines={[
            n ? `${n} ${n === 1 ? "pack" : "packs"} ready to send. Check sizes and quantities, then send the order on WhatsApp — we confirm the total and delivery time.` : tickers.cart[0],
            ...tickers.cart.slice(1),
          ]}
        />
      </PageHeader>

      <section className="lm-section bg-bone !pt-[clamp(40px,5vw,64px)] text-ink">
        <div className="lm-wrap grid grid-cols-[1.45fr_.85fr] items-start gap-[clamp(32px,4vw,64px)] max-lg:grid-cols-1">
          <div>
            <div className="flex justify-between border-b-[1.5px] border-ink pb-3.5 font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase">
              <span>Item</span>
              <span>Total</span>
            </div>

            {lines.length === 0 && (
              <div className="flex flex-col items-start py-[clamp(40px,5vw,64px)] mp:items-center mp:text-center">
                <h2 className="font-display text-[clamp(30px,3.4vw,50px)] leading-[.92] font-black tracking-[-0.04em] uppercase">Nothing here yet.</h2>
                <p className="mt-3.5 max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body">Pick a few packs from the range — they’ll wait here until you’re ready to send the order.</p>
                <div data-cta-actions className="mt-[26px] flex">
                  <Link href="/range" className={cta.ink}>
                    <span data-full>See the range</span>
                    <span data-short>See range</span> →
                  </Link>
                </div>
              </div>
            )}

            {lines.map((l) => (
              <div
                key={l.key}
                className="grid grid-cols-[96px_1fr_auto_120px_46px] items-center gap-x-[clamp(12px,2vw,24px)] gap-y-3 border-b border-ink/18 py-5 max-[1180px]:grid-cols-[72px_1fr_auto]"
              >
                <div className="relative aspect-square overflow-hidden bg-bone-2 max-[1180px]:row-span-2">{l.img && <Photo src={l.img} alt={l.name} sizes="96px" />}</div>
                <div className="min-w-0 max-[1180px]:col-start-2 max-[1180px]:row-start-1">
                  <div className="font-mono text-[10.5px] tracking-[.14em] text-brass-deep uppercase">{productByName(l.name)?.kind}</div>
                  <h3 className="mt-[5px] text-[clamp(17px,1.6vw,21px)] leading-[1.15] font-extrabold tracking-[-0.01em]">{l.name}</h3>
                  <div className="mt-1 font-mono text-[11.5px] text-bone-muted">
                    {l.size} · {ugx(l.unit)}
                  </div>
                </div>
                <div className="max-[1180px]:col-start-2 max-[1180px]:row-start-2">
                  <QtyStepper value={l.qty} min={0} onChange={(q) => setQty(l.key, q)} label={`Quantity of ${l.name}`} />
                </div>
                <div className="text-right text-[17px] font-extrabold max-[1180px]:col-start-3 max-[1180px]:row-start-2">{ugx(l.total)}</div>
                <button type="button" onClick={() => remove(l.key)} aria-label={`Remove ${l.name}`} className="flex size-[46px] items-center justify-center text-bone-muted hover:text-ink max-[1180px]:col-start-3 max-[1180px]:row-start-1 max-[1180px]:justify-self-end">
                  <CloseIcon size={22} />
                </button>
              </div>
            ))}

            {lines.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-between gap-3">
                <Link href="/range" className="border-b border-ink pb-[3px] text-[13.5px] font-bold tracking-[.08em] whitespace-nowrap uppercase">
                  ← Keep shopping
                </Link>
                <button type="button" onClick={clear} className="font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase hover:text-ink">
                  Clear cart
                </button>
              </div>
            )}
          </div>

          <aside data-reveal className="sticky top-24 bg-charcoal p-[clamp(26px,3vw,40px)] text-left text-bone max-lg:static">
            <div className="lm-eyebrow text-brass">Summary</div>
            <div className="mt-5 border-t border-bone/16 text-[15px] text-dark-body">
              <div className="flex justify-between border-b border-bone/12 py-3.5">
                <span>Packs</span>
                <span>{n}</span>
              </div>
              <div className="flex justify-between gap-3 border-b border-bone/12 py-3.5">
                <span>Delivery</span>
                <span className="text-right">Confirmed on WhatsApp</span>
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase">Subtotal</span>
              <span className="text-[clamp(26px,2.4vw,34px)] font-black tracking-[-0.02em]">{ugx(subtotal)}</span>
            </div>
            <label className="mt-6 block">
              <span className={fieldLabel()}>Deliver to</span>
              <input value={area} onChange={(e) => onArea(e.target.value)} placeholder="Area or address" className={field()} />
            </label>
            {lines.length > 0 ? (
              <a href={checkout} target="_blank" rel="noopener" className={`${cta.whatsapp} mt-6 w-full`}>
                <WhatsAppIcon /> Send order
              </a>
            ) : (
              <div className="mt-6 flex min-h-12 w-full items-center justify-center rounded-lm border border-bone/20 px-[26px] py-[15px] text-sm font-extrabold tracking-[.08em] text-dark-faint uppercase">Cart is empty</div>
            )}
            <p className="mt-4 text-[13.5px] leading-[1.55] text-dark-muted">Prices are per pack. We confirm your total and delivery time before anything is charged.</p>
          </aside>
        </div>
      </section>

      <section className="lm-section">
        <div className="lm-wrap">
          <div data-reveal className="lm-eyebrow mb-[clamp(20px,3vw,32px)] text-brass mp:text-center">
            Add to the order
          </div>
          <div className="border-t border-bone/16">
            {products.map((p, i) => (
              <div key={p.id} className="grid grid-cols-[52px_72px_1fr_auto] items-center gap-[clamp(14px,2vw,28px)] border-b border-bone/12 py-4 max-xs:grid-cols-[56px_1fr_auto]">
                <span className="font-numeral text-[22px] text-brass max-xs:hidden">0{i + 1}</span>
                <div className="relative aspect-square overflow-hidden bg-charcoal-2">
                  <Photo src={p.img} alt={p.name} sizes="72px" />
                </div>
                <div className="min-w-0">
                  <div className="text-[clamp(17px,1.6vw,21px)] font-extrabold">{p.name}</div>
                  <div className="mt-[3px] font-mono text-[11.5px] text-dark-muted">500g · {ugx(p.p500)}</div>
                </div>
                <button type="button" onClick={() => addToCart(p.name, "500g", 1)} className={`${cta.outline} ${ctaSm}`}>
                  + Add 500g
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
