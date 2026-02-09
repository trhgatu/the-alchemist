"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Image from "next/image";
import { TheAlchemistCard } from "./TheAlchemistCard";
import { useRef } from "react";
import { AlchemyPageDecoration } from "./AlchemyPageDecoration";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemist() {
  const containerRef = useRef<HTMLDivElement>(null);

  const aboutText =
    "In the digital forge where logic meets imagination, I transmute raw concepts into living code. Each project is an alchemical experiment—combining the precision of algorithms with the artistry of design. Through countless iterations and refinements, I pursue the Magnum Opus: software that doesn't just function, but transforms. My mission is to craft solutions that endure, to learn from every challenge, and to push the boundaries of what's possible when creativity and engineering unite.";
  const aboutText2 = "Tempered by Challenge";
  useGSAP(
    () => {
      gsap.fromTo(
        ".about-title.line-1 span",
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-title.line-1",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".about-title.line-2 span",
        { opacity: 0, scale: 0.8, yPercent: 50 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".about-title.line-2",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      // 3. Description text (Word by word reveal)
      gsap.fromTo(
        ".about-desc-1 .char",
        { opacity: 0.3, color: "#a3a3a3" },
        {
          opacity: 1,
          color: "#171717",
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-desc-1",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="about min-h-screen relative z-0 pb-32">
      <div className="absolute inset-0 pointer-events-none z-0 bg-[#e8e4d9]">
        <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />
        <div className="absolute rotate-180 inset-0 opacity-40 pointer-events-none mix-blend-multiply z-0">
          <Image
            src="/assets/images/craftings/texture_washi.png"
            alt="Washi Texture"
            fill
            className="object-cover"
          />
        </div>
        <AlchemyPageDecoration />
      </div>

      {/* Dedicated wrapper for edge decorations */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {/* SOLVE - Left Edge */}
        <div
          className="absolute left-10 top-1/2 origin-center"
          style={{
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "left center",
          }}
        >
          <div className="flex items-center gap-2 text-neutral-400/35 font-kings select-none mix-blend-multiply">
            <span className="text-neutral-500/20 text-xl">◆</span>
            <span className="text-4xl md:text-6xl tracking-[0.5em]">SOLVE</span>
            <span className="text-neutral-500/20 text-xl">◆</span>
          </div>
        </div>

        {/* COAGULA - Right Edge */}
        <div
          className="absolute right-10 top-1/2 origin-center"
          style={{
            transform: "translateY(-50%) rotate(90deg)",
            transformOrigin: "right center",
          }}
        >
          <div className="flex items-center gap-2 text-neutral-400/35 font-kings select-none mix-blend-multiply">
            <span className="text-neutral-500/20 text-xl">◆</span>
            <span className="text-4xl md:text-6xl tracking-[0.5em]">COAGULA</span>
            <span className="text-neutral-500/20 text-xl">◆</span>
          </div>
        </div>
      </div>

      <div className="about-wrapper max-w-4xl mx-auto py-12 relative z-10 flex flex-col items-center px-4 h-full justify-center">
        <div className="about-title-container text-center text-neutral-900 mb-8 pt-32 md:pt-40">
          <div
            className="about-title line-1 text-5xl md:text-7xl font-kings tracking-wide relative z-20"
            aria-label="Forged in Code"
          >
            {"Forged in Code".split("").map((char, idx) => (
              <span key={idx} className="inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 my-4 relative z-20">
            <div className="w-24 h-[1px] bg-neutral-400" />
            <div className="w-3 h-3 rotate-45 border border-neutral-600" />
            <div className="w-24 h-[1px] bg-neutral-400" />
          </div>

          <div
            className="about-title line-2 text-3xl font-kings md:text-4xl italic mt-0 text-neutral-700 relative z-20"
            aria-label={aboutText2}
          >
            {aboutText2.split("").map((char, idx) => (
              <span key={idx} className="inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="about-content-container font-serif relative z-10 w-full flex flex-col items-center gap-8">
          <div className="space-y-6 p-6 md:p-0 relative z-20 text-center max-w-3xl mx-auto">
            <p
              className="about-desc-1 text-2xl md:text-3xl leading-relaxed text-neutral-900 font-medium font-bilbo"
              aria-label={aboutText}
            >
              {aboutText.split(" ").map((word, wi) => (
                <span key={wi} className="word inline-block mr-2" aria-hidden="true">
                  {word.split("").map((char, ci) => (
                    <span key={ci} className="char inline-block text-neutral-600">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>

          {/* Book-style Alternating Layout */}
          <div className="mt-12 space-y-12 max-w-5xl mx-auto px-4">
            {/* Row 1: Text 70% | Avatar 30% */}
            <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center relative overflow-visible group">
              <div className="text-left space-y-4 order-2 md:order-1">
                <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
                  Prima Materia
                </h3>
                <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
                  <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
                    F
                  </span>
                  rom raw concepts to refined solutions, I transmute ideas through the alchemical
                  process of development. Each project begins as{" "}
                  <span className="italic text-neutral-800">Prima Materia</span>—unformed potential
                  waiting to be shaped by skill and vision. It is here in the chaos of creation that
                  the true structure begins to emerge.
                </p>
              </div>
              <div className="relative h-64 overflow-visible order-1 md:order-2 flex justify-center">
                {/* Avatar with absolute positioning for larger size */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-125 overflow-visible w-64 md:w-80">
                  <TheAlchemistCard />
                </div>
              </div>
            </div>

            {/* Ornamental Divider */}
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
              <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
            </div>

            {/* Row 2: Symbol 30% | Text 70% */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group">
              <div className="flex justify-center opacity-20 mix-blend-multiply order-1">
                <div className="relative w-48 h-48">
                  <Image
                    src="/assets/images/craftings/ouroboros.png"
                    alt="Ouroboros"
                    fill
                    className="object-contain animate-[spin_120s_linear_infinite]"
                  />
                </div>
              </div>
              <div className="text-left space-y-4 order-2">
                <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
                  The Great Work
                </h3>
                <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
                  <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
                    T
                  </span>
                  hrough countless iterations and refinements, I pursue the{" "}
                  <span className="italic text-neutral-800">Magnum Opus</span>: software that
                  doesn&apos;t just function, but transforms. My mission is to craft solutions that
                  endure, to learn from every challenge, and to push the boundaries of what&apos;s
                  possible.
                </p>
              </div>
            </div>

            {/* Ornamental Divider */}
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
              <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
            </div>

            {/* Row 3: Text 70% | Symbol 30% */}
            <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center group">
              <div className="text-left space-y-4 order-2 md:order-1">
                <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
                  Philosopher&apos;s Stone
                </h3>
                <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
                  <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
                    T
                  </span>
                  he true <span className="italic text-neutral-800">Philosopher&apos;s Stone</span>{" "}
                  isn&apos;t gold—it&apos;s knowledge. Every bug solved, every pattern mastered,
                  every user delighted adds to the eternal quest for mastery in the digital arts.
                </p>
              </div>
              <div className="flex justify-center order-1 md:order-2 opacity-60 mix-blend-multiply">
                <div className="relative w-48 h-48">
                  <Image
                    src="/assets/images/craftings/symbols/sol_symbol.svg"
                    alt="Wisdom"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
