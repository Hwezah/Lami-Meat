"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/Icons";
import { cta, field, fieldLabel } from "@/components/ui";
import { countOf, useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n/provider";
import { readJSON, writeJSON } from "@/lib/storage";
import { useHydrated } from "@/lib/use-hydrated";
import { wa } from "@/lib/whatsapp";

type Draft = { name: string; phone: string; area: string; day: string; items: string };
const EMPTY: Draft = { name: "", phone: "", area: "", day: "Today", items: "" };

/** Dark order card. Every change saves lm-order-draft; send validates then opens WhatsApp. */
export function OrderForm() {
  const t = useT();
  const L = t.contact.form;
  const hydrated = useHydrated();
  const box = useCart((s) => s.box);
  const count = hydrated ? countOf(box) : 0;
  const [f, setF] = useState<Draft>(EMPTY);
  const [err, setErr] = useState("");

  useEffect(() => {
    const d = readJSON<Partial<Draft>>("local", "lm-order-draft");
    if (d && typeof d === "object") setF({ ...EMPTY, ...d, day: d.day || "Today" });
  }, []);

  const update = (patch: Partial<Draft>) => {
    const next = { ...f, ...patch };
    setF(next);
    setErr("");
    writeJSON("local", "lm-order-draft", next);
  };

  const fillFromCart = () =>
    update({
      items: Object.entries(box)
        .map(([k, q]) => {
          const [n, z] = k.split("__");
          return `${q} × ${n} ${z}`;
        })
        .join(", "),
    });

  const send = () => {
    if (!f.name.trim() || !f.phone.trim() || !f.items.trim()) return setErr(L.error);
    const day = t.contact.deliveryDays.find((d) => d.value === f.day)?.label ?? f.day;
    window.open(wa(t.wa.order({ ...f, day })), "_blank", "noopener");
  };

  return (
    <div data-reveal data-cta-card className="border border-brass/45 bg-charcoal-2 p-[clamp(28px,4vw,52px)] text-start">
      <div className="lm-eyebrow mb-3 text-brass">{L.eyebrow}</div>
      <h2 className="font-display text-[clamp(30px,3.2vw,46px)] leading-[.92] font-black tracking-[-0.04em] text-bone uppercase">{L.title}</h2>
      <p className="mt-3 max-w-[440px] text-[15px] leading-[1.6] text-dark-muted">{L.intro}</p>
      <form onSubmit={(e) => (e.preventDefault(), send())} noValidate>
        <div className="mt-7 grid grid-cols-2 gap-x-[26px] gap-y-[22px] max-sm:grid-cols-1">
          <label>
            <span className={fieldLabel()}>{L.name}</span>
            <input className={field()} type="text" autoComplete="name" value={f.name} onChange={(e) => update({ name: e.target.value })} placeholder={L.namePh} />
          </label>
          <label>
            <span className={fieldLabel()}>{L.phone}</span>
            <input className={field()} type="tel" autoComplete="tel" value={f.phone} onChange={(e) => update({ phone: e.target.value })} placeholder={L.phonePh} dir="ltr" />
          </label>
          <label>
            <span className={fieldLabel()}>{L.area}</span>
            <input className={field()} type="text" value={f.area} onChange={(e) => update({ area: e.target.value })} placeholder={L.areaPh} />
          </label>
          <label>
            <span className={fieldLabel()}>{L.day}</span>
            <select className={`${field()} cursor-pointer [&>option]:text-ink`} value={f.day} onChange={(e) => update({ day: e.target.value })}>
              {t.contact.deliveryDays.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-full">
            <span className={fieldLabel()}>{L.items}</span>
            <textarea
              className={`${field()} resize-y leading-normal`}
              rows={4}
              value={f.items}
              onChange={(e) => update({ items: e.target.value })}
              placeholder={L.itemsPh}
            />
          </label>
        </div>
        {count > 0 && (
          <button type="button" onClick={fillFromCart} className="mt-3.5 min-h-11 font-mono text-[11px] tracking-[.14em] text-brass uppercase">
            {L.fill(count)}
          </button>
        )}
        {err && <p className="mt-3.5 text-sm text-error-dark">{err}</p>}
        <div data-cta-actions className="mt-[26px] flex">
          <button type="submit" className={cta.whatsapp}>
            <WhatsAppIcon /> {L.send}
          </button>
        </div>
      </form>
    </div>
  );
}
