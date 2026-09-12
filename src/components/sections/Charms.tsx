import Image from "next/image";
import Reveal from "@/components/Reveal";
import { charms } from "@/data/site";
import { money } from "@/lib/utils";

export default function Charms() {
  return (
    <section id="charms" className="relative overflow-hidden bg-shell-deep py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">Charms</p>
            <h2 className="font-display t-section mt-5 max-w-[13ch]">
              Then make it
              <span className="text-babe"> unmistakably yours.</span>
            </h2>
            <p className="mt-7 max-w-[44ch] leading-relaxed text-ink-soft">
              {charms.intro}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {charms.items.map((charm) => (
                <li
                  key={charm.name}
                  className="group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[0.9rem] transition-colors duration-500 hairline hover:border-transparent hover:bg-babe hover:text-white"
                >
                  <span>{charm.name}</span>
                  <span className="text-ink-faint transition-colors duration-500 group-hover:text-white/75">
                    {money(charm.price)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[0.85rem] text-ink-faint">
              Charms run {money(charms.priceFrom)}&ndash;{money(charms.priceTo)} and
              are welded on at the same time as your chain.
            </p>
          </Reveal>
        </div>

        <div className="order-1 grid grid-cols-5 gap-4 lg:order-2">
          <Reveal className="col-span-3">
            <div className="relative aspect-square overflow-hidden rounded-[2px]">
              <Image
                src={charms.image}
                alt={charms.alt}
                fill
                sizes="(min-width: 1024px) 28vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="col-span-2 self-end">
            <div className="relative aspect-square overflow-hidden rounded-[2px]">
              <Image
                src={charms.detailImage}
                alt={charms.detailAlt}
                fill
                sizes="(min-width: 1024px) 19vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
