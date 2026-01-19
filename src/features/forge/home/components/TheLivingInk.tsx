"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const InkText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span className={`inline ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, j) => (
            <span
              key={j}
              className="ink-char inline-block opacity-0 filter blur-[4px]"
            >
              {char}
            </span>
          ))}
          &nbsp;
        </span>
      ))}
    </span>
  );
};

export function TheLivingInk() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(".ink-blot", {
      scale: 1.1,
      opacity: 0.8,
      duration: 4,
      stagger: {
        amount: 2,
        from: "random",
      },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".ink-layer", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".ink-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "expo.out" },
    )
      .fromTo(
        ".ink-title span",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.0",
      )
      .to(
        ".ink-char",
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: {
            amount: 2,
            from: "start",
          },
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5",
      );
  }, []);

  return (
    <section
      ref={containerRef}
      id="fires"
      className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white border-b border-neutral-900"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <Image
          src="/assets/images/craftings/texture_washi.png"
          alt="Washi Texture"
          fill
          className="object-cover invert"
        />
      </div>

      <div className="ink-layer absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-20 mix-blend-screen">
        <div className="ink-blot absolute top-1/4 -left-20 w-[600px] h-[600px] bg-neutral-400 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl px-8 text-center pb-20">
        <div className="ink-divider w-px h-24 bg-gradient-to-b from-transparent to-neutral-500 mx-auto mb-10 opacity-50" />

        <h2 className="ink-title text-5xl md:text-8xl font-kings text-white mb-6 tracking-tight leading-none drop-shadow-lg">
          {"The Living Ink".split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-4 opacity-0">
              {word}
            </span>
          ))}
        </h2>

        <div className="ink-subtitle font-space-mono text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto leading-loose tracking-wide space-y-6">
          <p className="font-serif italic text-2xl text-neutral-200">
            <InkText text='"In the cracks of the code, the light gets in."' />
          </p>
          <p>
            <InkText text="We do not strive for the cold, static perfection of the machine, but for the resilience of nature. Code is a living entity—impermanent, incomplete, and ever-evolving." />
          </p>
          <p>
            <InkText text="True craftsmanship lies not in hiding the flaws, but in refining them into features. Simple. Organic. Alive." />
          </p>
        </div>

        <div className="ink-divider w-px h-16 bg-gradient-to-b from-neutral-500 to-transparent mx-auto mt-12 opacity-30 origin-top" />
      </div>
    </section>
  );
}
