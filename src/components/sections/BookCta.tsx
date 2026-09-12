import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Wordmark from "@/components/Wordmark";
import { site } from "@/data/site";

export default function BookCta() {
  return (
    <section className="bg-babe grain relative overflow-hidden">
      <div className="mx-auto grid max-w-[1500px] items-stretch lg:grid-cols-2">
        <div className="relative order-2 min-h-[380px] lg:order-1 lg:min-h-[640px]">
          <Image
            src="/media/images/founder.webp"
            alt="The hey babe jeweler holding a fine gold chain up to the light at her pop-up table"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 flex flex-col justify-center px-6 py-24 text-white sm:px-14 lg:order-2 lg:py-32">
          <Reveal>
            <p className="eyebrow !text-white/75">Let&rsquo;s plan it</p>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.05]">
              Tell us the date.
              <br />
              We&rsquo;ll bring the sparks.
            </h2>
            <p className="mt-7 max-w-[42ch] leading-relaxed text-white/85">
              Weddings, pop-ups, corporate nights and parties across{" "}
              {site.serviceArea}. Send us the details and we&rsquo;ll come back
              with availability and an exact quote &mdash; usually the same day.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/book"
                className="group relative overflow-hidden rounded-full bg-white px-10 py-4.5 text-center text-[0.78rem] tracking-[0.18em] text-ink uppercase"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Check your date
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[var(--ease-babe)] group-hover:translate-y-0"
                />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-white/50 px-10 py-4.5 text-center text-[0.78rem] tracking-[0.18em] text-white uppercase transition-colors duration-500 hover:bg-white/12"
              >
                Email us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Wordmark className="mt-16 h-[62px] opacity-75" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
