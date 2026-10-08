/** Degrees between neighbouring works on the orbit. */
export const ORBIT_SPACING = 32;

/** The orbit's radius and centre for a column of the given height. */
export function orbitFrame(height: number) {
  const radius = height * 0.55;
  return { radius, centerX: -radius + 140, centerY: height * 0.45 };
}

/**
 * Where work `i` sits on the orbit when `progress` (a fractional index) is
 * in front, in px from the column's top-left.
 */
export function orbitPoint(i: number, progress: number, height: number) {
  const { radius, centerX, centerY } = orbitFrame(height);
  const angle = (i - progress) * ORBIT_SPACING * (Math.PI / 180);
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}
