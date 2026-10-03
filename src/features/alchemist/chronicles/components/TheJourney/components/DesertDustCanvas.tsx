"use client";

import { useEffect, useRef } from "react";

interface Grain {
  x: number;
  y: number;
  /** Length of the streak the wind draws behind it */
  length: number;
  speed: number;
  alpha: number;
  lift: number;
}

// Blown sand keeps to the ground: grains live in the lower band of the
// screen, over the dunes, and thin out as they rise.
const BAND_TOP = 0.6;
const INK = "92, 62, 38";

interface DesertDustCanvasProps {
  className?: string;
  particleCount?: number;
}

/** Fine sand skimming the dune crests in gusts; drawn as short ink streaks. */
export function DesertDustCanvas({ className = "", particleCount = 90 }: DesertDustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (anywhere: boolean): Grain => {
      // Bias towards the ground: most grains sit low
      const depth = Math.random() ** 0.6;
      return {
        x: anywhere ? Math.random() * width : -40 - Math.random() * width * 0.3,
        y: height * (BAND_TOP + (1 - BAND_TOP) * depth),
        length: 6 + depth * 22,
        speed: 1.2 + depth * 2.8,
        alpha: 0.12 + depth * 0.3,
        lift: Math.random() * Math.PI * 2,
      };
    };
    const grains = Array.from({ length: particleCount }, () => spawn(true));

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(canvas);

    let time = 0;
    const render = () => {
      if (visible) {
        ctx.clearRect(0, 0, width, height);
        time += 0.016;
        // Wind comes in gusts rather than a steady stream
        const gust = 0.45 + 0.55 * Math.max(0, Math.sin(time * 0.6)) ** 2;

        ctx.lineCap = "round";
        for (let i = 0; i < grains.length; i++) {
          const g = grains[i];
          g.x += g.speed * gust;
          g.lift += 0.02;
          const y = g.y + Math.sin(g.lift) * 1.5;

          ctx.strokeStyle = `rgba(${INK}, ${g.alpha * (0.4 + 0.6 * gust)})`;
          ctx.lineWidth = 0.6 + (g.length / 28) * 0.6;
          ctx.beginPath();
          ctx.moveTo(g.x, y);
          ctx.lineTo(g.x - g.length * gust, y + 0.6);
          ctx.stroke();

          if (g.x - g.length > width) grains[i] = spawn(false);
        }
      }
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full ${className}`}
    />
  );
}
