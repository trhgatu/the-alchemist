/**
 * ⚙️ GRIMOIRE TIMELINE HOOK
 * ═══════════════════════════════════════════════════════════
 *
 * Custom hook to manage GSAP timeline for the Tech Grimoire section.
 * Handles all scroll-based animations including intro text, book entrance,
 * zoom effects, and flash transitions.
 *
 * @module tech-grimoire/hooks/useGrimoireTimeline
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_CONFIG } from "../constants";
import type { HTMLElementRef } from "../types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook parameters
 */
export interface UseGrimoireTimelineParams {
  /** Container element ref (ScrollTrigger target) */
  containerRef: HTMLElementRef;
}

/**
 * Hook return value
 */
export interface UseGrimoireTimelineReturn {
  /** Current scroll progress (0-1) */
  scrollProgress: React.MutableRefObject<number>;
}

/**
 * Custom hook to manage Grimoire timeline animations
 *
 * @example
 * ```tsx
 * const { scrollProgress } = useGrimoireTimeline({
 *   containerRef,
 * });
 * ```
 */
export function useGrimoireTimeline({
  containerRef,
}: UseGrimoireTimelineParams): UseGrimoireTimelineReturn {
  const scrollProgress = useRef(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${TIMELINE_CONFIG.PIN_SCREENS * 100}%`,
        pin: true,
        refreshPriority: TIMELINE_CONFIG.REFRESH_PRIORITY,
      });

      // Drives the book and the tech icons at every screen width; gating this
      // to desktop left the progress at 0 on narrow screens, where the book
      // has zero scale and never appears.
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          // Starts one screen before the pin, so it runs for the pin plus that screen
          end: () => `+=${(TIMELINE_CONFIG.PIN_SCREENS + 1) * window.innerHeight}`,
          scrub: TIMELINE_CONFIG.SCRUB,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });
    },
    { scope: containerRef }
  );

  return { scrollProgress };
}
