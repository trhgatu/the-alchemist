"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CraftingLegacies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mistLeftRef = useRef<HTMLDivElement>(null);
  const mistRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.to("#page-wrapper", {
      backgroundColor: "#ffffff",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",
        end: "bottom center",
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(
      [mistLeftRef.current, mistRightRef.current],
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.in",
      },
      0
    )

      .fromTo(
        bgRef.current,
        { scale: 1.5, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
        0.2
      )

      .to(
        mistLeftRef.current,
        { xPercent: -120, opacity: 0, duration: 1.2, ease: "power1.inOut" },
        0.3
      )
      .to(
        mistRightRef.current,
        { xPercent: 120, opacity: 0, duration: 1.2, ease: "power1.inOut" },
        0.3
      )

      .fromTo(
        ".crafting-title span",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0.4
      )
      .fromTo(
        ".crafting-text span",
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.02, duration: 0.8, ease: "power2.out" },
        0.6
      )
      .fromTo(
        ".crafting-quote",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0.9
      );
  }, []);

  return (
    <section
      id="legacies"
      ref={sectionRef}
      className="legacies relative min-h-screen flex flex-col items-center overflow-hidden justify-center text-center px-6 bg-white"
    >
      <div
        ref={bgRef}
        className="legacies-parallax absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <Image
          src="/assets/images/adventure.svg"
          alt="Desert Adventure"
          width={1200}
          height={1200}
          priority
          className="object-contain w-full h-full opacity-15 md:opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_80%,#ffffff_100%)]" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex">
        <div ref={mistLeftRef} className="flex-1 h-full relative opacity-0">
          <Image
            src="/assets/images/cloud.png"
            alt="Mist"
            fill
            className="object-cover scale-200 translate-y-1/4 grayscale brightness-50 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 via-neutral-800/50 to-transparent mix-blend-multiply" />
        </div>
        <div ref={mistRightRef} className="flex-1 h-full relative opacity-0">
          <Image
            src="/assets/images/cloud.png"
            alt="Mist"
            fill
            className="object-cover scale-200 -translate-y-1/4 grayscale brightness-50 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-900/70 via-neutral-800/50 to-transparent mix-blend-multiply" />
        </div>
      </div>

      <div className="relative z-20">
        <h2 className="crafting-title text-3xl md:text-5xl lg:text-6xl font-kings tracking-wide mb-8 text-neutral-900 drop-shadow-sm">
          {"Crafting Legacies".split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p className="crafting-text text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-neutral-600 font-serif">
          {"Every line of code is not just a solution — it’s a legacy, a trace left behind to inspire, empower, and endure."
            .split(" ")
            .map((word, i) => (
              <span key={i} className="inline-block mr-2">
                {word}
              </span>
            ))}
        </p>

        <div className="crafting-quote relative mt-16 italic text-lg md:text-2xl max-w-4xl mx-auto text-neutral-800">
          <Image
            src="/assets/images/apos.svg"
            alt="quote open mark"
            width={80}
            height={80}
            className="absolute -top-10 -left-12 opacity-10 select-none pointer-events-none"
          />
          <Image
            src="/assets/images/apos.svg"
            alt="quote close mark"
            width={80}
            height={80}
            className="absolute -bottom-10 -right-12 opacity-10 rotate-180 select-none pointer-events-none"
          />
          <span className="relative z-10 block leading-relaxed text-3xl md:text-5xl font-kings">
            “And, when you want something, all the universe conspires in helping you to achieve it.”
          </span>

          <div className="mt-8 relative z-10 font-space-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
            — Paulo Coelho, <span className="text-amber-600 font-bold">The Alchemist</span>
          </div>
        </div>
      </div>
    </section>
  );
}
