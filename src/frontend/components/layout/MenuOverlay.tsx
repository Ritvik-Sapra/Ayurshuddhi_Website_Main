"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { menuLinks } from "@/frontend/content/nav";
import { LogoChip } from "@/frontend/components/layout/LogoChip";
import { CloseIcon, MenuLinesIcon } from "@/frontend/components/ui/icons";

/**
 * Menu button + full-screen overlay (Figma: Nav/Menu Button, Nav/Menu Overlay).
 * The overlay is a native modal <dialog>: Esc closes it, focus is trapped while open and
 * returns to the menu button afterwards. Page scroll is locked by the `html:has(dialog[open])`
 * rule in globals.css. The close button sits exactly where the menu button is.
 */
export function MenuOverlay() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close after navigating to another page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="nav-chip pointer-events-auto absolute right-[var(--nav-inset)] top-7"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => {
          const root = document.documentElement;
          root.style.setProperty("--sbw", `${window.innerWidth - root.clientWidth}px`);
          dialogRef.current?.showModal();
          setOpen(true);
        }}
      >
        <MenuLinesIcon />
      </button>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className="menu-dialog"
        aria-label="Site menu"
        onClose={() => {
          document.documentElement.style.removeProperty("--sbw");
          setOpen(false);
        }}
      >
        <LogoChip />
        <button
          type="button"
          className="nav-chip menu-close absolute top-7"
          aria-label="Close menu"
          autoFocus
          onClick={() => dialogRef.current?.close()}
        >
          <CloseIcon />
        </button>

        <nav
          aria-label="Menu"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <ul className="flex flex-col items-center gap-3 lg:gap-4">
            {menuLinks.map((link, index) => {
              const current = pathname === link.href;
              return (
                <li key={link.href} className="menu-item" style={{ "--i": index } as CSSProperties}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className="link-underline block whitespace-nowrap text-h5 text-cream"
                    onClick={() => {
                      // Same-page links don't change the pathname, so close explicitly.
                      if (current) dialogRef.current?.close();
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
