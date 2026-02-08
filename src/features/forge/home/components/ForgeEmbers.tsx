"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import * as THREE from "three";
import { AdditiveBlending, TextureLoader, Color } from "three";
import { MagicCircleMaterial } from "@/shared/shaders";

// Register custom shader
extend({ MagicCircleMaterial });

interface GoldenSparksProps {
  isIgnited?: boolean;
}

/**
 * Smoothly adjusts the scene camera's z-position to create a focus zoom when ignited.
 *
 * Moves the camera toward z = 5 when `isIgnited` is true and toward z = 8 when false, blending the position over time for a gradual zoom effect.
 *
 * @param isIgnited - When true, camera zooms closer to the scene; when false, camera retreats to the default distance.
 */
function CameraRig({ isIgnited = false }: { isIgnited?: boolean }) {
  useFrame((state, delta) => {
    // Zoom Effect: Move camera closer when ignited
    const targetZ = isIgnited ? 5 : 8;
    // Slow zoom (0.5) to allow "scene" perception
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 0.5);
  });
  return null;
}

/**
 * Render an animated magic circle visual that responds to an ignition state.
 *
 * Animates rotation, scale, color, and opacity and applies a custom shader material with a texture.
 *
 * @param isIgnited - When true, switch visual targets to the intensified (ignited) state
 * @returns A JSX element containing the animated magic-circle mesh
 */
function MagicCircle({ isIgnited = false }: { isIgnited?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null); // Use any to bypass strict shader type checks for now
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "/assets/images/craftings/magic_circle.png");

  // Color transition state
  const currentColor = useRef(new Color("#4aa0ff"));
  const idleColor = useMemo(() => new Color("#4aa0ff"), []);
  const activeColor = useMemo(() => new Color("#ffaa33"), []);
  // const burstColor = useMemo(() => new Color("#ffffff"), []); // Unused

  useFrame((state, delta) => {
    if (materialRef.current && meshRef.current) {
      // Update Time for shader animation
      materialRef.current.uTime = state.clock.elapsedTime;

      // Rotation Speed
      // Idle: Slow spin. Ignited: FAST spin
      const rotationSpeed = isIgnited ? 2.5 : 0.2;
      meshRef.current.rotation.z -= delta * rotationSpeed;

      // Scale & Pulse
      // Idle: Breathing Pulse (Scale 3.5 -> 3.7)
      // Ignited: Expansion (Scale 3.5 -> 5.5)
      const time = state.clock.elapsedTime;
      const breathingScale = 3.5 + Math.sin(time) * 0.2;
      const targetScale = isIgnited ? 5.5 : breathingScale;

      const currentScale = meshRef.current.scale.x;
      // Slower expansion (0.5)
      const newScale = THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        delta * (isIgnited ? 0.5 : 1)
      );
      meshRef.current.scale.set(newScale, newScale, newScale);

      // Lerp Color
      const targetColor = isIgnited ? activeColor : idleColor;
      currentColor.current.lerp(targetColor, delta * 3);

      // Update Shader Color
      if (materialRef.current.uColor) {
        materialRef.current.uColor.copy(currentColor.current);
      }

      // Pulse Opacity
      // Idle: Breathing (0.3 -> 0.5)
      // Ignited: Intense (1.0)
      const breathingOpacity = 0.4 + Math.sin(time * 2) * 0.1;
      const targetOpacity = isIgnited ? 1.0 : breathingOpacity;

      materialRef.current.uOpacity = THREE.MathUtils.lerp(
        materialRef.current.uOpacity || 0,
        targetOpacity,
        delta * 2
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={[5, 5, 5]}>
      <planeGeometry args={[1.5, 1.5]} />
      <magicCircleMaterial
        ref={materialRef}
        uTexture={texture}
        uColor={idleColor} // Initial color
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Renders a particle-based golden sparks effect that responds to an ignition state.
 *
 * When `isIgnited` is true the particles accelerate, grow, and transition color toward the active (orange) tone;
 * when false they slow, shrink, and revert toward the idle (blue) tone. The system also rotates slowly and respawns
 * particles that move beyond the vertical threshold.
 *
 * @param isIgnited - If true, use the ignited visual state (faster, larger, orange sparks); defaults to `false`.
 * @returns A React element containing a Three.js Points particle system with buffer geometry and a textured PointsMaterial.
 */
export function GoldenSparks({ isIgnited = false }: GoldenSparksProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 150;

  const idleColor = useMemo(() => new THREE.Color("#4aa0ff"), []);
  const activeColor = useMemo(() => new THREE.Color("#ffaa33"), []);

  const currentState = useRef({
    speedMultiplier: 0.2,
    color: new THREE.Color("#4aa0ff"),
    size: 0.2,
  });

  const sparkTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 10 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = 0.01 + Math.random() * 0.03;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, velocities: vel, phases: ph };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const targetSpeed = isIgnited ? 1.0 : 0.2;
    const targetColor = isIgnited ? activeColor : idleColor;
    const targetSize = isIgnited ? 0.4 : 0.2;

    const lerpFactor = delta * 2;
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

    for (let i = 0; i < particleCount; i++) {
      const speed = currentState.current.speedMultiplier;

      positions[i * 3 + 0] +=
        velocities[i * 3 + 0] * speed + Math.sin(time + phases[i]) * 0.002 * speed;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * speed;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * speed;

      if (positions[i * 3 + 1] > 6) {
        positions[i * 3 + 1] = -6;
        positions[i * 3 + 0] = (Math.random() - 0.5) * 15;
      }
    }
    positionsAttr.needsUpdate = true;

    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
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
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}

interface ForgeEmbersProps {
  isIgnited?: boolean;
}

export function ForgeEmbers({ isIgnited = false }: ForgeEmbersProps) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <CameraRig isIgnited={isIgnited} />
        <MagicCircle isIgnited={isIgnited} />
        <GoldenSparks isIgnited={isIgnited} />
      </Canvas>
    </div>
  );
}
