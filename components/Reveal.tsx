"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Global reveal-on-scroll. Any element with [data-reveal] fades up once its top
 * is within 92% of the viewport. Optional data-reveal-delay (ms).
 * A 4s safety timeout shows everything. Mounted once in the root layout.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const d = el.dataset.revealDelay;
          if (d) el.style.transitionDelay = d + "ms";
          el.dataset.shown = "true";
          io.unobserve(el);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const safety = setTimeout(() => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => (el.dataset.shown = "true")), 4000);
    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, [pathname]);
  return null;
}
