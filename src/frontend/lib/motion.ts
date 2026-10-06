/**
 * Motion tokens for the JS-driven (framer-motion) animations. The CSS side mirrors them in
 * globals.css: `--ease-wipe`, `--duration-wipe` and `--ease-out-expo`.
 */

/** Seconds for a full-screen radial wipe: the menu opening and closing, a service card opening. */
export const WIPE_DURATION = 0.7;
/** The wipe's in-out curve. */
export const EASE_WIPE = [0.65, 0, 0.35, 1] as const;
/** Long, soft deceleration for things settling into place. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
/** Longest opacity fade (seconds) used in place of motion under prefers-reduced-motion. */
export const REDUCED_FADE = 0.2;

/**
 * Read when an animation starts, not during render: callers live in layouts, so a blocked or
 * missing matchMedia must never be able to crash them.
 */
export function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Radius (px) of a circle centred on (x, y) that reaches the farthest corner of a width x height box. */
export function coverRadius(x: number, y: number, width: number, height: number) {
  return Math.ceil(Math.hypot(Math.max(x, width - x), Math.max(y, height - y))) + 2;
}
