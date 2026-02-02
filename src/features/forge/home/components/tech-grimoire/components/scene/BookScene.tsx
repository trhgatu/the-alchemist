/**
 * ⚙️ BOOK SCENE COMPONENT
 * ═══════════════════════════════════════════════════════════
 *
 * 3D scene component for the animated alchemist book.
 * Handles book entrance, idle, and exit animations based on scroll progress.
 *
 * @module tech-grimoire/components/scene/BookScene
 */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { AlchemistBook } from "../../AlchemistBook";
import { GodRays } from "../effects/GodRays";

export interface BookSceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

export function BookScene({ scrollProgress }: BookSceneProps) {
  const bookRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!bookRef.current) return;
    const p = scrollProgress.current;

    // Phase 1: Entrance (0.0 - 0.2)
    if (p < 0.2) {
      const entranceProgress = p / 0.2;
      const ease = 1 - Math.pow(1 - entranceProgress, 3);

      // ĐIỀU CHỈNH VỊ TRÍ BAY VÀO: Sách bay từ trên cao (y=15) xuống giữa màn hình (y=0)
      // Tăng số 15 để sách bay từ cao hơn, giảm để bay từ thấp hơn
      bookRef.current.position.y = THREE.MathUtils.lerp(15, 0, ease);

      // ĐIỀU CHỈNH ROTATION KHI BAY VÀO:
      // rotation.x: Góc nghiêng trước/sau (Math.PI = ngược, -1.7 = hơi nghiêng về phía trước)
      bookRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI, -1.7, ease);
      // rotation.y: Góc xoay trái/phải (-Math.PI = quay 180°, 1.5 = hơi xoay phải)
      bookRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI, 1.5, ease);
      // rotation.z: Góc nghiêng ngang (Math.PI/4 = nghiêng 45°, -4.1 = nghiêng ngược)
      bookRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI / 4, -4.1, ease);

      // ĐIỀU CHỈNH SCALE: Sách phóng to từ 0 (vô hình) đến 1 (kích thước bình thường)
      const s = THREE.MathUtils.lerp(0, 1, ease);
      bookRef.current.scale.setScalar(s);
    }
    // Phase 2: Idle (0.2 - 0.7)
    else if (p < 0.7) {
      const rangeProgress = (p - 0.2) / 0.5;

      bookRef.current.position.y = 0;
      bookRef.current.scale.setScalar(1);

      // ĐIỀU CHỈNH ANIMATION IDLE: Sách xoay nhẹ khi đứng yên
      // Thay đổi các số -1.7→-1.6 và 1.5→1.7 để điều chỉnh độ xoay
      bookRef.current.rotation.x = THREE.MathUtils.lerp(-1.7, -1.6, rangeProgress);
      bookRef.current.rotation.y = THREE.MathUtils.lerp(1.5, 1.7, rangeProgress);
      bookRef.current.rotation.z = -4.1; // Giữ nguyên góc Z

      bookRef.current.visible = true;

      // Reset position
      bookRef.current.position.x = 0;
      bookRef.current.position.z = 0;
    }
    // Phase 3: Hold (0.7 - 0.8)
    else if (p < 0.8) {
      bookRef.current.visible = true;
      bookRef.current.position.y = 0;
      bookRef.current.scale.setScalar(1);
      bookRef.current.rotation.x = -1.6;
      bookRef.current.rotation.y = 1.7;
      bookRef.current.rotation.z = -4.1;
      bookRef.current.position.x = 0;
      bookRef.current.position.z = 0;
    }
    // Phase 4: Exit (0.8 - 0.9)
    else {
      const exitProgress = (p - 0.8) / 0.1;

      if (exitProgress < 1) {
        bookRef.current.visible = true;
        const ease = exitProgress * exitProgress;

        // ĐIỀU CHỈNH ANIMATION BAY RA:
        // y: Bay lên cao (0→15), tăng số 15 để bay cao hơn
        bookRef.current.position.y = THREE.MathUtils.lerp(0, 15, ease);
        // z: Bay ra xa về phía sau (0→-10), tăng số -10 để bay xa hơn
        bookRef.current.position.z = THREE.MathUtils.lerp(0, -10, ease);

        // ĐIỀU CHỈNH SPIN KHI BAY RA: Sách quay 4 vòng (Math.PI * 4)
        // Tăng/giảm số 4 để thay đổi số vòng quay
        bookRef.current.rotation.y = THREE.MathUtils.lerp(1.7, 1.7 + Math.PI * 4, ease);

        // ĐIỀU CHỈNH THU NHỎ: Sách thu nhỏ dần về 0 (biến mất)
        bookRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0, ease));
      } else {
        // Completely hidden
        bookRef.current.visible = false;
        bookRef.current.position.y = 999;
      }
    }
  });

  return (
    <group>
      <group ref={bookRef}>
        <Float speed={2} floatIntensity={1} floatingRange={[0.1, 0.1]}>
          <Center>
            <AlchemistBook scale={[2, 2, 2]} />
          </Center>
          <GodRays scrollProgress={scrollProgress} />
        </Float>
      </group>
    </group>
  );
}
