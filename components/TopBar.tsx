"use client";

import { useT } from "@/lib/i18n/provider";

export function TopBar() {
  const t = useT();
  return (
    <div className="flex flex-wrap justify-center gap-x-7 gap-y-2.5 border-b border-bone/10 px-[18px] py-[9px] text-center font-mono text-[11px] uppercase tracking-[.14em] text-brass">
      <span>{t.topbar.a}</span>
      <span className="max-md:hidden">{t.topbar.b}</span>
    </div>
  );
}
