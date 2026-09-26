"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScroll, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { clamp, damp } from "@/lib/utils";

type Scrub = {
  /** 0…1 across the pinned track. */
  progress: MotionValue<number>;
  /** True once the footage has decoded a frame and can be scrubbed. */
  ready: boolean;
};

const ScrubContext = createContext<Scrub | null>(null);

/** Progress and readiness of the enclosing `<ScrollVideo>`. */
export function useScrub(): Scrub {
  const ctx = useContext(ScrubContext);
  if (!ctx) throw new Error("useScrub must be called inside <ScrollVideo>");
  return ctx;
}

type Props = {
  /** All-keyframe encode (see tools/media.mjs) so seeks land instantly. */
  src: string;
  /** Optional portrait source swapped in below `breakpoint`. */
  srcMobile?: string;
  poster: string;
  /** How many viewport heights the clip is scrubbed across. */
  length?: number;
  /** Optional shorter travel below `breakpoint`, where scroll costs more. */
  lengthMobile?: number;
  className?: string;
  /** Rendered over the pinned video, inside the sticky frame. */
  children?: React.ReactNode;
  /** Dark scrim strength over the footage, 0–1. */
  scrim?: number;
};

/**
 * A video pinned to the viewport whose playhead is driven by scroll position
 * rather than by time — scroll down and the footage advances, scroll back and
 * it rewinds. The scroll maps linearly onto 0…duration across `length`
 * viewport heights of travel.
 *
 * The seek is smoothed in a rAF loop rather than written straight from the
 * scroll handler: browsers throttle rapid `currentTime` writes, and easing
 * toward the target keeps the footage fluid instead of steppy. The very first
 * seek is an exception — it is written flat, without easing, because on a cold
 * load the clip's metadata often lands *after* the visitor has already started
 * scrolling, and damping up from zero there would replay travel they have
 * already done while the frame sits visibly stuck.
 *
 * With reduced motion the clip simply loops on its own and the scrub is off.
 */
export default function ScrollVideo({
  src,
  srcMobile,
  poster,
  length = 3,
  lengthMobile,
  className = "",
  children,
  scrim = 0.18,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Pick the portrait encode and the shorter travel on narrow screens. Done in
  // an effect (not SSR) so we never download both.
  const [source, setSource] = useState(src);
  const [travel, setTravel] = useState(length);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 820px)");
    const apply = () => {
      if (srcMobile) setSource(mql.matches ? srcMobile : src);
      setTravel(mql.matches ? (lengthMobile ?? length) : length);
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [src, srcMobile, length, lengthMobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced) {
      video.loop = true;
      void video.play().catch(() => {});
      return;
    }

    let raf = 0;
    let last = performance.now();
    let smoothed = 0;
    let synced = false;
    let disposed = false;

    const tick = (now: number) => {
      if (disposed) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const target = clamp(scrollYProgress.get()) * duration;
        if (!synced) {
          // First frame we can actually seek: jump straight to wherever the
          // visitor already is instead of easing there from the top.
          synced = true;
          smoothed = target;
          video.currentTime = target;
        } else {
          // Settle fast enough to feel attached to the finger, slow enough to
          // smooth over scroll jitter.
          smoothed = damp(smoothed, target, 12, dt);
          // Sub-frame deltas aren't visible and cost a decode, so skip them.
          if (Math.abs(video.currentTime - smoothed) > 1 / 60) {
            video.currentTime = smoothed;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, [reduced, scrollYProgress]);

  return (
    <ScrubContext.Provider value={{ progress: scrollYProgress, ready }}>
      <div
        ref={trackRef}
        className={className}
        // With reduced motion the clip just loops and nothing is scrubbed, so
        // the extra travel would be scroll that buys the visitor nothing.
        style={{ height: reduced ? "100svh" : `${travel * 100}vh` }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Poster underlay keeps the frame filled before the first decode. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url(${poster})`, opacity: ready ? 0 : 1 }}
          />
          <video
            ref={videoRef}
            key={source}
            src={source}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
            onLoadedData={() => setReady(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(58,45,41,${scrim * 1.3}) 0%, rgba(58,45,41,${scrim * 0.3}) 38%, rgba(58,45,41,${scrim * 1.6}) 100%)`,
            }}
          />
          {children}
        </div>
      </div>
    </ScrubContext.Provider>
  );
}
