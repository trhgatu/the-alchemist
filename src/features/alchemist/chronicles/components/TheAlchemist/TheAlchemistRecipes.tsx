"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

export function TheAlchemistRecipes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].chronicles.alchemist.recipes;

  useGSAP(
    () => {
      // Subtle fade in for manuscript elements
      gsap.from(".recipe-anim", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // Burn scroll animation for Magnum Opus
      gsap.fromTo(
        ".magnum-opus-title .char",
        {
          opacity: 0.35,
          color: "#8c7e72",
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,100,0,0)",
          y: 0,
        },
        {
          keyframes: [
            {
              opacity: 1,
              color: "#f59e0b",
              filter: "brightness(1.6)",
              textShadow: "0 0 20px rgba(245,158,11,0.95), 0 0 40px rgba(245,158,11,0.6)",
              y: -5,
              duration: 0.25,
            },
            {
              opacity: 1,
              color: "#1c1917",
              filter: "brightness(1)",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              y: 0,
              duration: 0.35,
            },
          ],
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".magnum-opus-title",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );

      // Burn scroll animation for Manifestation
      gsap.fromTo(
        ".manifestation-title .char",
        {
          opacity: 0.35,
          color: "#8c7e72",
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,100,0,0)",
          y: 0,
        },
        {
          keyframes: [
            {
              opacity: 1,
              color: "#f59e0b",
              filter: "brightness(1.6)",
              textShadow: "0 0 20px rgba(245,158,11,0.95), 0 0 40px rgba(245,158,11,0.6)",
              y: -5,
              duration: 0.25,
            },
            {
              opacity: 1,
              color: "#1c1917",
              filter: "brightness(1)",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              y: 0,
              duration: 0.35,
            },
          ],
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".manifestation-title",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-4 relative mt-16 md:mt-32 mb-24">
      {/* The Recipe Book / Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto md:p-8">
        {/* Title Area */}
        <div className="text-center mb-16 relative flex flex-col items-center recipe-anim">
          <h3
            key={`magnum-title-${lang}`}
            className="magnum-opus-title font-kings text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1c1917] mb-4 relative"
          >
            {t.magnumOpus.split("").map((char, idx) => (
              <span key={idx} className="char inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h3>
          <div className="flex items-center justify-center gap-4 my-6 relative z-20 opacity-70">
            <div className="w-24 h-[1px] bg-neutral-500" />
            <span className="text-xl text-neutral-500 font-serif">✧</span>
            <div className="w-24 h-[1px] bg-neutral-500" />
          </div>
          <p className="font-garamond text-2xl sm:text-3xl md:text-4xl text-neutral-800/90 max-w-3xl mx-auto mt-4 leading-relaxed tracking-wide">
            {t.desc}
          </p>
        </div>

        {/* The Recipe Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 relative z-10">
          {/* Left Column (Ingredients & Catalysts) */}
          <div className="space-y-12">
            <div className="recipe-anim">
              <h4 className="font-kings text-4xl text-[#5c3a21] border-b border-[#5c3a21]/20 pb-3 mb-6 flex items-center gap-4">
                <span className="text-3xl opacity-60">☿</span> {t.materiaPrima}
              </h4>
              <ul className="space-y-6 font-garamond text-[#3d2817]">
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.fluidity}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.mercury})
                    </span>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.ingredients.measures}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.passion}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.sulfur})
                    </span>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.ingredients.ember}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.grounding}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.salt})
                    </span>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.ingredients.pinches}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.energy}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.fire})
                    </span>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.ingredients.boil}
                  </span>
                </li>
              </ul>
            </div>

            <div className="recipe-anim">
              <h4 className="font-kings text-4xl text-[#5c3a21] border-b border-[#5c3a21]/20 pb-3 mb-6 flex items-center gap-4">
                <span className="text-3xl opacity-60">⚗</span> {t.catalysts.title}
              </h4>
              <ul className="space-y-6 font-garamond text-[#3d2817]">
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.obsession}</strong>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.catalysts.obsessionDesc}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.curiosity}</strong>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.catalysts.curiosityDesc}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.discipline}</strong>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.catalysts.disciplineDesc}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.solitude}</strong>
                  </span>
                  <span className="font-garamond text-2xl text-[#78350f]">
                    {t.catalysts.solitudeDesc}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (The Process & Steps) */}
          <div className="flex flex-col h-full recipe-anim">
            <h4 className="font-kings text-4xl text-[#5c3a21] border-b border-[#5c3a21]/20 pb-3 mb-6 flex items-center gap-4">
              <span className="text-3xl opacity-60">☉</span> {t.process.title}
            </h4>

            <div className="space-y-4 flex-grow flex flex-col justify-between">
              {/* Step I */}
              <div className="flex items-start gap-4 sm:gap-6 p-4 rounded-xl bg-amber-950/[0.03] border border-[#8b5a2b]/20 hover:border-[#8b5a2b]/50 hover:bg-amber-950/[0.06] transition-all duration-300 group/step">
                <span className="font-kings text-4xl sm:text-5xl text-[#78350f] shrink-0 min-w-[42px] leading-none pt-1 select-none group-hover/step:text-amber-600 transition-colors">
                  I.
                </span>
                <p className="flex-1 font-garamond text-2xl sm:text-3xl text-neutral-800 leading-relaxed text-left">
                  {t.process.step1}
                </p>
              </div>

              {/* Step II */}
              <div className="flex items-start gap-4 sm:gap-6 p-4 rounded-xl bg-amber-950/[0.03] border border-[#8b5a2b]/20 hover:border-[#8b5a2b]/50 hover:bg-amber-950/[0.06] transition-all duration-300 group/step">
                <span className="font-kings text-4xl sm:text-5xl text-[#78350f] shrink-0 min-w-[42px] leading-none pt-1 select-none group-hover/step:text-amber-600 transition-colors">
                  II.
                </span>
                <p className="flex-1 font-garamond text-2xl sm:text-3xl text-neutral-800 leading-relaxed text-left">
                  {t.process.step2}
                </p>
              </div>

              {/* Step III */}
              <div className="flex items-start gap-4 sm:gap-6 p-4 rounded-xl bg-amber-950/[0.03] border border-[#8b5a2b]/20 hover:border-[#8b5a2b]/50 hover:bg-amber-950/[0.06] transition-all duration-300 group/step">
                <span className="font-kings text-4xl sm:text-5xl text-[#78350f] shrink-0 min-w-[42px] leading-none pt-1 select-none group-hover/step:text-amber-600 transition-colors">
                  III.
                </span>
                <p className="flex-1 font-garamond text-2xl sm:text-3xl text-neutral-800 leading-relaxed text-left">
                  {t.process.step3}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Manifestation */}
        <div className="mt-20 pt-10 recipe-anim flex flex-col items-center">
          <h4
            key={`manifest-title-${lang}`}
            className="manifestation-title font-kings text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1c1917] mb-4 relative"
          >
            {t.manifestation.title.split("").map((char, idx) => (
              <span key={idx} className="char inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h4>
          <div className="flex items-center justify-center gap-4 my-6 relative z-20 opacity-70">
            <div className="w-24 h-[1px] bg-neutral-500" />
            <span className="text-xl text-neutral-500 font-serif">✧</span>
            <div className="w-24 h-[1px] bg-neutral-500" />
          </div>
          <div
            key={`manifest-poem-${lang}`}
            className="font-garamond text-4xl md:text-5xl text-[#2a1a10] text-center px-4 md:px-12 py-6 leading-relaxed"
          >
            {t.manifestation.poem.map((line: string, i: number) => (
              <p key={i} className={i !== t.manifestation.poem.length - 1 ? "mb-8" : ""}>
                {i === 0 ? "“" : ""}
                {line}
                {i === t.manifestation.poem.length - 1 ? "”" : ""}
              </p>
            ))}
          </div>

          <div className="w-full max-w-2xl flex justify-end items-end mt-12 opacity-80 px-4">
            <div className="font-garamond text-4xl text-[#3d2817] -rotate-3">
              {t.manifestation.author}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
