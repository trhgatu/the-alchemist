"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, forwardRef } from "react";
import { Group } from "three";


useGLTF.preload("/models/infinity_loop.glb");

type InfinityLoopProps = {
  scale?: number[];
  onLoaded?: () => void;
  visible?: boolean
}

export const InfinityLoop = forwardRef<Group, InfinityLoopProps>(
  ({ scale = 0.4, onLoaded, visible, ...props }, ref) => {
    const { scene, animations } = useGLTF("/models/infinity_loop.glb");
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
      if (actions && animations.length > 0) {
        actions[animations[0].name]?.reset().play();
      }

      return () => {
        mixer.stopAllAction();
      };
    }, [actions, animations, mixer]);

    useEffect(() => {
      if (scene && onLoaded) {
        onLoaded();
      }
    }, [scene, onLoaded]);

    return (
      <primitive
        object={scene}
        scale={scale}
        visible={visible}
        ref={ref} {...props}
      />
    );
  }
);

InfinityLoop.displayName = "InfinityLoop";
