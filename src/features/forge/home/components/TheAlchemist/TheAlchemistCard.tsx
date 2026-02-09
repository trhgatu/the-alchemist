"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function TheAlchemistCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    if (displacementRef.current) {
      gsap.to(displacementRef.current, {
        attr: { scale: 0 },
        duration: 0.8,
        ease: "power2.out",
      });
    }
    if (turbulenceRef.current) {
      gsap.to(turbulenceRef.current, {
        attr: { baseFrequency: 0 },
        duration: 0.8,
        ease: "power2.out",
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (displacementRef.current) {
      gsap.to(displacementRef.current, {
        attr: { scale: 30 },
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
    if (turbulenceRef.current) {
      gsap.to(turbulenceRef.current, {
        attr: { baseFrequency: 0.04 },
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="alchemist-ink-distortion">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-neutral-400/5 rounded-full blur-[80px] group-hover:bg-neutral-400/10 transition-colors duration-1000" />
      <div className="relative w-[75%] h-[75%] z-10 group animate-float">
        <div className="absolute inset-0 bg-slate-400/20 rounded-full blur-xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out -z-10 mix-blend-multiply" />
        <div
          className="relative w-full h-full overflow-hidden rounded-full border-4 border-neutral-300/50 shadow-2xl transition-all duration-700 group-hover:border-white/20 bg-[#f4f2ef] group-hover:shadow-[0_0_50px_rgba(200,200,200,0.15)]"
          style={{ filter: "url(#alchemist-ink-distortion)" }}
        >
          <Image
            src="/assets/images/avt.png"
            alt="The Alchemist Avatar"
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[100%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-500/0 to-slate-900/0 group-hover:via-slate-400/10 group-hover:to-slate-900/40 transition-all duration-700 pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
