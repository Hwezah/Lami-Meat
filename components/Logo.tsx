import Image from "next/image";

/**
 * LAMI MEAT lockup: the client's Lami badge (heart + red plaque, "Crafted for the Finest Taste")
 * on its white disc + stacked wordmark (LAMI in red, MEAT in cream).
 * The badge is cut from the logo the client sent (public/brand/lami-badge.png). Swap in a vector when they supply one.
 */
export function LogoMark({ size = 46, className = "", priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return <Image src="/brand/lami-badge.png" alt="" width={size} height={size} priority={priority} className={`rounded-full ${className}`} />;
}

export function Logo({ variant = "nav", className = "" }: { variant?: "nav" | "footer"; className?: string }) {
  const nav = variant === "nav";
  return (
    <span dir="ltr" className={`inline-flex items-center ${nav ? "gap-2.5 max-lg:gap-2" : "gap-3.5"} ${className}`} role="img" aria-label="LAMI MEAT">
      <LogoMark size={nav ? 46 : 72} priority={nav} className={nav ? "max-lg:size-10" : ""} />
      <span
        aria-hidden
        className={`flex flex-col font-[family-name:var(--font-hanken)] font-black tracking-[-0.01em] text-bone uppercase ${nav ? "text-[17px] leading-[.95] max-lg:text-[15px]" : "text-[26px] leading-[.95]"}`}
      >
        <span className="text-lami-red">Lami</span>
        <span>Meat</span>
      </span>
    </span>
  );
}
