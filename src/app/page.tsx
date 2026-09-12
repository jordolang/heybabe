import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Manifesto from "@/components/sections/Manifesto";
import Ritual from "@/components/sections/Ritual";
import Chains from "@/components/sections/Chains";
import MetalBand from "@/components/sections/MetalBand";
import WeldBand from "@/components/sections/WeldBand";
import Charms from "@/components/sections/Charms";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import BookCta from "@/components/sections/BookCta";
import { faqs } from "@/data/site";

/**
 * FAQ rich result — the questions are the highest-intent search traffic a
 * permanent jewelry studio gets ("does it hurt", "can I shower in it").
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Preloader />
      <Hero />
      <Marquee />
      <Manifesto />
      <Ritual />
      <Chains />
      <MetalBand />
      <WeldBand />
      <Charms />
      <Services />
      <Gallery />
      <Testimonials />
      <Faq />
      <BookCta />
    </>
  );
}
