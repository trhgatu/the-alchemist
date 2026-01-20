// src/app/forge/page.tsx
"use client";

// import dynamic from 'next/dynamic';

import {
  HeroForgeEntry,
  TechArsenal,
  TheCraftings,
  TheLivingInk,
  TheAlchemist,
} from "@/features/forge/home/components";
/* import { View } from '@react-three/drei';
import InfinityLoopScene from '@/features/forge/home/scenes/InfinityLoopScene'; */
import { useAppStore, useLang } from "@/hooks";
import { usePublicProjects } from "@/features/forge/craftings/hooks";
// import LoaderWithOverlay from '@/components/PreLoaderOverlay';
import { ScenePhase } from "@/constants/ScenePhase";
/* import ScrollVelocity from '@/features/forge/home/components/ScrollVelocity'; */
import { CraftingLegacies } from "@/features/forge/home/components/CraftingLegacies";
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
      <TheLivingInk />
      <TechArsenal />
      <TheCraftings projects={project} isLoading={false} isError={false} />
      <CraftingLegacies />
    </section>
  );
}
