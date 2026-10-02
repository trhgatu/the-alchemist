"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { usePublicProjects } from "../hooks";
import { ArchiveGround } from "../components/ArchiveGround";
import { WorkPlate } from "../components/WorkPlate";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

      gsap.utils.toArray<HTMLElement>(".plate").forEach((plate) => {
        gsap.from(plate, {
          y: 60,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: plate, start: "top 85%" },
        });
      });
    },
    { scope, dependencies: [projects.length, lang], revertOnUpdate: true }
  );

  return (
    <ArchiveGround>
      <div ref={scope} className="mx-auto max-w-7xl px-6 md:px-12">
        <header className="pt-40 pb-20 md:pt-52 md:pb-28">
          <h1 className="intro-line font-kings text-6xl md:text-8xl leading-[0.95] text-[#f3ead8]">
            {t.title}
          </h1>
        </header>

        {isLoading && (
          <p className="font-playfair-display italic text-[#8a7e69]">
            {translations[lang].common.loading}
          </p>
        )}
        {isError && (
          <p className="font-playfair-display italic text-amber-300/90">
            {translations[lang].common.error}
          </p>
        )}

        <div className="space-y-28 md:space-y-40">
          {projects.map((project) => (
            <WorkPlate key={project._id} project={project} />
          ))}
        </div>

        <div className="h-40 md:h-56" />
      </div>
    </ArchiveGround>
  );
}
