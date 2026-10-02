"use client";

import Image from "next/image";
import { Project } from "@/types";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

export const LINK =
  "underline decoration-[#e9dfcc]/30 underline-offset-[6px] hover:decoration-amber-300 hover:text-amber-200 transition-colors";

/** One-line summary: category · year · state */
export function projectMeta(project: Project, states: Record<Project["projectStatus"], string>) {
  return [project.category, project.year, states[project.projectStatus]]
    .filter(Boolean)
    .join(" · ");
}

export function WorkPlate({ project }: { project: Project }) {
  const lang = useLang();
  const t = translations[lang].craftingsPage;
  const { transitionTo } = useTransitionRouter();
  const href = `/craftings/${project.slug}`;
  const image = project.thumbnail ?? project.images?.[0];

  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <article className="plate">
      <a href={href} onClick={open} className="group block">
        <div className="relative aspect-video overflow-hidden bg-neutral-900">
          {image && (
            <Image
              src={image}
              alt={project.name}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-top transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          )}
        </div>
      </a>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
        <h2 className="md:col-span-5 font-playfair-display italic text-4xl md:text-5xl leading-[1.05] text-[#f3ead8]">
          <a href={href} onClick={open} className="hover:text-amber-200 transition-colors">
            {project.name}
          </a>
        </h2>

        <div className="md:col-span-7">
          <p className="font-playfair-display text-[17px] leading-[1.75] text-[#c8bca5]">
            {project.description}
          </p>
          <p className="mt-4 text-sm text-[#8a7e69]">{projectMeta(project, t.states)}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-block font-playfair-display italic text-base ${LINK}`}
            >
              {t.visit}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
