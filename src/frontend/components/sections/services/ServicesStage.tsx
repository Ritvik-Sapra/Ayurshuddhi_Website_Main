"use client";

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { consumeTraverse } from "@/frontend/lib/navigation";

/** Event that tells a running boot to stop observing (the stage has left the page). */
const STOP_EVENT = "services-motion:stop";
/** Arriving from the menu: start the entrance this long (ms) in, as the menu's circle shrinks away. */
const MENU_HANDOFF_MS = 350;

/**
 * Entrance and scroll reveals for /services: sets the attributes that motion.css keys off
 * ("/services entrance and scroll reveals") and reveals cards as they scroll into view.
 *
 * On a full page load it runs as an inline script before first paint and before hydration, so
 * nothing waits for the JS bundle and nothing flashes. On client navigation it runs from a
 * layout effect. It is serialised with Function#toString, so it must stay self-contained: no
 * imports, no outer variables.
 *
 * Mode: "full" the first time in a session, "short" afterwards, "reduce" for reduced motion.
 * Back/forward arrivals (`skip`) get no entrance at all: they crossfade in (CardTransition).
 */
function bootServicesMotion(
  stage: HTMLElement | null,
  entry: "document" | "client",
  skip: boolean,
  offset: number,
) {
  if (!stage || stage.hasAttribute("data-motion") || stage.hasAttribute("data-motion-skip")) return;
  let mode = "full";
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) mode = "reduce";
    else if (window.sessionStorage.getItem("ayurshuddhi:services-intro")) mode = "short";
    window.sessionStorage.setItem("ayurshuddhi:services-intro", "1");
  } catch {
    // Storage or matchMedia blocked: play the full version.
  }
  if (skip || typeof IntersectionObserver !== "function") {
    stage.setAttribute("data-motion-skip", "");
    return;
  }

  try {
    // Cards: [first row's start (ms after boot), stagger per column/row (ms), reveal length (ms)].
    const cards =
      mode === "full" ? [320, 80, 1400] : mode === "short" ? [100, 60, 800] : [0, 0, 250];
    const introLength = mode === "full" ? 1500 : mode === "short" ? 900 : 250;
    const started = performance.now() + offset;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let observer: IntersectionObserver | null = null;

    stage.setAttribute("data-motion", mode);
    stage.setAttribute("data-intro", mode);
    stage.setAttribute("data-entry", entry);
    if (offset) stage.style.setProperty("--intro-offset", `${offset}ms`);
    timers.push(setTimeout(() => stage.removeAttribute("data-intro"), introLength + offset));

    const list = () => stage.querySelector<HTMLElement>("[data-reveal-list]");
    const items = () => Array.from(stage.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Cards that reach 15% visibility reveal once, staggered left to right, then row by row.
    const reveal = (entries: IntersectionObserverEntry[]) => {
      const all = items();
      const grid = list();
      const columns = grid
        ? Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(" ").length)
        : 1;
      const shown = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => all.indexOf(entry.target as HTMLElement))
        .filter((index) => index >= 0)
        .sort((a, b) => a - b);
      if (!shown.length) return;
      const firstRow = Math.floor(shown[0] / columns);
      const wait = Math.max(0, started + cards[0] - performance.now());
      for (const index of shown) {
        const item = all[index];
        const step = (index % columns) + Math.floor(index / columns) - firstRow;
        const delay = Math.round(wait + step * cards[1]);
        item.style.setProperty("--reveal-delay", `${delay}ms`);
        item.setAttribute("data-revealed", "");
        observer?.unobserve(item);
        timers.push(setTimeout(() => item.setAttribute("data-revealed", "done"), delay + cards[2]));
      }
    };

    const observe = () => {
      observer = new IntersectionObserver(reveal, { threshold: 0.15 });
      for (const item of items()) observer.observe(item);
    };
    // As an inline script this runs before the cards are parsed.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", observe, { once: true });
    } else {
      observe();
    }

    stage.addEventListener(
      "services-motion:stop",
      () => {
        observer?.disconnect();
        for (const timer of timers) clearTimeout(timer);
      },
      { once: true },
    );
  } catch {
    // Never leave content hidden.
    stage.removeAttribute("data-motion");
    stage.removeAttribute("data-intro");
  }
}

const BOOT_SCRIPT = `(${bootServicesMotion})(document.currentScript.parentElement,"document",false,0)`;

const subscribe = () => () => {};

/**
 * The /services section. Renders the boot script during server rendering and hydration only;
 * client-rendered scripts never run (and React warns about them), so client navigations call
 * the boot from a layout effect instead, before the page paints.
 */
export function ServicesStage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const hydrating = useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );

  useLayoutEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    // Back/forward: flagged by CardTransition, or (when the router commits synchronously inside
    // the popstate event, as React does for cached routes) visible as the current event.
    const traversed = consumeTraverse(window.location.pathname);
    const skip = traversed || window.event?.type === "popstate";
    const fromMenu = document.querySelector("dialog[open]") !== null;
    // A no-op when the inline script already ran.
    bootServicesMotion(stage, "client", skip, fromMenu ? MENU_HANDOFF_MS : 0);
    return () => {
      // Only stop once the stage has really left the page (Strict Mode re-runs effects).
      setTimeout(() => {
        if (!stage.isConnected) stage.dispatchEvent(new Event(STOP_EVENT));
      });
    };
  }, []);

  return (
    // The boot script adds data-* attributes and styles before hydration.
    <section ref={ref} data-services-stage className={className} suppressHydrationWarning>
      {hydrating ? (
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      ) : null}
      {children}
    </section>
  );
}
