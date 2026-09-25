"use client";

import { useCart } from "./cart";
import { useT } from "./i18n/provider";
import { productByName, type Size } from "./products";
import { useUI } from "./ui";

/** Adds to lm-box (keyed by the English product name) and shows a localized toast. */
export function useAddToCart() {
  const add = useCart((s) => s.add);
  const showToast = useUI((s) => s.showToast);
  const t = useT();
  return (name: string, size: Size = "500g", qty = 1, variant: "default" | "one" = "default") => {
    add(name, size, qty);
    const p = productByName(name);
    const label = p ? t.products[p.id].name : name;
    showToast(variant === "one" ? t.toast.addedOne(label) : t.toast.added(qty, label, t.common.sizes[size]));
  };
}
