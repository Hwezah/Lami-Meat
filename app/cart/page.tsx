import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Your Cart", description: "Review your LAMI MEAT order and send it on WhatsApp.", robots: { index: false } };

export default function CartPage() {
  return <CartView />;
}
