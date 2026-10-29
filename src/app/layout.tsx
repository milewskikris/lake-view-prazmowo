import type { Metadata, Viewport } from "next";
import "@fontsource/libre-caslon-display/400.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { getSiteUrl, isIndexable, SITE_DESCRIPTION } from "@/lib/site";

const TITLE = "Lake View Prażmowo – 16 domów nad jeziorem na Mazurach";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: TITLE,
    template: "%s · Lake View Prażmowo",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Lake View Prażmowo",
  keywords: ["domy na Mazurach", "dom nad jeziorem na Mazurach", "domy w Prażmowie", "nieruchomości nad jeziorem", "Lake View Prażmowo"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Lake View Prażmowo",
    title: TITLE,
    description:
      "Kameralna inwestycja 16 domów jednorodzinnych w Prażmowie nad Jeziorem Jagodnym. Wspólny dostęp do linii brzegowej, pomost dla każdego domu, prywatne miejsce postojowe.",
  },
  twitter: { card: "summary_large_image", title: TITLE },
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1a18",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
      <body>
        <a
          href="#tresc"
          className="sr-only z-[100] bg-smola px-4 py-3 text-jasny focus:not-sr-only focus:fixed focus:top-[max(8px,env(safe-area-inset-top,0px))] focus:left-2"
        >
          Przejdź do treści
        </a>
        {children}
      </body>
    </html>
  );
}
