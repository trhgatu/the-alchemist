import type Lenis from "lenis";

/**
 * The page's Lenis instance, for code that needs to scroll it (Lenis owns
 * the scroll position, so a plain window.scrollTo would fight it).
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
