import { site } from "./config";

/** Builds a wa.me link with a pre-filled message. Open in a new tab. */
export const wa = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const WA_DEFAULT_MSG = "Hi LAMI MEAT! I'd like to place an order.";
export const waDefault = () => wa(WA_DEFAULT_MSG);
