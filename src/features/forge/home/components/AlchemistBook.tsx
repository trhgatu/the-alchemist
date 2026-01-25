"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, forwardRef } from "react";
import { Group } from "three";

useGLTF.preload("/models/alchemist_book.glb");

type InfinityLoopProps = {
  scale?: number[];
  onLoaded?: () => void;
  visible?: boolean;
};

export const AlchemistBook = forwardRef<Group, InfinityLoopProps>(
  ({ scale = 0.4, onLoaded, visible, ...props }, ref) => {
    const { scene } = useGLTF("/models/alchemist_book.glb");

    useEffect(() => {
      if (scene && onLoaded) {
        onLoaded();
      }
    }, [scene, onLoaded]);

    return <primitive object={scene} scale={scale} visible={visible} ref={ref} {...props} />;
  }
);

AlchemistBook.displayName = "AlchemistBook";
