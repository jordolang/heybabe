import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "permanent jewelry",
    "welded bracelets",
    "permanent bracelet",
    "14k gold filled",
    "sterling silver",
    "wedding favors",
    "bachelorette party",
    "corporate event jewelry",
    "pop-up jewelry",
    site.serviceArea,
  ],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fdf8f5",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: site.serviceArea,
  sameAs: [site.instagramUrl],
  priceRange: "$$",
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Permanent jewelry welding for events",
      serviceType: "Permanent jewelry",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${kaushan.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed top-3 left-3 z-[200] rounded-full bg-ink px-5 py-3 text-sm text-shell"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
