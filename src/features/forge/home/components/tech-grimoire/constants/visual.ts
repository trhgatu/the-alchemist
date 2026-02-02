export const MAGIC_CIRCLE_TIMING = {
  /** When circle starts to appear (0.3 = 30% of timeline)
   * Thời điểm vòng tròn bắt đầu xuất hiện (0.3 = 30% scroll)
   */
  CIRCLE_START: 0.3,

  /** Duration for circle to fully open
   * Thời gian vòng tròn mở hoàn toàn (0.05 = 5% scroll)
   */
  CIRCLE_OPEN_DURATION: 0.05,

  /** Duration for rays to appear after circle opens
   * Thời gian tia sáng xuất hiện sau khi vòng tròn mở (0.05 = 5% scroll)
   */
  RAY_APPEAR_DURATION: 0.05,

  /** How long to hold the full effect
   * Thời gian giữ hiệu ứng đầy đủ (0.2 = 20% scroll)
   */
  HOLD_DURATION: 0.2,

  /** Duration for exit animation
   * Thời gian biến mất (0.2 = 20% scroll)
   */
  EXIT_DURATION: 0.2,
} as const;

export const MAGIC_CIRCLE_PHASES = {
  get CIRCLE_END() {
    return MAGIC_CIRCLE_TIMING.CIRCLE_START + MAGIC_CIRCLE_TIMING.CIRCLE_OPEN_DURATION;
  },

  get RAY_END() {
    return this.CIRCLE_END + MAGIC_CIRCLE_TIMING.RAY_APPEAR_DURATION;
  },

  get HOLD_END() {
    return this.RAY_END + MAGIC_CIRCLE_TIMING.HOLD_DURATION;
  },

  get EXIT_END() {
    return this.HOLD_END + MAGIC_CIRCLE_TIMING.EXIT_DURATION;
  },
} as const;

/**
 * Magic Circle visual properties
 * ĐIỀU CHỈNH HÌNH DÁNG VÒNG TRÒN MA THUẬT:
 */
export const MAGIC_CIRCLE_VISUAL = {
  /** Circle color (golden)
   * Màu sắc vòng tròn (vàng kim)
   */
  COLOR: "#ffd700",

  /** Number of god rays
   * Số lượng tia sáng (12 tia)
   */
  RAY_COUNT: 12,

  /** Ray dimensions
   * Kích thước tia sáng (width: rộng, height: cao)
   */
  RAY_SIZE: {
    width: 0.3,
    height: 4,
  },

  /** Circle radius
   * Bán kính vòng tròn (2 = kích thước trung bình)
   */
  CIRCLE_RADIUS: 2,

  /** Rotation speed multiplier
   * Tốc độ xoay (0.2 = chậm, tăng để xoay nhanh hơn)
   */
  ROTATION_SPEED: 0.2,

  /** Pulse speed multiplier
   * Tốc độ nhấp nháy (2.0 = trung bình)
   */
  PULSE_SPEED: 2.0,
} as const;

/**
 * God Rays configuration
 */
export const GOD_RAYS_CONFIG = {
  /** Ray color */
  COLOR: "#ffd700",

  /** Number of rays */
  COUNT: 12,

  /** Ray geometry */
  GEOMETRY: {
    width: 0.3,
    height: 4,
    depth: 0.01,
  },

  /** Light intensity */
  LIGHT_INTENSITY: 2.0,

  /** Surface light intensity */
  SURFACE_LIGHT_INTENSITY: 5.0,

  /** Light distance */
  LIGHT_DISTANCE: 8,
} as const;

export const PAGE_GLOW_CONFIG = {
  COLOR: "#ffaa00",
  INTENSITY: 0.15,
  PULSE_SPEED: 1.5,
} as const;

export function getMagicCircleState(progress: number) {
  const { CIRCLE_START, CIRCLE_OPEN_DURATION, RAY_APPEAR_DURATION, EXIT_DURATION } =
    MAGIC_CIRCLE_TIMING;
  const { CIRCLE_END, RAY_END, HOLD_END, EXIT_END } = MAGIC_CIRCLE_PHASES;

  let opacity = 0;
  let circleGrow = 0;
  let rayGrow = 0;

  if (progress >= CIRCLE_START && progress < CIRCLE_END) {
    // Circle opening phase
    const circleProgress = (progress - CIRCLE_START) / CIRCLE_OPEN_DURATION;
    opacity = circleProgress;
    circleGrow = circleProgress;
    rayGrow = 0;
  } else if (progress >= CIRCLE_END && progress < RAY_END) {
    // Rays appearing phase
    const rayProgress = (progress - CIRCLE_END) / RAY_APPEAR_DURATION;
    opacity = 1;
    circleGrow = 1;
    rayGrow = rayProgress;
  } else if (progress >= RAY_END && progress < HOLD_END) {
    // Hold phase
    opacity = 1;
    rayGrow = 1;
    circleGrow = 1;
  } else if (progress >= HOLD_END && progress < EXIT_END) {
    // Exit phase
    const exitP = (progress - HOLD_END) / EXIT_DURATION;
    if (exitP < 0.5) {
      // First half: fade out rays
      rayGrow = 1 - exitP * 2;
      circleGrow = 1;
    } else {
      // Second half: fade out circle
      rayGrow = 0;
      circleGrow = 1 - (exitP - 0.5) * 2;
    }
    opacity = 1 - exitP;
  } else if (progress >= EXIT_END) {
    // Fully hidden
    opacity = 0;
    rayGrow = 0;
    circleGrow = 0;
  }

  return { opacity, circleGrow, rayGrow };
}
