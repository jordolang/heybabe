"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import ScrollVideo, { useScrub } from "@/components/ScrollVideo";
import Wordmark from "@/components/Wordmark";
import { ritual, site } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";
import { clamp } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Clamped 0…1 ramp across a slice of the track. */
const ramp = (v: number, from: number, to: number) =>
  clamp((v - from) / (to - from));

/** 0 → 1 → 0 across a slice, ramping over `fade` at each end. */
const trapezoid = (v: number, start: number, end: number, fade: number) =>
  Math.min(ramp(v, start, start + fade), 1 - ramp(v, end - fade, end));

/**
 * Every scroll-driven value below goes through a transform *function* rather
 * than an input/output range. Framer Motion hands simple two-keyframe
 * scroll-linked opacity ranges to a native ScrollTimeline animation, which it
 * then plays back over the wrong range — the inline style reads correctly while
 * the composited opacity does something else entirely, which is what left the
 * hero type sitting at full strength no matter how far you scrolled. A function
 * has no keyframes to lift, so it stays on the main-thread path and is correct.
 */

/**
 * Where each beat owns the frame, in track progress (0…1). They are butted end
 * to end so one line is always either arriving or leaving — there is no stretch
 * of the hero where scrolling moves the footage but nothing else.
 */
const BEATS = [
  { start: 0.2, end: 0.47 },
  { start: 0.47, end: 0.73 },
  { start: 0.73, end: 0.99 },
] as const;

/** A ritual step, faded through the frame across its slice of the scroll. */
function Beat({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const { start, end } = BEATS[index];
  const step = ritual[index];
  const fade = (end - start) * 0.28;

  const opacity = useTransform(progress, (v) => trapezoid(v, start, end, fade));
  const y = useTransform(progress, (v) => 56 - 112 * ramp(v, start, end));
  const filter = useTransform(
    progress,
    (v) => `blur(${(10 * (1 - trapezoid(v, start, end, fade))).toFixed(2)}px)`,
  );

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center text-white"
    >
      {/* The footage runs bright under the type here, so both lines carry a
          soft shadow rather than relying on the scrim alone. */}
      <p className="eyebrow !text-white/85 drop-shadow-[0_1px_10px_rgba(58,45,41,0.55)]">
        {step.n} &nbsp;&mdash;&nbsp; {step.title}
      </p>
      <p className="font-display mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.15] text-white drop-shadow-[0_2px_20px_rgba(58,45,41,0.45)]">
        {step.lede}
      </p>
    </motion.div>
  );
}

/** The title card: name, promise, CTAs. Owns the top fifth of the track. */
function TitleCard({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  // Lift and dissolve the type quickly — the visitor should see the frame
  // answer their very first flick of the wheel, not half a screen later.
  const y = useTransform(progress, (v) => -140 * ramp(v, 0, 0.24));
  const opacity = useTransform(progress, (v) => 1 - ramp(v, 0, 0.14));
  // Once the card has dissolved its buttons must stop swallowing clicks, or
  // they sit invisibly over the beats for the rest of the hero.
  const pointerEvents = useTransform(progress, (v) =>
    v > 0.12 ? "none" : "auto",
  );
  const style = reduced ? undefined : { y, opacity, pointerEvents };

  return (
    <motion.div
      style={style}
      className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
        className="eyebrow !text-white/80"
      >
        {site.blurb}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 1, ease: EASE }}
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
        transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
        className="font-display mt-7 max-w-[16ch] text-[clamp(1.4rem,3.4vw,2.6rem)] text-white/95"
      >
        Jewelry with no clasp, because some things aren&rsquo;t meant to come off.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
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
    </motion.div>
  );
}

/**
 * Bottom rail: the "Scroll" cue hands over to a filling progress bar the moment
 * the visitor moves, so the hero always shows how much of itself is left.
 */
function Rail({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const cueOpacity = useTransform(progress, (v) => 1 - ramp(v, 0, 0.05));
  const barOpacity = useTransform(progress, (v) => trapezoid(v, 0.01, 1, 0.06));

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 w-[min(240px,56vw)] -translate-x-1/2 text-center">
      <motion.span
        style={{ opacity: cueOpacity }}
        className="eyebrow block !text-[0.6rem] !text-white/70"
      >
        Scroll
      </motion.span>
      <motion.span
        aria-hidden
        style={{ opacity: barOpacity }}
        className="mt-3 block h-px w-full bg-white/25"
      >
        <motion.span
          className="block h-full w-full origin-left bg-white"
          style={{ scaleX: progress }}
        />
      </motion.span>
    </div>
  );
}

function Overlay() {
  const reduced = useReducedMotion();
  const { progress } = useScrub();

  return (
    <>
      <TitleCard progress={progress} />
      {/* The beats are a scroll-only device; with reduced motion they would all
          land stacked on top of each other, so the title card stands alone. */}
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          {BEATS.map((_, i) => (
            <Beat key={i} progress={progress} index={i} />
          ))}
        </div>
      )}
      <Rail progress={progress} />
    </>
  );
}

export default function Hero() {
  return (
    <section aria-label="Introduction">
      <ScrollVideo
        src="/media/video/hero.scrub.mp4"
        srcMobile="/media/video/hero-vertical.scrub.mp4"
        poster="/media/video/hero-poster.webp"
        length={2.2}
        lengthMobile={1.9}
        scrim={0.3}
      >
        <Overlay />
      </ScrollVideo>
    </section>
  );
}
