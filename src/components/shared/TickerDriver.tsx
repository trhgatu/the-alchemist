"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { onFrame } from "@/lib/frame";

/**
 * Drives a react-three-fiber Canvas set to frameloop="never" from the shared
 * frame clock, so 3D scenes draw in step with Lenis and ScrollTrigger.
 * While `active.current` is false the scene is not drawn at all.
 */
export function TickerDriver({ active }: { active?: React.RefObject<boolean> }) {
  const advance = useThree((s) => s.advance);

  useEffect(
    () =>
      onFrame((time) => {
        if (active && !active.current) return;
        // In frameloop="never" mode R3F takes this timestamp as the clock time in
        // seconds (clock.elapsedTime = timestamp), not milliseconds
        advance(time);
      }),
    [advance, active]
  );

  return null;
}
