/**
 * ⚙️ GRIMOIRE ANIMATION TYPES
 * ═══════════════════════════════════════════════════════════
 *
 * TypeScript type definitions for the Tech Grimoire animation system.
 * Provides type safety and IntelliSense support across the codebase.
 *
 * @module tech-grimoire/types/animation
 */

import type { MutableRefObject } from "react";

/**
 * GSAP easing function types
 */
export type EasingFunction =
  | "none"
  | "power1.in"
  | "power1.out"
  | "power1.inOut"
  | "power2.in"
  | "power2.out"
  | "power2.inOut"
  | "power3.in"
  | "power3.out"
  | "power3.inOut"
  | "power4.in"
  | "power4.out"
  | "power4.inOut"
  | "back.in"
  | "back.out"
  | "back.inOut"
  | "elastic.in"
  | "elastic.out"
  | "elastic.inOut"
  | "bounce.in"
  | "bounce.out"
  | "bounce.inOut"
  | "circ.in"
  | "circ.out"
  | "circ.inOut"
  | "expo.in"
  | "expo.out"
  | "expo.inOut"
  | "sine.in"
  | "sine.out"
  | "sine.inOut"
  | "linear";

/**
 * Animation timing configuration
 */
export interface AnimationTiming {
  /** Start position in timeline (0-1) */
  start: number;

  /** Duration as percentage of timeline (0-1) */
  duration: number;

  /** Optional easing function */
  ease?: EasingFunction;
}

/**
 * Scroll progress reference
 */
export interface ScrollProgressRef {
  current: number;
}

/**
 * Timeline phase state
 */
export interface PhaseState {
  /** Whether this phase is active */
  isActive: boolean;

  /** Progress within this phase (0-1) */
  progress: number;

  /** Absolute scroll progress (0-1) */
  scrollProgress: number;
}

/**
 * Animation state for a single element
 */
export interface ElementAnimationState {
  /** Opacity (0-1) */
  opacity: number;

  /** Scale (1 = normal) */
  scale: number;

  /** Position */
  position: {
    x: number;
    y: number;
    z: number;
  };

  /** Rotation in radians */
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * Timeline configuration options
 */
export interface TimelineConfig {
  /** Total scroll duration (e.g., "+=2500%") */
  totalDuration: string;

  /** Scroll smoothness (1-2) */
  scrub: number;

  /** Refresh priority */
  refreshPriority: number;

  /** Scroll trigger element */
  trigger: HTMLElement | null;
}

/**
 * Animation hook return type
 */
export interface UseAnimationReturn {
  /** Current scroll progress (0-1) */
  progress: number;

  /** Whether animation is ready */
  isReady: boolean;

  /** Current active phase */
  activePhase: string | null;
}

/**
 * Particle animation state
 */
export interface ParticleState {
  /** Unique particle ID */
  id: string;

  /** Current position */
  position: { x: number; y: number; z: number };

  /** Target position */
  target: { x: number; y: number; z: number };

  /** Current velocity */
  velocity: { x: number; y: number; z: number };

  /** Scale factor */
  scale: number;

  /** Opacity */
  opacity: number;

  /** Rotation */
  rotation: number;
}

/**
 * Visual effect state
 */
export interface VisualEffectState {
  /** Effect opacity */
  opacity: number;

  /** Effect intensity */
  intensity: number;

  /** Effect scale */
  scale: number;

  /** Whether effect is visible */
  isVisible: boolean;
}

/**
 * Magic circle animation state
 */
export interface MagicCircleState extends VisualEffectState {
  /** Circle growth progress (0-1) */
  circleGrow: number;

  /** Ray growth progress (0-1) */
  rayGrow: number;

  /** Rotation angle in radians */
  rotation: number;
}

/**
 * Timeline phase names
 */
export type TimelinePhase =
  | "intro"
  | "book-entrance"
  | "idle"
  | "zoom"
  | "flash"
  | "transmutation"
  | "orbital"
  | "shooting";

/**
 * Animation event handlers
 */
export interface AnimationEventHandlers {
  /** Called when phase starts */
  onPhaseStart?: (phase: TimelinePhase) => void;

  /** Called when phase ends */
  onPhaseEnd?: (phase: TimelinePhase) => void;

  /** Called on every frame update */
  onUpdate?: (progress: number) => void;

  /** Called when animation completes */
  onComplete?: () => void;
}

/**
 * Ref object type for HTML elements
 */
export type HTMLElementRef<T extends HTMLElement = HTMLDivElement> = MutableRefObject<T | null>;
