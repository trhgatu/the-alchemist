"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
// import { Center, Environment, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FallingEmbers } from "@/features/forge/home/components/FallingEmbers";
import { TransmutationParticles } from "@/features/forge/home/components/TransmutationParticles";
// import { AlchemistBook } from "@/features/forge/home/components/AlchemistBook";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TheTransmutation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          refreshPriority: 1000,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      const fadeDuration = 0.5;
      const holdDuration = 1.0;
      const exitDuration = 0.5;

      tl.to(
        textRef1.current,
        { opacity: 1, x: 0, filter: "blur(0px)", duration: fadeDuration, ease: "power2.out" },
        0
      )
        .to(textRef1.current, { opacity: 1, duration: holdDuration }, fadeDuration)
        .to(
          textRef1.current,
          { opacity: 0, x: -30, filter: "blur(10px)", duration: exitDuration, ease: "power2.in" },
          fadeDuration + holdDuration
        );

      const phase2Start = 2.0;
      tl.to(
        textRef2.current,
        { opacity: 1, x: 0, filter: "blur(0px)", duration: fadeDuration, ease: "power2.out" },
        phase2Start
      )
        .to(textRef2.current, { opacity: 1, duration: holdDuration }, phase2Start + fadeDuration)
        .to(
          textRef2.current,
          { opacity: 0, x: 30, filter: "blur(10px)", duration: exitDuration, ease: "power2.in" },
          phase2Start + fadeDuration + holdDuration
        );

      tl.to(
        textRef3.current,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power4.out" },
        4.0
      ).to(textRef3.current, { opacity: 1, duration: 1.0 }, 4.0 + 1.0);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-neutral-950 flex items-center justify-center overflow-hidden z-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 4, 10], fov: 45 }} gl={{ antialias: false, alpha: true }}>
          <TransmutationParticles scrollProgress={scrollProgress} />
          {/*  <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
                        <Center>
                            <AlchemistBook scale={[1.6, 1.6, 1.6]} />
                        </Center>
                    </Float> */}
          {/* <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={0.5} /> */}
        </Canvas>
      </div>
      <div className="absolute inset-0 z-0 opacity-50">
        <FallingEmbers />
      </div>

      <div
        ref={textRef1}
        className="absolute top-1/2 -translate-y-4 left-8 md:left-24 lg:left-32 z-20 w-full md:w-1/2 lg:w-2/5 text-left opacity-0 pointer-events-none pr-12"
        style={{ transform: "translateX(-50px) translateY(-50%)", filter: "blur(10px)" }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair-display italic text-neutral-300 mb-6 tracking-wide leading-[1.4] drop-shadow-lg">
          &quot;In the alchemical dance of existence, nothing new can be born until the old is
          surrendered.&quot;
        </h2>
        <div className="w-16 h-[2px] bg-neutral-600 mb-6 ml-1"></div>
        <p className="font-space-mono text-xs md:text-sm text-neutral-500 uppercase tracking-[0.4em] leading-loose">
          The fixed shell must shatter
        </p>
      </div>

      {/* PHASE 2: Text RIGHT */}
      <div
        ref={textRef2}
        className="absolute top-1/2 -translate-y-4  right-8 md:right-24 lg:right-32 z-20 w-full md:w-1/2 lg:w-2/5 text-right opacity-0 pointer-events-none pl-12"
        style={{ transform: "translateX(50px) translateY(-50%)", filter: "blur(10px)" }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair-display italic text-orange-400 mb-6 tracking-wide leading-[1.4] drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          &quot;Life is a sacred furnace. To die a thousand small deaths is not destruction, but a
          necessary tempering of the soul.&quot;
        </h2>
        <div className="w-16 h-[2px] bg-orange-700 mb-6 ml-auto mr-1"></div>
        <p className="font-space-mono text-xs md:text-sm text-orange-800/60 uppercase tracking-[0.4em] leading-loose">
          Burning away the false
        </p>
      </div>

      {/* PHASE 3: Center */}
      <div
        ref={textRef3}
        className="absolute z-20 text-center opacity-0 scale-90 pointer-events-none px-8 max-w-4xl"
        style={{ filter: "blur(20px)" }}
      >
        <p className="text-3xl md:text-4xl lg:text-5xl font-playfair-display italic text-amber-100 leading-[1.5] tracking-wide mb-12 drop-shadow-[0_0_40px_rgba(251,191,36,0.2)]">
          &quot;And from the crucible, we rise.
          <br />
          <span className="text-amber-300">Not just better, but truer.</span>&quot;
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-[1px] bg-amber-700/40"></div>
            <p className="font-kings text-xl md:text-2xl text-amber-600/80 tracking-[0.3em] uppercase">
              The Magnum Opus
            </p>
            <div className="w-24 h-[1px] bg-amber-700/40"></div>
          </div>

          <p className="font-space-mono text-xs text-amber-700/60 uppercase tracking-[0.5em]">
            Solve et Coagula
          </p>

          <p className="font-serif italic text-neutral-500 text-sm md:text-base tracking-widest leading-relaxed mt-4">
            &quot;We begin again. With Gold in the marrow.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
