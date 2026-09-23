import type { Metadata } from "next";
import { AccountEyebrow, AccountPanel } from "@/components/account/AccountPanel";
import { FramedPhoto } from "@/components/FramedPhoto";
import { Ticker } from "@/components/Ticker";
import { tickers } from "@/data/tickers";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in or create a LAMI MEAT account to save your cart and reorder faster.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <section className="px-[clamp(18px,4vw,46px)] pt-[clamp(56px,7vw,110px)] pb-[clamp(72px,9vw,128px)] max-xs:px-6 mp:px-3.5 mp:text-center">
      <div className="lm-wrap grid grid-cols-2 items-center gap-[clamp(40px,6vw,110px)] max-lg:grid-cols-1">
        <div data-reveal className="flex w-full max-w-[520px] flex-col items-start mp:mx-auto mp:items-center">
          <AccountEyebrow />
          <AccountPanel />
        </div>
        <figure data-reveal data-reveal-delay="120" className="m-0">
          <FramedPhoto src="/images/team-line-3.jpg" alt="The LAMI packing room" />
          <div className="mt-11 border-t border-bone/16 pt-7 mp:text-center">
            <Ticker lines={tickers.account} />
          </div>
        </figure>
      </div>
    </section>
  );
}
