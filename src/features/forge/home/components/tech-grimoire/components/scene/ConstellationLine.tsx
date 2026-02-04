import React, { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ConstellationLineProps {
  startIdx: number;
  endIdx: number;
  groupRef: React.MutableRefObject<THREE.Group | null>;
  scrollProgress: React.MutableRefObject<number>;
}

export function ConstellationLine({
  startIdx,
  endIdx,
  groupRef,
  scrollProgress,
}: ConstellationLineProps) {
  // Use 'any' to avoid TS conflict between R3F <line> and SVG <line>
  const lineRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // Initialize geometry
  useLayoutEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
    }
  }, []);

  useFrame(() => {
    if (!lineRef.current || !groupRef.current || !geometryRef.current) return;

    // Safety check for indices
    const children = groupRef.current.children;
    // Note: Children array includes particles AND lines.
    // We assume particles are first based on render order in parent.
    // If startIdx/endIdx are within particle range, this works.
    if (!children[startIdx] || !children[endIdx]) return;

    const child1 = children[startIdx];
    const child2 = children[endIdx];

    const p = scrollProgress.current;

    // "BOOM" Reveal Threshold
    // 0.925 coincides with the Flash PEAK (screen is white)
    // So when flash fades at 0.93, lines are already there!
    const revealThreshold = 0.925;

    // Toggle visibility based on threshold
    const shouldBeVisible = p >= revealThreshold;

    // Visibility toggle
    if (lineRef.current.visible !== shouldBeVisible) {
      lineRef.current.visible = shouldBeVisible;
    }

    if (!shouldBeVisible) return;

    // Update geometry positions from particles
    // We use setFromPoints which is efficient for standard lines

    // Sanity check: Ensure we are pulling position from the correct objects (Groups)
    // Particles are Groups. If we accidentally grabbed a line, position might be 0,0,0
    if (child1.type !== "Group" || child2.type !== "Group") {
      // If the indices point to something else (like other lines), skip or re-evaluate.
      // Assuming sortedSkills map renders first, indices 0..N-1 are particles.
      return;
    }

    const startPos = child1.position;
    const endPos = child2.position;

    geometryRef.current.setFromPoints([startPos, endPos]);

    // Optional: Pulse opacity
    if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
      // lineRef.current.material.opacity = 0.6;
      // Add subtle pulse
      // lineRef.current.material.opacity = 0.4 + Math.sin(Date.now() * 0.005) * 0.2;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial
        color="#40E0D0"
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        linewidth={1} // Note: linewidth is always 1 on WebGL/Windows usually
      />
    </line>
  );
}
