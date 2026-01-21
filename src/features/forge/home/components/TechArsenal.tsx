"use client";

import { useRef } from "react";

import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SKILLS } from "@/constants/Skills";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const TechArsenal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(".dragon-layer", {
      yPercent: 10,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );

    const wrappers = gsap.utils.toArray(".tech-icon-wrapper");
    gsap.fromTo(
      wrappers,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: {
          amount: 0.6,
          grid: "auto",
          from: "start",
        },
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#tech-arsenal",
          start: "top 70%",
        },
      }
    );

    gsap.to(".tech-icon-wrapper img", {
      keyframes: [
        {
          filter: "grayscale(100%) brightness(0.8)",
          scale: 1,
          duration: 0,
        },
        {
          filter: "grayscale(0%) brightness(2)",
          scale: 1.3,
          opacity: 1,
          duration: 0.6,
          ease: "power2.in",
        },
        {
          filter: "grayscale(0%) brightness(1)",
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
      ],
      stagger: {
        each: 0.15,
        grid: "auto",
        from: "start",
      },
      scrollTrigger: {
        trigger: "#tech-arsenal",
        start: "top 50%",
      },
    });
  }, []);

  // 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 15 deg)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });

    // Move the inner glow slightly opposite
    const glow = card.querySelector(".glow-effect");
    if (glow) {
      gsap.to(glow, {
        x: (x - centerX) * 0.5,
        y: (y - centerY) * 0.5,
        opacity: 0.6,
        duration: 0.5,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      clearProps: "all",
    });

    const glow = card.querySelector(".glow-effect");
    if (glow) {
      gsap.to(glow, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="tech-arsenal"
      className="relative bg-[#f0f0f0] w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("/assets/images/craftings/texture_washi.png")`,
        }}
      />

      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-0 pointer-events-none mix-blend-multiply opacity-20 select-none">
        <Image
          src="/assets/images/the-sun.svg"
          alt="The Sun"
          width={300}
          height={300}
          className="w-32 md:w-64"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-0 pointer-events-none opacity-20 select-none">
        <Image
          src="/assets/images/knight_state.svg"
          alt="Knight"
          width={300}
          height={300}
          className="w-48 md:w-80"
        />
      </div>

      <div className="dragon-layer z-10 absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 select-none">
        <Image
          src="/assets/images/medieval_dragon.png"
          alt="Dragon"
          width={1000}
          height={1000}
          className="object-contain w-[80%] h-[80%]"
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 w-full py-20 max-w-7xl px-6 text-center">
        {/* Title Group */}
        <div className="mb-10">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-kings text-neutral-800 mb-6 drop-shadow-sm flex items-center justify-center gap-6"
          >
            <span className="text-4xl text-neutral-300 opacity-50">✦</span>
            The Arsenal of Code
            <span className="text-4xl text-neutral-300 opacity-50">✦</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-neutral-300" />
            <div className="w-2 h-2 rotate-45 border border-neutral-400" />
            <div className="w-16 h-[1px] bg-neutral-300" />
          </div>

          <p className="text-neutral-600 italic text-lg md:text-xl max-w-4xl mx-auto leading-loose font-serif">
            &quot;Every line of code is forged with purpose. These are the tools, languages, and
            frameworks I have tempered — my arsenal in the endless forge of creation.&quot;
          </p>
        </div>

        <TooltipProvider delayDuration={0}>
          <div
            ref={gridRef}
            className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto py-10 px-4 perspective-1000"
          >
            {SKILLS.map((skill) => (
              <div key={skill.name} className="tech-icon-wrapper group relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative isolate">
                      {/* HOLY GLOW (Ambient behind) */}
                      <div className="absolute inset-0 bg-amber-200/40 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />

                      {/*
                                                CARD:
                                                - Logic: Rotated 45deg container, Inner -45deg content
                                            */}
                      <div
                        className="tech-icon-item w-24 h-24 bg-gradient-to-br from-white to-neutral-50 rotate-45 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-white flex items-center justify-center cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(200,180,150,0.4)] hover:border-amber-200/50 relative overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Glossy Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 mix-blend-overlay" />

                        {/* Molten/Holy Inner Glow (Moves with mouse) */}
                        <div className="glow-effect absolute w-full h-full bg-gradient-to-br from-amber-100/0 via-amber-200/30 to-amber-500/0 rounded-full blur-md opacity-0 pointer-events-none z-10" />

                        {/* Icon Content - NOTE: Added CSS grayscale to prevent FOUC */}
                        <div className="-rotate-45 w-full h-full flex items-center justify-center p-5 z-20 transform-gpu translate-z-10">
                          <Image
                            src={skill.iconPath}
                            alt={skill.name}
                            width={48}
                            height={48}
                            className="w-10 h-10 object-contain drop-shadow-sm filter grayscale opacity-60 pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-white/90 text-neutral-800 border-amber-100 backdrop-blur-md shadow-xl font-space-mono text-xs px-3 py-1.5 translate-y-4"
                  >
                    <p className="font-semibold tracking-wider font-kings text-lg text-amber-600">
                      {skill.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 capitalize">{skill.category} Rune</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};
