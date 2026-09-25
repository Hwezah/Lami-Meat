import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

/** Every page lives under /en or /ar. Bare paths redirect using the saved choice, then the browser language. */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (isLocale(pathname.split("/")[1])) return NextResponse.next();

  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale = defaultLocale;
  if (isLocale(saved)) locale = saved;
  else if (/^ar\b/i.test(req.headers.get("accept-language") ?? "")) locale = "ar";

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, icon.svg, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
