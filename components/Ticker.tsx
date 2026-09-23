import { tips } from "@/data/tips";

/** Recipes header: tip lines scroll up forever and fade into the gradient. CSS-only loop. */
export function Ticker({ lines = tips }: { lines?: string[] }) {
  const list = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="m-0 flex list-none flex-col gap-5 p-0 pb-5">
      {lines.map((l, i) => (
        <li key={i} className={`text-[clamp(16px,1.3vw,18px)] leading-[1.6] ${i === 0 ? "text-bone" : "text-dark-body"}`}>
          {l}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group h-[clamp(220px,20vw,300px)] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_45%,#000_88%,transparent_100%)] mp:text-center">
      <div className="animate-rise group-hover:[animation-play-state:paused]">
        {list()}
        {list(true)}
      </div>
    </div>
  );
}
