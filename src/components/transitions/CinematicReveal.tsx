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

/**
 * Create a two-layer scroll-driven reveal where the top layer fades to transparent over a configurable scroll range.
 *
 * The component expects two children: the first is the top layer (visible initially) and the second is the underlying layer.
 *
 * @param children - A tuple [Layer A, Layer B] where the first child is the top layer that will fade out and the second is the underlying content.
 * @param start - ScrollTrigger `start` position (e.g., "70% top"). Defaults to "70% top".
 * @param end - ScrollTrigger `end` position (e.g., "bottom bottom"). Defaults to "bottom bottom".
 * @param trigger - CSS selector or HTMLElement used as the ScrollTrigger `trigger`. Defaults to "#scene-wrapper".
 * @param className - Additional CSS classes applied to the outer container.
 * @returns The rendered container element that layers the two children and applies the scroll-driven reveal effect to the top layer.
 */
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
    { scope: containerRef, dependencies: [start, end, trigger] }
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