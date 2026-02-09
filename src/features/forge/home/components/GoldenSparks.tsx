"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AdditiveBlending } from "three";

interface GoldenSparksProps {
  /**
   * If true, sparks are in high-energy state (faster, larger, orange).
   * If false, sparks are in idle state (slower, smaller, blue).
   * Can be overridden by specific color/speed props.
   */
  isIgnited?: boolean;
  /**
   * Override the active (ignited) color. Default: #ffaa33 (Orange)
   */
  activeColor?: string;
  /**
   * Override the idle color. Default: #4aa0ff (Blue)
   */
  idleColor?: string;
  /**
   * Number of particles. Default: 150
   */
  count?: number;
  /**
   * Blending mode. Default: AdditiveBlending
   */
  blending?: THREE.Blending;
}

/**
 * Renders a particle-based golden sparks effect.
 *
 * @param isIgnited - If true, use the ignited visual state (faster, larger, orange sparks).
 * @param activeColor - Custom hex color for the ignited state.
 * @param idleColor - Custom hex color for the idle state.
 * @param count - Particle count.
 * @param blending - Blending mode.
 */
export function GoldenSparks({
  isIgnited = false,
  activeColor: customActiveColor = "#ffaa33",
  idleColor: customIdleColor = "#4aa0ff",
  count = 150,
  blending = AdditiveBlending,
}: GoldenSparksProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const idleColorObj = useMemo(() => new THREE.Color(customIdleColor), [customIdleColor]);
  const activeColorObj = useMemo(() => new THREE.Color(customActiveColor), [customActiveColor]);

  const currentState = useRef({
    speedMultiplier: 0.2,
    color: new THREE.Color(customIdleColor),
    size: 0.2,
  });

  const sparkTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Randomly choose ember shape type
    const shapeType = Math.floor(Math.random() * 4);

    ctx.clearRect(0, 0, 128, 128);

    if (shapeType === 0) {
      // Triangle spark (upward pointing)
      const gradient = ctx.createLinearGradient(64, 30, 64, 100);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 200, 100, 0.8)");
      gradient.addColorStop(0.7, "rgba(255, 100, 50, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(64, 20);
      ctx.lineTo(40, 100);
      ctx.lineTo(88, 100);
      ctx.closePath();
      ctx.fill();
    } else if (shapeType === 1) {
      // Teardrop / flame shape
      ctx.beginPath();
      ctx.moveTo(64, 20);
      ctx.bezierCurveTo(90, 40, 90, 80, 64, 110);
      ctx.bezierCurveTo(38, 80, 38, 40, 64, 20);

      const gradient = ctx.createRadialGradient(64, 50, 0, 64, 70, 50);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 220, 100, 0.9)");
      gradient.addColorStop(0.6, "rgba(255, 120, 50, 0.4)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
    } else if (shapeType === 2) {
      // Irregular blob
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 30 + Math.random() * 25;
        const x = 64 + Math.cos(angle) * radius;
        const y = 64 + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 40);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 200, 100, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 100, 50, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
    } else {
      // Small round spark
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 35);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 220, 120, 0.9)");
      gradient.addColorStop(0.7, "rgba(255, 100, 50, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(64, 64, 35, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 10 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.05; // Faster horizontal
      vel[i * 3 + 1] = 0.03 + Math.random() * 0.08; // Faster upward (embers rise)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.05; // Faster depth

      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, velocities: vel, phases: ph };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const targetSpeed = isIgnited ? 1.0 : 0.2;
    const targetColor = isIgnited ? activeColorObj : idleColorObj;
    const targetSize = isIgnited ? 0.4 : 0.2;

    const lerpFactor = Math.min(delta * 2, 1); // Clamp to [0, 1]
    currentState.current.speedMultiplier = THREE.MathUtils.lerp(
      currentState.current.speedMultiplier,
      targetSpeed,
      lerpFactor
    );
    currentState.current.size = THREE.MathUtils.lerp(
      currentState.current.size,
      targetSize,
      lerpFactor
    );
    currentState.current.color.lerp(targetColor, lerpFactor);

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.color = currentState.current.color;
    material.size = currentState.current.size;

    const time = state.clock.elapsedTime;
    const positionsAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const speed = currentState.current.speedMultiplier;

      positions[i * 3 + 0] +=
        velocities[i * 3 + 0] * speed + Math.sin(time + phases[i]) * 0.002 * speed;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * speed;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * speed;

      // Wrap around Y axis
      if (positions[i * 3 + 1] > 6) {
        positions[i * 3 + 1] = -6;
        positions[i * 3 + 0] = (Math.random() - 0.5) * 15;
      }
    }
    positionsAttr.needsUpdate = true;

    pointsRef.current.rotation.y = time * 0.05;
  });

  if (!sparkTexture) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={sparkTexture}
        size={0.4}
        color="#ffffff"
        transparent={true}
        opacity={0.9}
        blending={blending} // Use prop
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
