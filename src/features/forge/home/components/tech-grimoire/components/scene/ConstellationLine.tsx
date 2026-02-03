import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
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
  const lineRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useFrame(() => {
    if (!lineRef.current || !groupRef.current) return;

    const child1 = groupRef.current.children[startIdx];
    const child2 = groupRef.current.children[endIdx];

    if (!child1 || !child2) return;

    const p = scrollProgress.current;
    // Animate drawing: 0.95 -> 1.0 (Only AFTER particles are locked in)
    const drawProgress = THREE.MathUtils.smoothstep(p, 0.95, 1.0);

    // Calculate current end position relative to growth
    const startPos = child1.position;
    const endPos = child2.position;

    const currentEndX = THREE.MathUtils.lerp(startPos.x, endPos.x, drawProgress);
    const currentEndY = THREE.MathUtils.lerp(startPos.y, endPos.y, drawProgress);
    const currentEndZ = THREE.MathUtils.lerp(startPos.z, endPos.z, drawProgress);

    lineRef.current.geometry.setPositions([
      startPos.x,
      startPos.y,
      startPos.z,
      currentEndX,
      currentEndY,
      currentEndZ,
    ]);

    const opacity = THREE.MathUtils.smoothstep(p, 0.95, 0.98);

    if (lineRef.current.material) {
      lineRef.current.material.opacity = opacity * 0.4;
      lineRef.current.material.depthWrite = false;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[
        [0, 0, 0],
        [0, 0, 0],
      ]}
      color="#E0F7FA"
      lineWidth={1}
    />
  );
}
