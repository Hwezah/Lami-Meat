"use client";

import { useEffect, useState } from "react";

/** False during SSR and the first client render; use it to avoid hydration mismatches
 *  for values read from localStorage (e.g. the cart badge renders 0 on the server). */
export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
