// src/app/forge/page.tsx
"use client";

import {
  HeroForgeEntry,
  // TechGrimoire,
  // TheCraftings,
  // TheTransmutation,
  // TheAlchemist,
  // TheJourney,
  ForgeAssetTracker,
} from "@/features/forge/home/components";

import { useAppStore } from "@/hooks"; // Removed unused useLang
// import { usePublicProjects } from "@/features/forge/craftings/hooks"; // Unused
import { ScenePhase } from "@/constants/ScenePhase";
import { useGSAP } from "@gsap/react";

interface ForgeHomeProps {
  isVisited?: boolean;
}

export default function ForgeHome({ isVisited = false }: ForgeHomeProps) {
  const { scenePhase, setScenePhase } = useAppStore();
  // const lang = useLang(); // Unused
  // const { data: project = [] } = usePublicProjects(lang); // Unused

  useGSAP(() => {
    if (typeof window !== "undefined" && (isVisited || sessionStorage.getItem("forge_visited"))) {
      if (scenePhase === ScenePhase.LOADING) {
        setScenePhase(ScenePhase.HERO_ANIMATION);
      }
    }
  }, [setScenePhase, isVisited]);

  return (
    <section>
      <ForgeAssetTracker />
      <HeroForgeEntry />
      {/*
        Single Page Mode Disabled.
        Now using Multi-Page "Chapters":
        /forge (Hero Portal) -> /forge/transmutation (Chap 1) -> ...
      */}
      {/* <TheTransmutation />
      <TheAlchemist />
      <TechGrimoire />
      <TheCraftings projects={project} isLoading={false} isError={false} />
      <TheJourney /> */}
    </section>
  );
}
