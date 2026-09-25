import type { ComponentProps } from "react";
import Link from "./LocaleLink";
import { WhatsAppIcon } from "./Icons";

type Variant = "primary" | "outline" | "outline-brass" | "whatsapp" | "ink";

const base = "inline-flex items-center justify-center gap-3 rounded-lm px-6 py-[17px] text-sm font-extrabold uppercase tracking-[.08em] whitespace-nowrap transition-colors";
const variants: Record<Variant, string> = {
  primary: "bg-brass text-charcoal hover:bg-brass-hover",
  outline: "border border-bone/40 text-bone hover:border-bone",
  "outline-brass": "border border-brass text-brass hover:bg-brass hover:text-charcoal",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover",
  ink: "bg-ink text-bone hover:bg-brass-deep-2",
};

export const buttonClass = (v: Variant = "primary", extra = "") => `${base} ${variants[v]} ${extra}`;

type LinkProps = { variant?: Variant; external?: boolean } & ComponentProps<typeof Link>;

/** Square-cornered CTA. External links (wa.me, tel:, mailto:) render a plain <a>. */
export function ButtonLink({ variant = "primary", external, className = "", children, ...rest }: LinkProps) {
  const cls = buttonClass(variant, className);
  const inner = (
    <>
      {variant === "whatsapp" && <WhatsAppIcon />}
      {children}
    </>
  );
  if (external || typeof rest.href === "string" && /^(https?:|tel:|mailto:)/.test(rest.href)) {
    const href = String(rest.href);
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} {...rest}>
      {inner}
    </Link>
  );
}
