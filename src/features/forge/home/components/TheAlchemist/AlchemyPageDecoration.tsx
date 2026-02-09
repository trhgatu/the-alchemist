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
    {
      src: "/assets/images/craftings/symbols/sol_symbol.svg",
      alt: "Sol",
      label: "Sol",
      className: "top-28 left-[35%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20",
      opacity: "opacity-90",
    },
    {
      src: "/assets/images/craftings/symbols/mercury_symbol.svg",
      alt: "Mercury",
      label: "Mercurius",
      className: "top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-20",
      opacity: "opacity-100",
    },
    {
      src: "/assets/images/craftings/symbols/luna_symbol.svg",
      alt: "Luna",
      label: "Luna",
      className: "top-28 right-[35%] translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20",
      opacity: "opacity-90",
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

      {/* === CIRCULAR ELEMENTS (Hierarchical Z-Index) === */}

      {/* 1. Eye of Providence - Apex (Highest) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 md:w-40 md:h-40 opacity-40 mix-blend-multiply z-50 pointer-events-none">
        <Image
          src="/assets/images/craftings/eye_of_providence.png"
          alt="Eye of Providence"
          fill
          className="object-contain"
        />
      </div>

      {/* 2. Transmutation Circle - Left Side Background (moved to avoid code overlap) */}
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

      {/* 4. Ouroboros - Footer Anchor */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 opacity-[0.12] mix-blend-multiply z-10 pointer-events-none w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
        <Image
          src="/assets/images/craftings/icon_alchemy.png"
          alt="Ouroboros"
          fill
          className="object-contain"
        />
      </div>

      {/* === HANDWRITTEN CODE ANNOTATIONS === */}

      {/* Main Code Block - Ink on Washi Style */}
      <div className="absolute top-[28%] right-8 md:right-16 rotate-[-3deg] text-neutral-600/50 font-['Courier_New'] text-xs md:text-sm leading-relaxed select-none z-15 mix-blend-multiply">
        <div className="space-y-0.5">
          <div className="italic opacity-70">async function transmute(</div>
          <div className="italic opacity-70">&nbsp;&nbsp;idea: RawConcept</div>
          <div className="italic opacity-70">): Promise&lt;Gold&gt; {"{"}</div>
          <div className="italic opacity-70">&nbsp;&nbsp;const refined = </div>
          <div className="italic opacity-70">&nbsp;&nbsp;&nbsp;&nbsp;await forge(idea);</div>
          <div className="italic opacity-70">&nbsp;&nbsp;const polished = </div>
          <div className="italic opacity-70">&nbsp;&nbsp;&nbsp;&nbsp;refine(refined);</div>
          <div className="italic opacity-70">&nbsp;&nbsp;return polished;</div>
          <div className="italic opacity-70">{"}"}</div>
          <div className="italic opacity-50 mt-1">{"// Every challenge is a forge"}</div>
        </div>
      </div>

      {/* === MARGINALIA (Margin Notes) === */}

      {/* Left Margin - Alchemical Process Notes */}
      <div className="absolute left-12 md:left-16 top-[45%] text-neutral-600/60 text-xs font-bilbo italic leading-relaxed select-none z-15 max-w-[80px] md:max-w-[100px]">
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

      {/* Right Margin - Philosophical Notes */}
      <div className="absolute right-12 md:right-16 top-[65%] text-neutral-600/60 text-xs font-bilbo italic leading-relaxed select-none z-15 max-w-[90px] md:max-w-[110px] text-right">
        <div className="rotate-[2deg]">
          &quot;As above,
          <br />
          so below&quot;
          <br />
          <span className="text-[10px]">- Tabula Smaragdina</span>
        </div>
      </div>

      {/* Main Full-Page SVG Frame */}
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

      {/* Header Geometry Area */}
      <div className="absolute top-0 left-0 right-0 h-40 z-10">
        {/* Celestial Trinity Connecting Line */}
        <div className="absolute top-28 left-[35%] right-[35%] h-[1px] bg-gradient-to-r from-neutral-400/30 via-neutral-500/50 to-neutral-400/30" />

        {/* Symbols & Latin Text placement - Ink on Washi */}
        {triaPrima.map((s, i) => (
          <div key={`tria-${i}`} className="absolute w-full h-full pointer-events-none">
            {/* Symbol - No background circle, blend into washi */}
            <div className={`absolute ${s.className}`}>
              <div className="relative w-full h-full opacity-80 mix-blend-multiply">
                <Image src={s.src} alt={s.alt} fill className="object-contain" />
              </div>
            </div>

            {/* Label */}
            <div
              className={`absolute text-neutral-600/70 text-sm tracking-[0.25em] font-medium uppercase mix-blend-multiply
                  ${i === 0 ? "top-36 left-[35%] -translate-x-1/2" : ""}
                  ${i === 1 ? "top-36 left-1/2 -translate-x-1/2" : ""}
                  ${i === 2 ? "top-36 right-[35%] translate-x-1/2" : ""}
                `}
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none">
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-neutral-300 to-transparent opacity-50" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border border-neutral-500 bg-[#f4f2ef]" />
      </div>
    </div>
  );
}
