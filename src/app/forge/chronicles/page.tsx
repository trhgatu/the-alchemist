"use client";

import { TechGrimoire, TheCraftings, TheJourney } from "@/features/forge/home/components";
import { usePublicProjects } from "@/features/forge/craftings/hooks";
import { useLang } from "@/hooks";
import { useEffect } from "react";

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
