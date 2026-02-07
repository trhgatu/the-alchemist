/**
 * Hook for managing canvas scroll progress
 *
 * Handles the logic of choosing between context-provided scroll progress
 * (in controlled mode) and local scroll progress (in standalone mode).
 */

import { useRef } from "react";
import { useScrollController } from "@/contexts/ScrollControllerContext";

export function useTransmutationCanvas() {
  const localScrollProgress = useRef(0);
  const { isControlled, scrollProgress: contextScrollProgress } = useScrollController();

  // Use context scroll progress in controlled mode, local ref in standalone
  const activeScrollProgress =
    isControlled && contextScrollProgress ? contextScrollProgress : localScrollProgress;

  return {
    scrollProgress: activeScrollProgress,
    isControlled,
  };
}
