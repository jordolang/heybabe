"use client";

import Image from "next/image";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { chains } from "@/data/site";
import { money } from "@/lib/utils";

/**
 * The chain menu as a horizontal rail. Native scroll-snap does the heavy
 * lifting (so trackpads, touch and keyboard all behave), with arrow buttons
 * for mouse users who have no horizontal gesture.
 */
export default function Chains() {
  const railRef = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="chains" className="bg-shell py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="eyebrow">The chains</p>
            <h2 className="font-display t-section mt-5 max-w-[15ch]">
              Solid metal,<span className="text-babe"> never plated.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[38ch]">
            <p className="leading-relaxed text-ink-soft">
              Every chain is 14K gold-filled or solid sterling silver, so it
              lives in water and daylight without turning. Pick one, or layer
              two and let them tangle.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Previous chains"
                className="grid h-12 w-12 place-items-center rounded-full border transition-colors duration-400 hairline hover:bg-blush-tint"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 2.5 4.5 8l5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Next chains"
                className="grid h-12 w-12 place-items-center rounded-full border transition-colors duration-400 hairline hover:bg-blush-tint"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 2.5 11.5 8 6 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <ul
        ref={railRef}
        className="no-bar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8"
        aria-label="Chain styles"
      >
        {chains.map((chain, i) => (
          <li
            key={chain.id}
            className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[26vw] xl:w-[22vw]"
          >
            <Reveal delay={Math.min(i, 3) * 0.06}>
              <article className="group">
                <div className="relative aspect-square overflow-hidden rounded-[2px] bg-blush-tint">
                  <Image
                    src={chain.image}
                    alt={chain.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 24vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-babe)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-shell/90 px-3.5 py-1.5 text-[0.6rem] tracking-[0.16em] uppercase backdrop-blur">
                    {chain.metal}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4 pt-5">
                  <h3 className="font-display text-[1.6rem]">{chain.name}</h3>
                  <span className="text-[0.95rem] text-ink-soft">
                    {money(chain.price)}
                  </span>
                </div>
                <p className="mt-1 text-[0.82rem] tracking-[0.1em] text-ink-faint uppercase">
                  {chain.detail}
                </p>
                <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed text-ink-soft">
                  {chain.note}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-[1500px] px-5 sm:px-8">
        <p className="text-[0.85rem] text-ink-faint">
          Prices are per chain and include sizing, welding and a lifetime of
          free re-welds.
        </p>
      </div>
    </section>
  );
}
