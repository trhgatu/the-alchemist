"use client";

import Image from "next/image";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { AlchemistBook } from "./AlchemistBook";
import { GodRays } from "./TechGrimoireVisuals";
import { TechParticles } from "./TechParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
          end: "+=1000%",
          pin: true,
          scrub: 1.5,
          refreshPriority: 800,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      tl.to({}, { duration: 1 }, 0);

      tl.to(washiRef.current, { opacity: 0, duration: 0.2, ease: "none" }, 0.3).to(
        spaceRef.current,
        { opacity: 1, duration: 0.2, ease: "none" },
        0.3
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
          <ambientLight intensity={0.3} /> {/* Reduced from 0.8 for darker shadows */}
          <spotLight
            position={[5, 8, 5]}
            angle={0.4}
            penumbra={0.6}
            intensity={1.2}
            castShadow
            color="#fffbf0"
          />
          <BookScene scrollProgress={scrollProgress} />
          <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={0.8} />{" "}
          {/* Reduced envmap intensity */}
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
      bookRef.current.position.y = THREE.MathUtils.lerp(15, 0, ease);
      // Dòng này chỉnh góc X: Dựng đứng sách lên (User provided: -1.7)
      bookRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI, -1.7, ease);
      // Dòng này chỉnh góc Y: (User provided: 1.5)
      bookRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI, 1.5, ease);
      // Dòng này chỉnh góc Z: (User provided: -4.1)
      bookRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI / 4, -4.1, ease);

      const s = THREE.MathUtils.lerp(0, 1, ease);
      bookRef.current.scale.setScalar(s);
    } else if (p < 0.7) {
      const rangeProgress = (p - 0.2) / 0.5;

      bookRef.current.position.y = 0;
      bookRef.current.scale.setScalar(1);

      // Idle
      // Base: -1.7, 1.5, -4.1
      // leva debugger
      bookRef.current.rotation.x = THREE.MathUtils.lerp(-1.7, -1.6, rangeProgress);
      bookRef.current.rotation.y = THREE.MathUtils.lerp(1.5, 1.7, rangeProgress); // Subtle turn
      bookRef.current.rotation.z = -4.1;

      // Reset position
      bookRef.current.position.x = 0;
      bookRef.current.position.z = 0;
    } else {
      const exitProgress = (p - 0.7) / 0.3;
      const ease = exitProgress * exitProgress;

      // Fly UP towards camera/top
      bookRef.current.position.y = THREE.MathUtils.lerp(0, 8, ease);
      bookRef.current.position.z = THREE.MathUtils.lerp(0, 2, ease); // Move closer

      // Spin as it leaves
      bookRef.current.rotation.y = THREE.MathUtils.lerp(1.7, Math.PI * 2, ease);
      // Fix Discontinuity: Start EXACTLY where Idle ended (-1.6)
      bookRef.current.rotation.x = THREE.MathUtils.lerp(-1.6, -0.5, ease);

      // Return Z to 0 or spin wild
      // FIX: Start from -4.1 (Idle) not -4 to prevent jump
      bookRef.current.rotation.z = THREE.MathUtils.lerp(-4.1, 0, ease);

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
            <AlchemistBook scale={[2, 2, 2]} />
          </Center>
          <GodRays scrollProgress={scrollProgress} />
        </Float>
      </group>

      <TechParticles scrollProgress={scrollProgress} />
    </group>
  );
}
