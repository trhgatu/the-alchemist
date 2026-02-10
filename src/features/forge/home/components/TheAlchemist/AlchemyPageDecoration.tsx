"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TrimaPrima } from "./TrimaPrima";

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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-visible font-bilbo"
    >
      {symbols.map((s, i) => (
        <div
          key={i}
          className={`alchemy-symbol animate-pulse absolute w-8 h-8 md:w-10 md:h-10 opacity-30 mix-blend-multiply ${s.className}`}
        >
          <Image src={s.src} alt={s.alt} fill className="object-contain" />
        </div>
      ))}

      {}
      {/* <div className="absolute left-[-8%] top-[20%] opacity-[0.04] mix-blend-multiply origin-center z-0 pointer-events-none w-[300px] h-[300px] md:w-[450px] md:h-[450px] animate-[spin_180s_linear_infinite]">
        <Image
          src="/assets/images/craftings/transmutation_circle.png"
          alt="Transmutation Circle"
          fill
          className="object-contain"
        />
      </div> */}

      {/* 3. Philosopher's Stone - Center (Behind Card) */}
      {/* <div className="stone-symbol absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px] opacity-[0.06] mix-blend-multiply pointer-events-none z-5">
        <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <Image
          src="/assets/images/craftings/symbols/squared_circle.svg"
          alt="Philosopher's Stone"
          fill
          className="object-contain animate-[spin_120s_linear_infinite]"
        />
      </div> */}

      <div className="absolute left-12 md:left-16 top-[65%] text-neutral-600/70 text-base font-bilbo italic leading-relaxed select-none z-[15] max-w-[80px] md:max-w-[100px]">
        <div className="rotate-[-2deg]">
          Prima Materia
          <br />
          ↓<br />
          Nigredo
          <br />
          ↓<br />
          Albedo
          <br />
          ↓<br />
          Rubedo
        </div>
      </div>
      <div className="absolute right-12 md:right-16 top-[65%] text-neutral-800/80 font-bilbo italic leading-relaxed select-none z-[15] max-w-[120px] md:max-w-[150px] text-right drop-shadow-sm">
        <div className="rotate-[2deg] text-xl md:text-2xl">
          <span>&quot;As above,</span>
          <br />
          <span>so below&quot;</span>
        </div>
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80 overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="border-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="line-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="text-neutral-500">
          <line x1="40" y1="120" x2="40" y2="90%" stroke="url(#border-fade)" strokeWidth="1" />
          <line
            x1="32"
            y1="120"
            x2="32"
            y2="90%"
            stroke="url(#border-fade)"
            strokeWidth="0.5"
            opacity="0.5"
          />

          <line
            x1="calc(100% - 40px)"
            y1="120"
            x2="calc(100% - 40px)"
            y2="90%"
            stroke="url(#border-fade)"
            strokeWidth="1"
          />
          <line
            x1="calc(100% - 32px)"
            y1="120"
            x2="calc(100% - 32px)"
            y2="90%"
            stroke="url(#border-fade)"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </g>
      </svg>
      <div className="absolute top-40 left-0 right-0 h-40 z-10">
        <div className="absolute top-28 left-[35%] right-[35%] h-[1px] bg-gradient-to-r from-neutral-400/30 via-neutral-500/50 to-neutral-400/30" />
        <TrimaPrima />
      </div>
    </div>
  );
}
