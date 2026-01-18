"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppStore } from "@/hooks/useAppStore";
import { useProgressLoader } from "@/hooks/useProgressLoader";
import { ScenePhase } from "@/constants/ScenePhase";

export default function LoaderWithOverlay() {
  const [ready, setReady] = useState(false);
  const count = useProgressLoader(() => setReady(true));

  const { scenePhase, setScenePhase } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  // Persistence Check
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("forge_visited");
    if (visited) {
      setShouldRender(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    if (ready && scenePhase === ScenePhase.MODEL_ENTRY) {
      const tl = gsap.timeline({
        onComplete: () => {

          document.cookie = "forge_visited=true; path=/; max-age=31536000";
          sessionStorage.setItem("forge_visited", "true");
        },
      });
      tl.call(() => {
        setScenePhase(ScenePhase.OVERLAY_ANIMATION);
      }, [], 0.5);

      tl.to(contentRef.current, {
        duration: 1.2,
        scale: 0.9,
        opacity: 0,
        filter: "blur(15px)",
        ease: "power2.inOut",
      }, 0);

      tl.fromTo(shockwaveRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 4,
          opacity: 0.4,
          duration: 2.5,
          ease: "power2.out"
        },
        0.5
      );

      const state = { p: 0 };
      tl.to(state, {
        p: 150,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {

          if (containerRef.current) {
            const v = state.p;
            const mask = `radial-gradient(circle at center, transparent ${v}%, black ${v + 30}%)`;
            containerRef.current.style.maskImage = mask;
            containerRef.current.style.webkitMaskImage = mask;
          }
        }
      }, 0.8);

    } else if (ready && scenePhase === ScenePhase.LOADING) {
      setScenePhase(ScenePhase.MODEL_ENTRY);
    }
  }, [ready, scenePhase, setScenePhase, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="ink-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="fixed inset-0 z-[9998] bg-[#050608] pointer-events-none overflow-hidden"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 0%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 0%)',
          filter: 'url(#ink-bleed)'
        }}
      >
        <div className="absolute inset-0 bg-radial-gradient from-[#1a202c] via-[#050608] to-[#050608] opacity-60" />

        <div
          ref={shockwaveRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-blue-100/20 blur-[60px] opacity-0 mix-blend-overlay"
        />
      </div>

      <div
        ref={contentRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute border border-blue-50/10 rounded-full animate-ripple"
              style={{
                width: '300px',
                height: '300px',
                animationDelay: `${i * 1.5}s`,
                animationDuration: '6s',
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center gap-6 mix-blend-screen">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] -rotate-90 pointer-events-none">
            <svg width="320" height="320" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(200,230,255,0.4)]">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="301.59" strokeDashoffset={301.59 - (count / 100) * 301.59} strokeLinecap="round" className="text-blue-50 transition-all duration-300 ease-out" />
            </svg>
          </div>

          <h2 className="font-beau-rivage text-5xl md:text-7xl text-blue-100/90 tracking-wider blur-[0.5px]">
            Flowing
          </h2>
          <div className="flex flex-col items-center gap-2">
            <span className="font-space-mono text-blue-200/50 text-xs tracking-[0.3em] uppercase">Gathering Essence</span>
            <span className="font-oldenburg text-blue-50 text-xl tracking-widest">{count}%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
            @keyframes ripple {
                0% { transform: scale(0.8); opacity: 0; border-width: 2px; }
                20% { opacity: 0.5; }
                100% { transform: scale(2.5); opacity: 0; border-width: 0px; }
            }
            .animate-ripple {
                animation: ripple linear infinite;
            }
        `}</style>
    </>
  );
}
