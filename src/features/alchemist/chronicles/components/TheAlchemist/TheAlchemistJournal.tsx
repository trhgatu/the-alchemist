"use client";
import Image from "next/image";
import { TheAlchemistCard } from "./TheAlchemistCard";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemistJournal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].chronicles.alchemist.journal;

  useGSAP(
    () => {
      const phases = gsap.utils.toArray<HTMLElement>(".journal-phase");
      phases.forEach((phase) => {
        const text = phase.querySelector(".journal-text");
        const image = phase.querySelector(".journal-image");

        // Fade & Blur reveal for text
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: phase,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (image) {
          gsap.fromTo(
            image,
            { scale: 0.85, y: -40 },
            {
              scale: 1.05,
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: phase,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });

      const dividers = gsap.utils.toArray<HTMLElement>(".journal-divider");
      dividers.forEach((divider) => {
        gsap.fromTo(
          divider,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 0.4,
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: divider,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <div key={lang} ref={containerRef} className="space-y-12 max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center relative overflow-visible group journal-phase">
        <div className="text-left space-y-4 order-2 md:order-1 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.nigredo.title}
          </h3>
          <p className="font-garamond text-2xl sm:text-3xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-6px] leading-none drop-shadow-sm">
              {t.nigredo.initial}
            </span>
            {t.nigredo.desc}
          </p>
        </div>
        <div className="relative h-64 overflow-visible order-1 md:order-2 flex justify-center journal-image">
          <div className="absolute top-1/2 left-[50%] md:left-[70%] -translate-x-1/2 -translate-y-1/2 z-50 scale-140 overflow-visible w-64 md:w-80">
            <TheAlchemistCard />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 opacity-70 journal-divider">
        <div className="w-24 h-[1px] bg-neutral-500" />
        <span className="text-xl text-neutral-500 font-serif">✧</span>
        <div className="w-24 h-[1px] bg-neutral-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group journal-phase">
        <div className="flex justify-center opacity-20 mix-blend-multiply order-1 journal-image">
          <div className="relative w-48 h-48">
            <Image
              src="/assets/images/craftings/transmutation_circle.png"
              alt="Ouroboros"
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
        <div className="text-left space-y-4 order-2 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.albedo.title}
          </h3>
          <p className="font-garamond text-2xl sm:text-3xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-6px] leading-none drop-shadow-sm">
              {t.albedo.initial}
            </span>
            {t.albedo.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 opacity-70 journal-divider">
        <div className="w-24 h-[1px] bg-neutral-500" />
        <span className="text-xl text-neutral-500 font-serif">✧</span>
        <div className="w-24 h-[1px] bg-neutral-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center group journal-phase">
        <div className="text-left space-y-4 order-2 md:order-1 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.citrinitas.title}
          </h3>
          <p className="font-garamond text-2xl sm:text-3xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-6px] leading-none drop-shadow-sm">
              {t.citrinitas.initial}
            </span>
            {t.citrinitas.desc}
          </p>
        </div>
        <div className="flex justify-center order-1 md:order-2 opacity-60 mix-blend-multiply journal-image">
          <div className="relative w-48 h-48">
            <Image
              src="/assets/images/craftings/symbols/squared_circle.svg"
              alt="Philosopher's Stone"
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 opacity-70 journal-divider">
        <div className="w-24 h-[1px] bg-neutral-500" />
        <span className="text-xl text-neutral-500 font-serif">✧</span>
        <div className="w-24 h-[1px] bg-neutral-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group journal-phase">
        <div className="flex justify-center opacity-60 mix-blend-multiply order-1 journal-image">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <Image
              src="/assets/images/craftings/symbols/code_symbol.png"
              alt="Universal Solvent Symbol"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-left space-y-4 order-2 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.rubedo.title}
          </h3>
          <p className="font-garamond text-2xl sm:text-3xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-6px] leading-none drop-shadow-sm">
              {t.rubedo.initial}
            </span>
            {t.rubedo.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 opacity-40 journal-divider">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>
    </div>
  );
}
