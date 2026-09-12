import Link from "next/link";
import { nav, site } from "@/data/site";
import Wordmark from "./Wordmark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-shell">
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark className="text-[2.6rem]" />
            <p className="mt-7 max-w-[34ch] leading-relaxed text-shell/60">
              {site.tagline}. {site.blurb}. Serving {site.serviceArea} and
              travelling for the big ones.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow !text-shell/45">Explore</h2>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-shell/80 transition-colors duration-400 hover:text-shell"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="text-shell/80 transition-colors duration-400 hover:text-shell"
                >
                  Book an event
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow !text-shell/45">Say hi</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-shell/80 transition-colors duration-400 hover:text-shell"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-shell/80 transition-colors duration-400 hover:text-shell"
                >
                  @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-shell/12 pt-8 text-[0.8rem] text-shell/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>14K gold-filled &amp; sterling silver. Never plated.</p>
        </div>
      </div>
    </footer>
  );
}
