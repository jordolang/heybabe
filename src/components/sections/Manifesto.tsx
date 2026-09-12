import Reveal, { RevealWords } from "@/components/Reveal";
import { manifesto } from "@/data/site";

export default function Manifesto() {
  return (
    <section className="relative bg-shell px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal>
          <p className="eyebrow">{manifesto.eyebrow}</p>
        </Reveal>

        <p className="font-display mt-10 text-[clamp(1.65rem,4.2vw,3.4rem)] leading-[1.24] text-ink">
          <RevealWords text={manifesto.body} />
        </p>

        <Reveal delay={0.25}>
          <p className="font-script mt-12 text-[clamp(1.6rem,3.2vw,2.4rem)] text-mauve">
            {manifesto.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
