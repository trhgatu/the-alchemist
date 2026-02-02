import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MagicCircleMaterial, MagicCircleMaterialType } from "../../shaders";

extend({ MagicCircleMaterial });

export interface MagicCircleProps {
  opacity: number;
  scale?: number;
}

export function MagicCircle({ opacity, scale = 8 }: MagicCircleProps) {
  const materialRef = useRef<MagicCircleMaterialType>(null);
  const texture = useTexture("/assets/images/craftings/magic_circle.png");

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uOpacity = opacity;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]} scale={scale}>
      <planeGeometry args={[1.5, 1.5]} />
      <magicCircleMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
