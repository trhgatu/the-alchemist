import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { PageGlowMaterial, PageGlowMaterialType } from "../../shaders";

extend({ PageGlowMaterial });

export interface PageGlowProps {
  opacity: number;
}

export function PageGlow({ opacity }: PageGlowProps) {
  const materialRef = useRef<PageGlowMaterialType>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uOpacity = opacity;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
      <planeGeometry args={[1.2, 0.8]} />
      <pageGlowMaterial ref={materialRef} transparent depthWrite={false} />
    </mesh>
  );
}
