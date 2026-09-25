/** Reads a NEXT_PUBLIC_* value, treating unset *or empty* as missing. */
const env = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);

/** Absolute site URL. Accepts "lamimeat.co.ug" or "https://lamimeat.co.ug"; falls back to the Vercel URL, then the default. */
function siteUrl() {
  const raw = env(process.env.NEXT_PUBLIC_SITE_URL, env(process.env.VERCEL_PROJECT_PRODUCTION_URL, "https://lamimeat.co.ug"));
  const withProto = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProto).origin;
  } catch {
    return "https://lamimeat.co.ug";
  }
}

/** Site-wide config. Values come from NEXT_PUBLIC_* env vars (see .env.example). */
export const site = {
  name: "LAMI MEAT",
  url: siteUrl(),
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP, "256773828552").replace(/\D/g, ""),
  phoneDisplay: env(process.env.NEXT_PUBLIC_PHONE_DISPLAY, "+256 773 828 552"),
  // PLACEHOLDER: the client has not supplied the real address yet.
  email: env(process.env.NEXT_PUBLIC_EMAIL, "hello@lamimeat.co.ug"),
  instagram: "https://instagram.com/lamimeat",
  instagramHandle: "@lamimeat",
  hours: "Mon–Sat · 8am–6pm",
  location: "Kampala, Uganda",
  /** Parent company. The URL is a Vercel preview deployment; swap for the production domain when live. */
  parent: {
    name: "COMAFRO General Trading Ltd",
    shortName: "COMAFRO",
    url: env(process.env.NEXT_PUBLIC_PARENT_URL, "https://comafro-r9o7fyose-hwezahs-projects.vercel.app/en"),
  },
} as const;

export const telHref = `tel:+${site.whatsapp}`;
export const mailHref = `mailto:${site.email}`;
