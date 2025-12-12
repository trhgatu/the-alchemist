"use client";

import { usePathname } from "next/navigation";

import { useEffect, useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Environment } from "@react-three/drei";
import { InfinityLoop } from "@/features/forge/home/components/InfinityLoop";
import { useAppStore } from "@/hooks/useAppStore";
import { ScenePhase } from "@/constants/ScenePhase";

gsap.registerPlugin(ScrollTrigger);

export default function InfinityLoopScene() {
  const modelRef = useRef<Group>(null);
  const pathname = usePathname();
  const { scenePhase, setScenePhase } = useAppStore();

  useEffect(() => {
    if (scenePhase !== ScenePhase.LOADING || !modelRef.current) return;

    gsap.set(modelRef.current.position, { y: 5 });

    gsap.to(modelRef.current.position, {
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      onComplete: () => {
        setScenePhase(ScenePhase.MODEL_ENTRY);
      },
    });
  }, [scenePhase, setScenePhase]);

  useEffect(() => {
    if (!modelRef.current) return;

    const loop = modelRef.current;

    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    aboutTl.to(loop.position, {
      x: "+=2",
      y: "+=1",
      duration: 3,
      ease: "power2.out",
    }).to(
      loop.scale,
      {
        x: 0.3,
        y: 0.3,
        z: 0.3,
        duration: 3,
        ease: "power2.inOut",
      },
      "<"
    );
    const techTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#tech-arsenal",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    techTl.to(loop.position, {
      x: "-=3",
      ease: "power2.inOut",
      duration: 3,
    });

    return () => {
      aboutTl.kill();
      techTl.kill();
    };
  }, [pathname]);

  return (
    <group>
      <InfinityLoop ref={modelRef} />
      <Environment
        files="/hdr/qwantani_night_puresky_2k.hdr"
        environmentIntensity={1.5}
      />
    </group>
  );
}
