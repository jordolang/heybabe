import Image from "next/image";
import Reveal from "@/components/Reveal";
import { pieces } from "@/data/site";

/** The four things hey babe makes: bracelets, anklets, necklaces, handchains. */
export default function Pieces() {
  return (
    <section id="pieces" className="bg-shell py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">What we make</p>
          <h2 className="font-display t-section mt-5 max-w-[15ch]">
            Four ways to wear it
            <span className="text-babe"> permanently.</span>
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {pieces.map((piece, i) => (
            <li key={piece.id}>
              <Reveal delay={Math.min(i, 3) * 0.08}>
                <article className="group">
                  <div className="relative aspect-4/5 overflow-hidden rounded-[2px] bg-blush-tint">
                    <Image
                      src={piece.image}
                      alt={piece.alt}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-babe)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="font-display mt-6 text-[1.7rem]">{piece.name}</h3>
                  <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed text-ink-soft">
                    {piece.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
