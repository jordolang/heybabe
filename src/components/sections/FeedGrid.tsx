"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { FeedItem } from "@/lib/instagram";
import { useReducedMotion } from "@/lib/hooks";

/** Each tile drifts at a slightly different rate for a layered, printed feel. */
function Tile({ item, drift, tall }: { item: FeedItem; drift: number; tall: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  const media = (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[2px] bg-blush-tint ${
        tall ? "aspect-4/5" : "aspect-square"
      }`}
    >
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[8%]"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-babe)] group-hover:scale-[1.04]"
        />
      </motion.div>

      {item.isVideo && (
        <span
          aria-hidden
          className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-shell/85 backdrop-blur"
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
            <path d="M0 0.8v10.4L10 6 0 0.8Z" fill="currentColor" />
          </svg>
        </span>
      )}
    </div>
  );

  if (!item.permalink) return media;

  return (
    <a
      href={item.permalink}
      target="_blank"
      rel="noreferrer noopener"
      className="group block"
    >
      {media}
    </a>
  );
}

export default function FeedGrid({ items }: { items: FeedItem[] }) {
  return (
    <div className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal
          key={item.id}
          delay={(i % 3) * 0.08}
          // Drop the middle column so the mixed tile ratios read as a
          // deliberate stagger rather than a grid that failed to line up.
          className={i % 3 === 1 ? "md:mt-16" : undefined}
        >
          <Tile item={item} tall={i % 3 !== 1} drift={24 + (i % 3) * 12} />
        </Reveal>
      ))}
    </div>
  );
}
