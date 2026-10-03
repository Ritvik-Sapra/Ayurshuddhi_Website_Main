"use client";

import { useState, useSyncExternalStore } from "react";
import { cn } from "@/frontend/lib/cn";

type BackgroundVideoProps = {
  /** Video file, e.g. "/media/hero.mp4". Nothing is rendered when empty. */
  src?: string;
  /** Lighter file for narrow screens. Falls back to `src`. */
  srcMobile?: string;
  poster?: string;
  className?: string;
};

function subscribe(callback: () => void) {
  const queries = [
    window.matchMedia("(min-width: 768px)"),
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  ];
  queries.forEach((query) => query.addEventListener("change", callback));
  return () => queries.forEach((query) => query.removeEventListener("change", callback));
}

type NetworkInformation = { saveData?: boolean };

function getSnapshot() {
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection
    ?.saveData;
  return !reduced && !saveData ? (wide ? "wide" : "narrow") : "off";
}

/**
 * Muted, looping, inline background video. It only mounts when the visitor has not asked
 * for reduced motion or data saving, and fades in over the poster once it is playing.
 */
export function BackgroundVideo({ src, srcMobile, poster, className }: BackgroundVideoProps) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => "off");
  const [playing, setPlaying] = useState(false);

  const file = mode === "narrow" ? srcMobile : src;
  if (!file || mode === "off") return null;

  return (
    <video
      key={file}
      className={cn(
        "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500",
        playing && "opacity-100",
        className,
      )}
      src={file}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
    />
  );
}
