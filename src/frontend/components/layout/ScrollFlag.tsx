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
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute("data-scrolled", entry.boundingClientRect.top < 0);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
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
