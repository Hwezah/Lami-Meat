"use client";

import { useAddToCart } from "@/lib/use-add-to-cart";

export function AddRecipeButton({ product, className }: { product: string; className: string }) {
  const addToCart = useAddToCart();
  return (
    <button type="button" onClick={() => addToCart(product, "500g", 1)} className={className}>
      Add to cart
    </button>
  );
}
