/**
 * TransmutationCanvas Component
 *
 * Pure presentation component for the canvas layer.
 * Renders Three.js canvas with particles and embers.
 */

import { Canvas } from "@react-three/fiber";
import { TransmutationParticles } from "@/features/forge/home/components/TransmutationParticles";
import type { TransmutationCanvasProps } from "../types";

export function TransmutationCanvas({ scrollProgress }: TransmutationCanvasProps) {
  return (
    <>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 4, 10], fov: 45 }} gl={{ antialias: false, alpha: true }}>
          <TransmutationParticles scrollProgress={scrollProgress} />
        </Canvas>
      </div>
    </>
  );
}
