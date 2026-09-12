"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import ScrollVideo from "@/components/ScrollVideo";
import Wordmark from "@/components/Wordmark";
import { site } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";

function Overlay() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Lift and dissolve the type over roughly the first screen of scroll so the
  // footage is left to speak for itself.
  const y = useTransform(scrollY, [0, 700], [0, -110]);
  const opacity = useTransform(scrollY, [0, 430], [1, 0]);
  const style = reduced ? undefined : { y, opacity };

  return (
    <motion.div
      style={style}
      className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="eyebrow !text-white/80"
      >
        {site.blurb}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.95, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5"
      >
        <Wordmark
          animate
          className="mx-auto h-[clamp(104px,17vw,208px)] drop-shadow-[0_2px_28px_rgba(58,45,41,0.35)]"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display mt-7 max-w-[16ch] text-[clamp(1.4rem,3.4vw,2.6rem)] text-white/95"
      >
        Jewelry with no clasp, because some things aren&rsquo;t meant to come off.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link
          href="/book"
          className="group relative overflow-hidden rounded-full bg-white px-9 py-4 text-[0.78rem] tracking-[0.18em] text-ink uppercase"
        >
          <span className="relative z-10">Book your event</span>
          <span
            aria-hidden
            className="bg-babe absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-babe)] group-hover:translate-y-0"
          />
        </Link>
        <a
          href="#ritual"
          className="rounded-full border border-white/45 px-9 py-4 text-[0.78rem] tracking-[0.18em] text-white uppercase transition-colors duration-500 hover:bg-white/12"
        >
          How it works
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="eyebrow !text-[0.6rem] !text-white/70">Scroll</span>
        <span
          aria-hidden
          className="mx-auto mt-3 block h-10 w-px overflow-hidden bg-white/25"
        >
          <motion.span
            className="block h-full w-full bg-white"
            animate={reduced ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section aria-label="Introduction">
      <ScrollVideo
        src="/media/video/hero.scrub.mp4"
        srcMobile="/media/video/hero-vertical.scrub.mp4"
        poster="/media/video/hero-poster.webp"
        length={2.8}
        scrim={0.3}
      >
        <Overlay />
      </ScrollVideo>
    </section>
  );
}
