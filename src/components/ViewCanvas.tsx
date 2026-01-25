"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import { Suspense } from "react";

export default function ViewCanvas() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 20,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}
