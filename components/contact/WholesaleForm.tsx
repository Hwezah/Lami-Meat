"use client";

import { useState } from "react";
import { chip, cta, field, fieldLabel } from "@/components/ui";
import { volumes } from "@/data/faq";
import { products } from "@/lib/products";
import { wa } from "@/lib/whatsapp";

export function WholesaleForm() {
  const [biz, setBiz] = useState("");
  const [contact, setContact] = useState("");
  const [vol, setVol] = useState("");
  const [prods, setProds] = useState<string[]>([]);
  const [err, setErr] = useState("");

  const send = () => {
    if (!biz.trim() || !contact.trim()) return setErr("Please add your business name and a contact.");
    window.open(
      wa(`Hi LAMI MEAT! Wholesale enquiry:\nBusiness: ${biz}\nContact: ${contact}\nVolume: ${vol || "Not sure yet"}\nProducts: ${prods.join(", ") || "Full range"}`),
      "_blank",
      "noopener",
    );
  };
  const toggle = (n: string) => setProds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <form data-reveal data-form onSubmit={(e) => (e.preventDefault(), send())} noValidate className="text-left">
      <div className="grid grid-cols-2 gap-x-[26px] gap-y-[22px] max-sm:grid-cols-1">
        <label>
          <span className={fieldLabel("bone")}>Business</span>
          <input className={field("bone")} type="text" autoComplete="organization" value={biz} onChange={(e) => (setBiz(e.target.value), setErr(""))} placeholder="Business name" />
        </label>
        <label>
          <span className={fieldLabel("bone")}>Contact</span>
          <input className={field("bone")} type="text" value={contact} onChange={(e) => (setContact(e.target.value), setErr(""))} placeholder="Name & phone" />
        </label>
      </div>
      <fieldset className="mt-[30px]">
        <legend className={`${fieldLabel("bone")} mb-3`}>Weekly volume</legend>
        <div className="flex flex-wrap gap-2">
          {volumes.map((v) => (
            <button key={v} type="button" aria-pressed={vol === v} onClick={() => (setVol(v), setErr(""))} className={chip(vol === v)}>
              {v}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-[26px]">
        <legend className={`${fieldLabel("bone")} mb-3`}>Products</legend>
        <div className="flex flex-wrap gap-2">
          {products.map((p) => (
            <button key={p.id} type="button" aria-pressed={prods.includes(p.name)} onClick={() => toggle(p.name)} className={chip(prods.includes(p.name))}>
              {p.name}
            </button>
          ))}
        </div>
      </fieldset>
      {err && <p className="mt-4 text-sm text-error-bone">{err}</p>}
      <div data-cta-actions className="mt-[30px] flex">
        <button type="submit" className={cta.ink}>
          Send enquiry →
        </button>
      </div>
    </form>
  );
}
