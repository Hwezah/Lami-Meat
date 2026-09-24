import Link from "next/link";
import { menuLinks } from "@/data/nav";
import { mailHref, site } from "@/lib/config";
import { waDefault } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const colHead = "mb-4 font-mono text-[11.5px] uppercase tracking-[.14em] text-brass mp:text-center";
const link = "text-[15px] text-bone hover:text-brass mp:text-[12.5px] mp:[overflow-wrap:anywhere]";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-footer px-[clamp(18px,4vw,46px)] pt-[clamp(54px,6vw,80px)] pb-[30px] text-dark-body">
      <div className="lm-wrap">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-[clamp(28px,4vw,56px)] border-b border-bone/12 pb-[clamp(36px,4vw,52px)] max-lg:grid-cols-3 max-lg:gap-x-[18px] max-lg:gap-y-[26px] max-sm:grid-cols-1 mp:gap-[30px]">
          <div className="flex flex-col items-start max-lg:col-span-full mp:items-center mp:text-center">
            <div className="mb-[18px]">
              <Logo variant="footer" />
            </div>
            <p className="m-0 max-w-[320px] text-[14.5px] leading-[1.6] text-dark-muted">Smokehouse and butchery in Kampala, Uganda. Crafted for the finest taste.</p>
          </div>
          <div>
            <div className={colHead}>Explore</div>
            <div className="flex flex-col gap-[11px] mp:grid mp:grid-cols-3 mp:gap-x-1.5 mp:gap-y-3 mp:text-center">
              {menuLinks.map((m) => (
                <Link key={m.href} href={m.href} className={link}>
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className={colHead}>Get in touch</div>
            <div className="flex flex-col gap-[11px] mp:grid mp:grid-cols-2 mp:gap-x-1.5 mp:gap-y-3 mp:text-center">
              <a href={waDefault()} target="_blank" rel="noopener" className={link}>
                {site.phoneDisplay}
              </a>
              <a href={mailHref} className={link}>
                {site.email}
              </a>
              <a href={site.instagram} target="_blank" rel="noopener" className={link}>
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-[18px] gap-y-2.5 pt-[22px] text-center font-mono text-[11.5px] tracking-[.06em] text-dark-faint">
          <span>© {new Date().getFullYear()} LAMI MEAT Ltd · Kampala</span>
          <span aria-hidden className="text-brass mp:hidden">·</span>
          <span>Crafted for the finest taste</span>
        </div>
      </div>
    </footer>
  );
}
