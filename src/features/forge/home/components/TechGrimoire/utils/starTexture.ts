import * as THREE from "three";

/**
 * Generate high-fidelity star texture with cross flares and core glow
 * Used for particle sprite backgrounds
 */
export const createStarTexture = (): THREE.Texture | null => {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.4);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.1, "rgba(0, 255, 255, 0.8)");
  gradient.addColorStop(0.5, "rgba(0, 200, 255, 0.1)");
  gradient.addColorStop(1, "rgba(0, 200, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const drawSoftRay = (isHorizontal: boolean) => {
    const grd = ctx.createLinearGradient(
      isHorizontal ? 0 : cx,
      isHorizontal ? cy : 0,
      isHorizontal ? size : cx,
      isHorizontal ? cy : size
    );
    grd.addColorStop(0, "rgba(255, 255, 255, 0)");
    grd.addColorStop(0.3, "rgba(255, 255, 255, 0.1)");
    grd.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
    grd.addColorStop(0.7, "rgba(255, 255, 255, 0.1)");
    grd.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = grd;

    if (isHorizontal) {
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, cy - 3, size, 6);
      ctx.globalAlpha = 0.6;
      ctx.fillRect(10, cy - 1, size - 20, 2);
      ctx.globalAlpha = 1.0;
      ctx.fillRect(20, cy - 0.5, size - 40, 1);
    } else {
      ctx.globalAlpha = 0.3;
      ctx.fillRect(cx - 3, 0, 6, size);
      ctx.globalAlpha = 0.6;
      ctx.fillRect(cx - 1, 10, 2, size - 20);
      ctx.globalAlpha = 1.0;
      ctx.fillRect(cx - 0.5, 20, 1, size - 40);
    }
    ctx.globalAlpha = 1.0;
  };

  drawSoftRay(true);
  drawSoftRay(false);

  const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.05);
  coreGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  coreGlow.addColorStop(0.5, "rgba(220, 240, 255, 0.4)");
  coreGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = coreGlow;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};
