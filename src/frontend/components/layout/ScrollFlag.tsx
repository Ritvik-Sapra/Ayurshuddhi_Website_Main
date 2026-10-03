"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `data-scrolled` on <html> once the page is scrolled past the top, so the fixed
 * nav chips can switch from glass to solid green (see `.nav-chip` in motion.css).
 */
export function ScrollFlag() {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    const root = document.documentElement;
    const update = (top: number) => root.toggleAttribute("data-scrolled", top < 0);

    let stop: () => void;
    if (typeof window.IntersectionObserver === "function") {
      const observer = new IntersectionObserver(([entry]) => update(entry.boundingClientRect.top));
      observer.observe(element);
      stop = () => observer.disconnect();
    } else {
      // Some embedded web views and older browsers lack IntersectionObserver.
      const onScroll = () => update(element.getBoundingClientRect().top);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      stop = () => window.removeEventListener("scroll", onScroll);
    }
    return () => {
      stop();
      root.removeAttribute("data-scrolled");
    };
  }, []);

  return (
    <div
      ref={sentinel}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[120px] h-px"
    />
  );
}
