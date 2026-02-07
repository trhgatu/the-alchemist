"use client";

import { TechGrimoire, TheCraftings, TheJourney } from "@/features/forge/home/components";
import { usePublicProjects } from "@/features/forge/craftings/hooks";
import { useLang } from "@/hooks";
import { useEffect } from "react";

/**
 * Page component that renders the Grimoire home sections and ensures the viewport is at the top on mount.
 *
 * Renders the tech overview, a craftings list populated from public projects, and the journey section. On mount it scrolls the window to coordinates (0, 0).
 *
 * @returns The page's root JSX element containing the Grimoire sections.
 */
export default function GrimoirePage() {
  const lang = useLang();
  const { data: project = [] } = usePublicProjects(lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-neutral-950 min-h-screen">
      <TechGrimoire />
      <TheCraftings projects={project} isLoading={false} isError={false} />
      <TheJourney />
    </main>
  );
}