import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHeader } from "@/components/PageHeader";
import { ProductList } from "@/components/range/ProductList";

export const metadata: Metadata = {
  title: "The Range",
  description: "Smoked beef sausages, hot dogs and fresh minced beef from LAMI MEAT, Kampala. 500g and 1kg packs.",
};

export default function RangePage() {
  return (
    <>
      <PageHeader eyebrow="The range · Four cuts" line1="The" line2="Range.">
        <p className="m-0">Two smoked, two fresh — all pure beef. Every pack is weighed, sealed and labelled with its batch number and dates.</p>
      </PageHeader>
      <ProductList />
      <ComingSoon design="Lami-Products.dc.html" sections={["“Kitchen quantities” split with the wholesale CTA (Wholesale enquiry → /contact#wholesale)", "“Store. Thaw. Cook.” 3 care steps ([data-steps], left-aligned on mobile portrait)"]} />
    </>
  );
}
