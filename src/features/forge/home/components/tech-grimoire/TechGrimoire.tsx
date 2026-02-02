"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookScene } from "./components/scene/BookScene";
import { StarField } from "../the-craftings/StarField";
import { useGrimoireTimeline } from "./hooks";
/* import { TechParticles } from "./TechParticles"; */

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const TechGrimoire = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const washiRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  // Use custom hook for timeline management
  // All animation logic is now centralized in tech-grimoire/hooks/useGrimoireTimeline.ts
  const { scrollProgress } = useGrimoireTimeline({
    containerRef,
    introTextRef,
    washiRef,
    spaceRef,
    flashRef,
  });

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

      <div
        ref={spaceRef}
        className="absolute inset-0 z-0 opacity-0 bg-black pointer-events-none transition-all duration-1000"
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#1a0b2e_0%,#000000_100%)] opacity-80" />
        <div className="absolute inset-0 z-10 mix-blend-screen">
          <StarField />
        </div>
        <div className="absolute inset-0 z-20 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay" />
      </div>
      <div
        ref={flashRef}
        className="absolute inset-0 z-50 bg-white opacity-0 pointer-events-none mix-blend-screen"
      />
      {/* Intro Text */}
      <div
        ref={introTextRef}
        className="absolute inset-0 z-60 flex items-center justify-center pointer-events-none opacity-0"
        style={{ transform: "translateY(20px)", filter: "blur(10px)" }}
      >
        <p className="font-playfair-display text-3xl md:text-4xl lg:text-5xl italic text-amber-600/80 leading-[1.5] tracking-wide text-center px-8 max-w-4xl drop-shadow-[0_0_30px_rgba(103,232,249,0.3)]">
          &quot;The Grimoire holds what the fire refined: knowledge transmuted into power.&quot;
        </p>
      </div>
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 2, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[5, 8, 5]}
            angle={0.4}
            penumbra={0.6}
            intensity={1.2}
            castShadow
            color="#fffbf0"
          />
          <BookScene scrollProgress={scrollProgress} />
          <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={0.8} />
        </Canvas>
      </div>
    </section>
  );
};
