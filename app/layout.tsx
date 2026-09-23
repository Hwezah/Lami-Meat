import type { Metadata, Viewport } from "next";
import { Anton, Hanken_Grotesk, Space_Mono } from "next/font/google";
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
import "./globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], style: ["normal", "italic"], variable: "--font-hanken" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "LAMI MEAT — Smokehouse & Butchery, Kampala", template: "%s — LAMI MEAT" },
  description: "Smoked beef sausages, hot dogs and fresh minced beef from LAMI MEAT, Kampala. Order by WhatsApp with cold delivery.",
  openGraph: { siteName: "LAMI MEAT", locale: "en_UG", type: "website" },
};

export const viewport: Viewport = { themeColor: "#16171A" };

// LocalBusiness JSON-LD. Fill in address/geo once the client confirms them.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  telephone: `+${site.whatsapp}`,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
  openingHours: "Mo-Sa 08:00-18:00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${spaceMono.variable} ${anton.variable}`}>
      <body>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
