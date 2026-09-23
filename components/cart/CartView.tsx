"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { WhatsAppIcon } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { QtyStepper } from "@/components/QtyStepper";
import { countOf, linesOf, useCart } from "@/lib/cart";
import { ugx } from "@/lib/format";
import { readJSON, writeJSON } from "@/lib/storage";
import { useHydrated } from "@/lib/use-hydrated";
import { wa } from "@/lib/whatsapp";

type Draft = { name?: string; phone?: string; area?: string; day?: string; items?: string };

export function CartView() {
  const hydrated = useHydrated();
  const { box, setQty, remove, clear } = useCart();
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
      `\n\nSubtotal: ${ugx(subtotal)}\nDeliver to: ${area.trim() || "—"}`,
  );

  return (
    <>
      <PageHeader eyebrow="Your cart" line1="The" line2="order.">
        <p className="m-0">
          {n > 0 ? `${n} pack${n === 1 ? "" : "s"} ready to send. Check the list, add where you’d like it delivered, and send it on WhatsApp.` : "Your cart is empty. Add a pack or two from the range and it’ll show up here."}
        </p>
      </PageHeader>
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(72px,9vw,128px)] max-xs:px-6 mp:px-3.5">
        <div className="lm-wrap grid grid-cols-[1fr_380px] items-start gap-[clamp(28px,4vw,64px)] max-lg:grid-cols-1">
          <div>
            {lines.length === 0 ? (
              <div className="border-t border-bone/16 py-12 text-center">
                <h2 className="lm-h2 text-bone">Nothing here yet.</h2>
                <div data-cta-actions className="mt-8 flex justify-center">
                  <ButtonLink href="/range">
                    <span data-full>See the range</span>
                    <span data-short>See range</span> →
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <div className="border-t border-bone/16">
                {lines.map((l) => (
                  <div key={l.key} className="grid grid-cols-[96px_1fr_auto_120px_46px] items-center gap-4 border-b border-bone/12 py-5 text-left max-sm:grid-cols-[72px_1fr_auto]">
                    <div className="relative aspect-square overflow-hidden bg-bone-2">{l.img && <Photo src={l.img} alt={l.name} sizes="96px" />}</div>
                    <div className="min-w-0">
                      <div className="font-bold text-bone">{l.name}</div>
                      <div className="mt-1 font-mono text-xs text-dark-muted">
                        {l.size} · {ugx(l.unit)}
                      </div>
                    </div>
                    <span className="text-bone">
                      <QtyStepper value={l.qty} min={0} onChange={(q) => setQty(l.key, q)} />
                    </span>
                    <div className="text-right font-extrabold text-bone max-sm:col-start-2">{ugx(l.total)}</div>
                    <button onClick={() => remove(l.key)} aria-label={`Remove ${l.name}`} className="flex size-11 items-center justify-center text-dark-muted hover:text-bone max-sm:col-start-3">
                      ×
                    </button>
                  </div>
                ))}
                <div className="mt-5 flex justify-between">
                  <Link href="/range" className="text-sm font-bold tracking-[.08em] text-brass uppercase">
                    ← Keep shopping
                  </Link>
                  <button onClick={clear} className="text-sm font-bold tracking-[.08em] text-dark-muted uppercase hover:text-bone">
                    Clear cart
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="sticky top-24 border border-bone/14 bg-charcoal-2 p-7 text-left max-lg:static">
            <div className="lm-eyebrow text-brass">Summary</div>
            <dl className="mt-5 space-y-3 text-dark-body">
              <div className="flex justify-between">
                <dt>Packs</dt>
                <dd className="m-0 text-bone">{n}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd className="m-0 text-bone">Confirmed on WhatsApp</dd>
              </div>
              <div className="flex justify-between border-t border-bone/14 pt-3 text-lg font-extrabold text-bone">
                <dt>Subtotal</dt>
                <dd className="m-0">{ugx(subtotal)}</dd>
              </div>
            </dl>
            <label className="mt-6 block">
              <span className="font-mono text-[10.5px] tracking-[.14em] text-dark-muted uppercase">Deliver to</span>
              <input value={area} onChange={(e) => onArea(e.target.value)} placeholder="Area, e.g. Ntinda" className="mt-2 w-full rounded-lm border border-bone/20 bg-transparent px-3.5 py-3 text-bone outline-none focus:border-brass" />
            </label>
            {lines.length > 0 ? (
              <a href={checkout} target="_blank" rel="noopener" className="mt-5 flex min-h-[52px] items-center justify-center gap-2.5 rounded-lm bg-whatsapp px-5 text-sm font-extrabold tracking-[.06em] text-white uppercase hover:bg-whatsapp-hover">
                <WhatsAppIcon /> Send order on WhatsApp
              </a>
            ) : (
              <div className="mt-5 flex min-h-[52px] items-center justify-center rounded-lm border border-bone/14 text-sm font-bold tracking-[.06em] text-dark-muted uppercase">Cart is empty</div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
