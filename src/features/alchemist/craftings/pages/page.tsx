"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { usePublicProjects } from "../hooks";
import { ArchiveGround } from "../components/ArchiveGround";
import { CraftingsIndex } from "../components/CraftingsIndex";

gsap.registerPlugin(useGSAP);

export default function CraftingsPage() {
  const scope = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].craftingsPage;
  const { data: projects = [], isLoading, isError } = usePublicProjects(lang);

  useGSAP(
    () => {
      gsap.from(".intro-line", {
        y: 24,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".index-row", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.35,
      });
    },
    { scope, dependencies: [projects.length, lang], revertOnUpdate: true }
  );

  return (
    <ArchiveGround>
      <div ref={scope} className="mx-auto max-w-7xl px-6 md:px-12">
        <header className="pt-36 pb-12 md:pt-48 md:pb-16">
          <h1 className="intro-line font-kings text-3xl md:text-4xl text-[#f3ead8]">{t.title}</h1>
        </header>

        {isLoading && (
          <p className="font-garamond italic text-[#8a7e69]">{translations[lang].common.loading}</p>
        )}
        {isError && (
          <p className="font-garamond italic text-amber-300/90">
            {translations[lang].common.error}
          </p>
        )}

        <CraftingsIndex projects={projects} />

        <div className="h-40 md:h-56" />
      </div>
    </ArchiveGround>
  );
}
