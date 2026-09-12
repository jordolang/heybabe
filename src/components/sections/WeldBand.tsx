import ScrollVideo from "@/components/ScrollVideo";
import { RevealWords } from "@/components/Reveal";

/**
 * Mid-page breather: the weld itself, scrubbed by scroll. The moment the
 * whole business turns on, given a full screen and nothing to compete with.
 */
export default function WeldBand() {
  return (
    <section aria-label="The weld">
      <ScrollVideo
        src="/media/video/weld.scrub.mp4"
        poster="/media/video/weld-poster.webp"
        length={2.4}
        scrim={0.34}
      >
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-[20ch] text-center text-white">
            <p className="eyebrow !text-white/70">Two seconds</p>
            <p className="font-display mt-6 text-[clamp(2rem,6vw,4.6rem)] leading-[1.06]">
              <RevealWords text="One spark and it's yours." />
            </p>
            <p className="mx-auto mt-7 max-w-[32ch] text-[0.98rem] leading-relaxed text-white/80">
              The weld touches the chain, never your skin. Most people are
              surprised it is already over.
            </p>
          </div>
        </div>
      </ScrollVideo>
    </section>
  );
}
