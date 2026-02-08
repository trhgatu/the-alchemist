"use client";

import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useAppStore } from "@/hooks";

export const ForgeAssetTracker = () => {
  const { progress } = useProgress();
  const { setLoadingProgress } = useAppStore();

  useEffect(() => {
    setLoadingProgress(progress);
  }, [progress, setLoadingProgress]);

  return null;
};
