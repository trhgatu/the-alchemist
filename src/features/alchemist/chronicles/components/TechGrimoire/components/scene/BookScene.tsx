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
import { BOOK_EXIT_CONFIG } from "../../constants/visual";

export interface BookSceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

// The descent of the book, as a share of the grimoire timeline. It starts the
// moment the torn edge of the journal page comes into view, so the book seems
// to fall out from under the paper, and lands just before the tech icons burst
// out at 0.4.
const ENTRANCE_START = 0;
const ENTRANCE_END = 0.38;

export function BookScene({ scrollProgress }: BookSceneProps) {
  const bookRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!bookRef.current) return;
    const p = scrollProgress.current;

    // Phase 1: Entrance
    if (p < ENTRANCE_END) {
      const entranceProgress = Math.max(0, (p - ENTRANCE_START) / (ENTRANCE_END - ENTRANCE_START));
      // Quadratic ease-out: a steady glide that settles gently, no sudden plunge
      const ease = 1 - (1 - entranceProgress) ** 2;

      // ĐIỀU CHỈNH VỊ TRÍ BAY VÀO: Sách bay từ trên cao xuống giữa màn hình (y=0)
      // Bắt đầu ở y=6 (ngay sát mép trên của camera) để tạo cảm giác bay ra từ tờ giấy rách
      bookRef.current.position.y = THREE.MathUtils.lerp(6, 0, ease);

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
    // Phase 2: Idle (ENTRANCE_END - 0.7)
    else if (p < 0.7) {
      const rangeProgress = (p - ENTRANCE_END) / (0.7 - ENTRANCE_END);

      bookRef.current.position.y = 0;
      bookRef.current.scale.setScalar(1);

      // ĐIỀU CHỈNH ANIMATION IDLE: Sách xoay nhẹ khi đứng yên
      // Thay đổi các số -1.7→-1.6 và 1.5→1.7 để điều chỉnh độ xoay
      bookRef.current.rotation.x = THREE.MathUtils.lerp(-1.7, -1.6, rangeProgress);
      bookRef.current.rotation.y = THREE.MathUtils.lerp(1.5, 1.7, rangeProgress);
      bookRef.current.rotation.z = -4.1; // Giữ nguyên góc Z

      // Reset position
      bookRef.current.position.x = 0;
      bookRef.current.position.z = 0;
    }
    // Phase 3: Hold (0.7 - 0.8)
    else if (p < 0.8) {
      bookRef.current.position.y = 0;
      bookRef.current.scale.setScalar(1);
      bookRef.current.rotation.x = -1.6;
      bookRef.current.rotation.y = 1.7;
      bookRef.current.rotation.z = -4.1;
      bookRef.current.position.x = 0;
      bookRef.current.position.z = 0;
    }
    // Phase 4: Exit (dignified ascent)
    else {
      const exitProgress =
        (p - BOOK_EXIT_CONFIG.TIMING.START) /
        (BOOK_EXIT_CONFIG.TIMING.END - BOOK_EXIT_CONFIG.TIMING.START);

      if (exitProgress < 1) {
        const ease = exitProgress * exitProgress;

        // Dignified upward ascent
        bookRef.current.position.y = THREE.MathUtils.lerp(0, BOOK_EXIT_CONFIG.ASCENT_HEIGHT, ease);
        bookRef.current.position.z = 0;

        // Maintain dignified pose (no spinning)
        bookRef.current.rotation.x = BOOK_EXIT_CONFIG.FINAL_ROTATION.x;
        bookRef.current.rotation.y = BOOK_EXIT_CONFIG.FINAL_ROTATION.y;
        bookRef.current.rotation.z = BOOK_EXIT_CONFIG.FINAL_ROTATION.z;

        // Gentle fade out
        bookRef.current.scale.setScalar(THREE.MathUtils.lerp(1, BOOK_EXIT_CONFIG.SCALE_MIN, ease));
      } else {
        // Completely hidden via frustum culling
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
