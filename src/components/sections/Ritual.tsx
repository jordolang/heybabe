"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { ritual } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The three-step explainer. On desktop the imagery pins to the viewport and
 * cross-fades as each step scrolls through, so the copy reads as one
 * continuous thought against a single changing frame. Below `lg` it degrades
 * to a plain stacked list, which is what actually reads well on a phone.
 */
export default function Ritual() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.index);
          setActive(i);
        }
      },
      // Narrow band across the middle of the viewport: whichever step is
      // crossing the centre line owns the image.
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="ritual" className="relative bg-shell-deep">
      <div className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <p className="eyebrow">The ritual</p>
          <h2 className="font-display t-section mt-5 max-w-[14ch]">
            Three minutes,
            <span className="text-babe"> start to forever.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-16 px-5 pb-24 sm:px-8 sm:pb-32 lg:grid-cols-2 lg:gap-24">
        {/* Copy column */}
        <div className="lg:pt-24">
          {ritual.map((step, i) => (
            <div
              key={step.n}
              data-index={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex flex-col justify-center border-b py-14 last:border-b-0 hairline lg:min-h-[72vh] lg:py-12"
            >
              <Reveal>
                <div className="flex items-baseline gap-5">
                  <span
                    className={cn(
                      "font-display text-[2.6rem] transition-colors duration-700",
                      active === i ? "text-mauve" : "text-ink-faint/45",
                    )}
                  >
                    {step.n}
                  </span>
                  <h3 className="font-display text-[clamp(2rem,4.4vw,3.4rem)]">
                    {step.title}
                  </h3>
                </div>

                {/* Mobile gets the image inline; desktop uses the pinned frame. */}
                <div className="relative mt-8 aspect-4/5 w-full overflow-hidden rounded-[2px] lg:hidden">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 0px"
                    className="object-cover"
                  />
                </div>

                <p className="font-display mt-7 text-[clamp(1.2rem,2.2vw,1.7rem)] text-ink">
                  {step.lede}
                </p>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Pinned image column */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+3rem)] h-[72vh] overflow-hidden rounded-[2px]">
            {ritual.map((step, i) => (
              <div
                key={step.n}
                aria-hidden={active !== i}
                className={cn(
                  "absolute inset-0 transition-all duration-[900ms] ease-[var(--ease-babe)]",
                  active === i
                    ? "scale-100 opacity-100"
                    : "scale-[1.04] opacity-0",
                )}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 0px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink/45 to-transparent p-7">
              {ritual.map((step, i) => (
                <span
                  key={step.n}
                  className={cn(
                    "h-px flex-1 transition-colors duration-700",
                    active >= i ? "bg-white" : "bg-white/30",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
