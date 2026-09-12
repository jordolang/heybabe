"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import VideoLoop from "@/components/VideoLoop";
import { services } from "@/data/site";
import { money } from "@/lib/utils";
import { useIsTouch } from "@/lib/hooks";

/**
 * The four bookable formats. On a pointer device, hovering a card swaps its
 * still for the matching clip — the video only mounts on hover, so four
 * simultaneous decoders never exist. Touch devices get the still, which is
 * the right call for both data and battery.
 */
export default function Services() {
  const [hovered, setHovered] = useState<string | null>(null);
  const isTouch = useIsTouch();

  return (
    <section id="events" className="bg-shell py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Book us</p>
          <h2 className="font-display t-section mt-5 max-w-[16ch]">
            We bring the whole studio
            <span className="text-babe"> to you.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={(i % 2) * 0.1}
              // Appointments is a different shape of offering — not an event —
              // so it takes the full row rather than sitting in the pair grid.
              className={service.wide ? "md:col-span-2" : undefined}
            >
              <article
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-[2px] bg-blush-tint ${
                    service.wide ? "aspect-2/1" : "aspect-16/10"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes={service.wide ? "92vw" : "(min-width: 768px) 46vw, 92vw"}
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-babe)] group-hover:scale-[1.04]"
                  />
                  {!isTouch && service.video && hovered === service.id && (
                    <div className="absolute inset-0 animate-[fade_0.6s_ease] [animation-fill-mode:both]">
                      <VideoLoop
                        src={service.video}
                        poster={service.image}
                        alt={service.alt}
                      />
                    </div>
                  )}
                  <span className="absolute top-5 left-5 rounded-full bg-shell/90 px-4 py-2 text-[0.62rem] tracking-[0.18em] uppercase backdrop-blur">
                    {service.kicker}
                  </span>
                </div>

                <h3 className="font-display mt-7 max-w-[20ch] text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.14]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-[48ch] leading-relaxed text-ink-soft">
                  {service.body}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-[0.85rem] text-ink-faint"
                    >
                      <span aria-hidden className="h-1 w-1 rounded-full bg-rose" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center justify-between border-t pt-5 hairline">
                  <span className="text-[0.9rem] text-ink-soft">
                    {service.from > 0 ? (
                      <>
                        From{" "}
                        <span className="text-ink">{money(service.from)}</span>
                      </>
                    ) : (
                      <span className="text-ink">Rev-share or flat fee</span>
                    )}
                  </span>
                  <Link
                    href={`/book?type=${service.id}`}
                    className="group/link inline-flex items-center gap-2 text-[0.78rem] tracking-[0.16em] uppercase"
                  >
                    Enquire
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-[var(--ease-babe)] group-hover/link:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
