"use client";

import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";

export default function ForgeGlobalCanvas() {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <Canvas
        className="w-full h-full"
        eventSource={typeof window !== "undefined" ? document.body : undefined}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}
