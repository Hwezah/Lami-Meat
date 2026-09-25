"use client";

import { useState } from "react";
import { chip, cta, field, fieldLabel } from "@/components/ui";
import { useT } from "@/lib/i18n/provider";
import { products } from "@/lib/products";
import { wa } from "@/lib/whatsapp";

export function WholesaleForm() {
  const t = useT();
  const W = t.contact.w;
  const [biz, setBiz] = useState("");
  const [contact, setContact] = useState("");
  const [vol, setVol] = useState("");
  const [prods, setProds] = useState<string[]>([]);
  const [err, setErr] = useState("");

  const send = () => {
    if (!biz.trim() || !contact.trim()) return setErr(W.error);
    const volLabel = t.contact.volumes.find((v) => v.value === vol)?.label ?? "";
    // Product names stay in English so the team can read them.
    window.open(wa(t.wa.wholesale({ biz, contact, vol: volLabel, prods: prods.join(", ") })), "_blank", "noopener");
  };
  const toggle = (n: string) => setProds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <form data-reveal data-form onSubmit={(e) => (e.preventDefault(), send())} noValidate className="text-start">
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[22px] max-sm:grid-cols-1">
        <label>
          <span className={fieldLabel("bone")}>{W.biz}</span>
          <input className={field("bone")} type="text" autoComplete="organization" value={biz} onChange={(e) => (setBiz(e.target.value), setErr(""))} placeholder={W.bizPh} />
        </label>
        <label>
          <span className={fieldLabel("bone")}>{W.contact}</span>
          <input className={field("bone")} type="text" value={contact} onChange={(e) => (setContact(e.target.value), setErr(""))} placeholder={W.contactPh} />
        </label>
      </div>
      <fieldset className="mt-[30px]">
        <legend className={`${fieldLabel("bone")} mb-3`}>{W.volume}</legend>
        <div className="flex flex-wrap gap-2">
          {t.contact.volumes.map((v) => (
            <button key={v.value} type="button" aria-pressed={vol === v.value} onClick={() => (setVol(v.value), setErr(""))} className={chip(vol === v.value)}>
              {v.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-[26px]">
        <legend className={`${fieldLabel("bone")} mb-3`}>{W.products}</legend>
        <div className="flex flex-wrap gap-2">
          {products.map((p) => (
            <button key={p.id} type="button" aria-pressed={prods.includes(p.name)} onClick={() => toggle(p.name)} className={chip(prods.includes(p.name))}>
              {t.products[p.id].name}
            </button>
          ))}
        </div>
      </fieldset>
      {err && <p className="mt-4 text-sm text-error-bone">{err}</p>}
      <div data-cta-actions className="mt-[30px] flex">
        <button type="submit" className={cta.ink}>
          {W.send}
        </button>
      </div>
    </form>
  );
}
