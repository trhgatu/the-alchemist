"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppStore } from "@/hooks";
import { ScenePhase } from "@/constants/ScenePhase";
import { ForgeEmbers } from "./ForgeEmbers";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

export const HeroForgeEntry = () => {
  const { scenePhase, setScenePhase, loadingProgress } = useAppStore();
  const scope = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [introFinished, setIntroFinished] = useState(false);
  const [forceProceed, setForceProceed] = useState(false);
  const [isIgnited, setIsIgnited] = useState(false);

  // Safety Timeout: Force proceed after 7 seconds if assets hang
  useEffect(() => {
    if (!introFinished) return;

    // If intro finishes but resources take too long, force entry
    const timer = setTimeout(() => {
      console.warn("⚠️ Resource loading timed out. Forcing entry.");
      setForceProceed(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [introFinished]);

  const triggerExit = useCallback(() => {
    sessionStorage.setItem("forge_visited", "true");
    setScenePhase(ScenePhase.HERO_ANIMATION);
  }, [setScenePhase]);

  // Main Logic: Wait for Intro AND (Resources OR Timeout)
  useEffect(() => {
    if (introFinished) {
      // console.log("⏳ Waiting for resources...", loadingProgress);
      if (loadingProgress >= 100 || forceProceed) {
        // console.log("✅ Ready! Triggering exit...");
        triggerExit();
      }
    }
  }, [introFinished, loadingProgress, forceProceed, triggerExit]);

  useGSAP(() => {
    if (
      (scenePhase !== ScenePhase.OVERLAY_ANIMATION && scenePhase !== ScenePhase.HERO_ANIMATION) ||
      animated.current
    )
      return;
    animated.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", opacity: 1 } });

    tl.set(scope.current, { autoAlpha: 1 });

    // Intro Sequence
    tl.fromTo(
      ".hero-text-mini span",
      { y: 20, opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
      }
    )
      .fromTo(
        ".hero-text-name span",
        { y: 30, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.06,
        },
        "-=0.4"
      )
      .call(() => {
        setIntroFinished(true);
      })
      .fromTo(
        ".hero-title span",
        { y: 20, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.04,
        },
        "-=0.6"
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      .fromTo(
        ".hero-description span",
        { y: 10, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
        },
        "-=0.4"
      );

    // Ambient Breathing (Cloud)
    gsap.to(bgRef.current, {
      scale: 1.05,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [scenePhase]);

  // Interaction: Hold to Ignite -> Teleport
  const chargeTl = useRef<gsap.core.Timeline | null>(null);
  const router = useRouter();
  const shakeRef = useRef<HTMLDivElement>(null); // New Ref for Shake

  const handleIgniteStart = () => {
    // console.log("🔥 Ignite Start");
    setIsIgnited(true);

    // Charging Sequence
    chargeTl.current = gsap.timeline({
      onComplete: () => {
        // console.log("🚀 Teleporting...");
        router.push("/forge/transmutation");
      },
    });

    // 1. Shake (Inner Content Only)
    chargeTl.current
      .to(shakeRef.current, {
        x: "+=2",
        y: "+=2",
        yoyo: true,
        repeat: -1,
        duration: 0.05,
        ease: "none",
      })
      // 2. Charge (Just Wait/Shake)
      .to({}, { duration: 1.0 }) // Wait 1s (Shake continues via yoyo)

      // 3. Final Zoom & Burst
      .to(
        contentRef.current,
        {
          scale: 5,
          filter: "blur(20px)",
          duration: 0.5,
          ease: "power2.in",
        },
        ">-0.5"
      )
      // Dissolve Text Characters Randomly
      .to(
        ".hero-text-name span, .hero-title span, .hero-text-mini span",
        {
          opacity: 0,
          y: -50,
          rotation: Math.random() * 360,
          stagger: { amount: 0.5, from: "random" },
          duration: 0.5,
          ease: "power1.in",
        },
        "<"
      )
      .to(
        bgRef.current,
        {
          scale: 2,
          opacity: 0,
          duration: 0.5,
        },
        "<"
      );
  };

  const handleIgniteEnd = () => {
    // console.log("❄️ Ignite End");
    setIsIgnited(false);
    if (chargeTl.current) {
      chargeTl.current.kill();

      // Reset visuals
      gsap.to(contentRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
      });
      gsap.to(shakeRef.current, {
        // Reset shake
        x: 0,
        y: 0,
        duration: 0.5,
      });
      gsap.to(bgRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
      // Reset Text Spans (in case dissolve started)
      gsap.to(".hero-text-name span, .hero-title span, .hero-text-mini span", {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.5,
      });
    }
  };

  // Mouse Parallax Update
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const { width, height } = rect;

    const xPos = clientX / width - 0.5;
    const yPos = clientY / height - 0.5;

    // Cloud (Mid Background)
    gsap.to(bgRef.current, {
      x: xPos * -30,
      y: yPos * -30,
      duration: 1,
      ease: "power2.out",
    });

    // Content (Foreground - Moves most)
    gsap.to(contentRef.current, {
      x: xPos * 15,
      y: yPos * 15,
      duration: 1,
      ease: "power2.out",
    });
  };

  const name = "trhgatu";
  const introText = "I am";
  const firstTitle = "Code";
  const secondTitle = "Alchemist";
  const descriptionText =
    "Ideas are fleeting. Masterpieces are eternal. I transform the intangible into the unforgettable—forging reality from pure imagination.";

  return (
    <section
      id="hero"
      ref={scope}
      onMouseMove={handleMouseMove}
      className="hero relative opacity-0 min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Dynamic Background: Cold (Idle) -> Warm (Ignited) */}
      <div
        className={`absolute inset-0 z-0 transition-colors duration-1000 ease-in-out ${
          isIgnited ? "bg-[#1a0500]" : "bg-[#050810]"
        }`}
      />

      {/* Forge Embers */}
      <ForgeEmbers isIgnited={isIgnited} />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 z-[25] pointer-events-none" />
      <div
        ref={contentRef}
        className="py-20 w-full mx-auto max-w-7xl relative z-30 will-change-transform flex flex-col items-center justify-center"
      >
        <div className="hero-wrapper-content max-w-4xl">
          <p className="hero-subtitle text-xs md:text-sm font-space-mono uppercase tracking-[0.3em] text-white/60 mb-6 opacity-80">
            Where Vision Becomes Masterpiece
          </p>

          {/* Trigger Wrapper (Static) */}
          <div
            className="interaction-trigger cursor-pointer group select-none w-fit mx-auto"
            onMouseEnter={handleIgniteStart}
            onMouseLeave={handleIgniteEnd}
            onClick={() => router.push("/forge/chronicles")} // Failsafe Click
          >
            {/* Shake Wrapper (Inner) */}
            <div ref={shakeRef}>
              <div className="hero-text-first font-mono items-center justify-center flex flex-col md:flex-row mb-2">
                <div className="hero-text-mini justify-center gap-1 md:mr-6 text-2xl md:text-3xl text-neutral-400 font-cinzel-decorative mb-2 md:mb-0 group-hover:text-amber-200/80 transition-colors duration-500">
                  {introText.split("").map((char, idx) => (
                    <span key={idx} className="inline-block opacity-0">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>
                <h1
                  className={`hero-text-name justify-center gap-1 text-7xl md:text-9xl font-bold leading-none transition-all duration-700 ${
                    isIgnited
                      ? "text-amber-100 drop-shadow-[0_0_35px_rgba(255,170,50,0.6)]"
                      : "text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  {name.split("").map((char, idx) => (
                    <span key={idx} className="inline-block font-kings opacity-0">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="hero-text-second font-mono mb-6 md:mb-10">
                <h1
                  className={`hero-title flex flex-wrap justify-center gap-2 text-2xl md:text-4xl font-bold pr-4 md:pr-0 transition-all duration-700 ${
                    isIgnited ? "scale-105" : "scale-100"
                  }`}
                >
                  {firstTitle.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className={`inline-block font-cinzel-decorative opacity-0 transition-colors duration-700 ${
                        isIgnited
                          ? "text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                          : "text-neutral-500 drop-shadow-none"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  <span className="w-2 md:w-5" /> {/* Spacer */}
                  {secondTitle.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className={`inline-block font-cinzel-decorative opacity-0 transition-colors duration-700 ${
                        isIgnited
                          ? "text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                          : "text-neutral-500 drop-shadow-none"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>

          <div className="description flex justify-center px-4">
            <div className="hero-description relative mt-2 md:mt-6 max-w-2xl">
              <div className="absolute -inset-8 bg-neutral-900/5 blur-2xl -z-10 rounded-full" />
              <p className="font-cinzel-decorative text-neutral-400 text-sm md:text-base leading-relaxed block tracking-wider">
                {descriptionText.split(" ").map((word, idx) => (
                  <span key={idx} className="inline-block opacity-0 mr-1.5">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
