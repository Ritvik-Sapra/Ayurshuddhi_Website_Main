"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stagger, useAnimate, type AnimationSequence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { menuContactLink, menuLinks } from "@/frontend/content/nav";
import { LogoChip } from "@/frontend/components/layout/LogoChip";
import { CloseIcon, MenuLinesIcon } from "@/frontend/components/ui/icons";
import { cn } from "@/frontend/lib/cn";
import {
  coverRadius,
  EASE_WIPE as EASE,
  prefersReducedMotion,
  WIPE_DURATION as REVEAL,
} from "@/frontend/lib/motion";

/** How much larger the dashes are once they reach the centre of the screen. */
const DASH_SCALE = 2;

/** The three hamburger strokes inside the 72x48 chip (same geometry as MenuLinesIcon). */
const DASHES = [
  { left: 31, top: 15, width: 15 },
  { left: 26, top: 24, width: 20 },
  { left: 36, top: 33, width: 10 },
];
const STROKE = 1.6;

type Geometry = {
  /** Top-left of the menu button, where the dashes start and end. */
  x: number;
  y: number;
  /** Top-left that puts the dashes in the centre of the screen. */
  tx: number;
  ty: number;
  /** clip-path at rest (a point on the button) and fully open (past the farthest corner). */
  from: string;
  to: string;
};

function measure(dialog: HTMLDialogElement, trigger: HTMLButtonElement): Geometry {
  const rect = trigger.getBoundingClientRect();
  const width = dialog.clientWidth;
  const height = dialog.clientHeight;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const radius = coverRadius(cx, cy, width, height);
  return {
    x: rect.left,
    y: rect.top,
    tx: (width - rect.width) / 2,
    ty: (height - rect.height) / 2,
    from: `circle(0px at ${cx}px ${cy}px)`,
    to: `circle(${radius}px at ${cx}px ${cy}px)`,
  };
}

function setStyles(elements: Iterable<HTMLElement>, styles: Partial<CSSStyleDeclaration>) {
  for (const element of elements) Object.assign(element.style, styles);
}

/**
 * Menu button + full-screen radial menu.
 *
 * Open: a green circle grows out of the menu button and covers the screen (bottom-left corner
 * last) while the button's three dashes glide to the centre. The dashes then collapse and the
 * links drop in one by one. Close (X): the same sequence plays in reverse at 1.5x. Following a
 * link: the page starts loading straight away and the reverse sequence plays over it at 1x,
 * holding on the centred dashes until the new page has rendered underneath. Esc or other
 * navigation (e.g. browser back) closes it at once.
 *
 * Underneath it is a native modal <dialog>, so focus is trapped while open and returns to the
 * menu button afterwards. Page scroll is locked by the `html:has(dialog[open])` rule in
 * globals.css. With reduced motion everything is a short opacity fade.
 */
