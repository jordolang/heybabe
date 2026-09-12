import VideoLoop from "@/components/VideoLoop";
import Reveal from "@/components/Reveal";

/**
 * A quiet full-bleed band between the chain rail and the charms: the metal
 * itself, close up, making the gold-filled argument without a spec sheet.
 */
export default function MetalBand() {
  return (
    <section className="relative h-[62vh] min-h-[420px] overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <VideoLoop
          src="/media/video/chain-macro.mp4"
          poster="/media/video/chain-macro-poster.webp"
        />
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <div className="relative flex h-full items-center justify-center px-6">
        <Reveal className="max-w-[30ch] text-center text-white">
          <p className="eyebrow !text-white/70">Gold-filled, not plated</p>
          <p className="font-display mt-6 text-[clamp(1.5rem,3.6vw,2.8rem)] leading-[1.2]">
            Roughly a hundred times more gold than plating &mdash; which is why
            it is still bright in year five.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
