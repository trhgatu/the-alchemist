"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Image from "next/image";
import { TheAlchemistCard } from "@/features/forge/home/components/the-alchemist";
import { FallingLeaves } from "@/features/forge/home/components/FallingLeaves";
import { useRef } from "react";
import { useScrollController } from "@/contexts/ScrollControllerContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isControlled, triggerElement, registerTimeline } = useScrollController();

  useGSAP(
    () => {
      // PASSIVE CONSUMER PATTERN
      // This timeline responds to the same #scene-wrapper as Transmutation
      // Animations start at 50% of master timeline (when Transmutation fades)

      console.log("[TheAlchemist] Controlled mode:", isControlled);

      const tl = gsap.timeline(
        isControlled
          ? { paused: true } // Paused in controlled mode - parent will control playback
          : {
              scrollTrigger: {
                trigger: triggerElement || "#scene-wrapper",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            }
      );

      // We use a conceptual 10-unit duration for the timeline
      // 0-5: Hidden (Transmutation visible)
      // 5-10: Reveal & Focus (Transmutation fading, Alchemist appearing)
      const startProgress = 5.0; // Start at 50% of timeline

      // Background is always visible (no animation needed)
      // The master timeline will handle showing/hiding via Transmutation opacity

      // 2. Title Reveals
      tl.fromTo(
        ".about-title.line-1 span",
        { opacity: 0, y: 40, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.05, duration: 0.5 },
        startProgress
      ).fromTo(
        ".about-title.line-2 span",
        { opacity: 0, scale: 0.8, yPercent: 50 },
        { opacity: 1, scale: 1, yPercent: 0, stagger: 0.05, duration: 0.5, ease: "back.out(1.7)" },
        startProgress + 0.3
      );

      // 3. Description text (Word by word reveal)
      tl.fromTo(
        ".about-desc-1 .char, .about-desc-2 .char",
        { opacity: 0.3, color: "#a3a3a3" },
        { opacity: 1, color: "#171717", stagger: 0.01, duration: 1.0 },
        startProgress + 0.5
      );

      // 4. Card Reveal
      tl.fromTo(
        ".alchemist-card-container",
        { yPercent: 20, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8 },
        startProgress + 0.6
      );

      // 5. Parallax for the frame
      tl.to(
        ".frame-layer",
        {
          scale: 1.25,
          yPercent: 10,
          duration: 2.0,
        },
        startProgress
      );

      // ENTERPRISE: Register timeline with parent in controlled mode
      if (isControlled && registerTimeline) {
        registerTimeline("alchemist", tl);
        console.log("[TheAlchemist] ✅ Timeline registered with parent");
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="about min-h-screen relative z-0 bg-[#f4f2ef] overflow-hidden"
    >
      {/* Background Layers controlled by the main reveal timeline */}
      <div className="about-bg-layer absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <Image
            src="/assets/images/craftings/texture_washi.png"
            alt="Washi Texture"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 opacity-30 mix-blend-multiply frame-layer">
          <Image
            src="/assets/images/frame.svg"
            alt="Background Frame"
            fill
            className="object-cover invert scale-110"
          />
        </div>
      </div>

      <div className="about-wrapper max-w-7xl mx-auto py-20 relative z-10 flex flex-col justify-center min-h-screen">
        <FallingLeaves />
        <div className="about-title-container text-center text-neutral-900 md:mb-16">
          <div className="about-title line-1 text-4xl md:text-7xl font-kings tracking-wide">
            {"Forged in Code".split("").map((char, idx) => (
              <span key={idx} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="w-16 h-[1px] bg-neutral-400" />
            <div className="w-2 h-2 rotate-45 border border-neutral-600" />
            <div className="w-16 h-[1px] bg-neutral-400" />
          </div>

          <div className="about-title line-2 text-2xl font-kings md:text-4xl italic mt-0 text-neutral-700">
            {"Tempered by Challenge".split("").map((char, idx) => (
              <span key={idx} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="about-content-container font-serif">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
            <div className="space-y-12">
              <p className="about-desc-1 text-xl md:text-2xl leading-relaxed text-neutral-900">
                {"A passionate software engineer — an alchemist of code who forges ideas where logic meets imagination. Every challenge is a forge, every bug a spark, and from each trial I carry forward one mission: to grow, to learn, and to shape raw concepts into lasting creations."
                  .split(" ")
                  .map((word, wi) => (
                    <span key={wi} className="word inline-block mr-2">
                      {word.split("").map((char, ci) => (
                        <span key={ci} className="char inline-block text-neutral-400">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
              </p>

              <p className="about-desc-2 text-xl md:text-2xl leading-relaxed text-neutral-900">
                {"To create digital experiences that breathe with elegance and strike with impact — not just tools, but stories that resonate and endure."
                  .split(" ")
                  .map((word, wi) => (
                    <span key={wi} className="word inline-block mr-2">
                      {word.split("").map((char, ci) => (
                        <span key={ci} className="char inline-block text-neutral-400">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
              </p>
            </div>
            <div className="flex justify-center alchemist-card-container opacity-0">
              <TheAlchemistCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
