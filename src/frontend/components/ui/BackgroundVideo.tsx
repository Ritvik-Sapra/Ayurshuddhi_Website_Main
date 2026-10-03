"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/frontend/lib/cn";

type BackgroundVideoProps = {
  /** Video files played back to back in a random order per visitor. Nothing is rendered when empty. */
  sources?: readonly string[];
  /** Lighter files for narrow screens. */
  sourcesMobile?: readonly string[];
  poster?: string;
  className?: string;
};

/** Seconds before the end at which the next clip starts and the crossfade begins. */
const CROSSFADE_SECONDS = 1.5;

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
 * Muted, inline background video. It only mounts when the visitor has not asked for reduced
 * motion or data saving, and fades in over the poster once it is playing.
 * Each visitor gets a random order. Two stacked players alternate: the idle one buffers the next
 * clip while the current one plays, then starts and crossfades in shortly before the current clip
 * ends, so the loop has no load delay or black frame.
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
  // Track number loaded in each of the two players; the active one is `position % 2`.
  const [slotTracks, setSlotTracks] = useState<[number, number]>([0, 1]);
  const players = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const advancedFrom = useRef(-1);
  const swapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(swapTimer.current), []);

  const list = (mode === "narrow" ? sourcesMobile : sources) ?? [];
  if (!list.length || mode === "off") return null;

  const single = list.length < 2;
  const fileFor = (track: number) => list[order[track % order.length] % list.length];
  const activeSlot = position % 2;

  function advance() {
    if (advancedFrom.current === position) return;
    advancedFrom.current = position;
    const next = players.current[(position + 1) % 2];
    if (next) {
      next.currentTime = 0;
      next.play().catch(() => {});
    }
    setPosition(position + 1);
    // Once the fade has finished, reload the idle player with the clip after next.
    const finished = position;
    swapTimer.current = setTimeout(() => {
      players.current[finished % 2]?.pause();
      setSlotTracks((tracks) => {
        const updated: [number, number] = [tracks[0], tracks[1]];
        updated[finished % 2] = finished + 2;
        return updated;
      });
    }, CROSSFADE_SECONDS * 1000 + 200);
  }

  if (single) {
    return (
      <video
        className={cn(
          "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500",
          playing && "opacity-100",
          className,
        )}
        src={fileFor(0)}
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

  return (
    <>
      {([0, 1] as const).map((slot) => {
        const isActive = slot === activeSlot;
        return (
          <video
            key={slot}
            ref={(node) => {
              players.current[slot] = node;
            }}
            className={cn(
              "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity ease-in-out",
              isActive && playing && "opacity-100",
              className,
            )}
            style={{ transitionDuration: `${CROSSFADE_SECONDS * 1000}ms` }}
            src={fileFor(slotTracks[slot])}
            poster={slot === 0 ? poster : undefined}
            autoPlay={slot === 0}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={() => {
              if (isActive) setPlaying(true);
            }}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (
                isActive &&
                Number.isFinite(video.duration) &&
                video.duration - video.currentTime <= CROSSFADE_SECONDS
              ) {
                advance();
              }
            }}
            onEnded={() => {
              if (isActive) advance();
            }}
          />
        );
      })}
    </>
  );
}
