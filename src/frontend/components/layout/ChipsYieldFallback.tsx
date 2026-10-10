"use client";

import { useEffect } from "react";

/** The two fixed nav chips. Keep in step with motion.css "Nav chips yield to the footer". */
const CHIPS = "body > header > :is(a.nav-chip, .menu-trigger)";
const SUPPORTED = "(animation-timeline: view()) and (timeline-scope: --footer-body)";

/**
 * For browsers without scroll-driven animations (Firefox, Safari before 26): moves the nav chips
 * up with the footer photo from a scroll listener, the same way motion.css does in CSS, so they
 * never sit on footer links. `data-chips-fallback` on <html> switches the CSS version off.
 * Renders nothing, and does nothing where the CSS version works.
 */
export function ChipsYieldFallback() {
  useEffect(() => {
    if (CSS.supports(SUPPORTED)) return;
    const root = document.documentElement;
    const content = document.querySelector<HTMLElement>(".footer-body");
    if (!content) return;
    root.setAttribute("data-chips-fallback", "");

    // Set on the chips themselves, not as a variable on <html>, so a scroll only restyles them.
    const update = () => {
      const navHeight = parseFloat(getComputedStyle(root).getPropertyValue("--nav-height")) || 0;
      const shift = Math.min(
        Math.max(navHeight - content.getBoundingClientRect().top, 0),
        navHeight,
      );
      for (const chip of document.querySelectorAll<HTMLElement>(CHIPS)) {
        chip.style.translate = shift ? `0 ${-shift}px` : "";
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Page changes and late-loading content move the footer without a scroll event.
    const resize = new ResizeObserver(update);
    resize.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resize.disconnect();
      root.removeAttribute("data-chips-fallback");
      for (const chip of document.querySelectorAll<HTMLElement>(CHIPS)) chip.style.translate = "";
    };
  }, []);

  return null;
}
