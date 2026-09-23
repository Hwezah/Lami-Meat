import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

const routes = ["", "/range", "/our-story", "/contact", "/recipes", "/careers"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, lastModified: new Date() }));
}
