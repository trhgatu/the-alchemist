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

/**
 * Constellation Layout Configuration
 * ĐIỀU CHỈNH BỐ CỤC CHÒM SAO:
 */
export const CONSTELLATION_LAYOUT = {
  /** Core tech (TS/JS) horizontal spacing from center
   * Khoảng cách ngang của TS/JS từ tâm (0.4 = gần tâm)
   */
  CORE_TECH_SPACING: 0.4,

  /** Minimum orbit radius for other techs
   * Bán kính quỹ đạo tối thiểu cho các tech khác (1.2)
   */
  ORBIT_RADIUS_MIN: 1.2,

  /** Maximum orbit radius multiplier
   * Hệ số bán kính quỹ đạo tối đa (2.8)
   */
  ORBIT_RADIUS_MAX: 2.8,

  /** Horizontal spread multiplier
   * Hệ số mở rộng ngang (1.1 = rộng hơn một chút)
   */
  HORIZONTAL_MULTIPLIER: 1.1,

  /** Vertical compression multiplier
   * Hệ số nén dọc (0.5 = nén xuống một nửa)
   */
  VERTICAL_MULTIPLIER: 0.5,

  /** Random offset range for organic look
   * Độ lệch ngẫu nhiên để trông tự nhiên (0.6)
   */
  RANDOM_OFFSET: 0.6,

  /** Golden angle for spiral distribution
   * Góc vàng cho phân bố xoáy ốc (2.4 radians)
   */
  GOLDEN_ANGLE: 2.4,
} as const;

/**
 * Constellation Edge Configuration
 * ĐIỀU CHỈNH ĐƯỜNG NỐI CHÒM SAO:
 */
export const CONSTELLATION_EDGES = {
  /** Maximum length for extra edges (beyond MST)
   * Độ dài tối đa cho đường nối thêm (1.5 = ngắn hơn)
   */
  MAX_EXTRA_EDGE_LENGTH: 1.5,

  /** Number of extra edges to add for visual interest
   * Số lượng đường nối thêm (0 = chỉ giữ khung xương chính)
   */
  EXTRA_EDGE_COUNT: 0,
} as const;

/**
 * Scattered Positions Configuration
 * ĐIỀU CHỈNH VỊ TRÍ PHÂN TÁN (Orbital Phase):
 */
export const SCATTERED_POSITIONS = {
  /** Vertical range
   * Phạm vi dọc (-2.2 đến +2.2)
   */
  VERTICAL_RANGE: {
    min: -2.2,
    max: 4.4,
  },

  /** Cylinder radius
   * Bán kính hình trụ (4.0)
   */
  CYLINDER_RADIUS: 4.0,

  /** Horizontal multiplier
   * Hệ số ngang (1.5 = rộng hơn)
   */
  HORIZONTAL_MULTIPLIER: 1.5,

  /** Vertical compression
   * Nén dọc (0.6)
   */
  VERTICAL_MULTIPLIER: 0.6,

  /** Depth multiplier
   * Hệ số độ sâu (0.8)
   */
  DEPTH_MULTIPLIER: 0.8,
} as const;

/**
 * Initial Spawn Configuration
 * ĐIỀU CHỈNH VỊ TRÍ SPAWN BAN ĐẦU:
 */
export const INITIAL_SPAWN = {
  /** Y position (Magic Circle center)
   * Vị trí Y (tâm vòng tròn ma thuật = 0.6)
   */
  Y_POSITION: 0.6,

  /** Random spread range
   * Phạm vi phân tán ngẫu nhiên (0.2)
   */
  RANDOM_SPREAD: 0.2,

  /**
   * Floating Drift Configuration
   * Cấu hình chuyển động trôi nổi (floating)
   */
  DRIFT: {
    SPEED: 0.2, // Tốc độ trôi
    AMPLITUDE: 0.1, // Biên độ trôi (khoảng cách)
  },
} as const;

/**
 * Book Exit Animation Configuration
 * ĐIỀU CHỈNH ANIMATION BAY RA CỦA SÁCH:
 */
export const BOOK_EXIT_CONFIG = {
  /** Ascent height for dignified exit
   * Độ cao bay lên (20 = bay cao)
   */
  ASCENT_HEIGHT: 20,

  /** Final rotation angles (dignified pose)
   * Góc xoay cuối cùng (tư thế trang trọng)
   */
  FINAL_ROTATION: {
    x: -1.6,
    y: 1.7,
    z: -4.1,
  },

  /** Minimum scale during fade out
   * Tỉ lệ thu nhỏ tối thiểu (0.3 = giữ lại 30%)
   */
  SCALE_MIN: 0.3,

  /** Exit timing */
  TIMING: {
    START: 0.8,
    END: 0.9,
  },
} as const;

/**
 * Star Glow Effect Configuration
 * ĐIỀU CHỈNH HIỆU ỨNG SÁNG NGÔI SAO:
 */
export const STAR_GLOW_CONFIG = {
  /** When star glow activates (after flash)
   * Thời điểm sao bắt đầu sáng (sync with line reveal = 0.865)
   */
  ACTIVATION_PROGRESS: 0.865,

  /** Point light intensity
   * Cường độ ánh sáng (2.0 = sáng vừa phải)
   */
  LIGHT_INTENSITY: 2.0,

  /** Light distance/range
   * Phạm vi ánh sáng (3.0)
   */
  LIGHT_DISTANCE: 3.0,

  /** Light color (warm white)
   * Màu ánh sáng (Cyan - #00E5FF)
   */
  LIGHT_COLOR: "#00E5FF",

  /** Pulse animation
   * Animation nhấp nháy
   */
  PULSE: {
    SPEED: 1.5,
    AMPLITUDE: 0.3,
  },

  /** Fade in duration
   * Thời gian fade in (0.05 = 5% scroll)
   */
  FADE_IN_DURATION: 0.05,
} as const;
