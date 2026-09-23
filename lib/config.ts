/** Site-wide config. Values come from NEXT_PUBLIC_* env vars (see .env.example). */
export const site = {
  name: "LAMI MEAT",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lamimeat.co.ug",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "256773828552").replace(/\D/g, ""),
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+256 773 828 552",
  // PLACEHOLDER: the client has not supplied the real address yet.
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@lamimeat.co.ug",
  instagram: "https://instagram.com/lamimeat",
  instagramHandle: "@lamimeat",
  hours: "Mon–Sat · 8am–6pm",
  location: "Kampala, Uganda",
} as const;

export const telHref = `tel:+${site.whatsapp}`;
export const mailHref = `mailto:${site.email}`;
