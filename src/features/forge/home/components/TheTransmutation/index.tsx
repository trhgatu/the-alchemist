/**
 * TheTransmutation Component
 *
 * Enterprise-grade component using composition pattern.
 * All logic is extracted into hooks, presentation into sub-components.
 */

"use client";

import { useRef } from "react";
import { useTransmutationAnimation } from "./hooks/useTransmutationAnimation";
import { useTransmutationCanvas } from "./hooks/useTransmutationCanvas";
import { TransmutationCanvas } from "./components/TransmutationCanvas";
import { TransmutationText } from "./components/TransmutationText";

export function TheTransmutation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  const { scrollProgress } = useTransmutationCanvas();

  useTransmutationAnimation({
    textRefs: { text1: textRef1, text2: textRef2, text3: textRef3 },
    containerRef,
  });

  return (
    <section
      id="transmutation-section"
      ref={containerRef}
      className="relative w-full h-screen bg-neutral-950 flex items-center justify-center overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] pointer-events-none z-0" />

      <TransmutationCanvas scrollProgress={scrollProgress} />
      <TransmutationText textRefs={{ text1: textRef1, text2: textRef2, text3: textRef3 }} />
    </section>
  );
}
