"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import Wordmark from "./Wordmark";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Only the homepage puts a full-bleed video behind the bar. Everywhere else
  // the page is cream from the first pixel, so the light treatment would be
  // invisible — those pages start solid.
  const overHero = pathname === "/";
  const solid = !overHero || scrolled;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Hide on the way down, reveal the moment they scroll back up.
    setHidden(y > prev && y > 320 && !open);
  });

  // The menu is a full overlay; lock the page behind it.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          solid && !open
            ? "border-b bg-shell/80 backdrop-blur-xl hairline"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1500px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className={cn(
              "transition-colors duration-500",
              open ? "text-white" : solid ? "text-ink" : "text-white",
            )}
          >
            <Wordmark className="h-[42px] sm:h-[48px]" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-[0.8rem] tracking-[0.14em] uppercase transition-colors duration-500",
                  solid ? "text-ink-soft hover:text-ink" : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
                <span className="bg-babe absolute -bottom-1.5 left-0 h-px w-0 transition-[width] duration-500 ease-[var(--ease-babe)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className={cn(
                "hidden rounded-full px-6 py-3 text-[0.78rem] tracking-[0.16em] uppercase transition-all duration-500 sm:inline-block",
                solid
                  ? "bg-ink text-shell hover:bg-mauve"
                  : "bg-white/95 text-ink hover:bg-white",
              )}
            >
              Book an event
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-50 grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 lg:hidden",
                open ? "text-white" : solid ? "text-ink" : "text-white",
              )}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3.5 w-6">
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 top-0 block h-[1.5px] bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 bottom-0 block h-[1.5px] bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="bg-babe grain fixed inset-0 z-40 flex flex-col justify-center px-7 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display border-b border-white/25 py-4 text-[2.75rem] text-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-col gap-4"
            >
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white px-8 py-4 text-center text-[0.8rem] tracking-[0.18em] text-ink uppercase"
              >
                Book an event
              </Link>
              <a
                href={site.instagramUrl}
                className="text-center text-[0.8rem] tracking-[0.18em] text-white/85 uppercase"
              >
                @{site.instagram}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
