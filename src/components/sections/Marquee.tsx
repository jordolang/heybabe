import { marqueeWords } from "@/data/site";
import type { CSSProperties } from "react";

/**
 * The service list from the back of the card, running as a ticker.
 * Content is duplicated so the -50% keyframe loop is seamless; the copy is
 * hidden from assistive tech to avoid reading the list twice.
 */
export default function Marquee() {
  return (
    <section
      className="bg-babe grain relative overflow-hidden py-6"
      aria-label="What we do"
    >
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": "46s" } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {marqueeWords.map((word, i) => (
              <li key={`${copy}-${i}`} className="flex items-center">
                <span className="font-display px-7 text-[clamp(1.5rem,3.2vw,2.6rem)] whitespace-nowrap text-white">
                  {word}
                </span>
                <span aria-hidden className="text-white/55">
                  &bull;
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
