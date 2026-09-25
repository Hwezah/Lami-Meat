"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/LocaleLink";
import { ugx } from "@/lib/format";
import { useT } from "@/lib/i18n/provider";
import { products } from "@/lib/products";
import { useUI } from "@/lib/ui";
import { CloseIcon } from "./Icons";

/** Bone sheet that drops from the top. Filters products by their English and current-language names. */
export function SearchSheet() {
  const isOpen = useUI((s) => s.overlay === "search");
  const close = useUI((s) => s.close);
  const t = useT();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => input.current?.focus(), 240);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const term = q.trim().toLowerCase();
  const hits = term
    ? products.filter((p) => `${p.name} ${p.kind} ${t.products[p.id].name} ${t.common.kinds[p.kind]}`.toLowerCase().includes(term))
    : [];

  return (
    <div className={`fixed inset-0 z-70 ${isOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`} aria-hidden={!isOpen}>
      <div onClick={close} className="absolute inset-0 bg-black/50" />
      <div className={`absolute top-0 right-0 left-0 bg-bone px-[clamp(18px,4vw,46px)] py-[clamp(34px,6vh,64px)] text-ink transition-transform duration-600 ease-lm ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-auto flex max-w-[1180px] items-center gap-5 border-b-[1.5px] border-ink">
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="text"
            placeholder={t.search.placeholder}
            aria-label={t.search.placeholder}
            className="min-w-0 flex-1 bg-transparent px-0.5 py-2.5 font-display text-[clamp(26px,3.4vw,44px)] font-light text-ink outline-none placeholder:text-dark-faint"
          />
          <button onClick={close} aria-label={t.search.close} className="flex size-[52px] shrink-0 items-center justify-center text-ink">
            <CloseIcon />
          </button>
        </div>

        {term && (
          <ul className="mx-auto mt-4 max-w-[1180px] divide-y divide-ink/15">
            {hits.length === 0 && <li className="py-3 text-bone-muted">{t.search.noMatch}</li>}
            {hits.map((p) => (
              <li key={p.id}>
                <Link href={`/range#${p.id}`} onClick={close} className="flex items-baseline justify-between gap-4 py-3 hover:text-brass-deep-2">
                  <span className="text-lg font-bold">{t.products[p.id].name}</span>
                  <span className="font-mono text-xs text-bone-muted">
                    {ugx(p.p500)} / {t.common.sizes["500g"]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mx-auto mt-5 flex max-w-[1180px] flex-wrap items-center gap-2.5">
          <span className="me-1.5 font-mono text-[11px] tracking-[.14em] text-bone-muted uppercase">{t.search.popular}</span>
          {t.search.popularItems.map((label) => (
            <Link key={label} href="/range" onClick={close} className="rounded-lm border border-ink/20 px-3.5 py-2 text-[13.5px] whitespace-nowrap text-ink">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
