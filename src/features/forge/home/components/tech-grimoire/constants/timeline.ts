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
    START: 0.4, // Start when GodRay appears (MAGIC_CIRCLE_PHASES.RAY_END)
    /**
     * Thời điểm kết thúc giai đoạn bắn ra (Explosion Phase End)
     * - Giá trị: 0.60 (Kết thúc tại 60% scroll)
     * - Cách chỉnh tốc độ bắn ra:
     *   - Muốn bắn NHANH hơn: GIẢM giá trị này (VD: 0.55, 0.50) -> khoảng cách START-END nhỏ hơn -> tốc độ nhanh hơn
     *   - Muốn bắn CHẬM hơn: TĂNG giá trị này (VD: 0.70, 0.80) -> khoảng cách START-END lớn hơn -> tốc độ chậm hơn
     */
    END: 0.6,
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
    FINAL: 0.45, // Adjusted from 0.35 for larger icons
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
