import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Our Story", description: "The LAMI MEAT story: a Kampala smokehouse and butchery making a short list of beef products, properly." };

export default function OurStoryPage() {
  return (
    <>
      <PageHeader eyebrow="Our story" line1="Fire, beef" line2="&amp; patience.">
        <p className="m-0">LAMI MEAT is a Kampala smokehouse and butchery. We make a short list of beef products and make them properly — every batch, every day.</p>
      </PageHeader>
      <ComingSoon design="Lami-About.dc.html" sections={["21:9 figure", "3 chapters (200px | H2 + text | image grid)", "“Four rules” 01–04 ledger4", "People: text + 6-image mosaic", "Closer CTA card (See the range / WhatsApp), “Join the team →” /careers"]} />
    </>
  );
}
