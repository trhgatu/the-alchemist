"use client";

import { TechGrimoire, TheCraftings, TheJourney } from "@/features/forge/home/components";
import { usePublicProjects } from "@/features/forge/craftings/hooks";
import { useLang } from "@/hooks";
import { useEffect } from "react";

/**
 * Render the Grimoire page composed of tech, craftings, and journey sections.
 *
 * Scrolls the window to the top on mount and passes fetched public projects to TheCraftings component.
 *
 * @returns A main element containing TechGrimoire, TheCraftings (with fetched `project` data), and TheJourney.
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
