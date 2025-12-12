// src/app/forge/page.tsx
'use client';

// import dynamic from 'next/dynamic';

import {
  HeroForgeEntry,
  TechArsenal,
  TheCraftings,
  TheFiresOfPassion,
  TheAlchemist,
} from '@/features/forge/home/components';
/* import { View } from '@react-three/drei';
import InfinityLoopScene from '@/features/forge/home/scenes/InfinityLoopScene'; */
import { useAppStore, useLang } from '@/hooks';
import { usePublicProjects } from '@/features/forge/craftings/hooks';
// import LoaderWithOverlay from '@/components/PreLoaderOverlay';
import { ScenePhase } from '@/constants/ScenePhase';
import ScrollVelocity from '@/features/forge/home/components/ScrollVelocity';
import { CraftingLegacies } from '@/features/forge/home/components/CraftingLegacies';
import { useGSAP } from '@gsap/react';


interface ForgeHomeProps {
  isVisited?: boolean;
}

export default function ForgeHome({ isVisited = false }: ForgeHomeProps) {
  const { scenePhase, setScenePhase } = useAppStore();
  const lang = useLang();
  const { data: project = [] } = usePublicProjects(lang);

  useGSAP(() => {
    // If visited, ensure we skip to HERO_ANIMATION immediately on client
    // Or let the store handle it if we sync state.
    // For now, if isVisited is true, we might want to ensure scenePhase is correct?
    // But since SSR won't render loader, we just need to ensure client doesn't flicker it back.
    if (typeof window !== 'undefined' && (isVisited || sessionStorage.getItem("forge_visited"))) {
      if (scenePhase === ScenePhase.LOADING) {
        setScenePhase(ScenePhase.HERO_ANIMATION);
      }
    }
  }, [setScenePhase, isVisited]);

  return (
    <section>
      {/* {!isVisited && scenePhase !== ScenePhase.HERO_ANIMATION && <LoaderWithOverlay />} */}

      <HeroForgeEntry />

      <TheAlchemist />
      <TheFiresOfPassion />
      <TechArsenal />
      <ScrollVelocity
        texts={[
          'Forging Ideas Into Reality - Code is the Fire, Imagination the Anvil - Every Bug is a Spark, Every Fix a Blade - Tempered by Challenge, Sharpened by Failure - Building Dreams One Line at a Time - The Forge Never Sleeps -',
        ]}
        velocity={80}
        className="md:text-4xl font-oldenburg text-white text-4xl border-t border-b border-white/20 py-6 italic tracking-wide"
      />
      <TheCraftings
        projects={project}
        isLoading={false}
        isError={false}
      />
      <CraftingLegacies />
    </section>
  );
}
