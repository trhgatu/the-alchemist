"use client";

import { TheTransmutation } from "@/features/forge/home/components/TheTransmutation";
import { TheAlchemist } from "@/features/forge/home/components/TheAlchemist";
import { ScrollControllerProvider } from "@/contexts/ScrollControllerContext";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Render the Transmutation page and its call-to-action.
 *
 * Renders TheTransmutation and TheAlchemist components and a centered CTA section linking to /forge/chronicles. When mounted, the component scrolls the window to the top.
 *
 * @returns The page's JSX element containing the layout and CTA.
 */
export default function TransmutationPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const transmutationRef = useRef<HTMLDivElement>(null);
  const alchemistRef = useRef<HTMLDivElement>(null);

  // Enterprise: Collect child timelines
  const childTimelinesRef = useRef<Map<string, gsap.core.Timeline>>(new Map());

  // Master scroll progress for canvas animations
  const masterScrollProgressRef = useRef<number>(0);

  const handleTimelineRegister = (name: string, timeline: gsap.core.Timeline) => {
    childTimelinesRef.current.set(name, timeline);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      if (!wrapperRef.current || !transmutationRef.current || !alchemistRef.current) return;

      // MASTER TIMELINE - Single source of truth
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=1500%",
          pin: true,
          scrub: 0.5,
          markers: process.env.NODE_ENV !== "production",
          onUpdate: (self) => {
            const transmutationTL = childTimelinesRef.current.get("transmutation");
            const alchemistTL = childTimelinesRef.current.get("alchemist");

            // Transmutation: 0-50% of master timeline
            if (transmutationTL) {
              const transmutationProgress = Math.min(self.progress * 2, 1);
              transmutationTL.progress(transmutationProgress);
              masterScrollProgressRef.current = transmutationProgress;
            }

            // Alchemist: 70-100% of master timeline
            if (alchemistTL) {
              const alchemistProgress = Math.max((self.progress - 0.7) / 0.3, 0);
              alchemistTL.progress(alchemistProgress);
            }
          },
        },
      });

      // Set initial states
      gsap.set(transmutationRef.current, { opacity: 1, zIndex: 20 });
      gsap.set(alchemistRef.current, { opacity: 1, zIndex: 10 });

      // Force timeline to be 10 units long so 5.0 is exactly 50%
      masterTimeline.set({}, {}, 10);

      // Fade out Transmutation at 50% mark
      masterTimeline.to(
        transmutationRef.current,
        {
          opacity: 0,
          duration: 3, // 30% of timeline (3 out of 10 units)
          ease: "power1.inOut",
        },
        5 // Start at 50% of timeline (5 out of 10 units)
      );
    },
    { scope: wrapperRef }
  );

  return (
    <main className="w-full bg-neutral-950 relative min-h-screen">
      {/* SCENE WRAPPER */}
      <div id="scene-wrapper" ref={wrapperRef} className="relative w-full h-screen overflow-hidden">
        <ScrollControllerProvider
          controlled={true}
          triggerElement={wrapperRef.current}
          onTimelineRegister={handleTimelineRegister}
          scrollProgress={masterScrollProgressRef}
        >
          {/* Layer B: TheAlchemist (Always underneath) */}
          <div ref={alchemistRef} className="absolute inset-0 z-10 bg-[#f4f2ef]">
            <TheAlchemist />
          </div>

          {/* Layer A: TheTransmutation (On top, will fade out) */}
          <div ref={transmutationRef} className="absolute inset-0 z-20">
            <TheTransmutation />
          </div>
        </ScrollControllerProvider>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-32 bg-[#f4f2ef] relative z-30">
        <p className="font-kings text-2xl text-neutral-500 mb-6">The knowledge awaits.</p>
        <Link
          href="/forge/chronicles"
          className="group relative px-8 py-4 overflow-hidden rounded-full border border-neutral-800 transition-all hover:border-amber-600"
        >
          <span className="relative z-10 font-space-mono text-neutral-800 group-hover:text-amber-700 transition-colors uppercase tracking-widest text-sm">
            Open The Grimoire Chapter II
          </span>
          <div className="absolute inset-0 bg-amber-100/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
        </Link>
      </div>
    </main>
  );
}
