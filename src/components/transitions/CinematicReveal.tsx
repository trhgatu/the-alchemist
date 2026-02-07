"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CinematicRevealProps {
  children: [React.ReactNode, React.ReactNode]; // [Layer A (Top), Layer B (Under)]
  start?: string;
  end?: string;
  trigger?: string | HTMLElement;
  className?: string;
}

export function CinematicReveal({
  children,
  start = "70% top",
  end = "bottom bottom",
  trigger = "#scene-wrapper",
  className = "",
}: CinematicRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const [layerA, layerB] = children;

  useGSAP(
    () => {
      if (!layerARef.current) return;

      gsap.to(layerARef.current, {
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: end,
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [start, end, trigger], revertOnUpdate: true }
  );

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0 z-10 bg-[#f4f2ef]">{layerB}</div>
      <div ref={layerARef} className="absolute inset-0 z-20">
        {layerA}
      </div>
    </div>
  );
}
