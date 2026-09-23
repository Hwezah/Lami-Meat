import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { FoldList } from "@/components/FoldList";
import { FramedPhoto } from "@/components/FramedPhoto";
import { PageHeader } from "@/components/PageHeader";
import { AddRecipeButton } from "@/components/recipes/AddRecipeButton";
import { RecipeBody } from "@/components/recipes/RecipeBody";
import { Ticker } from "@/components/Ticker";
import { cta, ctaSm } from "@/components/ui";
import { featured, recipes } from "@/data/recipes";

export const metadata: Metadata = { title: "Recipes", description: "Simple recipes for LAMI smoked sausages, hot dogs and minced beef." };

export default function RecipesPage() {
  return (
    <>
      <PageHeader eyebrow="Recipes" line1="From our" line2="kitchen.">
        <Ticker />
      </PageHeader>

      {/* Featured recipe */}
      <section className="lm-section !pt-0 mp:text-center">
        <div className="lm-wrap grid grid-cols-2 items-start gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <figure data-reveal className="m-0">
            <FramedPhoto src={featured.img} alt={featured.alt} />
            <figcaption className="mt-[30px] font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase">Recipe {featured.num} — This week’s pick</figcaption>
          </figure>
          <div data-reveal data-reveal-delay="120">
            <Eyebrow className="mb-4">
              {featured.product} · {featured.time} · {featured.serves}
            </Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.2vw,64px)] leading-[.92] font-black tracking-[-0.04em] text-bone uppercase">{featured.title}</h2>
            <div className="mt-[clamp(28px,3vw,40px)]">
              <RecipeBody r={featured} tone="dark" />
            </div>
            <div data-cta-actions className="mt-8 flex flex-wrap gap-3">
              <AddRecipeButton product={featured.product} className={cta.brass} />
            </div>
          </div>
        </div>
      </section>

      {/* Index */}
      <section className="lm-section bg-bone text-ink mp:text-center">
        <div className="lm-wrap">
          <div className="mb-[clamp(30px,4vw,52px)] grid grid-cols-2 items-end gap-x-[clamp(36px,5vw,90px)] gap-y-6 max-lg:grid-cols-1">
            <div>
              <Eyebrow tone="bone" className="mb-4">
                The index
              </Eyebrow>
              <h2 data-reveal className="lm-h2">
                More to
                <br />
                cook.
              </h2>
            </div>
            <p data-reveal className="max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body mp:mx-auto">
              Open any recipe for the ingredients and method. Every one uses a single LAMI pack.
            </p>
          </div>
          <div className="border-t-[1.5px] border-ink">
            <FoldList
              layout="stacked"
              initial="r1"
              items={recipes.map((r) => ({
                id: r.id,
                num: r.num,
                title: r.title,
                meta: `${r.product} · ${r.time}`,
                body: (
                  <>
                    <RecipeBody r={r} tone="bone" />
                    <div data-cta-actions className="mt-[26px] flex">
                      <AddRecipeButton product={r.product} className={`${cta.ink} ${ctaSm}`} />
                    </div>
                  </>
                ),
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
