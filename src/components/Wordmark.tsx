"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Aspect of the trimmed artwork in public/brand/wordmark.png. */
const RATIO = 996 / 632;

/**
 * hey babe's actual wordmark, lifted from the brand logo rather than
 * approximated with a script webfont.
 *
 * It is applied as a CSS mask over `currentColor`, so one asset renders white
 * over the hero footage, ink on the cream page and shell on the dark footer,
 * inheriting colour from whatever it sits inside.
 *
 * Size it with a height utility (`h-[50px]`) and the width follows from the
 * aspect ratio. The mark is a fairly square block — the script carries tall
 * ascenders and a descender loop — so sizing by width gets tall fast.
 */
export default function Wordmark({
  className,
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.span
      role="img"
      aria-label="hey babe"
      className={cn("block shrink-0", className)}
      style={{
        aspectRatio: String(RATIO),
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/wordmark.png)",
        maskImage: "url(/brand/wordmark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      // Wipes left-to-right, the way the mark would be written by hand.
      initial={animate ? { clipPath: "inset(0 100% 0 0)" } : false}
      animate={animate ? { clipPath: "inset(0 0% 0 0)" } : undefined}
      transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
    />
  );
}
