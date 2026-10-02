"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppStore } from "@/hooks/useAppStore";
import { useProgressLoader } from "@/hooks/useProgressLoader";
import { ScenePhase } from "@/constants/ScenePhase";
import { OglTransitionOverlay, OglTransitionRef } from "./OglTransitionOverlay";

export default function LoaderWithOverlay() {
  const [ready, setReady] = useState(false);
  const count = useProgressLoader(() => setReady(true));

  const { scenePhase, setScenePhase } = useAppStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const oglRef = useRef<OglTransitionRef>(null);

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
          // Optionally hide completely here if needed
        },
      });
      tl.call(
        () => {
          setScenePhase(ScenePhase.OVERLAY_ANIMATION);
        },
        [],
        0.5
      );

      tl.to(
        contentRef.current,
        {
          duration: 1.0,
          scale: 0.95,
          opacity: 0,
          filter: "blur(15px)",
          ease: "power2.inOut",
        },
        0
      );

      const state = { p: 0 };
      tl.to(
        state,
        {
          p: 1.0,
          duration: 3.0,
          ease: "power2.inOut",
          onUpdate: () => {
            if (oglRef.current) {
              oglRef.current.setProgress(state.p);
            }
          },
        },
        0.5
      );
    } else if (ready && scenePhase === ScenePhase.LOADING) {
      setScenePhase(ScenePhase.MODEL_ENTRY);
    }
  }, [ready, scenePhase, setScenePhase, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      <OglTransitionOverlay ref={oglRef} />

      <div
        ref={contentRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      >
        <div className="relative flex flex-col items-center gap-6 mix-blend-screen">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] -rotate-90 pointer-events-none">
            <svg
              width="320"
              height="320"
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-amber-500/10"
              />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 - (count / 100) * 301.59}
                strokeLinecap="round"
                className="text-amber-400/80 transition-all duration-300 ease-out"
              />
            </svg>
          </div>

          <h2 className="font-garamond text-5xl md:text-7xl text-amber-50/90 tracking-widest blur-[0.5px] italic">
            Transmuting
          </h2>
          <div className="flex flex-col items-center gap-2">
            <span className="font-garamond text-amber-200/50 text-xs tracking-[0.4em] uppercase">
              Gathering Aether
            </span>
            <span className="font-garamond text-amber-200/80 text-xl tracking-widest">
              {count}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
