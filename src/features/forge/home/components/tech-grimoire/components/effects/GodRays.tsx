/**
 * ⚙️ GOD RAYS COMPONENT
 * ═══════════════════════════════════════════════════════════
 *
 * Main visual effects component for the Grimoire section.
 * Combines god rays, magic circle, page glow, and lighting effects.
 *
 * @module tech-grimoire/components/effects/GodRays
 */

import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getMagicCircleState } from "../../constants";
import {
  GodRayMaterial,
  GodRayMaterialType,
  MagicCircleMaterial,
  MagicCircleMaterialType,
  PageGlowMaterial,
  PageGlowMaterialType,
} from "../../shaders";

// Register shader materials with Three.js
extend({ GodRayMaterial, MagicCircleMaterial, PageGlowMaterial });

/**
 * GodRays component props
 */
export interface GodRaysProps {
  /** Scroll progress reference (0-1) */
  scrollProgress: React.MutableRefObject<number>;
}

/**
 * God Rays Visual Effects Component
 *
 * Renders the complete visual effects system for the Grimoire section including:
 * - Volumetric god rays (core beam + outer glow)
 * - Rotating magic circle
 * - Page glow effect
 * - Dynamic point lights
 *
 * All effects are synchronized with scroll progress using the getMagicCircleState helper.
 *
 * @example
 * ```tsx
 * const scrollProgress = useRef(0);
 * <GodRays scrollProgress={scrollProgress} />
 * ```
 */
export function GodRays({ scrollProgress }: GodRaysProps) {
  // Group refs
  const groupRef = useRef<THREE.Group>(null);
  const rayGroupRef = useRef<THREE.Group>(null);
  const circleGroupRef = useRef<THREE.Group>(null);

  // Material refs
  const rayMaterialRef = useRef<GodRayMaterialType>(null);
  const rayGlowRef = useRef<GodRayMaterialType>(null);
  const circleMaterialRef = useRef<MagicCircleMaterialType>(null);
  const pageGlowMaterialRef = useRef<PageGlowMaterialType>(null);

  // Light refs
  const lightRef = useRef<THREE.PointLight>(null);
  const surfaceLightRef = useRef<THREE.PointLight>(null);

  // Textures
  const magicCircleTexture = useTexture("/assets/images/craftings/magic_circle.png");

  useFrame((state) => {
    if (!groupRef.current) return;

    const p = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // Calculate animation state from scroll progress
    const { opacity, circleGrow, rayGrow } = getMagicCircleState(p);

    // Pulse effect
    const pulse = Math.sin(time * 2) * 0.1 + 0.9;

    // Update ray materials
    if (rayMaterialRef.current) {
      rayMaterialRef.current.uTime = time;
      rayMaterialRef.current.uOpacity = opacity * pulse;
    }
    if (rayGlowRef.current) {
      rayGlowRef.current.uTime = time;
      rayGlowRef.current.uOpacity = opacity * 0.3 * pulse;
    }

    // Update ray group scale
    if (rayGroupRef.current) {
      rayGroupRef.current.scale.set(rayGrow, rayGrow * (1 + Math.sin(time * 3) * 0.1), rayGrow);
    }

    // Update lights
    if (lightRef.current) {
      lightRef.current.intensity = (rayGrow * 2.0 + pulse * 0.5) * opacity;
    }
    if (surfaceLightRef.current) {
      surfaceLightRef.current.intensity = (opacity * 5.0 + pulse * 2.0) * opacity;
      surfaceLightRef.current.distance = 8;
    }

    // Update magic circle
    if (circleMaterialRef.current) {
      circleMaterialRef.current.uTime = time;
      circleMaterialRef.current.uOpacity = opacity;
    }
    if (circleGroupRef.current) {
      circleGroupRef.current.scale.setScalar(circleGrow);
    }

    // Update page glow
    if (pageGlowMaterialRef.current) {
      pageGlowMaterialRef.current.uTime = time;
      pageGlowMaterialRef.current.uOpacity = opacity;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Page Glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
        <planeGeometry args={[1.2, 0.8]} />
        <pageGlowMaterial
          ref={pageGlowMaterialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Magic Circle */}
      <group ref={circleGroupRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.7, 0]}>
          <planeGeometry args={[3.0, 3.0]} />
          <magicCircleMaterial
            ref={circleMaterialRef}
            uTexture={magicCircleTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* God Rays */}
      <group ref={rayGroupRef}>
        {/* Core Beam */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.4, 0.6, 5, 32, 1, true]} />
          <godRayMaterial
            ref={rayMaterialRef}
            transparent
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uColor={new THREE.Color("#ffd700")}
          />
        </mesh>

        {/* Outer Glow */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.8, 1.2, 5, 32, 1, true]} />
          <godRayMaterial
            ref={rayGlowRef}
            transparent
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uColor={new THREE.Color("#ffaa00")}
          />
        </mesh>
      </group>

      {/* Lights */}
      <pointLight ref={lightRef} distance={10} decay={2} color="#ffd700" position={[0, 2, 0]} />
      <pointLight
        ref={surfaceLightRef}
        distance={5}
        decay={2}
        color="#ffaa00"
        position={[0, 0.5, 0]}
      />
    </group>
  );
}
