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

/**
 * Render the Forge home page and trigger the hero animation phase for returning visitors.
 *
 * When mounted in a browser, if the caller indicates the user has visited before (via the
 * `isVisited` prop) or a `forge_visited` flag exists in sessionStorage, the component advances
 * the app scene phase from `ScenePhase.LOADING` to `ScenePhase.HERO_ANIMATION`.
 *
 * @param isVisited - Optional flag indicating the user has previously visited the Forge; when true, the component will attempt to advance the scene phase on mount
 * @returns The Forge home page element containing the asset tracker and hero entry components
 */
export default function ForgeHome({ isVisited = false }: ForgeHomeProps) {
  const { scenePhase, setScenePhase } = useAppStore();
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
    </section>
  );
}
