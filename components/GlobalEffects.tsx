"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/session";
import { useUI } from "@/lib/ui";

/** Esc closes every overlay; route changes close them; session hydrates from sessionStorage. */
export function GlobalEffects() {
  const pathname = usePathname();
  const hydrate = useSession((s) => s.hydrate);

  useEffect(() => hydrate(), [hydrate]);

  useEffect(() => {
    useUI.setState({ overlay: null, auth: null });
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") useUI.setState({ overlay: null, auth: null });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
