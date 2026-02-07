/**
 * TypeScript interfaces for TheTransmutation component
 */

import type { MutableRefObject } from "react";
import type gsap from "gsap";

/**
 * Refs for text elements in the transmutation animation
 */
export interface TransmutationTextRefs {
  text1: MutableRefObject<HTMLDivElement | null>;
  text2: MutableRefObject<HTMLDivElement | null>;
  text3: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Return type for useTransmutationAnimation hook
 */
export interface UseTransmutationAnimationReturn {
  timeline: gsap.core.Timeline | null;
}

/**
 * Props for TransmutationCanvas component
 */
export interface TransmutationCanvasProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * Props for TransmutationText component
 */
export interface TransmutationTextProps {
  textRefs: TransmutationTextRefs;
}
