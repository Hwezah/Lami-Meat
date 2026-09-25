import type { Metadata, Viewport } from "next";
import { Anton, Cairo, Hanken_Grotesk, IBM_Plex_Sans_Arabic, Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { AuthModal } from "@/components/AuthModal";
import { Footer } from "@/components/Footer";
import { GlobalEffects } from "@/components/GlobalEffects";
import { MenuPanel } from "@/components/MenuPanel";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/Reveal";
import { SearchSheet } from "@/components/SearchSheet";
import { Toast } from "@/components/Toast";
import { TopBar } from "@/components/TopBar";
import { site } from "@/lib/config";
import { dirOf, isLocale, locales } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { I18nProvider } from "@/lib/i18n/provider";
import "../globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], style: ["normal", "italic"], variable: "--font-hanken" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
// Arabic faces: only applied on /ar (see globals.css), so they aren't preloaded on English pages.
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["300", "400", "500", "600", "700"], variable: "--font-plex-arabic", preload: false });
const cairo = Cairo({ subsets: ["arabic"], weight: ["600", "700", "800", "900"], variable: "--font-cairo", preload: false });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s — LAMI MEAT" },
    description: t.meta.description,
    openGraph: { siteName: "LAMI MEAT", locale: t.meta.ogLocale, type: "website" },
    alternates: { languages: { en: "/en", ar: "/ar", "x-default": "/en" } },
  };
}

export const viewport: Viewport = { themeColor: "#16171A" };

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // LocalBusiness JSON-LD. Fill in address/geo once the client confirms them.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${site.url}/${locale}`,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
    openingHours: "Mo-Sa 08:00-18:00",
    parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
  };

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${hanken.variable} ${spaceMono.variable} ${anton.variable} ${plexArabic.variable} ${cairo.variable}`}
    >
      <body>
        <I18nProvider locale={locale}>
          <TopBar />
          <Nav />
          <main>{children}</main>
          <Footer />
          <MenuPanel />
          <SearchSheet />
          <AuthModal />
          <Toast />
          <GlobalEffects />
          <RevealObserver />
        </I18nProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
