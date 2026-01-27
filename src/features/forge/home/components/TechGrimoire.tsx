"use client";

import Image from "next/image";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, Environment, Image as DreiImage } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { SKILLS } from "@/constants/Skills";
import { AlchemistBook } from "./AlchemistBook";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function TechParticles({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  // Create random initial positions for "Explosion" effect
  const initialPositions = useMemo(() => {
    return SKILLS.map(() => ({
      // Start from center (inside the book)
      x: (Math.random() - 0.5) * 0.2,
      y: (Math.random() - 0.5) * 0.2,
      z: (Math.random() - 0.5) * 0.2,
    }));
  }, []);

  // Target positions (The Constellation Grid)
  const targetPositions = useMemo(() => {
    return SKILLS.map((_, i) => {
      // Golden Angle distribution for even sphere coverage
      const phi = Math.acos(1 - (2 * (i + 0.5)) / SKILLS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = 3.5; // Radius of constellation
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.current;

    // 1. Explosion Phase (0.15 -> 0.45)
    // Smoothstep creates a curve from 0 to 1 between these bounds
    const explosionFactor = THREE.MathUtils.smoothstep(progress, 0.15, 0.45);

    // 2. Space Transition Phase (0.7 -> 1.0)
    // Particles spread further or warp as we go to space
    const spaceFactor = THREE.MathUtils.smoothstep(progress, 0.7, 0.95);

    groupRef.current.children.forEach((child, i) => {
      const initial = initialPositions[i];
      const target = targetPositions[i];

      // Current target based on space factor (expand slightly as we leave)
      const currentTarget = {
        x: target.x * (1 + spaceFactor * 2),
        y: target.y * (1 + spaceFactor * 2),
        z: target.z * (1 + spaceFactor * 2),
      };

      // Interpolate position
      // We use different easing for a "pop" effect
      // cubic start for explosion
      const ease = 1 - Math.pow(1 - explosionFactor, 3);

      child.position.x = THREE.MathUtils.lerp(initial.x, currentTarget.x, ease);
      // Add a slight Y offset to the target so it floats above the book center initially
      child.position.y = THREE.MathUtils.lerp(initial.y, currentTarget.y + 1, ease);
      child.position.z = THREE.MathUtils.lerp(initial.z, currentTarget.z, ease);

      // Scale logic:
      // Grow from 0 to 1 during explosion
      let scale = THREE.MathUtils.lerp(0, 0.6, ease);

      // Pulse effect when fully formed (and not yet in space transition)
      if (explosionFactor >= 0.9 && spaceFactor < 0.1) {
        scale += Math.sin(state.clock.elapsedTime * 3 + i) * 0.05;
      }

      // Shrink slightly as we go to space/stars
      if (spaceFactor > 0) {
        scale = THREE.MathUtils.lerp(scale, 0.3, spaceFactor);
      }

      child.scale.setScalar(scale);

      // Always look at camera for billboards
      child.lookAt(state.camera.position);
    });

    // Rotate the whole constellation
    // Rotate faster during space transition
    // Add some scroll-driven rotation too
    const scrollRotation = progress * Math.PI * 2;

    groupRef.current.rotation.y = scrollRotation * 0.2 + state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill) => (
        <group key={skill.name}>
          <DreiImage url={skill.iconPath} transparent opacity={1} />
        </group>
      ))}
    </group>
  );
}

export const TechGrimoire = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const washiRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 2,
          refreshPriority: 800,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      tl.to(washiRef.current, { opacity: 0, duration: 1, ease: "none" }, 0.6).to(
        spaceRef.current,
        { opacity: 1, duration: 1, ease: "none" },
        0.6
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="tech-grimoire"
      className="relative w-full h-screen z-20 overflow-hidden bg-[#000000]"
    >
      <div ref={washiRef} className="absolute inset-0 z-0 bg-[#e8e4d9]">
        <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />

        {/* Washi Texture Image */}
        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply z-0">
          <Image
            src="/assets/images/craftings/texture_washi.png"
            alt="Washi Texture"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-20 left-0 w-full text-center pointer-events-none z-20 mix-blend-multiply">
          <h2 className="grimoire-title text-4xl md:text-6xl font-kings text-amber-900/80 tracking-widest drop-shadow-sm mb-4">
            The Grimoire
          </h2>
          <div className="w-24 h-[1px] bg-amber-900/30 mx-auto mb-4" />
          <p className="font-space-mono text-xs md:text-sm text-amber-800/60 uppercase tracking-[0.3em]">
            Source of Knowledge
          </p>
        </div>
      </div>

      <div ref={spaceRef} className="absolute inset-0 z-0 opacity-0 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 2, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.8} />
          <spotLight
            position={[5, 10, 5]}
            angle={0.5}
            penumbra={1}
            intensity={1}
            castShadow
            color="#fffbf0"
          />
          <BookScene scrollProgress={scrollProgress} />
          <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={1.5} />
        </Canvas>
      </div>
    </section>
  );
};

function BookScene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const bookRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!bookRef.current) return;

    const p = scrollProgress.current;
    if (p < 0.2) {
      const entranceProgress = p / 0.2;
      const ease = 1 - Math.pow(1 - entranceProgress, 3);

      // Dòng này chỉnh vị trí Y: bay từ 10 xuống 0
      bookRef.current.position.y = THREE.MathUtils.lerp(10, 0, ease);
      // Dòng này chỉnh góc X: từ 180 độ (Math.PI) giảm dần xuống 0.3
      bookRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI, 0.3, ease);
      // Dòng này chỉnh góc Y: từ -180 độ (-Math.PI) giảm dần xuống 0
      bookRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI, 0, ease);
      // Dòng này chỉnh góc Z: từ 45 độ (Math.PI / 4) giảm dần xuống 0
      bookRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI / 4, 0, ease);

      const s = THREE.MathUtils.lerp(0, 1, ease);
      bookRef.current.scale.setScalar(s);
    } else if (p < 0.7) {
      const rangeProgress = (p - 0.2) / 0.5;

      bookRef.current.position.y = 0;
      bookRef.current.scale.setScalar(1);
      bookRef.current.rotation.x = THREE.MathUtils.lerp(0.3, 0.5, rangeProgress);
      bookRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 6, rangeProgress); // 30 deg turn
      bookRef.current.rotation.z = 0;
    } else {
      const exitProgress = (p - 0.7) / 0.3;
      const ease = exitProgress * exitProgress;

      // Fly UP towards camera/top
      bookRef.current.position.y = THREE.MathUtils.lerp(0, 8, ease);
      bookRef.current.position.z = THREE.MathUtils.lerp(0, 2, ease); // Move closer

      // Spin as it leaves
      bookRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI / 6, Math.PI * 2, ease);
      bookRef.current.rotation.x = THREE.MathUtils.lerp(0.5, -0.5, ease);

      // Scale down slightly at the very end to vanish?
      // Let's keep it visible but flying away
      bookRef.current.scale.setScalar(1);
    }
  });

  return (
    <group>
      <group ref={bookRef}>
        <Float speed={2} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
          <Center>
            <AlchemistBook scale={[1.8, 1.8, 1.8]} />
          </Center>
        </Float>
      </group>

      <TechParticles scrollProgress={scrollProgress} />
    </group>
  );
}
