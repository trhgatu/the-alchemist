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
    "A passionate software engineer — an alchemist of code who forges ideas where logic meets imagination. Every challenge is a forge, every bug a spark, and from each trial I carry forward one mission: to grow, to learn, and to shape raw concepts into lasting creations.";
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

      // 2. Title Line 2 Reveal
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

      // 4. Card Reveal (Simple Fade In)
      gsap.fromTo(
        ".alchemist-card-container",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".alchemist-card-container",
            start: "top 80%",
            end: "top 50%",
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
        <div className="absolute right-[-10%] top-[10%] opacity-10 mix-blend-multiply origin-center z-0 pointer-events-none md:right-[-5%] md:w-[600px] md:h-[600px] w-[300px] h-[300px]">
          <Image
            src="/assets/images/craftings/transmutation_circle.png"
            alt="Transmutation Circle"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute left-[-5%] bottom-[10%] opacity-15 mix-blend-multiply z-0 pointer-events-none md:left-[5%] md:w-[500px] md:h-[500px] w-[250px] h-[250px]">
          <Image
            src="/assets/images/craftings/icon_alchemy.png"
            alt="Ouroboros"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      <div className="about-wrapper max-w-4xl mx-auto py-12 relative z-10 flex flex-col items-center px-4 h-full justify-center">
        <div className="about-title-container text-center text-neutral-900 mb-8 pt-0">
          <div className="about-title line-1 text-5xl md:text-7xl font-kings tracking-wide relative z-20">
            {"Forged in Code".split("").map((char, idx) => (
              <span key={idx} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 my-4 relative z-20">
            <div className="w-24 h-[1px] bg-neutral-400" />
            <div className="w-3 h-3 rotate-45 border border-neutral-600" />
            <div className="w-24 h-[1px] bg-neutral-400" />
          </div>

          <div className="about-title line-2 text-3xl font-kings md:text-4xl italic mt-0 text-neutral-700 relative z-20">
            {aboutText2.split("").map((char, idx) => (
              <span key={idx} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="about-content-container font-serif relative z-10 w-full flex flex-col items-center gap-8">
          <div className="space-y-6 p-6 md:p-0 relative z-20 text-center max-w-3xl mx-auto">
            <p className="about-desc-1 text-2xl md:text-3xl leading-relaxed text-neutral-900 font-medium font-bilbo">
              {aboutText.split(" ").map((word, wi) => (
                <span key={wi} className="word inline-block mr-2">
                  {word.split("").map((char, ci) => (
                    <span key={ci} className="char inline-block text-neutral-600">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>

          <div className="flex relative justify-center alchemist-card-container relative z-30 mt-4">
            <TheAlchemistCard />
          </div>
        </div>
      </div>
    </section>
  );
}
