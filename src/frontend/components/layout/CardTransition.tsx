"use client";

import { usePathname, useRouter } from "next/navigation";
import { animate, type AnimationSequence } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SERVICE_SLUGS } from "@/shared/constants";
import { markTraverse } from "@/frontend/lib/navigation";
import { inertCopy, snapshotPage } from "@/frontend/lib/pageSnapshot";
import {
  coverRadius,
  EASE_WIPE,
  prefersReducedMotion,
  REDUCED_FADE,
  WIPE_DURATION,
} from "@/frontend/lib/motion";

/** Pages between which back/forward crossfades: the services list and every service page. */
const SERVICE_PATHS = new Set<string>(["/services", ...SERVICE_SLUGS.map((slug) => `/${slug}`)]);
/** A page that has not rendered this long (ms) after the click is given up on. */
const GIVE_UP_MS = 8000;
/** Back/forward: longest wait (ms) for the destination before the crossfade plays anyway. */
const TRAVERSE_WAIT_MS = 1500;
/** Pause (ms) after the expansion before the loading dots appear, so fast loads never show them. */
const LOADER_DELAY_MS = 250;
/** The photo window starts opening this long (s) after the circle, so the circle leads. */
const PHOTO_LAG = 0.08;
const SCROLL_KEYS = new Set([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

export type CardOpenRequest = {
  href: string;
  /** Announced to screen readers while the page loads. */
  title: string;
  /** The card's root element. Measured at click time; its `.card-media` photo slot is copied. */
  card: HTMLElement;
};

/** The part of the Navigation API's NavigateEvent used here (not in TypeScript's DOM types yet). */
type NavigateEventLike = Event & { navigationType: string; destination: { url: string } };

type CardTransitionApi = {
  /** Starts the transition and navigates. False when it can't run: navigate normally instead. */
  open: (request: CardOpenRequest) => boolean;
};

const CardTransitionContext = createContext<CardTransitionApi | null>(null);

/** Null outside CardTransitionProvider: cards then behave as plain links. */
export function useCardTransition() {
  return useContext(CardTransitionContext);
}

/**
 * The route has rendered its real content: a new h1 (not `stale`, the previous page's) and no
 * loading skeleton left.
 */
function pageReady(pathname: string, stale: Element | null) {
  const heading = document.querySelector("#main h1");
  return (
    window.location.pathname === pathname &&
    heading !== null &&
    heading !== stale &&
    document.querySelector('#main [aria-busy="true"]') === null
  );
}

/**
 * Resolves true once `pathname` is ready, or false at `deadline` (ms, performance.now()) or as
 * soon as `current()` turns false. `slow.run` fires once if still waiting at `slow.at`.
 * Readiness is checked every frame; the deadline and `slow` run on timers, so they still fire
 * when frames stop (e.g. the tab is in the background).
 */
function waitForPage(
  pathname: string,
  stale: Element | null,
  deadline: number,
  current: () => boolean,
  slow?: { at: number; run: () => void },
) {
  return new Promise<boolean>((resolve) => {
    let frame = 0;
    const timers: number[] = [];
    const finish = (ready: boolean) => {
      cancelAnimationFrame(frame);
      for (const timer of timers) clearTimeout(timer);
      resolve(ready);
    };
    const check = () => {
      if (!current()) return finish(false);
      if (pageReady(pathname, stale)) return finish(true);
      frame = requestAnimationFrame(check);
    };
    const after = (at: number, run: () => void) =>
      timers.push(window.setTimeout(run, Math.max(0, at - performance.now())));
    after(deadline, () => finish(current() && pageReady(pathname, stale)));
    if (slow) after(slow.at, () => current() && slow.run());
    check();
  });
}

/** Moves focus to the new page's heading, so keyboard and screen reader users start there. */
function focusHeading() {
  const heading = document.querySelector<HTMLElement>("#main h1");
  if (!heading) return;
  if (!heading.hasAttribute("tabindex")) heading.tabIndex = -1;
  heading.setAttribute("data-route-focus", "");
  heading.focus({ preventScroll: true });
}

/** Wheel, touch and keyboard scrolling are blocked; the scrollbar stays, so nothing reflows. */
function lockScroll(onEscape: () => void) {
  const block = (event: Event) => event.preventDefault();
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") onEscape();
    else if (SCROLL_KEYS.has(event.key)) event.preventDefault();
  };
  window.addEventListener("wheel", block, { passive: false });
  window.addEventListener("touchmove", block, { passive: false });
  window.addEventListener("keydown", onKey);
  return () => {
    window.removeEventListener("wheel", block);
    window.removeEventListener("touchmove", block);
    window.removeEventListener("keydown", onKey);
  };
}

type Piece = { element: HTMLElement; x: number; y: number; scale: number; fills: boolean };

/**
 * Copies the card's photo slot into `host` (stretched over the viewport) and works out, for each
 * thing inside it (the photo, or the placeholder icon), the offset and scale that put it exactly
 * where it sits in the card.
 */
function copyPhoto(source: HTMLElement, host: HTMLElement, width: number, height: number) {
  const { copy } = inertCopy(source);
  copy.className = "ct-media";
  copy.removeAttribute("style");
  copy.style.backgroundColor = getComputedStyle(source).backgroundColor;
  host.replaceChildren(copy);
  return Array.from(copy.children, (child, index): Piece | null => {
    const original = source.children[index];
    if (!(child instanceof HTMLElement || child instanceof SVGElement) || !original) return null;
    const from = original.getBoundingClientRect();
    const to = child.getBoundingClientRect();
    if (!to.width || !to.height) return null;
    return {
      element: child as HTMLElement,
      x: from.left + from.width / 2 - (to.left + to.width / 2),
      y: from.top + from.height / 2 - (to.top + to.height / 2),
      scale: Math.max(from.width / to.width, from.height / to.height),
      fills: to.width >= width - 1 && to.height >= height - 1,
    };
  }).filter((piece): piece is Piece => piece !== null);
}

function inset(top: number, right: number, bottom: number, left: number, radius: string) {
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius})`;
}

/**
 * The overlay's choreography. Plain DOM + framer-motion, created once per provider mount.
 *
 * Card open: a copy of the current page is frozen on screen so the next route can start loading
 * (router.push) at once. Out of the clicked card's centre grows a circle in the card's dark bar
 * colour, reaching the farthest corner, while the card's photo opens from its slot to fill the
 * viewport (the same radial wipe and curve as the menu). Once the new page has rendered beneath
 * (its real content, not the loading skeleton), the window scrolls to the top and the overlay
 * hands over: the photo contracts onto the new page's hero (`data-transition-target`) as the dark
 * layer fades, then fades into the identical hero. A slow page gets loading dots, and after 8s the
 * overlay steps aside and the route finishes loading on its own.
 *
 * Back/forward between service pages: a 300ms crossfade from a frozen copy of the old page.
 * Reduced motion: every case becomes a crossfade of at most 200ms.
 */
function createCardTransition(
  overlay: HTMLElement,
  navigate: (href: string) => void,
  announce: (message: string) => void,
) {
  const layer = (name: string) => overlay.querySelector<HTMLElement>(`[data-layer="${name}"]`)!;
  const snapshot = layer("snapshot");
  const circle = layer("circle");
  const bar = layer("bar");
  const photo = layer("photo");

  let mode: "idle" | "open" | "crossfade" = "idle";
  /** Bumped whenever the overlay changes hands; async steps of an older run stop there. */
  let run = 0;
  let controls: ReturnType<typeof animate> | null = null;
  let unlock: (() => void) | null = null;

  function play(sequence: AnimationSequence) {
    controls?.stop();
    controls = animate(sequence);
    return controls;
  }

  /**
   * Clears what the last run left behind. Called again when a run starts: framer-motion writes
   * an animation's final value in its `finish` event, which lands after `await` resumes here.
   */
  function clearStyles() {
    for (const element of [overlay, snapshot, circle, bar, photo]) element.removeAttribute("style");
  }

  function reset() {
    run += 1;
    controls?.stop();
    controls = null;
    unlock?.();
    unlock = null;
    mode = "idle";
    overlay.removeAttribute("data-state");
    overlay.removeAttribute("data-waiting");
    clearStyles();
    snapshot.replaceChildren();
    photo.replaceChildren();
    announce("");
  }

  /** Gets out of the way quickly: Escape, back/forward mid-transition, or a page that never came. */
  async function dismiss(duration = 0.15) {
    if (mode === "idle") return;
    const id = ++run;
    unlock?.();
    unlock = null;
    overlay.removeAttribute("data-waiting");
    const from = Number(getComputedStyle(overlay).opacity);
    await play([[overlay, { opacity: [from, 0] }, { duration, ease: "easeOut" }]]);
    if (id === run) reset();
  }

  function open({ href, title, card }: CardOpenRequest) {
    if (mode === "open") return true; // Already opening: swallow repeat clicks.
    const destination = new URL(href, window.location.href).pathname;
    if (destination === window.location.pathname) return false;
    if (mode === "crossfade") reset();

    const id = ++run;
    mode = "open";
    const started = performance.now();
    const reduce = prefersReducedMotion();
    const cardRect = card.getBoundingClientRect();
    const source = card.querySelector<HTMLElement>(".card-media");
    const sourceRect = (source ?? card).getBoundingClientRect();
    const radius = getComputedStyle(card).borderTopLeftRadius || "0px";
    const staleHeading = document.querySelector("#main h1");

    // Everything up to the first animation frame happens before the browser paints again.
    clearStyles();
    overlay.dataset.state = reduce ? "fade" : "open";
    snapshotPage(snapshot);
    unlock = lockScroll(() => void dismiss());
    announce(`Opening ${title}`);

    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    const cx = cardRect.left + cardRect.width / 2;
    const cy = cardRect.top + cardRect.height / 2;
    const circleFrom = `circle(0px at ${cx}px ${cy}px)`;
    const circleTo = `circle(${coverRadius(cx, cy, width, height)}px at ${cx}px ${cy}px)`;
    const windowFrom = inset(
      sourceRect.top,
      width - sourceRect.right,
      height - sourceRect.bottom,
      sourceRect.left,
      `${radius} ${radius} 0px 0px`,
    );
    const windowFull = inset(0, 0, 0, 0, "0px 0px 0px 0px");
    const pieces = !reduce && source ? copyPhoto(source, photo, width, height) : [];

    if (!reduce) {
      circle.style.clipPath = circleFrom;
      photo.style.clipPath = windowFrom;
      for (const piece of pieces) {
        piece.element.style.transform = `translate(${piece.x}px, ${piece.y}px) scale(${piece.scale})`;
      }
    }

    navigate(href);

    void (async () => {
      if (!reduce) {
        await play([
          [
            circle,
            { clipPath: [circleFrom, circleTo] },
            { duration: WIPE_DURATION, ease: EASE_WIPE },
          ],
          [
            photo,
            { clipPath: [windowFrom, windowFull] },
            { duration: WIPE_DURATION, ease: EASE_WIPE, at: PHOTO_LAG },
          ],
          ...pieces.map((piece): AnimationSequence[number] => [
            piece.element,
            { x: [piece.x, 0], y: [piece.y, 0], scale: [piece.scale, 1] },
            { duration: WIPE_DURATION, ease: EASE_WIPE, at: PHOTO_LAG },
          ]),
        ]);
        if (id !== run) return;
        // Fully covered: drop the old page's copy, and stay covered if the window is resized.
        snapshot.replaceChildren();
        circle.style.clipPath = "none";
      }

      const ready = await waitForPage(
        destination,
        staleHeading,
        started + GIVE_UP_MS,
        () => id === run,
        {
          at: performance.now() + LOADER_DELAY_MS,
          run: () => {
            overlay.setAttribute("data-waiting", "");
            announce(`Still loading ${title}…`);
          },
        },
      );
      if (id !== run) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (!ready) return void dismiss(0.3);

      overlay.removeAttribute("data-waiting");
      if (reduce) {
        await play([[snapshot, { opacity: [1, 0] }, { duration: REDUCED_FADE, ease: "easeOut" }]]);
      } else {
        await play(handOver());
      }
      if (id !== run) return;
      reset();
      focusHeading();
    })();

    /** Photo contracts onto the new page's hero while the dark layer fades, then fades away. */
    function handOver(): AnimationSequence {
      const w = overlay.clientWidth;
      const h = overlay.clientHeight;
      const hero = document.querySelector<HTMLElement>("#main [data-transition-target]");
      if (!hero) return [[circle, { opacity: [1, 0] }, { duration: 0.45, ease: "easeOut" }]];
      const r = hero.getBoundingClientRect();
      const heroWindow = inset(
        Math.max(0, r.top),
        Math.max(0, w - r.right),
        Math.max(0, h - r.bottom),
        Math.max(0, r.left),
        "0px 0px 0px 0px",
      );
      const dx = r.left + r.width / 2 - w / 2;
      const dy = r.top + r.height / 2 - h / 2;
      return [
        [bar, { opacity: [1, 0] }, { duration: 0.45, ease: "easeOut" }],
        [photo, { clipPath: [windowFull, heroWindow] }, { duration: 0.6, ease: EASE_WIPE, at: 0 }],
        ...pieces
          .filter((piece) => !piece.fills)
          .map((piece): AnimationSequence[number] => [
            piece.element,
            { x: [0, dx], y: [0, dy], scale: [1, 1] },
            { duration: 0.6, ease: EASE_WIPE, at: 0 },
          ]),
        [circle, { opacity: [1, 0] }, { duration: 0.35, ease: "easeOut", at: 0.45 }],
      ];
    }

    return true;
  }

  /** Back/forward between service pages: fade a frozen copy of the old page into the new one. */
  function crossfade(destination: string) {
    if (mode === "open") return void dismiss();
    if (mode === "crossfade") reset();
    const id = ++run;
    const staleHeading = document.querySelector("#main h1");
    mode = "crossfade";
    clearStyles();
    overlay.dataset.state = "crossfade";
    snapshotPage(snapshot);
    void (async () => {
      const deadline = performance.now() + TRAVERSE_WAIT_MS;
      await waitForPage(destination, staleHeading, deadline, () => id === run);
      if (id !== run) return;
      const duration = prefersReducedMotion() ? REDUCED_FADE : 0.3;
      await play([[snapshot, { opacity: [1, 0] }, { duration, ease: "easeOut" }]]);
      if (id === run) reset();
    })();
  }

  function traverse(from: string, to: string) {
    if (mode === "open") return void dismiss();
    if (from !== to && SERVICE_PATHS.has(from) && SERVICE_PATHS.has(to)) crossfade(to);
  }

  return { open, traverse, dispose: reset };
}

/**
 * Lives in the (site) layout, so the overlay survives the route change it covers. Service cards
 * call `open` (see ServiceCardLink); browser back/forward is handled here.
 */
export function CardTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const engine = useRef<ReturnType<typeof createCardTransition> | null>(null);
  const currentPath = useRef(pathname);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const transition = createCardTransition(overlay, (href) => router.push(href), setStatus);
    engine.current = transition;

    // Back/forward must be seen while the old page is still on screen. popstate is too late: Next
    // listens for it first (listeners on one target run in registration order) and React commits
    // a navigation started inside popstate synchronously. The Navigation API's `navigate` event
    // fires before the traversal commits. Without it, popstate still dismisses the overlay and
    // tells the destination it came from back/forward; there is just no crossfade.
    const navigation = (window as Window & { navigation?: EventTarget }).navigation;
    const onNavigate = (event: Event) => {
      const { navigationType, destination } = event as NavigateEventLike;
      if (navigationType !== "traverse") return;
      const to = new URL(destination.url).pathname;
      markTraverse(to);
      transition.traverse(window.location.pathname, to);
    };
    const onPopState = () => {
      const to = window.location.pathname;
      markTraverse(to);
      transition.traverse(currentPath.current, to);
    };
    if (navigation) navigation.addEventListener("navigate", onNavigate);
    else window.addEventListener("popstate", onPopState);
    return () => {
      navigation?.removeEventListener("navigate", onNavigate);
      window.removeEventListener("popstate", onPopState);
      transition.dispose();
      engine.current = null;
    };
  }, [router]);

  useEffect(() => {
    currentPath.current = pathname;
  }, [pathname]);

  const api = useMemo<CardTransitionApi>(
    () => ({ open: (request) => engine.current?.open(request) ?? false }),
    [],
  );

  return (
    <CardTransitionContext value={api}>
      {children}
      <div ref={overlayRef} className="card-transition" aria-hidden="true">
        <div data-layer="snapshot" className="ct-snapshot" />
        <div data-layer="circle" className="ct-circle">
          <div data-layer="bar" className="ct-bar" />
          <div data-layer="photo" className="ct-photo" />
        </div>
        <div className="ct-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
      {/* A live region, but not role="status": pages keep their own status messages unambiguous. */}
      <p aria-live="polite" className="sr-only">
        {status}
      </p>
    </CardTransitionContext>
  );
}
