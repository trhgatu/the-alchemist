"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppStore } from "@/hooks";
import { ScenePhase } from "@/constants/ScenePhase";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

export const HeroForgeEntry = () => {
  const { scenePhase, setScenePhase } = useAppStore();
  const scope = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    // Scroll Parallax
    gsap.to(".hero-frame", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.call(() => {
      sessionStorage.setItem("forge_visited", "true");
      setScenePhase(ScenePhase.HERO_ANIMATION);
    });

    // Ambient Breathing (Cloud)
    gsap.to(bgRef.current, {
      scale: 1.05,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [scenePhase]);

  // Mouse Parallax Update
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bgRef.current || !contentRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();

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
  const firstTitle = "Software";
  const secondTitle = "Engineer";
  const descriptionText =
    '"I do not just write code; I transmute problems into elegant solutions. Standing at the intersection of raw engineering and digital art."';

  return (
    <section
      id="hero"
      ref={scope}
      onMouseMove={handleMouseMove}
      className="hero relative opacity-0 min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      <Image
        ref={bgRef}
        src="/assets/images/cloud.avif"
        alt="Frame"
        fill
        className="hero-frame absolute inset-0 z-10 object-contain scale-100 will-change-transform"
      />
      <div
        ref={contentRef}
        className="py-20 w-full mx-auto max-w-7xl relative z-30 will-change-transform flex flex-col items-center justify-center"
      >
        <div className="hero-wrapper-content max-w-4xl">
          <p className="hero-subtitle text-xs md:text-sm font-space-mono uppercase tracking-[0.3em] text-gray-400 mb-6 drop-shadow-md opacity-80">
            Forged in Logic · Tempered by Design
          </p>

          <div className="hero-text-first font-mono items-center justify-center flex flex-col md:flex-row mb-2">
            <div className="hero-text-mini justify-center gap-1 md:mr-6 text-2xl md:text-3xl text-gray-300 font-cinzel-decorative mb-2 md:mb-0">
              {introText.split("").map((char, idx) => (
                <span key={idx} className="inline-block opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <h1 className="hero-text-name justify-center gap-1 text-7xl md:text-9xl font-bold text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] leading-none">
              {name.split("").map((char, idx) => (
                <span key={idx} className="inline-block font-kings opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-text-second font-mono mb-6 md:mb-10">
            <h1 className="hero-title flex flex-wrap justify-center gap-2 text-2xl md:text-4xl font-bold pr-4 md:pr-0">
              {firstTitle.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block font-cinzel-decorative opacity-0 text-gray-300"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              <span className="w-2 md:w-5" /> {/* Spacer */}
              {secondTitle.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block font-cinzel-decorative opacity-0 text-gray-300"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          <div className="description flex justify-center px-4">
            <div className="hero-description relative mt-2 md:mt-6 max-w-2xl">
              <div className="absolute -inset-8 bg-black/40 blur-2xl -z-10 rounded-full" />
              <p className="font-cinzel-decorative text-gray-400 text-sm md:text-base leading-relaxed mix-blend-screen block tracking-wider">
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
