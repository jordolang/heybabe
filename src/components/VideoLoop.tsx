"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Ambient background video that only decodes while it is on screen. Dozens of
 * simultaneously playing <video> elements will stall a phone, so playback is
 * gated on an IntersectionObserver.
 *
 * The poster is painted as a layer underneath rather than relying on the
 * `poster` attribute: the element fades in on first frame, and a hidden
 * element shows no poster of its own, which would otherwise leave a blank
 * plate wherever the clip sits behind a scrim.
 */
export default function VideoLoop({
  src,
  poster,
  className,
  alt,
}: {
  src: string;
  poster: string;
  className?: string;
  /** Described for assistive tech; the element itself stays decorative. */
  alt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Covers the case where the clip is already cached and decoded before
    // React attaches the handler.
    if (video.readyState >= 2) setReady(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${poster})`, opacity: ready ? 0 : 1 }}
      />
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        role={alt ? "img" : undefined}
        aria-hidden={alt ? undefined : true}
        onLoadedData={() => setReady(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
