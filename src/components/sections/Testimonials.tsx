"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import VideoLoop from "@/components/VideoLoop";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const current = testimonials[index];

  return (
    <section
      className="relative overflow-hidden py-28 sm:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="What people say"
    >
      {/* Silk plate behind the quotes. */}
      <div aria-hidden className="absolute inset-0">
        <VideoLoop src="/media/video/silk.mp4" poster="/media/video/silk-poster.webp" />
        <div className="absolute inset-0 bg-shell/72" />
      </div>

      <div className="relative mx-auto max-w-[1000px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">Kind words</p>
        </Reveal>

        <div className="relative mt-10 min-h-[17rem] sm:min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <p className="font-display text-[clamp(1.35rem,3.4vw,2.6rem)] leading-[1.3] text-ink">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <span className="font-script text-[1.4rem] text-mauve">
                  {current.name}
                </span>
                <span className="mt-1 block text-[0.75rem] tracking-[0.18em] text-ink-faint uppercase">
                  {current.context}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show review ${i + 1} of ${testimonials.length}`}
              aria-current={i === index}
              className="group p-2"
            >
              <span
                className={cn(
                  "block h-px w-9 transition-colors duration-500",
                  i === index ? "bg-ink" : "bg-ink-faint/40 group-hover:bg-ink-faint",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
