"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { useAppStore } from "@/hooks/useAppStore";
import { translations } from "@/constants/translations";
import { cn } from "@/lib/utils";
import { QUOTE_CLASS } from "./quoteStyle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Timeline time after which the washi paper no longer sits behind the navbar
const WASHI_COVER_END = 0.8;

const AnimatedQuote = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={cn(
            "inline-block opacity-0 translate-y-6 blur-md word will-change-transform",
            idx < words.length - 1 ? "mr-2.5 md:mr-3.5" : "mr-0"
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export const HeroForgeEntry = () => {
  const scope = useRef<HTMLDivElement>(null);
  const lang = useLang();

  const t = translations[lang].hero;

  useGSAP(
    () => {
      const setNavTone = useAppStore.getState().setNavTone;
      setNavTone("ink");

      gsap.to(scope.current, { autoAlpha: 1, duration: 0.5 });

      gsap.to(".scroll-indicator-dot", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power1.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=4500",
          scrub: 1,
          pin: true,
          refreshPriority: 1000,
        },
        onUpdate() {
          const tone = this.time() < WASHI_COVER_END ? "ink" : "light";
          if (useAppStore.getState().navTone !== tone) setNavTone(tone);
        },
      });
      tl.to(
        ".hero-fade-out",
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        ".washi-portal",
        {
          scale: 80,
          duration: 1.5,
          ease: "power3.in",
        },
        0
      );

      tl.to(
        ".washi-portal",
        {
          opacity: 0,
          display: "none",
          duration: 0.5,
        },
        1.0
      );

      // 🌟 QUOTE 1: In the alchemical dance...
      tl.fromTo(
        ".quote-1 .word",
        { opacity: 0, y: 40, filter: "blur(16px)", scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.04,
        },
        1.6
      ).to(
        ".quote-1",
        { opacity: 0, y: -40, filter: "blur(12px)", duration: 0.8, ease: "power2.in" },
        "+=2.0"
      );

      // 🌟 QUOTE 2: Life is a sacred furnace... (starts after generous void pause)
      tl.fromTo(
        ".quote-2 .word",
        { opacity: 0, y: 40, filter: "blur(16px)", scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.04,
        },
        "+=1.5"
      ).to(
        ".quote-2",
        { opacity: 0, y: -40, filter: "blur(12px)", duration: 0.8, ease: "power2.in" },
        "+=2.0"
      );

      // 🌟 QUOTE 3: And from the crucible, we rise... (starts after generous void pause)
      tl.fromTo(
        ".quote-3-text .word",
        { opacity: 0, y: 40, filter: "blur(16px)", scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.05,
        },
        "+=1.5"
      )
        .fromTo(
          ".quote-3-highlight .word",
          { opacity: 0, y: 40, filter: "blur(16px)", scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.06,
          },
          "+=0.6"
        )
        .to(
          ".quote-3",
          { opacity: 0, y: -40, filter: "blur(14px)", duration: 1.0, ease: "power2.in" },
          "+=2.5"
        );

      tl.to({}, { duration: 1.5 }, "+=0.5");

      return () => setNavTone("light");
    },
    { scope, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      id="hero"
      ref={scope}
      className="hero relative opacity-0 h-screen w-full flex items-center justify-center text-center overflow-hidden"
    >
      <div
        key={lang}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="quote-1 absolute w-full max-w-5xl px-6 text-center">
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text1}
            className={QUOTE_CLASS}
          />
        </div>
        <div className="quote-2 absolute w-full max-w-5xl px-6 text-center">
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text2}
            className={QUOTE_CLASS}
          />
        </div>
        <div className="quote-3 absolute w-full max-w-5xl px-6 text-center flex flex-col items-center">
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text3}
            className={cn("quote-3-text", QUOTE_CLASS)}
          />
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text3Highlight}
            className={cn("quote-3-highlight", QUOTE_CLASS)}
          />
        </div>
      </div>

      {/* Washi Portal Container - Isolated to allow mix-blend-mode hole punching */}
      {/* We use a huge inset so when it scales, the edges never enter the screen */}
      <div
        className="washi-portal absolute -inset-[100vh] flex items-center justify-center z-10 pointer-events-none"
        style={{ isolation: "isolate", transformOrigin: "center center" }}
      >
        {/* Washi Background Layers */}
        <div className="absolute inset-0 bg-[#e8e4d9]">
          <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />
          <div className="absolute rotate-180 inset-0 opacity-40 mix-blend-multiply">
            <div
              style={{
                backgroundImage: "url(/assets/images/craftings/texture_washi.png)",
                backgroundSize: "800px",
                backgroundRepeat: "repeat",
              }}
              className="absolute inset-0"
            />
          </div>
          {/* Burn Edge Simulation on the actual paper */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              boxShadow:
                "inset 0 0 150px rgba(255, 100, 0, 0.4), inset 0 0 50px rgba(180, 83, 9, 0.2)",
            }}
          />
        </div>

        {/* The Hole Puncher (Text) */}
        {/* Destination-out makes this text transparent AND makes everything behind it (in the isolated container) transparent! */}
        <h1
          className="hero-text-mask font-kings font-bold leading-none tracking-tight text-black mix-blend-destination-out relative z-20 select-none"
          style={{ fontSize: "22vw" }}
        >
          trhgatu
        </h1>
      </div>

      {/* Content overlays (Description, Titles, Scroll Indicator) */}
      <div className="hero-fade-out relative z-30 w-full max-w-screen-2xl h-full px-6 md:px-16 py-12 flex flex-col justify-between items-start text-left pointer-events-none">
        {/* Top spacer */}
        <div className="w-full flex-1"></div>

        {/* Middle/Bottom Split Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-6 space-y-4">
            <div className="w-12 h-[2px] bg-amber-900/60 mb-4" />
            <p className="font-garamond text-neutral-900 text-base md:text-xl leading-[1.8] italic opacity-95 max-w-xl font-medium drop-shadow-sm">
              {t.desc}
            </p>
          </div>
          <div className="md:col-span-6 md:text-right flex flex-col items-start md:items-end justify-end space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide drop-shadow-sm">
              <span className="block text-neutral-900 font-garamond italic">{t.firstTitle}</span>
              <span className="block text-amber-900 mt-1 font-garamond italic">
                {t.secondTitle}
              </span>
            </h1>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-800 mb-2 font-serif font-bold">
            Explore
          </span>
          <div className="w-[1px] h-16 bg-neutral-400 relative overflow-hidden">
            <div className="scroll-indicator-dot absolute top-0 left-0 w-full h-6 bg-amber-800 shadow-[0_0_8px_rgba(180,83,9,0.8)]" />
          </div>
        </div>
      </div>
    </section>
  );
};
