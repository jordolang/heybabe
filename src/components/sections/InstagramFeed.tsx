import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { getInstagramFeed } from "@/lib/instagram";
import FeedGrid from "./FeedGrid";

/**
 * Server component: pulls the live Instagram grid at request time (cached for
 * an hour) so new posts appear without a redeploy, and falls back to the
 * curated local gallery when no token is configured.
 */
export default async function InstagramFeed() {
  const { items, live } = await getInstagramFeed();

  return (
    <section id="gallery" className="bg-shell-deep py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="eyebrow">{live ? "Latest from the grid" : "In the wild"}</p>
            <h2 className="font-display t-section mt-5 max-w-[15ch]">
              Worn on wrists across
              <span className="text-babe"> all four states.</span>
            </h2>
            {/* Full state names rather than the abbreviations — this is the
                line that actually earns the local search traffic. */}
            <p className="mt-6 max-w-[40ch] leading-relaxed text-ink-soft">
              {site.states.join(" · ")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 rounded-full border px-7 py-4 text-[0.78rem] tracking-[0.16em] uppercase transition-colors duration-500 hairline hover:bg-blush-tint"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" />
              </svg>
              @{site.instagram}
              <span
                aria-hidden
                className="transition-transform duration-500 ease-[var(--ease-babe)] group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>

        <FeedGrid items={items} />
      </div>
    </section>
  );
}
