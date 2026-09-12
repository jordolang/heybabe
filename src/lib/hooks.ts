"use client";

import { useEffect, useState } from "react";

/** True once the component has mounted on the client. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Tracks a media query, SSR-safe. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * Respects the OS "reduce motion" setting. Every scroll-driven effect on the
 * site checks this and degrades to a static, readable equivalent.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Coarse pointer / small viewport — we skip the heaviest effects there. */
export function useIsTouch() {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}
