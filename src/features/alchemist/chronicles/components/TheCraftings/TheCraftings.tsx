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
import { getLenis } from "@/lib/lenis";

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
  // Fractional index of the work in front; the flame stars read it every frame
  const orbitProgressRef = useRef(0);
  // The pinned scroll that walks the works, so a fire can be clicked to its work
  const walkRef = useRef<ScrollTrigger | null>(null);
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
        { opacity: 0, y: 35, scale: 1.15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.035,
          duration: 1.2,
          ease: "power2.out",
        }
      );

      // 3. Astrolabe golden divider expands from center

      // 4. Poetic Lore desc softly manifests
      entranceTl.fromTo(
        ".craftings-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

      if (prophecyListRef.current && projects.length > 1) {
        const progressObj = { value: 0 };

        const walk = gsap.to(progressObj, {
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
            orbitProgressRef.current = p * (projects.length - 1);
          },
        });
        walkRef.current = walk.scrollTrigger ?? null;
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

  // Scroll the pinned walk to work `i`
  const showWork = (i: number) => {
    const st = walkRef.current;
    if (!st || projects.length < 2) return;
    const y = st.start + ((st.end - st.start) * i) / (projects.length - 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

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

          {/* 📜 4. Poetic Lore Inscription in Bilbo */}
          <p
            key={`craftings-desc-${lang}`}
            className="craftings-desc font-garamond text-2xl sm:text-3xl md:text-4xl text-white/90 max-w-2xl text-center leading-relaxed tracking-wide opacity-0"
          >
            {t.desc}
          </p>
        </div>
        <div ref={gridRef} className="h-screen w-full flex overflow-hidden relative z-20 min-h-0">
          <div className="absolute inset-0 z-0">{}</div>
          <OrbitalSystem
            ref={orbitalRef}
            projects={projects}
            progressRef={orbitProgressRef}
            onSelect={showWork}
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
