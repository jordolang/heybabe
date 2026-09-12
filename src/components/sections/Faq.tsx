"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-shell py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Good questions</p>
            <h2 className="font-display t-section mt-5 max-w-[12ch]">
              Everything you&rsquo;re
              <span className="text-babe"> wondering.</span>
            </h2>
            <p className="mt-7 max-w-[34ch] leading-relaxed text-ink-soft">
              Still unsure about something? Message us on Instagram &mdash; we
              answer every one ourselves.
            </p>
          </Reveal>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={Math.min(i, 4) * 0.04}>
                <div className="border-b hairline">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-[clamp(1.15rem,2vw,1.6rem)] transition-colors duration-400",
                          isOpen ? "text-ink" : "text-ink-soft",
                        )}
                      >
                        {faq.q}
                      </span>
                      <span
                        aria-hidden
                        className="relative grid h-7 w-7 shrink-0 place-items-center"
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <motion.span
                          animate={{ rotate: isOpen ? 0 : 90 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute h-px w-3.5 bg-current"
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[58ch] pb-7 leading-relaxed text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
