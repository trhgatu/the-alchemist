export const TIMELINE_CONFIG = {
  TOTAL_DURATION: "+=1200%",
  SCRUB: 1.5,
  REFRESH_PRIORITY: 800,
} as const;

export const INTRO_TEXT_TIMING = {
  FADE_IN: {
    start: 0,
    duration: 0.1,
    ease: "power2.out" as const,
  },

  HOLD: {
    start: 0.1,
    duration: 0.1,
  },

  FADE_OUT: {
    start: 0.2,
    duration: 0.1,
    ease: "power2.in" as const,
  },

  MOVEMENT: {
    yStart: 0,
    yEnd: -20,
  },
  BLUR: {
    start: "blur(0px)",
    end: "blur(10px)",
  },
} as const;

export const BOOK_ENTRANCE_TIMING = {
  START: 0.3,
  DURATION: 0.2,
  EASE: "none" as const,
} as const;

export const ZOOM_TIMING = {
  START: 0.8,
  DURATION: 0.15,
  SCALE: 1.2,
  EASE: "power1.in" as const,
} as const;

export const FLASH_TIMING = {
  FADE_IN: {
    start: 0.92,
    duration: 0.01,
    ease: "power2.in" as const,
  },

  FADE_OUT: {
    start: 0.93,
    duration: 0.01,
    ease: "power2.out" as const,
  },
} as const;

export const PARTICLE_TIMING = {
  /** Explosion phase timing */
  EXPLOSION: {
    START: 0.35,
    END: 0.75,
  },

  /** Convergence phase timing (particles move to final constellation positions) */
  CONVERGENCE: {
    START: 0.85,
    END: 0.95,
  },

  /** Rotation stop timing (group rotation stops before convergence) */
  ROTATION_STOP: {
    START: 0.75,
    END: 0.85,
  },

  /** Maximum stagger delay for particle animations */
  MAX_STAGGER_DELAY: 0.15,
} as const;

export const PARTICLE_ANIMATION = {
  /** Scale values */
  SCALE: {
    MIN: 0,
    SCATTERED: 0.6,
    FINAL: 0.35,
  },

  /** Pulse animation */
  PULSE: {
    AMPLITUDE: 0.05,
    FREQUENCY: 3,
  },

  /** Rotation */
  ROTATION: {
    SCROLL_MULTIPLIER: 0.2,
    IDLE_SPEED: 0.05,
  },
} as const;

export function getAbsolutePosition(progress: number, totalDuration: number): number {
  return progress * totalDuration;
}
