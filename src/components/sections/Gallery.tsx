"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { gallery, site } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";

/** Each tile drifts at a slightly different rate for a layered, printed feel. */
function Tile({
  src,
  alt,
  tall,
  drift,
}: {
  src: string;
  alt: string;
  tall: boolean;
  drift: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[2px] bg-blush-tint ${
        tall ? "aspect-4/5" : "aspect-4/3"
      }`}
    >
      <motion.div style={reduced ? undefined : { y }} className="absolute -inset-y-[8%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 32vw, 92vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="stories" className="bg-shell-deep py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">In the wild</p>
          <h2 className="font-display t-section mt-5 max-w-[16ch]">
            Worn on wrists all over
            <span className="text-babe"> {site.serviceArea}.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:gap-6 md:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 3) * 0.08}
              // Drop the middle column so the mixed tile ratios read as a
              // deliberate stagger rather than a grid that failed to line up.
              className={i % 3 === 1 ? "md:mt-16" : undefined}
            >
              <Tile
                src={item.src}
                alt={item.alt}
                tall={item.span === "tall"}
                drift={24 + (i % 3) * 12}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-14 inline-flex items-center gap-3 text-[0.8rem] tracking-[0.16em] uppercase"
          >
            More on Instagram &mdash; @{site.instagram}
            <span
              aria-hidden
              className="transition-transform duration-500 ease-[var(--ease-babe)] group-hover:translate-x-1.5"
            >
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
