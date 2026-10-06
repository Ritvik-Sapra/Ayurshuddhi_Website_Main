/**
 * Static copies of what is on screen, used to keep the old page visible while the next route
 * renders underneath (card-open transition, back/forward crossfade).
 */

/** Matches each element of `source` (inclusive) to its twin in a `cloneNode(true)` copy. */
function pairs(source: Element, copy: Element): [Element, Element][] {
  const from = [source, ...source.querySelectorAll("*")];
  const to = [copy, ...copy.querySelectorAll("*")];
  return from.length === to.length ? from.map((element, index) => [element, to[index]]) : [];
}

/**
 * Inserted copies start their CSS animations from zero. Seek each one to where the original is,
 * so the copy is indistinguishable from the live page (e.g. the intro or an ambient loop
 * mid-way). Scroll-driven animations follow their own timeline and are left alone.
 */
function syncAnimations(matched: [Element, Element][]) {
  const twins = new Map(matched);
  const source = matched[0]?.[0];
  if (!source) return;
  for (const animation of source.getAnimations({ subtree: true })) {
    if (!(animation instanceof CSSAnimation) || animation.timeline !== document.timeline) continue;
    const effect = animation.effect as KeyframeEffect | null;
    const twin = effect?.target ? twins.get(effect.target) : undefined;
    if (!twin || animation.currentTime === null) continue;
    const copy = twin
      .getAnimations({ subtree: true })
      .find(
        (candidate) =>
          candidate instanceof CSSAnimation &&
          candidate.animationName === animation.animationName &&
          (candidate.effect as KeyframeEffect | null)?.target === twin &&
          (candidate.effect as KeyframeEffect | null)?.pseudoElement === effect?.pseudoElement,
      );
    if (copy) copy.currentTime = animation.currentTime;
  }
}

/**
 * Deep-copies `element` as an inert, unlabelled picture: no ids (no duplicates in the page), no
 * focusable or announced content. Hovered elements keep their hover look via `data-hover`
 * (style rules opt in with `:is(:hover, [data-hover])`).
 */
export function inertCopy(element: HTMLElement) {
  const copy = element.cloneNode(true) as HTMLElement;
  const matched = pairs(element, copy);
  for (const [original, twin] of matched) {
    twin.removeAttribute("id");
    if (original.matches(":hover")) twin.setAttribute("data-hover", "");
  }
  copy.setAttribute("aria-hidden", "true");
  copy.inert = true;
  return { copy, matched };
}

/**
 * Fills `host` (a fixed, viewport-sized layer) with a copy of the page's <main> and the footer
 * after it, positioned exactly where they are on screen.
 */
export function snapshotPage(host: HTMLElement) {
  const main = document.getElementById("main");
  if (!main) return;
  const parts: HTMLElement[] = [main];
  const footer = main.nextElementSibling;
  if (footer instanceof HTMLElement && footer.tagName === "FOOTER") parts.push(footer);

  const rect = main.getBoundingClientRect();
  const frame = document.createElement("div");
  frame.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px`;
  const copies = parts.map((part) => inertCopy(part));
  frame.append(...copies.map(({ copy }) => copy));
  host.replaceChildren(frame);
  for (const { matched } of copies) syncAnimations(matched);
}
