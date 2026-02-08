/**
 * Hook for managing canvas scroll progress
 *
 * Handles the logic of choosing between context-provided scroll progress
 * (in controlled mode) and local scroll progress (in standalone mode).
 */

import { useRef } from "react";
import { useScrollController } from "@/contexts/ScrollControllerContext";

export function useTransmutationCanvas(externalScrollProgress?: React.MutableRefObject<number>) {
  const localScrollProgress = useRef(0);
  const { isControlled, scrollProgress: contextScrollProgress } = useScrollController();

  // Priority: Context (if controlled) > External Prop > Local
  // This ensures that in controlled mode, we use the controller's progress,
  // but in standalone mode, we use the local ScrollTrigger's progress (via external ref).
  const activeScrollProgress =
    isControlled && contextScrollProgress
      ? contextScrollProgress
      : externalScrollProgress || localScrollProgress;

  return {
    scrollProgress: activeScrollProgress,
    isControlled,
  };
}
