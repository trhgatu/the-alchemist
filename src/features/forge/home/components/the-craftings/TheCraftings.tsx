"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectHomeProps {
  projects: Project[];
  isLoading?: boolean;
  isError?: boolean;
}

export function TheCraftings({ projects, isLoading, isError }: ProjectHomeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prophecyListRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current || projects.length === 0) return;
      gsap.from(".craftings-title span", {
        opacity: 0,
        y: 20,
        filter: "blur(5px)",
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      if (prophecyListRef.current && projects.length > 1) {
        gsap.to(prophecyListRef.current, {
          y: () => {
            const list = prophecyListRef.current;
            const parent = list?.parentElement;
            if (!list || !parent) return 0;
            return -(list.scrollHeight - parent.clientHeight);
          },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(Math.floor(self.progress * projects.length), projects.length - 1);
          setActiveIndex(index);
        },
      });
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  useGSAP(
    () => {
      const card = sectionRef.current?.querySelector(".center-card-container");
      if (card) {
        gsap.fromTo(
          card,
          { rotationY: 90, opacity: 0, scale: 0.9 },
          {
            rotationY: 0,
            opacity: 1,
            scale: 1,
            duration: 3,
            ease: "back.out(1.2)",
            overwrite: "auto",
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeIndex] }
  );

  const activeProject = projects[activeIndex];

  if (isLoading) {
    return (
      <section className="relative w-full h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="font-kings text-xl text-amber-500/80 animate-pulse tracking-widest">
            Summoning Artifacts...
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative w-full h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h3 className="font-kings text-3xl text-red-500/80">Flux Disruption</h3>
          <p className="font-space-mono text-xs text-neutral-500 tracking-wider">
            Failed to commune with the archives.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="craftings"
      className="relative w-full h-screen bg-neutral-950 text-white overflow-hidden"
    >
      <div className="w-full h-full flex flex-col relative z-20">
        <div className="absolute top-0 left-0 w-40 h-40 md:w-60 md:h-60 z-20 pointer-events-none">
          <Image
            src="/assets/images/the-sun-left.svg"
            alt="The Sun"
            fill
            className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>

        <div className="absolute top-0 right-0 w-40 h-40 md:w-60 md:h-60 z-20 pointer-events-none">
          <Image
            src="/assets/images/the-moon-right.svg"
            alt="The Moon"
            fill
            className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>

        <div className="absolute top-10 left-0 right-0 w-full z-10 cloud-parallax pointer-events-none">
          <Image
            src="/assets/images/cloud.avif"
            alt="Cloud"
            width={1600}
            height={500}
            className="w-full object-contain opacity-70"
          />
        </div>

        <div className="relative z-30 text-center pt-20 pb-2 md:pt-24 md:pb-6 shrink-0">
          <h2 className="craftings-title text-4xl md:text-6xl font-kings tracking-wide drop-shadow-sm mb-2">
            {"The Craftings".split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="font-serif italic text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-neutral-400 px-4">
            Forged in fire, each project is a testament to battles fought, lessons learned, and
            dreams brought to life.
          </p>
        </div>
        <div className="flex-1 w-full flex overflow-hidden relative z-20 min-h-0">
          <div className="w-1/4 h-full flex flex-col justify-start pt-12 md:pt-16 px-4 lg:px-8 perspective-1000 overflow-y-auto no-scrollbar mask-gradient">
            <div className="space-y-3">
              <h3 className="font-kings text-lg md:text-xl text-neutral-500 mb-4 tracking-widest uppercase text-center md:text-left sticky top-0 bg-neutral-950/80 backdrop-blur-sm z-10 py-2">
                The Deck
              </h3>
              {projects.map((p, i) => (
                <div
                  key={p._id || i}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-500 ease-out transform-gpu
                                ${
                                  i === activeIndex
                                    ? "bg-white/10 border-amber-500/50 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.15)] translate-x-2"
                                    : "border-white/5 opacity-40 hover:opacity-80 grayscale hover:grayscale-0"
                                }`}
                >
                  <h4
                    className={`font-space-mono text-xs md:text-sm font-bold truncate ${i === activeIndex ? "text-amber-400" : "text-neutral-500"}`}
                  >
                    {p.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 h-full flex items-start justify-center pt-12 md:pt-16 perspective-1000 p-4 md:p-8">
            {activeProject ? (
              <div
                key={activeProject._id || activeIndex}
                className="center-card-container relative w-full max-w-xs xl:max-w-sm aspect-[2/3] md:aspect-[3/4] rounded-xl border border-amber-500/30 flex flex-col items-center justify-center group"
              >
                <div className="absolute inset-0 bg-neutral-800 rounded-xl group-hover:shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all duration-500">
                  {activeProject.thumbnail ? (
                    <Image
                      src={activeProject.thumbnail}
                      alt={activeProject.name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                      <span className="font-kings text-6xl text-neutral-700">
                        {activeProject.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </div>

                <div className="absolute bottom-10 px-6 text-center transform-gpu translate-z-10 group-hover:-translate-y-2 transition-transform duration-500">
                  <h2 className="text-3xl md:text-4xl font-kings text-amber-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {activeProject.name}
                  </h2>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex-1 h-full relative overflow-hidden">
            <div ref={prophecyListRef} className="w-full will-change-transform">
              {projects.map((p, i) => (
                <div
                  key={p._id || i}
                  className="min-h-screen w-full flex flex-col justify-start pt-20 px-4 md:px-8"
                >
                  <div className="bg-neutral-900/90 border border-white/10 p-6 rounded-xl shadow-lg hover:border-amber-500/20 transition-colors duration-300">
                    <div className="mb-6 border-b border-white/10 pb-4">
                      <span className="text-amber-500 font-space-mono text-[10px] tracking-[0.2em] uppercase block mb-1">
                        Prophecy No.{i + 1}
                      </span>
                      <h2 className="text-xl md:text-2xl font-kings text-white/90 leading-tight">
                        {p.name}
                      </h2>
                    </div>
                    <div className="prose prose-invert prose-sm mb-6 font-serif text-neutral-400 leading-relaxed text-sm">
                      <p>{p.description}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                        Runes & Sigils
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {p.tech?.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 border border-white/5 bg-white/5 rounded text-[10px] uppercase tracking-wider font-space-mono text-neutral-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors cursor-default"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    {p.link && (
                      <Link
                        href={p.link}
                        target="_blank"
                        className="group flex items-center gap-2 text-amber-500 hover:text-white transition-colors mt-auto pt-4 border-t border-white/5"
                      >
                        <span className="font-kings text-lg border-b border-transparent group-hover:border-amber-500 transition-all">
                          Visit Realm
                        </span>
                        <span className="text-base transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
