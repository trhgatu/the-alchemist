"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  TheTransmutation,
  TechGrimoire,
  TheAlchemist,
  TheCraftings,
  TheJourney,
} from "@/features/forge/home/components";
import { usePublicProjects } from "@/features/forge/craftings/hooks";
import { useLang } from "@/hooks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ChroniclesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const transmutationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const lang = useLang();
  const { data: projects = [], isLoading, isError } = usePublicProjects(lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      if (!spacerRef.current || !transmutationRef.current || !contentRef.current) return;

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          if (transmutationRef.current) {
            gsap.set(transmutationRef.current, { opacity: 1 - self.progress });
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="relative w-full bg-neutral-950">
      <div ref={transmutationRef} className="fixed inset-0 z-0">
        <TheTransmutation triggerRef={spacerRef} triggerId="#ghost-spacer" />
      </div>
      <div
        ref={spacerRef}
        id="ghost-spacer"
        className="relative w-full h-[500vh] z-10 pointer-events-none"
      />

      <div ref={contentRef} className="relative z-20 w-full">
        <TheAlchemist />
        <TechGrimoire />
        <TheCraftings projects={projects} isLoading={isLoading} isError={isError} />
        <TheJourney />
      </div>
    </main>
  );
}
