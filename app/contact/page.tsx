import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Contact & Order", description: "Order LAMI MEAT on WhatsApp, call, or send a wholesale enquiry. Cold delivery across Kampala." };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact &amp; order" line1="Send us" line2="a message.">
        <p className="m-0">Tell us what you need. We confirm the order, price and delivery time on WhatsApp — usually within the hour.</p>
      </PageHeader>
      <ComingSoon design="Lami-Order.dc.html" sections={["Reach us: contact rows", "Order form card (lm-order-draft, “+ Fill from my cart”, validation → WhatsApp)", "#wholesale: business/contact, volume chips (single), product chips (multi) → WhatsApp", "FAQ accordion (q0 open by default) — use <Fold/>"]} />
    </>
  );
}
