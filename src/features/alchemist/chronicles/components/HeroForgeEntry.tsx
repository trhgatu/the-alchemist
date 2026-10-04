"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { useAppStore } from "@/hooks/useAppStore";
import { translations } from "@/constants/translations";
import { cn } from "@/lib/utils";
import { QUOTE_CLASS } from "./quoteStyle";
import { WashiPortal, type PortalState } from "./WashiPortal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Timeline time after which the washi paper no longer sits behind the navbar
const WASHI_COVER_END = 0.8;

const AnimatedQuote = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={cn(
            "inline-block opacity-0 translate-y-6 word will-change-transform",
            idx < words.length - 1 ? "mr-2.5 md:mr-3.5" : "mr-0"
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export const HeroForgeEntry = () => {
  const scope = useRef<HTMLDivElement>(null);
  const portal = useRef<PortalState>({ zoom: 1, alpha: 1 });
  const lang = useLang();

  const t = translations[lang].hero;

  useGSAP(
    () => {
      const setNavTone = useAppStore.getState().setNavTone;
      setNavTone("ink");

      // While the paper fills the screen nothing behind it can be seen, so the
      // night layers are hidden; their render loops skip hidden layers.
      const coverStars = (covered: boolean) => {
        document.querySelectorAll<HTMLElement>(".global-stars").forEach((el) => {
          el.style.visibility = covered ? "hidden" : "";
        });
      };
      coverStars(window.scrollY < 2);

      gsap.to(scope.current, { autoAlpha: 1, duration: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=4500",
          scrub: 1,
          pin: true,
          refreshPriority: 1000,
        },
        onUpdate() {
          const tone = this.time() < WASHI_COVER_END ? "ink" : "light";
          if (useAppStore.getState().navTone !== tone) setNavTone(tone);
          coverStars(this.time() < 0.01);
        },
      });
      tl.to(
        ".hero-fade-out",
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );

      // The zoom is a shader uniform: constant cost at every scale, no
      // re-rasterising of paper or letters (see WashiPortal)
      tl.to(portal.current, { zoom: 80, duration: 1.5, ease: "power3.in" }, 0);
      tl.to(portal.current, { alpha: 0, duration: 0.5 }, 1.0);

      // 🌟 QUOTE 1: In the alchemical dance...
      tl.fromTo(
        ".quote-1 .word",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.04,
        },
        1.6
      ).to(".quote-1", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, "+=2.0");

      // 🌟 QUOTE 2: Life is a sacred furnace... (starts after generous void pause)
      tl.fromTo(
        ".quote-2 .word",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.04,
        },
        "+=1.5"
      ).to(".quote-2", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, "+=2.0");

      // 🌟 QUOTE 3: And from the crucible, we rise... (starts after generous void pause)
      tl.fromTo(
        ".quote-3-text .word",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.05,
        },
        "+=1.5"
      )
        .fromTo(
          ".quote-3-highlight .word",
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.06,
          },
          "+=0.6"
        )
        .to(".quote-3", { opacity: 0, y: -40, duration: 1.0, ease: "power2.in" }, "+=2.5");

      tl.to({}, { duration: 1.5 }, "+=0.5");

      return () => {
        setNavTone("light");
        coverStars(false);
      };
    },
    { scope, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      id="hero"
      ref={scope}
      className="hero relative opacity-0 h-screen w-full flex items-center justify-center text-center overflow-hidden"
    >
      <div
        key={lang}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="quote-1 absolute w-full max-w-5xl px-6 text-center">
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text1}
            className={QUOTE_CLASS}
          />
        </div>
        <div className="quote-2 absolute w-full max-w-5xl px-6 text-center">
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text2}
            className={QUOTE_CLASS}
          />
        </div>
        <div className="quote-3 absolute w-full max-w-5xl px-6 text-center flex flex-col items-center">
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text3}
            className={cn("quote-3-text", QUOTE_CLASS)}
          />
          <AnimatedQuote
            text={translations[lang].chronicles.transmutation.text3Highlight}
            className={cn("quote-3-highlight", QUOTE_CLASS)}
          />
        </div>
      </div>

      {/* The paper with the name cut through it, drawn in WebGL */}
      <WashiPortal stateRef={portal} className="absolute inset-0 z-10" />
      <h1 className="sr-only">trhgatu</h1>

      <style jsx>{`
        @keyframes hint-drift {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(6px);
            opacity: 1;
          }
        }
        .scroll-hint {
          animation: hint-drift 2.8s ease-in-out infinite;
        }
      `}</style>

      {/* Who this is, and how to go in */}
      <div className="hero-fade-out absolute inset-x-0 bottom-0 z-30 flex h-[28%] flex-col items-center justify-between px-6 pb-10 text-center pointer-events-none">
        <p className="font-garamond text-lg italic text-neutral-800 md:text-2xl">{t.role}</p>
        <p className="scroll-hint font-garamond text-base italic text-neutral-600">{t.scroll}</p>
      </div>
    </section>
  );
};
