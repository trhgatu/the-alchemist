"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types";
import { BackgroundLayers } from "./BackgroundLayers";
import { OrbitalSystem } from "./OrbitalSystem";
import { ProphecyCard } from "./ProphecyCard";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

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
  const lang = useLang();
  const t = translations[lang].chronicles.craftings;

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

      gsap.set(backgroundRef.current, {
        backgroundColor: "transparent",
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

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Title characters ignite with deep optical defocus & scale
      entranceTl.fromTo(
        ".craftings-title span",
        { opacity: 0, y: 35, filter: "blur(16px)", scale: 1.15 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.035,
          duration: 1.2,
          ease: "power2.out",
        }
      );

      // 3. Astrolabe golden divider expands from center
      entranceTl.fromTo(
        ".craftings-divider",
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 1.0, ease: "power2.inOut" },
        "-=0.7"
      );
      entranceTl.fromTo(
        ".craftings-divider-star",
        { rotation: -180, scale: 0 },
        { rotation: 0, scale: 1, duration: 0.9, ease: "back.out(1.7)" },
        "<"
      );

      // 4. Poetic Lore desc softly manifests
      entranceTl.fromTo(
        ".craftings-desc",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

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
            const index = Math.min(
              Math.max(0, Math.round(p * (projects.length - 1))),
              projects.length - 1
            );
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
    { scope: sectionRef, dependencies: [projects.length, dimensions, lang], revertOnUpdate: true }
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
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="font-kings text-xl text-amber-200/60 tracking-wider">
            {translations[lang].common.loading}
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative w-full h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h3 className="font-kings text-3xl text-amber-500/80">Flux Disruption</h3>
          <p className="font-garamond text-xs text-neutral-500 tracking-wider">
            {translations[lang].common.error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="craftings" className="relative w-full min-h-screen text-white">
      <div ref={backgroundRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-10 pointer-events-none" />

      <BackgroundLayers projects={projects} activeIndex={activeIndex} />

      <div className="w-full relative z-20">
        <div className="relative z-30 text-center pt-20 pb-4 md:pt-28 md:pb-8 shrink-0 flex flex-col items-center max-w-4xl mx-auto px-4">
          <h2
            key={`craftings-title-${lang}`}
            className="craftings-title text-4xl sm:text-6xl md:text-6xl lg:text-8xl font-kings tracking-wider text-white leading-none drop-shadow-[0_4px_35px_rgba(245,158,11,0.25)] mb-3"
          >
            {t.title.split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          {/* ✧ 3. Expanding Astrolabe Rule */}
          <div className="craftings-divider flex items-center justify-center gap-4 my-4 relative z-20 w-full max-w-xs opacity-0">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-amber-300" />
            <span className="craftings-divider-star text-lg text-amber-300 drop-shadow-[0_0_8px_#f59e0b] select-none">
              ✧
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-400/50 to-amber-300" />
          </div>

          {/* 📜 4. Poetic Lore Inscription in Bilbo */}
          <p
            key={`craftings-desc-${lang}`}
            className="craftings-desc font-garamond text-2xl sm:text-3xl md:text-4xl text-white/90 max-w-2xl text-center leading-relaxed tracking-wide opacity-0"
          >
            &ldquo;{t.desc}&rdquo;
          </p>
        </div>
        <div ref={gridRef} className="h-screen w-full flex overflow-hidden relative z-20 min-h-0">
          <div className="absolute inset-0 z-0">{}</div>
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
