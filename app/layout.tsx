import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/fx/CustomCursor";
import ScrollProgress from "@/components/fx/ScrollProgress";
import { site } from "@/data/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | Industrial & Technology Solutions`,
  description: site.description,
  metadataBase: new URL("https://iemcindia.com"),
  openGraph: {
    title: `${site.name} | Industrial & Technology Solutions`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