export function RadialMenu() {
  const [scope, animate] = useAnimate<HTMLDialogElement>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const geometry = useRef<Geometry | null>(null);
  const running = useRef<ReturnType<typeof animate> | null>(null);
  const runId = useRef(0);
  const closing = useRef(false);
  /** Set while a menu link's page loads behind the overlay; `done` releases the close sequence. */
  const pendingPage = useRef<{ path: string; done: () => void } | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // A menu link's page has rendered behind the overlay (or redirected elsewhere): let the
    // close sequence finish.
    if (pendingPage.current) {
      pendingPage.current.done();
      return;
    }
    // Any other navigation while open (e.g. browser back): close straight away.
    if (!closing.current) scope.current?.close();
  }, [pathname, scope]);

  // While open, follow viewport changes (rotation, window resize): keep the circle covering the
  // screen and centred on the menu button, so closing still shrinks back into it.
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      const dialog = scope.current;
      const trigger = triggerRef.current;
      if (!dialog || !trigger || closing.current) return;
      const g = measure(dialog, trigger);
      geometry.current = g;
      animate(".rm-bg", { clipPath: g.to }, { duration: 0 });
      animate(".rm-dashes", { x: g.tx, y: g.ty, scale: DASH_SCALE }, { duration: 0 });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, scope, animate]);

  function play(sequence: AnimationSequence) {
    running.current?.stop();
    runId.current += 1;
    running.current = animate(sequence);
    return { controls: running.current, id: runId.current };
  }

  function openMenu() {
    const dialog = scope.current;
    const trigger = triggerRef.current;
    if (!dialog || !trigger) return;
    const reduceMotion = prefersReducedMotion();

    const root = document.documentElement;
    root.style.setProperty("--sbw", `${window.innerWidth - root.clientWidth}px`);
    dialog.showModal();
    setOpen(true);

    const g = measure(dialog, trigger);
    geometry.current = g;
    const all = (selector: string) => dialog.querySelectorAll<HTMLElement>(selector);

    // Starting frame, applied before the first paint so nothing flashes.
    setStyles(all(".rm-bg"), {
      clipPath: reduceMotion ? g.to : g.from,
      opacity: reduceMotion ? "0" : "1",
    });
    setStyles(all(".rm-dashes"), {
      opacity: reduceMotion ? "0" : "1",
      transform: `translateX(${g.x}px) translateY(${g.y}px)`,
    });
    setStyles(all(".rm-dash"), { opacity: "1", transform: "none" });
    setStyles(all(".rm-link"), {
      opacity: "0",
      transform: reduceMotion ? "none" : "translateY(-20px)",
    });
    setStyles(all(".rm-chrome"), { opacity: "0" });

    if (reduceMotion) {
      play([
        [".rm-bg", { opacity: [0, 1] }, { duration: 0.2 }],
        [".rm-link", { opacity: [0, 1] }, { duration: 0.2, at: 0 }],
        [".rm-chrome", { opacity: [0, 1] }, { duration: 0.2, at: 0 }],
      ]);
      return;
    }

    play([
      // 1. Radial wipe out of the button, with the dashes gliding to the centre on the same curve.
      [".rm-bg", { clipPath: [g.from, g.to] }, { duration: REVEAL, ease: EASE }],
      [
        ".rm-dashes",
        { x: [g.x, g.tx], y: [g.y, g.ty], scale: [1, DASH_SCALE] },
        { duration: REVEAL, ease: EASE, at: 0 },
      ],
      // 2. The dashes collapse and the links drop in one by one.
      [".rm-dash", { scaleX: [1, 0], opacity: [1, 0] }, { duration: 0.25, delay: stagger(0.05) }],
      [
        ".rm-link",
        { opacity: [0, 1], y: [-20, 0] },
        { duration: 0.4, ease: "easeOut", delay: stagger(0.1), at: REVEAL + 0.05 },
      ],
      [".rm-chrome", { opacity: [0, 1] }, { duration: 0.3, at: REVEAL + 0.1 }],
    ]);
  }

  /** Resolves once `href`'s page has rendered (straight away if it is this page), or after 5s. */
  function waitForPage(href: string) {
    const path = new URL(href, window.location.href).pathname;
    if (path === pathname) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const done = () => {
        clearTimeout(timer);
        pendingPage.current = null;
        resolve();
      };
      const timer = setTimeout(done, 5000);
      pendingPage.current = { path, done };
    });
  }

  /**
   * Plays the open sequence in reverse, then closes. `pace` speeds it up (the X uses 1.5x).
   * With `href` (a menu link was followed) the page loads while the links retract; the dashes
   * wait in the centre until it has rendered, then glide back and the circle shrinks onto it.
   */
  async function closeWithAnimation(pace: number, href?: string) {
    const dialog = scope.current;
    const trigger = triggerRef.current;
    if (!dialog || !trigger || closing.current) return;
    closing.current = true;
    const reduceMotion = prefersReducedMotion();
    const g = geometry.current ?? measure(dialog, trigger);
    const s = (seconds: number) => seconds / pace;
    const pageReady = href ? waitForPage(href) : Promise.resolve();

    // 1. Links retract and the dashes reappear in the centre.
    let id = runId.current;
    if (!reduceMotion) {
      const first = play([
        [".rm-chrome", { opacity: 0 }, { duration: s(0.2) }],
        [
          ".rm-link",
          { opacity: 0, y: -20 },
          { duration: s(0.25), ease: "easeIn", delay: stagger(s(0.06), { from: "last" }), at: 0 },
        ],
        [".rm-dash", { scaleX: 1, opacity: 1 }, { duration: s(0.25), delay: stagger(s(0.05)) }],
      ]);
      id = first.id;
      await first.controls;
    }
    await pageReady;
    // Stop if something else (Esc, another close) took over in the meantime.
    if (id !== runId.current) return;

    // 2. The dashes glide back to the button while the circle shrinks into it.
    const second = reduceMotion
      ? play([
          [".rm-link", { opacity: 0 }, { duration: 0.2 }],
          [".rm-chrome", { opacity: 0 }, { duration: 0.2, at: 0 }],
          [".rm-bg", { opacity: 0 }, { duration: 0.2, at: 0 }],
        ])
      : play([
          [".rm-dashes", { x: g.x, y: g.y, scale: 1 }, { duration: s(REVEAL), ease: EASE }],
          [".rm-bg", { clipPath: g.from }, { duration: s(REVEAL), ease: EASE, at: "<" }],
        ]);
    await second.controls;
    if (second.id === runId.current) dialog.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="nav-chip menu-trigger pointer-events-auto absolute top-7"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={openMenu}
      >
        {/* While open, the dialog's own dashes stand in for these. */}
        <MenuLinesIcon className={cn(open && "invisible")} />
      </button>

      <dialog
        id="site-menu"
        ref={scope}
        className="radial-menu"
        aria-label="Site menu"
        onClose={() => {
          running.current?.stop();
          runId.current += 1;
          closing.current = false;
          pendingPage.current?.done();
          document.documentElement.style.removeProperty("--sbw");
          setOpen(false);
        }}
        onClick={(event) => {
          // Any link in the menu (logo, menu links, Contact us): the page starts loading at once
          // and the menu closes over it at normal speed. New-tab clicks leave the menu open.
          const link = (event.target as Element).closest("a");
          const newTab = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
          if (link && event.button === 0 && !newTab) void closeWithAnimation(1, link.href);
        }}
      >
        <div aria-hidden="true" className="rm-bg absolute inset-0 bg-green" />

        <div
          aria-hidden="true"
          className="rm-dashes pointer-events-none absolute left-0 top-0 h-12 w-18"
        >
          {DASHES.map((dash) => (
            <span
              key={dash.top}
              className="rm-dash absolute rounded-full bg-cream"
              style={{
                left: dash.left,
                top: dash.top - STROKE / 2,
                width: dash.width,
                height: STROKE,
              }}
            />
          ))}
        </div>

        <LogoChip className="rm-chrome" />
        <button
          type="button"
          className="rm-chrome nav-chip menu-close absolute top-7"
          aria-label="Close menu"
          autoFocus
          onClick={() => void closeWithAnimation(1.5)}
        >
          <CloseIcon />
        </button>

        {/*
          The links sit between the top chips and "Contact us", centred when they fit and
          scrollable when they don't, so nothing is clipped or covered. Landscape phones get two
          columns so all seven fit without scrolling.
        */}
        <nav
          aria-label="Menu"
          className="absolute inset-x-0 top-(--nav-height) bottom-24 flex overflow-y-auto overscroll-contain short:top-20 short:bottom-22"
        >
          <ul className="m-auto flex flex-col items-center gap-3 px-(--gutter) py-4 short:grid short:grid-flow-col short:grid-rows-4 short:justify-items-center short:gap-x-10 short:gap-y-1 lg:gap-4">
            {menuLinks.map((link) => (
              <li key={link.label} className="rm-link">
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="link-underline block whitespace-nowrap text-h5 text-cream short:text-h6"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={menuContactLink.href}
          aria-current={pathname === menuContactLink.href ? "page" : undefined}
          className="rm-chrome absolute bottom-10 right-12 py-3 text-body font-bold text-accent underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-150 hover:text-white lg:right-24"
        >
          {menuContactLink.label}
        </Link>
      </dialog>
    </>
  );
}
