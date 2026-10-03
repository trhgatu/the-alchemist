/**
 * True when nothing of `el` can be seen: off screen, or it or an ancestor is
 * transparent, hidden or not displayed. Render loops call this (throttled) to
 * stop drawing layers the scroll timelines have faded out.
 */
export function isHiddenOnScreen(el: Element): boolean {
  const r = el.getBoundingClientRect();
  if (r.bottom <= 0 || r.top >= window.innerHeight || r.width === 0 || r.height === 0) {
    return true;
  }
  for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) {
    const s = getComputedStyle(node);
    if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) < 0.01) {
      return true;
    }
  }
  return false;
}
