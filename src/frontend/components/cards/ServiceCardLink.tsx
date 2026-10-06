"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCardTransition } from "@/frontend/components/layout/CardTransition";

type ServiceCardLinkProps = {
  href: string;
  title: string;
  className?: string;
  children: ReactNode;
};

/**
 * The card's stretched title link. A plain click (or Enter) opens the service page through the
 * radial card transition; modified and middle clicks keep normal link behaviour (new tab, etc.).
 * The page is prefetched on hover and focus (Link itself prefetches when the card is in view).
 */
export function ServiceCardLink({ href, title, className, children }: ServiceCardLinkProps) {
  const router = useRouter();
  const transition = useCardTransition();
  const prefetch = () => router.prefetch(href);

  return (
    <Link
      href={href}
      className={className}
      onPointerEnter={prefetch}
      onFocus={prefetch}
      onClick={(event) => {
        const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        if (event.defaultPrevented || event.button !== 0 || modified || !transition) return;
        const card = event.currentTarget.closest<HTMLElement>("[data-service-card]");
        if (!card) return;
        // `open` also swallows repeat clicks while a transition is already running.
        if (transition.open({ href, title, card })) event.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}
