"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline read-out of how far through the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-babe fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
    />
  );
}
