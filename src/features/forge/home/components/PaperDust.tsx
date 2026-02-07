"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

/**
 * Renders a full-screen animated dust-like particle effect on a canvas.
 *
 * The canvas is non-interactive and uses a screen blend mode. The visual consists of many small particles
 * that gently drift and twinkle; the animation starts on mount, adapts to window resizes, and is cleaned up on unmount.
 *
 * @returns A canvas element covering the viewport that renders the animated dust effect.
 */
export function PaperDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize as EventListener);

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const count = 25; // 25 gentle particles

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2, // Gentle horizontal drift
          vy: -0.1 - Math.random() * 0.2, // Slow upward float
          size: 1 + Math.random() * 2, // 1-3px
          opacity: 0.3 + Math.random() * 0.5, // 0.3-0.8
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
        });
      }

      particlesRef.current = particles;
    };

    initParticles();

    // Animation loop
    // let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // time += 0.016; // ~60fps - Unused

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Twinkle effect
        particle.twinklePhase += particle.twinkleSpeed;
        const twinkle = Math.sin(particle.twinklePhase) * 0.3;
        const currentOpacity = Math.max(0, Math.min(1, particle.opacity + twinkle));

        // Wrap around screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;

        // Draw particle (gray dust for white background)
        ctx.fillStyle = `rgba(120, 113, 108, ${currentOpacity})`; // neutral-500 tone
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
