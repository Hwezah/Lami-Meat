import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Careers", description: "Work at LAMI MEAT, a Kampala smokehouse and butchery. Open roles and how to apply." };

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Careers" line1="Join the" line2="counter.">
        <p className="m-0">We’re a small team that takes the work seriously — clean, careful and proud of what leaves the room.</p>
      </PageHeader>
      <ComingSoon design="Lami-Careers.dc.html" sections={["3-photo row", "“Why join” 4 numbered items (ledger4)", "#roles accordion j0–j3 (data/roles.ts), each with “Apply by email” (mailto) + “Ask on WhatsApp”"]} />
    </>
  );
}
