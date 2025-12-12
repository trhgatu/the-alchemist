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
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  const isVisited = typeof window !== 'undefined' && sessionStorage.getItem("forge_visited");

  useEffect(() => {
    if (isVisited) return;

    // Original logic: wait for MODEL_ENTRY
    if (ready && scenePhase === ScenePhase.MODEL_ENTRY) {
      console.log("🎯 Overlay animation triggered");
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          setScenePhase(ScenePhase.OVERLAY_ANIMATION);
          // Set cookie for server-side check
          document.cookie = "forge_visited=true; path=/; max-age=31536000"; // 1 year
          sessionStorage.setItem("forge_visited", "true");
        },
      });

      tl.to(countRef.current, { autoAlpha: 0, duration: 1 }, 0);
      tl.set(leftRef.current, { borderRightColor: "#ffffff" }, 0.2);
      tl.set(rightRef.current, { borderLeftColor: "#ffffff" }, 0.2);
      tl.to(leftRef.current, { xPercent: -100, duration: 2 }, 0.3);
      tl.to(rightRef.current, { xPercent: 100, duration: 2 }, 0.3);
    }
    // New logic: if ready and still in LOADING (which means no model triggered MODEL_ENTRY),
    // we should trigger it ourselves.
    else if (ready && scenePhase === ScenePhase.LOADING) {
      // Since the 3D model is gone, we can skip MODEL_ENTRY or transition to it.
      // Let's transition to MODEL_ENTRY so the above effect picks it up,
      // or just run the animation directly?
      // If we set to MODEL_ENTRY, the above effect will run in the next render cycle.
      setScenePhase(ScenePhase.MODEL_ENTRY);
    }
  }, [ready, scenePhase, setScenePhase, isVisited]);

  if (isVisited) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black z-[9998] border-r border-transparent"
      />
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black z-[9998] border-l border-transparent"
      />
      <div
        ref={countRef}
        className="absolute inset-0 z-[9999] flex flex-col items-center justify-center text-white text-7xl font-mono gap-4"
      >
        <span className="text-base tracking-widest font-light text-gray-300 uppercase">
          loading
        </span>
        <span>{count}%</span>
      </div>
    </div>
  );
}
