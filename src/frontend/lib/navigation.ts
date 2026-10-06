/**
 * Remembers that the next render of a path comes from the browser's back/forward buttons, so the
 * page can skip its entrance animation (that navigation gets a crossfade instead).
 */
let traverseTarget: string | null = null;

export function markTraverse(pathname: string) {
  traverseTarget = pathname;
}

/** True once if the latest back/forward navigation went to `pathname`. Always clears the mark. */
export function consumeTraverse(pathname: string) {
  const hit = traverseTarget === pathname;
  traverseTarget = null;
  return hit;
}
