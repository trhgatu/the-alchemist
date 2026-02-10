"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import * as THREE from "three";
import { AdditiveBlending, TextureLoader, Color } from "three";
import { MagicCircleMaterial } from "@/shared/shaders";
import { GoldenSparks } from "./GoldenSparks";

// Register custom shader
extend({ MagicCircleMaterial });

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
