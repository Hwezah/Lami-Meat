"use client";

import { useState } from "react";
import { Fold } from "./Fold";

type Item = { id: string; num: string; title: string; meta: string; body: React.ReactNode };

/** A list of accordion rows sharing one open state (only one open at a time). */
export function FoldList({ items, initial = "", tone = "bone", layout = "row" }: { items: Item[]; initial?: string; tone?: "bone" | "dark"; layout?: "row" | "stacked" }) {
  const [open, setOpen] = useState(initial);
  return (
    <>
      {items.map((it) => (
        <Fold key={it.id} id={it.id} num={it.num} title={it.title} meta={it.meta} open={open} onToggle={setOpen} tone={tone} layout={layout}>
          {it.body}
        </Fold>
      ))}
    </>
  );
}
