import gsap from "gsap";

/**
 * One frame clock for the whole site.
 *
 * Every render loop subscribes here instead of calling requestAnimationFrame
 * on its own. gsap.ticker is the same tick Lenis and ScrollTrigger run on
 * (Lenis registers first, with priority), so in each frame the scroll is
 * settled before anything draws, and nothing draws a frame behind it.
 *
 * `time` is in seconds since the ticker started, `deltaMs` in milliseconds.
 */
export type FrameCallback = (time: number, deltaMs: number) => void;

export function onFrame(cb: FrameCallback): () => void {
  const tick = (time: number, deltaMs: number) => cb(time, deltaMs);
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

/**
 * Like onFrame, but only subscribed while `el` intersects the viewport, so
 * effects that are scrolled away cost nothing at all.
 */
export function onFrameWhileVisible(
  el: Element,
  cb: FrameCallback,
  rootMargin = "0px"
): () => void {
  let off: (() => void) | null = null;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) off ??= onFrame(cb);
      else {
        off?.();
        off = null;
      }
    },
    { rootMargin }
  );
  io.observe(el);
  return () => {
    io.disconnect();
    off?.();
  };
}
