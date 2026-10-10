"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, REVEAL_VIEWPORT } from "@/frontend/lib/motion";

/** Fades and rises its children into place once, as they scroll into view. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </m.div>
  );
}
