import { Eyebrow } from "@/components/Eyebrow";
import { FoldList } from "@/components/FoldList";
import { FramedPhoto } from "@/components/FramedPhoto";
import { PageHeader } from "@/components/PageHeader";
import { AddRecipeButton } from "@/components/recipes/AddRecipeButton";
import { RecipeBody } from "@/components/recipes/RecipeBody";
import { Ticker } from "@/components/Ticker";
import { cta, ctaSm } from "@/components/ui";
import { getPageDict, pageMetadata, type LocaleParams } from "@/lib/i18n/server";
import { productByName } from "@/lib/products";

export const generateMetadata = (props: LocaleParams) => pageMetadata(props, "recipes", "/recipes");

export default async function RecipesPage(props: LocaleParams) {
  const { t } = await getPageDict(props);
  const R = t.recipes;
  const f = R.featured;
  const labels = { youNeed: R.youNeed, method: R.method };
  /** Recipes store the English product name (cart key); show the localized one. */
  const productLabel = (name: string) => {
    const p = productByName(name);
    return p ? t.products[p.id].name : name;
  };

  return (
    <>
      <PageHeader eyebrow={R.eyebrow} line1={R.title1} line2={R.title2}>
        <Ticker lines={t.tickers.recipes} />
      </PageHeader>

      {/* Featured recipe */}
      <section className="lm-section !pt-0 mp:text-center">
        <div className="lm-stick lm-wrap grid grid-cols-2 items-start gap-[clamp(36px,5vw,90px)] max-lg:grid-cols-1">
          <figure data-reveal className="m-0">
            <FramedPhoto src={f.img} alt={f.alt} />
            <figcaption className="mt-[30px] font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase">{R.pick(f.num)}</figcaption>
          </figure>
          <div data-reveal data-reveal-delay="120">
            <Eyebrow className="mb-4">
              {productLabel(f.product)} · {f.time} · {f.serves}
            </Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.2vw,64px)] leading-[.92] font-black tracking-[-0.04em] text-bone uppercase">{f.title}</h2>
            <div className="mt-[clamp(28px,3vw,40px)]">
              <RecipeBody r={f} tone="dark" labels={labels} />
            </div>
            <div data-cta-actions className="mt-8 flex flex-wrap gap-3">
              <AddRecipeButton product={f.product} className={cta.brass} />
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
                {R.indexEyebrow}
              </Eyebrow>
              <h2 data-reveal className="lm-h2">
                {R.indexTitle1}
                <br />
                {R.indexTitle2}
              </h2>
            </div>
            <p data-reveal className="max-w-[460px] text-[clamp(15.5px,1.2vw,17.5px)] leading-[1.66] text-bone-body mp:mx-auto">
              {R.indexIntro}
            </p>
          </div>
          <div className="border-t-[1.5px] border-ink">
            <FoldList
              layout="stacked"
              initial="r1"
              items={R.list.map((r) => ({
                id: r.id,
                num: r.num,
                title: r.title,
                meta: `${productLabel(r.product)} · ${r.time}`,
                body: (
                  <>
                    <RecipeBody r={r} tone="bone" labels={labels} />
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
