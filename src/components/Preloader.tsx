"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { useReducedMotion } from "@/lib/hooks";

/**
 * A brief blush curtain over the first paint, so the hero video has a moment
 * to buffer and the wordmark lands before anything else does. Kept short —
 * it is a flourish, not a toll gate — and skipped entirely for reduced motion.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), 1750);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="bg-babe grain fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-white"
          >
            <Wordmark animate className="mx-auto h-[clamp(92px,15vw,160px)]" />
            <motion.p
              className="eyebrow mt-6 !text-white/75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Handcrafted &amp; Permanent Fine Jewelry
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
