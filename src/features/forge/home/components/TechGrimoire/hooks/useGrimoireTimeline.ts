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
import {
  TIMELINE_CONFIG,
  INTRO_TEXT_TIMING,
  BOOK_ENTRANCE_TIMING,
  ZOOM_TIMING,
  FLASH_TIMING,
} from "../constants";
import type { HTMLElementRef } from "../types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook parameters
 */
export interface UseGrimoireTimelineParams {
  /** Container element ref (ScrollTrigger target) */
  containerRef: HTMLElementRef;

  /** Intro text element ref */
  introTextRef: HTMLElementRef;

  /** Washi background element ref */
  washiRef: HTMLElementRef;

  /** Space background element ref */
  spaceRef: HTMLElementRef;

  /** Flash overlay element ref */
  flashRef: HTMLElementRef;
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
 *   introTextRef,
 *   washiRef,
 *   spaceRef,
 *   flashRef,
 * });
 * ```
 */
export function useGrimoireTimeline({
  containerRef,
  introTextRef,
  washiRef,
  spaceRef,
  flashRef,
}: UseGrimoireTimelineParams): UseGrimoireTimelineReturn {
  const scrollProgress = useRef(0);

  useGSAP(
    () => {
      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: TIMELINE_CONFIG.TOTAL_DURATION,
          pin: true,
          scrub: TIMELINE_CONFIG.SCRUB,
          refreshPriority: TIMELINE_CONFIG.REFRESH_PRIORITY,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      // ═══════════════════════════════════════════════════════════
      // INTRO TEXT ANIMATION
      // ═══════════════════════════════════════════════════════════
      tl.to(
        introTextRef.current,
        {
          opacity: 1,
          y: INTRO_TEXT_TIMING.MOVEMENT.yStart,
          filter: INTRO_TEXT_TIMING.BLUR.start,
          duration: INTRO_TEXT_TIMING.FADE_IN.duration,
          ease: INTRO_TEXT_TIMING.FADE_IN.ease,
        },
        INTRO_TEXT_TIMING.FADE_IN.start
      )
        .to(
          introTextRef.current,
          { opacity: 1, duration: INTRO_TEXT_TIMING.HOLD.duration },
          INTRO_TEXT_TIMING.HOLD.start
        )
        .to(
          introTextRef.current,
          {
            opacity: 0,
            y: INTRO_TEXT_TIMING.MOVEMENT.yEnd,
            filter: INTRO_TEXT_TIMING.BLUR.end,
            duration: INTRO_TEXT_TIMING.FADE_OUT.duration,
            ease: INTRO_TEXT_TIMING.FADE_OUT.ease,
          },
          INTRO_TEXT_TIMING.FADE_OUT.start
        );

      // ═══════════════════════════════════════════════════════════
      // BOOK ENTRANCE ANIMATION
      // ═══════════════════════════════════════════════════════════
      tl.to(
        washiRef.current,
        {
          opacity: 0,
          duration: BOOK_ENTRANCE_TIMING.DURATION,
          ease: BOOK_ENTRANCE_TIMING.EASE,
        },
        BOOK_ENTRANCE_TIMING.START
      ).to(
        spaceRef.current,
        {
          opacity: 1,
          duration: BOOK_ENTRANCE_TIMING.DURATION,
          ease: BOOK_ENTRANCE_TIMING.EASE,
        },
        BOOK_ENTRANCE_TIMING.START
      );

      // ═══════════════════════════════════════════════════════════
      // ZOOM EFFECT
      // ═══════════════════════════════════════════════════════════
      tl.to(
        spaceRef.current,
        {
          scale: ZOOM_TIMING.SCALE,
          duration: ZOOM_TIMING.DURATION,
          ease: ZOOM_TIMING.EASE,
        },
        ZOOM_TIMING.START
      );

      // ═══════════════════════════════════════════════════════════
      // FLASH EFFECT
      // ═══════════════════════════════════════════════════════════
      tl.to(
        flashRef.current,
        {
          opacity: 1,
          duration: FLASH_TIMING.FADE_IN.duration,
          ease: FLASH_TIMING.FADE_IN.ease,
        },
        FLASH_TIMING.FADE_IN.start
      ).to(
        flashRef.current,
        {
          opacity: 0,
          duration: FLASH_TIMING.FADE_OUT.duration,
          ease: FLASH_TIMING.FADE_OUT.ease,
        },
        FLASH_TIMING.FADE_OUT.start
      );
    },
    { scope: containerRef }
  );

  return { scrollProgress };
}
