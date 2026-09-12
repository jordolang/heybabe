import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import { services, site } from "@/data/site";
import { money } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book an event",
  description: `Book ${site.name} for weddings, pop-ups, corporate events and private parties across ${site.serviceArea}. Tell us the date and we'll come back with availability and an exact quote.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="bg-shell pt-[var(--nav-h)]">
      <section className="mx-auto grid max-w-[1500px] gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Enquiries</p>
            <h1 className="font-display t-section mt-5 max-w-[13ch]">
              Tell us the date.
              <span className="text-babe"> We&rsquo;ll do the rest.</span>
            </h1>
            <p className="mt-8 max-w-[46ch] leading-relaxed text-ink-soft">
              Fill this in and we&rsquo;ll come back with availability, a
              guest-flow plan and an exact quote &mdash; usually the same day.
              Nothing is booked until you say so.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t pt-10 hairline">
              <h2 className="eyebrow">Starting points</h2>
              <ul className="mt-6 space-y-4">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-baseline justify-between gap-6 text-[0.98rem]"
                  >
                    <span className="text-ink">{service.kicker}</span>
                    <span aria-hidden className="mx-2 h-px flex-1 bg-ink/10" />
                    <span className="text-ink-soft">
                      {service.from > 0 ? `from ${money(service.from)}` : "rev-share or flat"}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[40ch] text-[0.85rem] text-ink-faint">
                Event fees cover travel, setup and welding time. Guests pay for
                their own chains, or you can pre-buy a package and put it on a
                tab.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mt-12 aspect-16/10 overflow-hidden rounded-[2px]">
              <Image
                src="/media/images/bridal-suite.webp"
                alt="A bride having a delicate gold chain welded on in a sunlit bridal suite"
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
          <Suspense
            fallback={
              <div className="h-[32rem] animate-pulse rounded-[2px] bg-blush-tint" />
            }
          >
            <BookingForm />
          </Suspense>

          <p className="mt-8 text-[0.85rem] text-ink-faint">
            Prefer email? {" "}
            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            &middot;{" "}
            <a
              className="underline underline-offset-4"
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              @{site.instagram}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
