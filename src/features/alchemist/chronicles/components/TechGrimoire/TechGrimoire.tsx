"use client";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookScene } from "./components/scene/BookScene";
import { useGrimoireTimeline } from "./hooks";
import { TickerDriver } from "@/components/shared/TickerDriver";
import { useQuality } from "@/lib/quality";
import { CameraFit } from "./components/scene/CameraFit";
import { TechParticles } from "./components/scene/TechParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const TechGrimoire = () => {
  const quality = useQuality();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollProgress } = useGrimoireTimeline({
    containerRef,
  });

  // The book is only drawn while its section is on screen
  const onScreen = useRef(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="tech-grimoire"
      className="relative w-full min-h-screen z-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-10">
        <Canvas
          frameloop="never"
          dpr={quality === "low" ? 1 : [1, 1.5]}
          camera={{ position: [0, 2, 8], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <TickerDriver active={onScreen} />
          <CameraFit />
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
          <TechParticles scrollProgress={scrollProgress} />
          <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={0.8} />
        </Canvas>
      </div>
    </section>
  );
};
