'use client';

import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useAppStore } from '@/hooks';
import { ScenePhase } from '@/constants/ScenePhase';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

export const HeroForgeEntry = () => {

  const { scenePhase, setScenePhase } = useAppStore();
  const scope = useRef(null);
  const animated = useRef(false);

  useGSAP(() => {
    if ((scenePhase !== ScenePhase.OVERLAY_ANIMATION && scenePhase !== ScenePhase.HERO_ANIMATION) || animated.current) return;
    animated.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", opacity: 1 } });

    tl.set(scope.current, { autoAlpha: 1 });

    tl.to(".hero-text-mini span", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
    })
      .to(
        ".hero-text-name span",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
        },
        "-=0.4"
      )
      .to(
        ".hero-title span",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.04,
        },
        "-=0.6"
      )
      .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
      .from(
        ".hero-description",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.4"
      )
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
  }, [scenePhase]);

  const name = "trhgatu";
  const firstTitle = "Software";
  const secondTitle = "Engineer";
  const introText = "Hi, I'm";

  return (
    <section
      id='hero'
      ref={scope}
      className="hero relative opacity-0 min-h-screen flex items-center text-center text-white">
      <Image
        src="/assets/images/cloud.avif"
        alt="Frame"
        fill
        className="hero-frame absolute inset-0 z-10 object-contain"
      />
      <div className="py-20 w-full mx-auto max-w-7xl">
        <div className="hero-wrapper-content relative z-30">
          <p className="hero-subtitle text-sm uppercase tracking-widest text-gray-50 mb-4">
            forged in pixels · powered by code
          </p>

          <div className="hero-text-first font-mono items-baseline justify-center flex">
            <div className="hero-text-mini justify-center gap-1 mr-6 text-3xl">
              {introText.split("").map((char, idx) => (
                <span key={idx} className="inline-block font-kings opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <h1 className="hero-text-name justify-center gap-1 text-5xl md:text-8xl font-bold">
              {name.split("").map((char, idx) => (
                <span key={idx} className="inline-block font-kings opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-text-second font-mono">
            <h1 className="hero-title flex flex-wrap justify-center gap-1 text-5xl md:text-8xl font-bold pr-10 md:pr-40">
              {firstTitle.split("").map((char, idx) => (
                <span key={idx} className="inline-block font-kings opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <h1 className="hero-title flex flex-wrap justify-center gap-1 text-5xl md:text-8xl font-bold pl-10 md:pl-40">
              {secondTitle.split("").map((char, idx) => (
                <span key={idx} className="inline-block font-kings opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          <div className="description flex justify-center">
            <p className="hero-description font-mono mt-6 max-w-2xl text-gray-300 text-lg">
              In this forge, my code is tempered by challenge and fueled by
              passion. I battle through every obstacle, forging solutions with
              relentless spirit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
