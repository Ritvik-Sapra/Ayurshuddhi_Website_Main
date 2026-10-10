"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/frontend/content/about";
import { TestimonialCard } from "@/frontend/components/cards/TestimonialCard";
import { cn } from "@/frontend/lib/cn";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M14.5 6L8.5 12L14.5 18" : "M9.5 6L15.5 12L9.5 18"}
        className="stroke-cream"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Scroll-snap row of testimonial cards (one, two or three in view by screen width) with dots and
 * previous/next buttons. Native scrolling does the work; touch, trackpad and keyboard all still work.
 */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const step = useRef(1);
  const [position, setPosition] = useState({ index: 0, stops: testimonials.length });

  /** Reads the card width and how many fit, then the stop the row is currently on. */
  const measure = useCallback(() => {
    const el = scroller.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[1] as HTMLElement | undefined;
    if (!el || !first) return;
    step.current = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    const visible = Math.max(1, Math.round(el.clientWidth / step.current));
    const stops = Math.max(1, testimonials.length - visible + 1);
    const index = Math.min(stops - 1, Math.max(0, Math.round(el.scrollLeft / step.current)));
    setPosition((current) =>
      current.index === index && current.stops === stops ? current : { index, stops },
    );
  }, [testimonials.length]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  function goTo(index: number) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.current?.scrollTo({
      left: index * step.current,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  const { index, stops } = position;
  const arrow =
    "flex size-11 items-center justify-center rounded-sm bg-green transition-opacity duration-150 disabled:opacity-40 motion-reduce:transition-none";

  return (
    <div className="flex flex-col items-center gap-8">
      <ul
        ref={scroller}
        onScroll={measure}
        aria-label="Client testimonials"
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name}
            className="w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
      {stops > 1 && (
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {Array.from({ length: stops }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonials from ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "size-2 rounded-full transition-colors duration-150",
                    i === index ? "bg-cream" : "bg-cream/30",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous testimonials"
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
            className={arrow}
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            disabled={index === stops - 1}
            onClick={() => goTo(index + 1)}
            className={arrow}
          >
            <Chevron direction="right" />
          </button>
        </div>
      )}
    </div>
  );
}
