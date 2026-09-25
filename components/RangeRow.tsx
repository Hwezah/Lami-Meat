"use client";

import { ugx } from "@/lib/format";
import { useT } from "@/lib/i18n/provider";
import type { Product } from "@/lib/products";
import { useAddToCart } from "@/lib/use-add-to-cart";
import { wa } from "@/lib/whatsapp";
import { CartIcon, WhatsAppIcon } from "./Icons";
import { Photo } from "./Photo";

const act = "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lm px-[18px] py-3 font-display text-[13.5px] font-bold tracking-[.04em]";

/** Home product index row: image · kind/name/desc · price + Add / WhatsApp. */
export function RangeRow({ p }: { p: Product }) {
  const addToCart = useAddToCart();
  const t = useT();
  const copy = t.products[p.id];
  return (
    <div data-reveal className="group grid grid-cols-[132px_minmax(0,1fr)_auto] items-center gap-[clamp(14px,2vw,32px)] border-b border-ink/18 py-[clamp(18px,2.2vw,26px)] text-start max-md:grid-cols-[88px_minmax(0,1fr)] max-md:gap-y-3.5 max-xs:grid-cols-[72px_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden bg-bone-2">
        <Photo src={p.img} alt={copy.name} sizes="132px" />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[10.5px] tracking-[.14em] text-brass-deep uppercase">{t.common.kinds[p.kind]}</div>
        <h3 className="mt-1.5 font-display text-[clamp(22px,2.4vw,34px)] leading-[1.05] font-extrabold tracking-[-0.025em] text-ink transition-colors group-hover:text-brass-deep-2">{copy.name}</h3>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-bone-body">{copy.short}</p>
      </div>
      <div className="flex flex-col items-end gap-3.5 max-md:col-start-2 max-md:items-start max-xs:col-span-full max-xs:items-stretch">
        <div className="text-end max-md:text-start max-xs:flex max-xs:items-baseline max-xs:justify-between max-xs:gap-3">
          <div className="text-lg font-extrabold text-ink">{ugx(p.p500)}</div>
          <div className="mt-[3px] font-mono text-[11.5px] text-bone-muted max-xs:mt-0">
            {t.common.sizes["500g"]} · {ugx(p.p1k)} {t.home.per1kg}
          </div>
        </div>
        <div className="flex justify-end gap-2 max-md:justify-start max-xs:[&>*]:flex-1">
          <button onClick={() => addToCart(p.name, "500g", 1, "one")} className={`${act} bg-ink text-bone hover:bg-brass-deep-2`}>
            <CartIcon size={17} />
            {t.common.addToCart}
          </button>
          <a href={wa(t.wa.product(p.name, ugx(p.p500)))} target="_blank" rel="noopener" aria-label={t.home.orderOnWhatsapp} className={`${act} border border-whatsapp text-whatsapp-hover hover:bg-whatsapp hover:text-white`}>
            <WhatsAppIcon size={16} />
            {t.common.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
