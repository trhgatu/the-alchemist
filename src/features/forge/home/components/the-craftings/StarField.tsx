"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    // Parallax state
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Reset transform before applying new scale to avoid compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.05;
      mouseY = (e.clientY - height / 2) * 0.05;
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 2500);

      for (let i = 0; i < starCount; i++) {
        const isLarge = Math.random() < 0.1;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isLarge ? Math.random() * 2 + 1.5 : Math.random() * 1.5,
          baseOpacity: Math.random() * 0.6 + 0.4,
          opacity: 0,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() > 0.008) return;
      if (shootingStars.length > 3) return;

      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 15 + 20,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 1,
        life: 1,
      });
    };

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const scrollY = window.scrollY;

      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        star.opacity = star.baseOpacity + twinkle * 0.4;

        const depth = star.size * 0.2;
        const paraX = targetX * depth;

        const paraY = targetY * depth - scrollY * depth * 0.5;

        let renderY = (star.y + paraY) % height;
        if (renderY < 0) renderY += height;

        if (star.size > 2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x + paraX, renderY, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      createShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.02;

        if (s.life <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none mix-blend-screen"
    />
  );
}
