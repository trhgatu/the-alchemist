"use client";

import { useSyncExternalStore } from "react";
import gsap from "gsap";

/**
 * Render quality for the whole site, decided once per visit.
 *
 * - "low" up front for phones/tablets with modest hardware, low device memory,
 *   or when the visitor asks the system for reduced motion.
 * - Otherwise "high", then a short frame-rate probe on the shared ticker
 *   drops to "low" if the machine cannot keep up.
 *
 * Effects read it to lower their resolution or switch themselves off, and
 * reducedMotion() to freeze idle animation.
 */
export type Quality = "high" | "low";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

let quality: Quality = "high";
let decided = false;
const listeners = new Set<() => void>();

const media = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;

export function reducedMotion(): boolean {
  return media("(prefers-reduced-motion: reduce)");
}

function setQuality(next: Quality) {
  if (next === quality) return;
  quality = next;
  listeners.forEach((l) => l());
}

/** Average frame rate over a few seconds once the page has settled. */
function probeFrameRate() {
  const SETTLE_MS = 1500;
  const SAMPLE_MS = 3000;
  // 60 Hz screens below this are visibly struggling; 30 Hz-locked laptops on
  // battery still pass
  const MIN_FPS = 35;
  let start = 0;
  let frames = 0;
  const tick = () => {
    const now = performance.now();
    if (!start) start = now;
    const elapsed = now - start;
    if (elapsed < SETTLE_MS) return;
    frames++;
    if (elapsed >= SETTLE_MS + SAMPLE_MS) {
      gsap.ticker.remove(tick);
      // Background tabs throttle frames; only judge a visible page
      if (document.visibilityState !== "visible") return;
      const fps = (frames * 1000) / SAMPLE_MS;
      if (fps < MIN_FPS) setQuality("low");
    }
  };
  gsap.ticker.add(tick);
}

function decide() {
  if (decided || typeof window === "undefined") return;
  decided = true;

  // ?quality=high|low pins it, for testing on either kind of machine
  const forced = new URLSearchParams(window.location.search).get("quality");
  if (forced === "high" || forced === "low") {
    quality = forced;
    return;
  }

  const nav = navigator as NavigatorWithMemory;
  const touch = media("(pointer: coarse)");
  const fewCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;

  if (reducedMotion() || lowMemory || (touch && fewCores)) quality = "low";
  else probeFrameRate();
}

export function getQuality(): Quality {
  decide();
  return quality;
}

/** Subscribe to quality changes (the probe may lower it once). */
export function onQualityChange(listener: () => void): () => void {
  decide();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Current quality; "high" during server render. */
export function useQuality(): Quality {
  return useSyncExternalStore(onQualityChange, getQuality, () => "high");
}

/** Pixel ratio for soft shader layers: full detail is wasted on blur. */
export function softDpr(high = 1): number {
  return getQuality() === "low" ? Math.min(high, 0.6) : high;
}
