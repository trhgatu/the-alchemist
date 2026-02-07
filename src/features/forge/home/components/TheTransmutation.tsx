"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
// import { Center, Environment, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FallingEmbers } from "@/features/forge/home/components/FallingEmbers";
import { TransmutationParticles } from "@/features/forge/home/components/TransmutationParticles";
import { useScrollController } from "@/contexts/ScrollControllerContext";
// import { AlchemistBook } from "@/features/forge/home/components/AlchemistBook";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TheTransmutation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef(0);
  const {
    isControlled,
    triggerElement,
    registerTimeline,
    scrollProgress: contextScrollProgress,
  } = useScrollController();

  // Use context scroll progress in controlled mode, local ref in standalone
  const activeScrollProgress =
    isControlled && contextScrollProgress ? contextScrollProgress : scrollProgress;

  useGSAP(
    () => {
      // If in controlled mode, skip creating ScrollTrigger
      // The parent will control scroll, we just run animations
      if (isControlled) {
        console.log("[TheTransmutation] Running in CONTROLLED mode - animations managed by parent");
        // Animations will be added to parent's master timeline
        // For now, just run them without ScrollTrigger
      }

      // STANDALONE MODE - Create own ScrollTrigger
      const sceneWrapper =
        triggerElement || containerRef.current?.closest("#scene-wrapper") || containerRef.current;

      console.log("[TheTransmutation] Scene wrapper:", sceneWrapper);
      console.log("[TheTransmutation] Controlled mode:", isControlled);

      if (!sceneWrapper) {
        console.error("[TheTransmutation] No scene wrapper found!");
        return;
      }

      const tl = gsap.timeline(
        isControlled
          ? { paused: true } // Paused in controlled mode - parent will control playback
          : {
              scrollTrigger: {
                trigger: sceneWrapper,
                start: "top top",
                end: "top+750%", // 50% of 1500% master timeline
                scrub: 1,
                markers: !isControlled, // Only show markers in standalone mode
                onUpdate: (self) => {
                  scrollProgress.current = self.progress;
                  console.log("[TheTransmutation] Progress:", self.progress);
                },
              },
            }
      );

      console.log("[TheTransmutation] Timeline created, textRef1:", textRef1.current);

      // CONFIG: TEXT PHASE TIMING (Thời gian các đoạn text)
      // ═══════════════════════════════════════════════════════════
      // fadeDuration: 0.5 - Thời gian fade in/out
      // holdDuration: 1.0 - Thời gian giữ text (hold)
      // exitDuration: 0.5 - Thời gian biến mất
      //
      // ĐIỀU CHỈNH:
      // - Tăng fadeDuration để fade chậm hơn (vd: 0.5 → 0.8)
      // - Tăng holdDuration để giữ text lâu hơn (vd: 1.0 → 1.5)
      // - Tăng exitDuration để exit chậm hơn (vd: 0.5 → 0.8)
      const fadeDuration = 0.5;
      const holdDuration = 1.0;
      const exitDuration = 0.5;

      // CONFIG: PHASE 1 - TEXT 1 ("In the Alchemist's forge...")
      // ═══════════════════════════════════════════════════════════
      // Start: 0 (Bắt đầu ngay)
      // Fade In: 0 → 0.5
      // Hold: 0.5 → 1.5
      // Fade Out: 1.5 → 2.0
      //
      // ĐIỀU CHỈNH:
      // - Đổi x value để text di chuyển nhiều hơn (vd: 0 → -50)
      // - Đổi blur để mờ hơn (vd: blur(0px) → blur(20px))
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

      // CONFIG: PHASE 2 - TEXT 2 ("Each project...")
      // ═══════════════════════════════════════════════════════════
      // Start: 2.0 (Sau khi text 1 kết thúc)
      // Fade In: 2.0 → 2.5
      // Hold: 2.5 → 3.5
      // Fade Out: 3.5 → 4.0
      //
      // ĐIỀU CHỈNH:
      // - Đổi phase2Start để text 2 xuất hiện sớm/muộn hơn (vd: 2.0 → 2.5)
      // - Đổi x value để text di chuyển nhiều hơn (vd: 30 → 50)
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

      // CONFIG: PHASE 3 - TEXT 3 ("The Transmutation")
      // ═══════════════════════════════════════════════════════════
      // Start: 4.0 (Sau khi text 2 kết thúc)
      // Fade In: 4.0 → 4.8 (0.8 duration)
      // Hold: 4.8 → 5.3 (0.5 duration - Rút ngắn)
      // Fade Out: 5.3 → 5.8 (0.5 duration)
      //
      // ĐIỀU CHỈNH:
      // - Đổi 4.0 để title xuất hiện sớm/muộn hơn
      // - Tăng duration để fade chậm hơn
      const phase3FadeIn = 0.8;
      const phase3Hold = 0.5;
      const phase3FadeOut = 0.5;

      tl.to(
        textRef3.current,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: phase3FadeIn, ease: "power4.out" },
        4.0
      )
        .to(textRef3.current, { opacity: 1, duration: phase3Hold }, 4.0 + phase3FadeIn)
        .to(
          textRef3.current,
          {
            opacity: 0,
            scale: 0.95,
            filter: "blur(8px)",
            duration: phase3FadeOut,
            ease: "power2.in",
          },
          4.0 + phase3FadeIn + phase3Hold
        );

      if (isControlled && registerTimeline) {
        registerTimeline("transmutation", tl);
        console.log("[TheTransmutation] ✅ Timeline registered with parent");
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="transmutation-section"
      ref={containerRef}
      className="relative w-full h-screen bg-neutral-950 flex items-center justify-center overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 4, 10], fov: 45 }} gl={{ antialias: false, alpha: true }}>
          <TransmutationParticles scrollProgress={activeScrollProgress} />
        </Canvas>
      </div>
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
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
