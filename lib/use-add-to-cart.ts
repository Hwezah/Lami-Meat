"use client";

import { useCart } from "./cart";
import type { Size } from "./products";
import { useUI } from "./ui";

/** Adds to lm-box and shows the toast. `message` overrides the default toast copy. */
export function useAddToCart() {
  const add = useCart((s) => s.add);
  const showToast = useUI((s) => s.showToast);
  return (name: string, size: Size = "500g", qty = 1, message?: string) => {
    add(name, size, qty);
    showToast(message ?? `${qty} × ${name} (${size}) added`);
  };
}
