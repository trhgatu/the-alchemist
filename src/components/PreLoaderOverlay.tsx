// PreLoaderOverlay.tsx
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

  useEffect(() => {
    if (!ready || scenePhase !== ScenePhase.MODEL_ENTRY) return;
    console.log("🎯 Overlay animation triggered");
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        setScenePhase(ScenePhase.OVERLAY_ANIMATION);
      },
    });

    tl.to(countRef.current, { autoAlpha: 0, duration: 1 }, 0);
    tl.set(leftRef.current, { borderRightColor: "#ffffff" }, 0.2);
    tl.set(rightRef.current, { borderLeftColor: "#ffffff" }, 0.2);
    tl.to(leftRef.current, { xPercent: -100, duration: 2 }, 0.3);
    tl.to(rightRef.current, { xPercent: 100, duration: 2 }, 0.3);
  }, [ready, scenePhase, setScenePhase]);

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
