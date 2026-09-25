import { site } from "./config";

/** Builds a wa.me link with a pre-filled message. Open in a new tab. Messages live in the dictionary (t.wa). */
export const wa = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
