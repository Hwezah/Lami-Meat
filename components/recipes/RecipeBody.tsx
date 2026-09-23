import type { Recipe } from "@/data/recipes";

/** "You need" list + numbered "Method". Tone decides dark (featured) or bone (index). */
export function RecipeBody({ r, tone }: { r: Recipe; tone: "dark" | "bone" }) {
  const dark = tone === "dark";
  const label = `mb-2.5 font-mono text-[11px] uppercase tracking-[.14em] ${dark ? "text-dark-muted" : "text-bone-muted"}`;
  return (
    <div className={`grid items-start gap-x-[clamp(28px,4vw,64px)] gap-y-7 text-left max-sm:grid-cols-1 ${dark ? "grid-cols-[1fr_1.2fr]" : "grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"}`}>
      <div className={dark ? "" : "bg-bone-2 p-[clamp(18px,2vw,26px)]"}>
        <div className={label}>{dark ? "You need" : `You need · ${r.serves}`}</div>
        <ul className="m-0 list-none p-0">
          {r.ingredients.map((i) => (
            <li key={i} className={`border-b py-2.5 text-[15.5px] leading-[1.45] ${dark ? "border-bone/12 text-bone" : "border-ink/14 text-ink"}`}>
              {i}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={label}>Method</div>
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {r.method.map((m, i) => (
            <li key={i} className="grid grid-cols-[34px_1fr] gap-2.5">
              <span className={`font-numeral text-xl leading-[1.1] ${dark ? "text-brass" : "text-brass-deep-2"}`}>{i + 1}</span>
              <span className={`text-[15.5px] leading-[1.6] ${dark ? "text-dark-body" : "text-bone-body"}`}>{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
