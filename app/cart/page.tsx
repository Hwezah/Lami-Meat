import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Your Cart", description: "Review your LAMI MEAT order and send it on WhatsApp." };

export default function CartPage() {
  return (
    <>
      <CartView />
      <ComingSoon design="Lami-Cart.dc.html" sections={["“Add to the order” extras list (each row adds 500g × 1)", "Pixel pass on line items and the summary aside against the design"]} />
    </>
  );
}
