"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { priceOf, productByName, type Size } from "./products";

/** Cart shape stored in localStorage["lm-box"]: { "<Product Name>__500g|1kg": qty } */
export type Box = Record<string, number>;

export function sanitizeBox(raw: unknown): Box {
  const out: Box = {};
  if (raw && typeof raw === "object" && !Array.isArray(raw))
    for (const k in raw as Record<string, unknown>) {
      const q = Math.floor(Number((raw as Record<string, unknown>)[k]));
      if (/__(?:500g|1kg)$/.test(k) && Number.isFinite(q) && q > 0) out[k] = q;
    }
  return out;
}

export const lineKey = (name: string, size: Size) => `${name}__${size}`;

export type CartLine = { key: string; name: string; size: Size; qty: number; unit: number; total: number; img?: string };

type CartState = {
  box: Box;
  add: (name: string, size: Size, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

// The store persists the raw box object (no zustand {state,version} wrapper) so the
// key stays compatible with the design prototypes.
const boxStorage = createJSONStorage<{ box: Box }>(() => ({
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    try {
      return JSON.stringify({ state: { box: sanitizeBox(JSON.parse(raw)) }, version: 0 });
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(JSON.parse(value).state.box));
    } catch {}
  },
  removeItem: (name) => localStorage.removeItem(name),
}));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      box: {},
      add: (name, size, qty = 1) =>
        set((s) => {
          const k = lineKey(name, size);
          return { box: { ...s.box, [k]: (s.box[k] ?? 0) + qty } };
        }),
      setQty: (key, qty) =>
        set((s) => {
          const box = { ...s.box };
          if (qty > 0) box[key] = Math.floor(qty);
          else delete box[key];
          return { box };
        }),
      remove: (key) =>
        set((s) => {
          const box = { ...s.box };
          delete box[key];
          return { box };
        }),
      clear: () => set({ box: {} }),
    }),
    { name: "lm-box", storage: boxStorage, partialize: (s) => ({ box: s.box }) },
  ),
);

export const countOf = (box: Box) => Object.values(box).reduce((a, b) => a + b, 0);

export function linesOf(box: Box): CartLine[] {
  return Object.entries(box).flatMap(([key, qty]) => {
    const [name, size] = key.split("__") as [string, Size];
    const p = productByName(name);
    if (!p) return [];
    const unit = priceOf(p, size);
    return [{ key, name, size, qty, unit, total: unit * qty, img: p.img }];
  });
}
