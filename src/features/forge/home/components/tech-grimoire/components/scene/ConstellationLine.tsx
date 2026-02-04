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

  useFrame((state) => {
    if (!lineRef.current || !groupRef.current || !geometryRef.current) return;

    const children = groupRef.current.children;
    if (!children[startIdx] || !children[endIdx]) return;

    const child1 = children[startIdx];
    const child2 = children[endIdx];

    const p = scrollProgress.current;

    // "BOOM" Reveal Threshold
    // 0.865 coincides with the new compressed Flash PEAK
    const revealThreshold = 0.865;

    // Hide lines when DISPERSE starts (0.93)
    // Hold phase: 0.865 -> 0.93 (6.5% scroll - Solid)
    const isDispersing = p > 0.93;

    // Toggle visibility based on threshold & not dispersing
    const shouldBeVisible = p >= revealThreshold && !isDispersing;

    if (lineRef.current.visible !== shouldBeVisible) {
      lineRef.current.visible = shouldBeVisible;
    }

    if (!shouldBeVisible) return;

    if (child1.type !== "Group" || child2.type !== "Group") {
      return;
    }

    const startPos = child1.position;
    const endPos = child2.position;

    geometryRef.current.setFromPoints([startPos, endPos]);

    if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
      lineRef.current.material.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial
        color="#40E0D0"
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        linewidth={1}
      />
    </line>
  );
}
