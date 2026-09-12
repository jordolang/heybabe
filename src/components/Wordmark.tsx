"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The "hey babe" wordmark: handwritten script over a single drawn rule,
 * rebuilt from the brand card. The rule draws itself on first paint.
 */
export default function Wordmark({
  className,
  animate = false,
  underline = true,
}: {
  className?: string;
  animate?: boolean;
  underline?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="font-script block pb-[0.06em]">hey babe</span>
      {underline && (
        <svg
          viewBox="0 0 320 10"
          className="-mt-[0.06em] block w-full overflow-visible"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M3 6.2C58 3.4 128 2.2 196 2.6C246 2.9 286 3.8 317 5.1"
            stroke="currentColor"
            strokeWidth={4.5}
            strokeLinecap="round"
            initial={animate ? { pathLength: 0 } : false}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          />
        </svg>
      )}
    </span>
  );
}
