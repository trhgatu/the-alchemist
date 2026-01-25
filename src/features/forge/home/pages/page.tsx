// src/app/forge/page.tsx
"use client";

import {
  HeroForgeEntry,
  TechArsenal,
  TheCraftings,
  TheTransmutation,
  TheAlchemist,
  TheJourney,
} from "@/features/forge/home/components";

import { useAppStore, useLang } from "@/hooks";
import { usePublicProjects } from "@/features/forge/craftings/hooks";
import { ScenePhase } from "@/constants/ScenePhase";
import { useGSAP } from "@gsap/react";

interface ForgeHomeProps {
  isVisited?: boolean;
}

export default function ForgeHome({ isVisited = false }: ForgeHomeProps) {
  const { scenePhase, setScenePhase } = useAppStore();
  const lang = useLang();
  const { data: project = [] } = usePublicProjects(lang);

  useGSAP(() => {
    if (typeof window !== "undefined" && (isVisited || sessionStorage.getItem("forge_visited"))) {
      if (scenePhase === ScenePhase.LOADING) {
        setScenePhase(ScenePhase.HERO_ANIMATION);
      }
    }
  }, [setScenePhase, isVisited]);

  return (
    <section>
      <HeroForgeEntry />
      <TheAlchemist />
      <TheTransmutation />
      <TechArsenal />
      <TheCraftings projects={project} isLoading={false} isError={false} />
      <TheJourney />
    </section>
  );
}
