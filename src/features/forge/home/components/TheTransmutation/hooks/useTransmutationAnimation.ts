/**
 * Hook for creating and managing transmutation text animations
 *
 * This hook encapsulates all the GSAP timeline logic for text animations,
 * making it reusable and testable independently of the component.
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollController } from "@/contexts/ScrollControllerContext";
import { TRANSMUTATION_ANIMATION_CONFIG } from "../config/animation.config";
import type { TransmutationTextRefs, UseTransmutationAnimationReturn } from "../types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseTransmutationAnimationOptions {
  textRefs: TransmutationTextRefs;
  containerRef: React.RefObject<HTMLDivElement | null>;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
  triggerSelector?: string;
}

export function useTransmutationAnimation({
  textRefs,
  containerRef,
  triggerRef,
  triggerSelector,
}: UseTransmutationAnimationOptions): UseTransmutationAnimationReturn {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollProgressRef = useRef(0);

  const { isControlled, triggerElement, registerTimeline } = useScrollController();

  useGSAP(
    () => {
      const sceneWrapper =
        triggerRef?.current ||
        (triggerSelector ? document.querySelector(triggerSelector) : null) ||
        triggerElement ||
        containerRef.current?.closest("#scene-wrapper") ||
        containerRef.current;

      if (!sceneWrapper && !isControlled) {
        return;
      }

      // Create timeline - paused in controlled mode
      const tl = gsap.timeline({
        paused: isControlled,
      });

      // If standalone mode, attach ScrollTrigger
      if (!isControlled && sceneWrapper) {
        ScrollTrigger.create({
          trigger: sceneWrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          animation: tl,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        });
      }

      const config = TRANSMUTATION_ANIMATION_CONFIG;

      // Phase 1: Text 1
      const { phase1 } = config;
      tl.to(
        textRefs.text1.current,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: phase1.fadeInDuration,
          ease: config.easing.fadeIn,
        },
        phase1.startTime
      )
        .to(
          textRefs.text1.current,
          { opacity: 1, duration: phase1.holdDuration },
          phase1.startTime + phase1.fadeInDuration
        )
        .to(
          textRefs.text1.current,
          {
            opacity: 0,
            x: config.motion.text1Exit.x,
            filter: config.motion.text1Exit.blur,
            duration: phase1.fadeOutDuration,
            ease: config.easing.fadeOut,
          },
          phase1.startTime + phase1.fadeInDuration + phase1.holdDuration
        );

      // Phase 2: Text 2
      const { phase2 } = config;
      tl.to(
        textRefs.text2.current,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: phase2.fadeInDuration,
          ease: config.easing.fadeIn,
        },
        phase2.startTime
      )
        .to(
          textRefs.text2.current,
          { opacity: 1, duration: phase2.holdDuration },
          phase2.startTime + phase2.fadeInDuration
        )
        .to(
          textRefs.text2.current,
          {
            opacity: 0,
            x: config.motion.text2Exit.x,
            filter: config.motion.text2Exit.blur,
            duration: phase2.fadeOutDuration,
            ease: config.easing.fadeOut,
          },
          phase2.startTime + phase2.fadeInDuration + phase2.holdDuration
        );

      // Phase 3: Text 3 (Title)
      const { phase3 } = config;
      tl.to(
        textRefs.text3.current,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: phase3.fadeInDuration,
          ease: config.easing.titleFadeIn,
        },
        phase3.startTime
      )
        .to(
          textRefs.text3.current,
          { opacity: 1, duration: phase3.holdDuration },
          phase3.startTime + phase3.fadeInDuration
        )
        .to(
          textRefs.text3.current,
          {
            opacity: 0,
            scale: config.motion.text3Exit.scale,
            filter: config.motion.text3Exit.blur,
            duration: phase3.fadeOutDuration,
            ease: config.easing.fadeOut,
          },
          phase3.startTime + phase3.fadeInDuration + phase3.holdDuration
        );

      // Register timeline with parent in controlled mode
      if (isControlled && registerTimeline) {
        registerTimeline("transmutation", tl);
      }

      timelineRef.current = tl;
    },
    { scope: containerRef }
  );

  return {
    timeline: timelineRef.current,
    scrollProgress: scrollProgressRef,
  };
}
