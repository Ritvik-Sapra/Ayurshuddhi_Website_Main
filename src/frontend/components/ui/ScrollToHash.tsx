"use client";

import { useEffect } from "react";

/**
 * Scrolls to `#id` once the section carrying that id mounts, if the URL asks for it.
 *
 * Next only jumps to a hash when the target is already rendered as the navigation commits.
 * When the route was not prefetched (a link below the fold on mobile, a slow connection) the
 * loading skeleton commits first, so the jump is lost and the visitor lands at the top.
 * Render this inside the element that has the id.
 */
export function ScrollToHash({ id }: { id: string }) {
  useEffect(() => {
    if (window.location.hash !== `#${id}`) return;
    document.getElementById(id)?.scrollIntoView();
  }, [id]);
  return null;
}
