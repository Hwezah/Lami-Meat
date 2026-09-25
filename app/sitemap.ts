import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { locales } from "@/lib/i18n/config";

const routes = ["", "/range", "/our-story", "/contact", "/recipes", "/careers"];

/** Every page in both languages, each listing its alternate. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((r) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${r}`,
      lastModified: new Date(),
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${r}`])) },
    })),
  );
}
