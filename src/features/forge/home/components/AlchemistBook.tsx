"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, forwardRef } from "react";
import { Group } from "three";
import * as THREE from "three";

useGLTF.preload("/models/book_of_alchemy.glb");

type AlchemistBookProps = {
  scale?: number[];
  onLoaded?: () => void;
  visible?: boolean;
};

export const AlchemistBook = forwardRef<Group, AlchemistBookProps>(
  ({ scale = 0, onLoaded, visible, ...props }, ref) => {
    const { scene, animations } = useGLTF("/models/book_of_alchemy.glb");
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
      if (actions && animations.length > 0) {
        const action = actions[animations[0].name];
        if (action) {
          action.reset().play();
          try {
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
          } catch {
            // Ignore type errors if types are strict
          }
        }
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

    return <primitive object={scene} scale={scale} visible={visible} ref={ref} {...props} />;
  }
);

AlchemistBook.displayName = "AlchemistBook";
