// src/app/forge/page.tsx
'use client';

import {
  HeroForgeEntry,
  TechArsenal,
  TheCraftings,
  TheFiresOfPassion,
  TheAlchemist,
} from '@/features/forge/home/components';
import { View } from '@react-three/drei';
import InfinityLoopScene from '@/features/forge/home/scenes/InfinityLoopScene';
import { useAppStore, useLang } from '@/hooks';
import { usePublicProjects } from '@/features/forge/craftings/hooks';
import LoaderWithOverlay from '@/components/PreLoaderOverlay';
import { ScenePhase } from '@/constants/ScenePhase';
import ScrollVelocity from '@/features/forge/home/components/ScrollVelocity';
import { CraftingLegacies } from '@/features/forge/home/components/CraftingLegacies';

export default function ForgeHome() {
  const { scenePhase } = useAppStore();
  const lang = useLang();
  const { data: project = [] } = usePublicProjects(lang);

  return (
    <section>
      {scenePhase !== ScenePhase.HERO_ANIMATION && <LoaderWithOverlay />}
      <View className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none">
        <InfinityLoopScene />
      </View>
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
