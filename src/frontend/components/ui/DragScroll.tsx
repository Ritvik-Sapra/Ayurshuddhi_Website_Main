"use client";

import { useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/frontend/lib/cn";

type DragScrollProps = {
  children: ReactNode;
  className?: string;
  /** Accessible name for the scrollable region. */
  label: string;
};

const DRAG_THRESHOLD = 6;

/**
 * Horizontal scroller with CSS scroll-snap, mouse drag-to-scroll and arrow-key support.
 * Touch and trackpad use the browser's native scrolling. Children should set
 * `snap-start` themselves.
 */
export function DragScroll({ children, className, label }: DragScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || !ref.current) return;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScroll: ref.current.scrollLeft,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    const el = ref.current;
    if (!state.active || !el) return;
    const delta = event.clientX - state.startX;
    if (!state.moved && Math.abs(delta) > DRAG_THRESHOLD) {
      state.moved = true;
      el.setPointerCapture(event.pointerId);
      el.dataset.dragging = "";
    }
    if (state.moved) el.scrollLeft = state.startScroll - delta;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    drag.current.active = false;
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    if (el) delete el.dataset.dragging;
  }

  function onClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    // A drag should not count as a click on the card under the pointer.
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.target !== el) return;
    const step = el.clientWidth * 0.6;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      el.scrollBy({ left: step, behavior: "smooth" });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      el.scrollBy({ left: -step, behavior: "smooth" });
    }
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn("data-[dragging]:cursor-grabbing data-[dragging]:snap-none", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}
