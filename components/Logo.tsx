import Image from "next/image";

/**
 * Swappable logo. The final logo is still PENDING from the client:
 * replace the SVGs in public/brand/ (same filenames) and nothing else changes.
 */
export function Logo({ variant = "nav", className }: { variant?: "nav" | "footer"; className?: string }) {
  const src = variant === "nav" ? "/brand/lami-nav-cream.svg" : "/brand/lami-logo-light.svg";
  const h = variant === "nav" ? 46 : 76;
  return <Image src={src} alt="LAMI MEAT" width={h * 3} height={h} priority={variant === "nav"} unoptimized className={className} style={{ width: "auto" }} />;
}
