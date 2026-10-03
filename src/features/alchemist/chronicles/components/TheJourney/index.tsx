"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { DesertDustCanvas } from "./components/DesertDustCanvas";
import { cn } from "@/lib/utils";
import { QUOTE_CLASS } from "../quoteStyle";
// Global GoldenThread used in ChroniclesPage

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgAdventureRef = useRef<HTMLDivElement>(null);
  const legaciesContentRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].chronicles.journey;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const entries = containerRef.current.querySelectorAll(".narrative-entry");
      gsap.set(entries, { opacity: 0, scale: 0.85, filter: "blur(30px)" });

      gsap.set(bgAdventureRef.current, { opacity: 1 }); // We keep parent visible, animate children
      gsap.set(".the-sun", { x: -100, scale: 1, opacity: 0, filter: "blur(10px)" });
      gsap.set(".the-moon", { x: 100, scale: 1, opacity: 0, filter: "blur(10px)" });
      gsap.set(".the-desert", { scale: 1.1, filter: "blur(10px)", opacity: 0 });
      gsap.set(".desert-dust-layer", { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          refreshPriority: 50,
        },
      });

      // thread animation removed, handled globally

      entries.forEach((entry, i) => {
        const startTime = i * 6.0; // Slowed down from 4.0 to 6.0 seconds per entry
        tl.to(
          entry,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 2.0,
            ease: "power2.out",
          },
          startTime
        )
          .to(
            entry,
            { opacity: 1, duration: 2.5 }, // Hold longer
            startTime + 2.0
          )
          .to(
            entry,
            {
              opacity: 0,
              scale: 1.15,
              filter: "blur(30px)",
              duration: 1.5,
              ease: "power2.in",
            },
            startTime + 4.5
          );
      });

      // THE AWAKENING: Flash of Light
      // Wait for 1.5s in pure blackness after the last quote
      tl.to(flashRef.current, { opacity: 1, duration: 1.5, ease: "power2.in" }, "+=1.5");

      // The background transitions to a bright desert color exactly when the flash is fully white
      tl.to(containerRef.current, { backgroundColor: "#FBF5E6", duration: 0.1 }, "<1.0");

      // Flash fades out slowly, revealing the bright desert oasis dynamically
      tl.to(flashRef.current, { opacity: 0, duration: 3.0, ease: "power2.out" })
        .to(
          ".the-desert",
          { scale: 1, filter: "blur(0px)", opacity: 1, duration: 3.0, ease: "power2.out" },
          "<"
        )
        .to(".desert-dust-layer", { opacity: 1, duration: 3.0, ease: "power2.out" }, "<")
        .to(
          ".the-sun",
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out" },
          "<0.5"
        )
        .to(
          ".the-moon",
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out" },
          "<0.2"
        );

      tl.fromTo(
        ".crafting-title span",
        { opacity: 0, y: 50, filter: "blur(10px)", scale: 1.2 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=1.0"
      )
        .fromTo(
          ".crafting-text span",
          { opacity: 0, y: 30, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.02,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".crafting-quote",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          "#maktub",
          { opacity: 0, scale: 1.2, filter: "blur(10px)" },
          { opacity: 0.9, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
          "+=0.3"
        );
    },
    { scope: containerRef, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      id="the-journey"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent text-neutral-800 overflow-hidden"
    >
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white z-[60] pointer-events-none opacity-0"
      />

      <div
        ref={bgAdventureRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-colors duration-1000"
      >
        <div className="the-sun absolute top-0 -left-2 w-40 h-40 md:w-60 md:h-60 z-20 pointer-events-none">
          <Image
            src="/assets/images/the-sun-left.svg"
            alt="The Sun"
            fill
            className="object-contain brightness-0 opacity-80 drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
          />
        </div>

        <div className="the-moon absolute top-0 right-0 w-40 h-40 md:w-60 md:h-60 z-20 pointer-events-none">
          <Image
            src="/assets/images/the-moon-right.svg"
            alt="The Moon"
            fill
            className="object-contain brightness-0 opacity-80 drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
          />
        </div>

        <div className="the-desert absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <Image
            src="/assets/images/adventure.svg"
            alt="Desert Adventure"
            width={1000}
            height={1000}
            priority
            className="object-contain w-full h-full opacity-5 md:opacity-[0.1]"
          />
        </div>

        {/* 🌟 Golden Sandstorm & Desert Dust Particles */}
        <div className="desert-dust-layer absolute inset-0 z-10 pointer-events-none opacity-0">
          <DesertDustCanvas particleCount={130} />
        </div>
      </div>
      {/* Global GoldenThread is layered over this container */}

      <div
        key={`narratives-${lang}`}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="narrative-entry absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 max-w-5xl mx-auto">
          <p className={cn(QUOTE_CLASS, "text-center")}>{t.narrative1}</p>
        </div>
        <div className="narrative-entry absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 max-w-5xl mx-auto">
          <p className={cn(QUOTE_CLASS, "text-center")}>{t.narrative2}</p>
        </div>
        <div className="narrative-entry absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 max-w-5xl mx-auto">
          <p className={cn(QUOTE_CLASS, "text-center")}>{t.narrative3}</p>
        </div>
      </div>
      <div
        ref={legaciesContentRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
      >
        <div
          key={`legacies-${lang}`}
          className="crafting-content relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
        >
          <h2 className="crafting-title text-3xl sm:text-4xl md:text-5xl font-kings tracking-wide mb-2 sm:mb-3 text-amber-600 drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            {t.legacies.split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          <p className="crafting-text text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-neutral-600 font-garamond mb-6 sm:mb-8">
            {t.legaciesDesc.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-1.5">
                {word}
              </span>
            ))}
          </p>

          <div className="crafting-quote relative max-w-3xl mx-auto text-neutral-600 px-6 sm:px-10">
            <Image
              src="/assets/images/apos.svg"
              alt="quote open mark"
              width={40}
              height={40}
              className="absolute -top-4 -left-2 sm:-left-4 opacity-20 invert select-none pointer-events-none"
            />
            <Image
              src="/assets/images/apos.svg"
              alt="quote close mark"
              width={40}
              height={40}
              className="absolute -bottom-4 -right-2 sm:-right-4 opacity-20 invert rotate-180 select-none pointer-events-none"
            />
            <span className="relative z-10 block leading-relaxed text-xl sm:text-2xl md:text-3xl lg:text-4xl font-garamond italic text-neutral-900 drop-shadow-sm">
              {t.quote}
            </span>

            <div className="mt-4 sm:mt-5 relative z-10 font-garamond text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-600">
              {t.author}
            </div>

            <div
              id="maktub"
              className="mt-6 sm:mt-8 font-kings text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.35em] text-amber-500 select-none pointer-events-none drop-shadow-[0_2px_15px_rgba(245,158,11,0.35)]"
            >
              {t.maktub}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
