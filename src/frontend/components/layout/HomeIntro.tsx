"use client";

import { animate, stagger, type AnimationSequence } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/frontend/content/site";
import { playfair } from "@/frontend/lib/fonts";
import { EASE_OUT_EXPO, EASE_WIPE, WIPE_DURATION } from "@/frontend/lib/motion";

/** sessionStorage flag: the intro has played this session, so refreshes and navigation skip it. */
const STORAGE_KEY = "ayurshuddhi:home-intro";
const SCROLL_KEYS = new Set([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);
/** Longest wait (ms) for the wordmark font before the intro plays anyway. */
const FONT_WAIT_MS = 1500;

// Timeline (s). One clock: every step below is placed on a single animate() sequence.
const CURTAIN = 0.7;
const HOLD_UNTIL = 1.2;
const FLIGHT = WIPE_DURATION;
const DELETE_AT = HOLD_UNTIL + FLIGHT;
const LETTER_STEP = 0.025;

/**
 * Runs right after the overlay is parsed, before first paint and before hydration, so the page
 * never flashes its final state. It only arms the intro (data-state="play") when motion is
 * allowed and the session hasn't seen it; with no JS nothing is ever hidden. The 6s timer
 * releases the page if hydration or the animation never finishes.
 */
const BOOT_SCRIPT = `(function(s){try{var o=s&&s.previousElementSibling;if(!o)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("${STORAGE_KEY}"))return;o.setAttribute("data-state","play");setTimeout(function(){if(o.getAttribute("data-state")!=="done")o.setAttribute("data-state","done")},6000)}catch(e){}})(document.currentScript)`;

const subscribe = () => () => {};

/**
 * One-time home intro (motion.css, "Home intro"), ~2.5s. The wordmark rises out of a curtain at
 * the centre of a cream veil, holds, then glides to the logo tile on the menu's curve and deletes itself
 * letter by letter while the tile's emblem fades in. The menu button and headline then fade up.
 * Time-based, transform and opacity only. Scroll is locked while it runs and always restored.
 */
export function HomeIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  // True on the server and during hydration only: the boot script is dropped afterwards.
  const hydrating = useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );

  useEffect(() => {
    const root = ref.current;
    if (!root || root.getAttribute("data-state") !== "play") return;
    const part = (name: string) => root.querySelector<HTMLElement>(`[data-part="${name}"]`)!;
    const [veil, mark, stack] = ["veil", "mark", "stack"].map(part);
    const letters = Array.from(root.querySelectorAll<HTMLElement>(".hi-ch"));
    const tile = document.querySelector<HTMLElement>("header > a.nav-chip");
    const emblem = tile?.firstElementChild as HTMLElement | null;

    let control: { stop: () => void } | undefined;
    let cancelled = false;
    let finished = false;
    const startWidth = window.innerWidth;

    const block = (event: Event) => event.preventDefault();
    const blockKeys = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) event.preventDefault();
    };
    // The target is measured once; if the viewport changes width mid-flight, skip to the end.
    const onResize = () => {
      if (window.innerWidth !== startWidth) finish();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
    window.addEventListener("resize", onResize);
    const unlock = () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
      window.removeEventListener("resize", onResize);
    };

    /** Hand the tile and emblem back to their stylesheet, then drop the overlay. */
    function finish() {
      if (finished) return;
      finished = true;
      control?.stop();
      unlock();
      for (const el of [tile, emblem]) {
        el?.style.removeProperty("opacity");
        el?.style.removeProperty("transform");
        el?.style.removeProperty("scale");
      }
      root!.setAttribute("data-state", "done");
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Storage blocked: the intro may replay on refresh, which is harmless.
      }
      setGone(true);
    }

    async function play() {
      if (!tile || !emblem) return;
      // Measure once, after the wordmark font has loaded and layout has settled.
      await Promise.race([
        Promise.all([
          document.fonts.load(`700 1em ${playfair.style.fontFamily}`),
          document.fonts.load(`italic 400 1em ${playfair.style.fontFamily}`),
        ]).then(() => document.fonts.ready),
        new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
      ]);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (cancelled) return;

      const to = tile.getBoundingClientRect();
      const from = mark.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(mark).fontSize);
      // Fit the type to half the tile's height; the left edge of the text lands inside the tile.
      const scale = (to.height * 0.5) / fontSize;
      const padLeft = parseFloat(getComputedStyle(root!.querySelector(".hi-curtain")!).paddingLeft);
      const x = to.left + 10 - (from.left + padLeft * scale);
      const y = to.top + to.height / 2 - (from.top + from.height / 2);
      // The flight is one segment on the menu's own curve and duration (EASE_WIPE, WIPE_DURATION):
      // x, y and scale share a single ease-in-out, so there are no keyframe seams to stall on.
      const sequence: AnimationSequence = [
        [stack, { y: ["105%", "0%"] }, { duration: CURTAIN, ease: EASE_WIPE, at: 0 }],
        [
          mark,
          { x: [0, x], y: [0, y], scale: [1, scale] },
          { duration: FLIGHT, ease: EASE_WIPE, at: HOLD_UNTIL },
        ],
        [
          letters,
          { opacity: 0, x: -4, scale: 0.8 },
          { duration: 0.14, ease: "easeIn", delay: stagger(LETTER_STEP), at: DELETE_AT },
        ],
        [veil, { opacity: 0 }, { duration: 0.5, ease: "easeOut", at: DELETE_AT }],
        [tile, { opacity: [0, 1] }, { duration: 0.35, ease: "easeOut", at: DELETE_AT }],
        [
          emblem,
          { opacity: [0, 1], scale: [0.6, 1] },
          { duration: 0.5, ease: EASE_OUT_EXPO, at: DELETE_AT },
        ],
      ];
      mark.style.willChange = "transform";
      const playing = animate(sequence);
      control = playing;
      await playing;
      if (cancelled) return;
      mark.style.willChange = "";
      // Menu button and headline fade in via CSS; the page is interactive again.
      root!.setAttribute("data-state", "reveal");
      unlock();
      // Hold the overlay (now display:none) until the fade-ups finish: their CSS keys off it.
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    play()
      .catch(() => {})
      .finally(() => {
        if (!cancelled) finish();
      });

    return () => {
      cancelled = true;
      unlock();
      control?.stop();
      // Only wind down for real once the page has left (Strict Mode re-runs effects).
      setTimeout(() => {
        if (!root.isConnected) finish();
      });
    };
  }, []);

  return (
    <>
      {gone ? null : (
        <div
          ref={ref}
          aria-hidden="true"
          className={`home-intro ${playfair.variable}`}
          suppressHydrationWarning
        >
          <div data-part="veil" className="hi-veil" />
          <div data-part="mark" className="hi-mark">
            <div className="hi-curtain">
              <div data-part="stack" className="hi-stack">
                <Word text={site.shortName} className="hi-name" />
                <Word text="Wellness" className="hi-sub" />
              </div>
            </div>
          </div>
        </div>
      )}
      {hydrating ? (
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      ) : null}
    </>
  );
}

/** A word split into letters so they can delete themselves one by one. */
function Word({ text, className }: { text: string; className: string }) {
  return (
    <span className={className}>
      {Array.from(text).map((char, index) => (
        <span key={index} className="hi-ch">
          {char}
        </span>
      ))}
    </span>
  );
}
