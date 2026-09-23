import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHeader } from "@/components/PageHeader";
import { Ticker } from "@/components/Ticker";
export const metadata: Metadata = { title: "Recipes", description: "Simple recipes for LAMI smoked sausages, hot dogs and minced beef." };

export default function RecipesPage() {
  return (
    <>
      <PageHeader eyebrow="Recipes" line1="From our" line2="kitchen.">
        <Ticker />
      </PageHeader>
      <ComingSoon design="Lami-Recipes.dc.html" sections={["Featured recipe r0: framed photo, “You need” ul, numbered “Method” ol, Add to cart", "Index accordion r1–r5 (r1 open), each with its own add-to-cart (see docs/WIRING.md §4.1 mapping)"]} />
    </>
  );
}
