"use client";

import { useT } from "@/lib/i18n/provider";
import { useAddToCart } from "@/lib/use-add-to-cart";

/** `product` is the English product name (the cart key). */
export function AddRecipeButton({ product, className }: { product: string; className: string }) {
  const addToCart = useAddToCart();
  const t = useT();
  return (
    <button type="button" onClick={() => addToCart(product, "500g", 1)} className={className}>
      {t.common.addToCart}
    </button>
  );
}
