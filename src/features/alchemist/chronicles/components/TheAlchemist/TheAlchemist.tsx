"use client";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TheAlchemistJournal } from "./TheAlchemistJournal";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemist() {
  const containerRef = useRef<HTMLDivElement>(null);

  const lang = useLang();
  const t = translations[lang].chronicles.alchemist;

  const theAlchemistText = t.desc;
  useGSAP(
    () => {
      gsap.fromTo(
        ".the-alchemist-title.line-1 .char",
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
            trigger: ".the-alchemist-title.line-1",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".the-alchemist-desc-1 .char",
        {
          opacity: 0.3,
          color: "#a3a3a3",
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,100,0,0)",
        },
        {
          keyframes: [
            {
              opacity: 1,
              color: "#f59e0b",
              filter: "brightness(1.5)",
              textShadow: "0 0 15px rgba(245,158,11,0.8), 0 0 30px rgba(245,158,11,0.4)",
              duration: 0.25,
            },
            {
              color: "#171717",
              filter: "brightness(1)",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              duration: 0.35,
            },
          ],
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".the-alchemist-desc-1",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      id="the-alchemist"
      ref={containerRef}
      className="the-alchemist min-h-screen relative z-0 pb-16"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {}
        <div
          className="absolute -left-12 -right-12 top-[2%] md:top-[4%] bottom-0 bg-[#e8e4d9] z-0"
          style={{
            filter: "url(#torn-paper-filter)",
            boxShadow: "0 0 40px rgba(255, 69, 0, 0.4), inset 0 0 60px rgba(255, 140, 0, 0.15)",
          }}
        >
          <style jsx>{`
            .burning-edge-glow {
              animation: burn-flicker-opacity 3s infinite alternate ease-in-out;
              box-shadow:
                0 0 50px rgba(255, 140, 0, 0.5),
                inset 0 0 60px rgba(255, 69, 0, 0.2);
            }
            @keyframes burn-flicker-opacity {
              0% {
                opacity: 0.4;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0.6;
              }
            }
          `}</style>
          <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />
          <div className="absolute inset-0 pointer-events-none burning-edge-glow mix-blend-screen" />
          <div className="absolute rotate-180 inset-0 opacity-40 mix-blend-multiply z-0">
            <div
              style={{
                backgroundImage: "url(/assets/images/craftings/texture_washi.png)",
                backgroundSize: "contain",
                backgroundRepeat: "repeat-y",
              }}
              className="absolute inset-0"
            />
          </div>
          {}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              filter: "url(#torn-paper-filter)",
              boxShadow:
                "0 0 25px 5px rgba(255, 100, 0, 0.3), inset 0 0 20px rgba(180, 83, 9, 0.15)",
            }}
          />
        </div>
      </div>

      <div className="the-alchemist-wrapper max-w-7xl mx-auto pt-64 md:pt-96 pb-16 relative z-10 flex flex-col items-center px-4 h-full justify-center">
        <div className="the-alchemist-title-container text-center text-neutral-900 mb-8">
          <div
            key={`alchemist-title-${lang}`}
            className="the-alchemist-title line-1 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-kings tracking-wide relative z-20"
            aria-label={t.title}
          >
            {t.title.split("").map((char, idx) => (
              <span key={idx} className="char inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="the-alchemist-content-container font-garamond relative z-10 w-full flex flex-col items-center gap-16">
          <div className="space-y-6 p-6 md:p-0 relative z-20 text-center max-w-4xl mx-auto mb-12">
            <p
              key={`alchemist-desc-${lang}`}
              className="the-alchemist-desc-1 text-2xl sm:text-[1.7rem] lg:text-3xl leading-[1.7] text-neutral-900 font-medium font-garamond relative"
              aria-label={theAlchemistText}
            >
              {theAlchemistText.split(" ").map((word, wi) => (
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
          <div className="w-full space-y-12 mt-12">
            <TheAlchemistJournal />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-12 opacity-30 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-[1px] bg-neutral-600" />
          <span className="font-kings text-sm text-neutral-700 tracking-wider">FOLIO III</span>
        </div>
      </div>
    </section>
  );
}
