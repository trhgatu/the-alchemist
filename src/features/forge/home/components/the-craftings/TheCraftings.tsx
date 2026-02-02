"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types";
import { BackgroundLayers } from "./BackgroundLayers";
import { OrbitalSystem } from "./OrbitalSystem";
import { ProphecyCard } from "./ProphecyCard";
import { StarField } from "./StarField";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectHomeProps {
  projects: Project[];
  isLoading?: boolean;
  isError?: boolean;
}

export function TheCraftings({ projects, isLoading, isError }: ProjectHomeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prophecyListRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ height: 800, width: 1200 });

  useGSAP(() => {
    const updateDimensions = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useGSAP(
    () => {
      if (!backgroundRef.current || !gridRef.current || projects.length === 0) return;

      // ⚙️ CONFIG: BACKGROUND COLOR TRANSITION (Chuyển màu nền)
      // ═══════════════════════════════════════════════════════════
      // Start: #000000 (Đen - Space)
      // End: #ffffff (Trắng - Desert)
      // Timeline: 300% (3 màn hình scroll)
      //
      // ĐIỀU CHỈNH:
      // - Đổi #ffffff để thay đổi màu cuối (vd: #f5f5dc = Beige)
      // - Tăng end để transition chậm hơn (vd: 300% → 500%)
      // - Đổi scrub để thay đổi độ mượt (vd: 1 → 1.5)
      gsap.set(backgroundRef.current, {
        backgroundColor: "#000000",
      });

      gsap.to(backgroundRef.current, {
        backgroundColor: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      });

      // ⚙️ CONFIG: ATMOSPHERE LAYER (Lớp khí quyển)
      // ═══════════════════════════════════════════════════════════
      // Opacity: 0 → 1 (Từ trong suốt đến hiện rõ)
      // Timeline: 300%
      //
      // ĐIỀU CHỈNH:
      // - Đổi opacity để lớp khí quyển mờ hơn/đậm hơn (vd: 1 → 0.7)
      const atmosphereLayer = sectionRef.current?.querySelector(".absolute.inset-0.z-10");
      const reentryHeat = sectionRef.current?.querySelector(
        ".bg-gradient-to-r.from-transparent.via-blue-500\\/10"
      );
      const groundApproach = sectionRef.current?.querySelector(".bg-gradient-to-t.from-white\\/10");

      if (atmosphereLayer) {
        gsap.to(atmosphereLayer, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1,
          },
        });
      }

      // ⚙️ CONFIG: REENTRY HEAT EFFECT (Hiệu ứng nhiệt khi vào khí quyển)
      // ═══════════════════════════════════════════════════════════
      // Phase 1: Fade in + Scale (0 → 0.3)
      // Phase 2: Fade out (0.7 → 1.0)
      //
      // ĐIỀU CHỈNH:
      // - Đổi opacity để hiệu ứng rõ hơn (vd: 0.8 → 1.0)
      // - Đổi scale để phóng to hơn (vd: 1.2 → 1.5)
      // - Đổi duration để hiệu ứng dài hơn (vd: 0.3 → 0.5)
      if (reentryHeat) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1,
          },
        });
        tl.to(reentryHeat, { opacity: 0.8, scale: 1.2, duration: 0.3, ease: "power2.inOut" }).to(
          reentryHeat,
          { opacity: 0, duration: 0.3, ease: "power2.out" },
          0.7
        );
      }

      if (groundApproach) {
        gsap.to(groundApproach, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "+=150%",
            end: "+=300%",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current || projects.length === 0) return;
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

      const items = sectionRef.current?.querySelectorAll(".sidebar-item");
      if (items && projects.length > 0) {
        const radius = dimensions.height * 0.55;
        const startY = dimensions.height * 0.45;
        const centerXOffset = -radius + 140;
        const spacing = 32;
        const totalProgress = 0;

        items.forEach((item, i) => {
          const diff = i - totalProgress;
          const angleDeg = diff * spacing;
          const angleRad = angleDeg * (Math.PI / 180);

          const x = centerXOffset + Math.cos(angleRad) * radius - 48;
          const y = startY + Math.sin(angleRad) * radius;

          const dist = Math.abs(angleDeg);
          const opacity = Math.max(0.5, 1 - dist / 80);

          const blurAmount = Math.min(dist / 30, 1.5);
          const brightness = Math.max(0.8, 1 - dist / 150);

          gsap.set(item, {
            x: x,
            y: y,
            yPercent: -50,
            rotation: angleDeg,
            opacity: opacity,
            filter: `blur(${blurAmount}px) brightness(${brightness})`,
            zIndex: 100 - Math.round(dist),
          });
        });
      }

      if (prophecyListRef.current && projects.length > 1) {
        const progressObj = { value: 0 };

        gsap.to(progressObj, {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            refreshPriority: 100,
          },
          onUpdate: () => {
            const p = progressObj.value;
            const index = Math.min(Math.floor(p * projects.length), projects.length - 1);
            setActiveIndex(index);
            if (prophecyListRef.current && prophecyListRef.current.parentElement) {
              const totalDist =
                prophecyListRef.current.scrollHeight -
                prophecyListRef.current.parentElement.clientHeight;
              gsap.set(prophecyListRef.current, { y: -p * totalDist });
            }

            const items = sectionRef.current?.querySelectorAll(".sidebar-item");
            if (items) {
              const radius = dimensions.height * 0.55;
              const startY = dimensions.height * 0.45;
              const centerXOffset = -radius + 140;
              const spacing = 32;
              const totalProgress = p * (projects.length - 1);

              items.forEach((item, i) => {
                const diff = i - totalProgress;
                const angleDeg = diff * spacing;
                const angleRad = angleDeg * (Math.PI / 180);

                const x = centerXOffset + Math.cos(angleRad) * radius - 48;
                const y = startY + Math.sin(angleRad) * radius;

                const dist = Math.abs(angleDeg);
                const opacity = Math.max(0.5, 1 - dist / 80);

                const blurAmount = Math.min(dist / 30, 1.5);
                const brightness = Math.max(0.8, 1 - dist / 150);

                gsap.set(item, {
                  x: x,
                  y: y,
                  yPercent: -50,
                  rotation: angleDeg,
                  opacity: opacity,
                  filter: `blur(${blurAmount}px) brightness(${brightness})`,
                  zIndex: 100 - Math.round(dist),
                });
              });
            }
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [projects.length, dimensions] }
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
    <section ref={sectionRef} id="craftings" className="relative w-full min-h-screen text-white">
      <div ref={backgroundRef} className="absolute inset-0 z-0 bg-black" />
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent opacity-100" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 via-blue-700/30 to-transparent opacity-0"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, transparent 0%, rgba(59,130,246,0.1) 30%, rgba(29,78,216,0.2) 60%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-cyan-500/10 opacity-0 blur-2xl" />
      </div>

      <BackgroundLayers projects={projects} activeIndex={activeIndex} />

      <div className="w-full relative z-20">
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
        <div ref={gridRef} className="h-screen w-full flex overflow-hidden relative z-20 min-h-0">
          <div className="absolute inset-0 z-0">
            <StarField />
          </div>
          <OrbitalSystem
            ref={orbitalRef}
            projects={projects}
            activeIndex={activeIndex}
            dimensions={dimensions}
          />

          <div className="flex-1 h-full relative overflow-hidden">
            <div ref={prophecyListRef} className="w-full will-change-transform">
              {projects.map((p, i) => (
                <ProphecyCard key={p._id || i} project={p} index={i} activeIndex={activeIndex} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
