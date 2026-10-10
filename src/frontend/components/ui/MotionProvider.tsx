"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Mounted once in the root layout. `reducedMotion="user"` makes every `m` component skip
 * transform animations (keeping the opacity fade) when the visitor prefers reduced motion;
 * `strict` makes a stray full `motion.*` component throw, so the lazy bundle stays small.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
