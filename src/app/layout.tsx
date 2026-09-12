import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Sacramento } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
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

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} | ${site.collective} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "permanent jewelry",
    "welded bracelets",
    "permanent bracelet",
    "permanent anklet",
    "permanent necklace",
    "handchain",
    "14k gold filled",
    "sterling silver",
    "wedding favors",
    "bachelorette party",
    "corporate event jewelry",
    "pop-up jewelry",
    // The four states served, plus their metros — this is how people search.
    ...site.states.map((state) => `permanent jewelry ${state}`),
    "permanent jewelry near me",
  ],
  openGraph: {
    type: "website",
    url: siteUrl(),
    title: `${site.name} | ${site.collective} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.collective} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fdf8f5",
  colorScheme: "light",
};

const jsonLd = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: site.name,
  alternateName: site.collective,
  description: site.description,
  url: origin,
  email: site.email,
  logo: `${origin}/brand/logo-badge.png`,
  image: `${origin}/opengraph-image`,
  // Serves four states rather than a single storefront location.
  areaServed: site.states.map((state) => ({
    "@type": "State",
    name: state,
  })),
  sameAs: [site.instagramUrl],
  priceRange: "$$",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Permanent jewelry for private parties, pop-ups and events",
        serviceType: "Permanent jewelry",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Permanent jewelry appointments",
        serviceType: "Permanent jewelry",
      },
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Custom permanent jewelry",
    itemListElement: ["Bracelets", "Anklets", "Necklaces", "Handchains"].map(
      (name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name, material: "14K gold-filled, sterling silver" },
      }),
    ),
  },
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${sacramento.variable}`}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(siteUrl())) }}
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
