"use client";

import { useState, useSyncExternalStore } from "react";
import { cn } from "@/frontend/lib/cn";

type BackgroundVideoProps = {
  /** Video files played back to back in a random order per visitor. Nothing is rendered when empty. */
  sources?: readonly string[];
  /** Lighter files for narrow screens. */
  sourcesMobile?: readonly string[];
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

function shuffledIndexes(length: number) {
  const indexes = Array.from({ length }, (_, index) => index);
  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

/**
 * Muted, inline, inline background video. It only mounts when the visitor has not asked
 * for reduced motion or data saving, and fades in over the poster once it is playing.
 * Each visitor gets a random order; the next video starts when the current one ends and the
 * sequence repeats.
 */
export function BackgroundVideo({
  sources,
  sourcesMobile,
  poster,
  className,
}: BackgroundVideoProps) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => "off");
  const [playing, setPlaying] = useState(false);
  const [order] = useState(() => shuffledIndexes(sources?.length ?? 0));
  const [position, setPosition] = useState(0);

  const list = (mode === "narrow" ? sourcesMobile : sources) ?? [];
  const file = list.length ? list[order[position % order.length] % list.length] : undefined;
  const single = list.length < 2;
  if (!file || mode === "off") return null;

  return (
    <video
      className={cn(
        "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500",
        playing && "opacity-100",
        className,
      )}
      src={file}
      poster={poster}
      autoPlay
      muted
      loop={single}
      playsInline
      preload="metadata"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      onEnded={() => setPosition((current) => current + 1)}
    />
  );
}
