"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AlchemyPageDecoration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".alchemy-symbol", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 1.5,
          from: "random",
        },
      });
    },
    { scope: containerRef }
  );

  const symbols = [
    {
      src: "/assets/images/craftings/symbols/fire_symbol.svg",
      alt: "Fire",
      className: "top-10 left-10 md:top-20 md:left-20",
    },
    {
      src: "/assets/images/craftings/symbols/water_symbol.svg",
      alt: "Water",
      className: "top-10 right-10 md:top-20 md:right-20",
    },
    {
      src: "/assets/images/craftings/symbols/air_symbol.svg",
      alt: "Air",
      className: "bottom-32 left-10 md:bottom-20 md:left-20",
    },
    {
      src: "/assets/images/craftings/symbols/earth_symbol.svg",
      alt: "Earth",
      className: "bottom-32 right-10 md:bottom-20 md:right-20",
    },
  ];

  const triaPrima = [
    // Center: Mercury (Top of the frame, centered)
    {
      src: "/assets/images/craftings/symbols/mercury_symbol.svg",
      alt: "Mercury",
      className:
        "top-4 md:top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 z-20",
      opacity: "opacity-90",
    },
    // Left: Sol (Gold, Sun)
    {
      src: "/assets/images/craftings/symbols/sol_symbol.svg",
      alt: "Sol (Gold)",
      className:
        "top-4 md:top-8 left-[35%] md:left-[44%] -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 z-20",
      opacity: "opacity-70",
    },
    // Right: Luna (Silver, Moon)
    {
      src: "/assets/images/craftings/symbols/luna_symbol.svg",
      alt: "Luna (Silver)",
      className:
        "top-4 md:top-8 right-[35%] md:right-[44%] -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 z-20",
      opacity: "opacity-70",
    },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {symbols.map((s, i) => (
        <div
          key={i}
          className={`alchemy-symbol animate-pulse absolute w-8 h-8 md:w-10 md:h-10 opacity-40 mix-blend-multiply ${s.className}`}
        >
          <Image src={s.src} alt={s.alt} fill className="object-contain" />
        </div>
      ))}

      <div className="absolute inset-4 md:inset-8 border border-neutral-500/50 rounded-sm pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border border-neutral-400/20 rounded-sm pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 z-10">
        <svg
          className="absolute top-4 md:top-8 left-0 w-full h-24 pointer-events-none opacity-60 overflow-visible"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        ></svg>

        {triaPrima.map((s, i) => (
          <div
            key={`tria-${i}`}
            className={`tria-symbol absolute bg-[#f4f2ef] rounded-full p-2 border border-neutral-500/50 ${s.className}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              className={`object-contain mix-blend-multiply ${s.opacity}`}
            />
          </div>
        ))}
      </div>

      <div className="stone-symbol absolute left-1/2 top-[40%] -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 opacity-[0.03] mix-blend-multiply pointer-events-none">
        <Image
          src="/assets/images/craftings/symbols/squared_circle.svg"
          alt="Philosopher's Stone"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
