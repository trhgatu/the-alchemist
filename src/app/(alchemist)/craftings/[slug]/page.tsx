"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { translations } from "@/constants/translations";
import { usePublicProjects } from "@/features/alchemist/craftings/hooks";
import { ArchiveGround } from "@/features/alchemist/craftings/components/ArchiveGround";
import { LINK, projectMeta } from "@/features/alchemist/craftings/utils/format";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CraftingDetailPage() {
  const { slug } = useParams() as { slug: string };
  const scope = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].craftingsPage;
  const { transitionTo } = useTransitionRouter();
  const { data: projects = [], isLoading } = usePublicProjects(lang);

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;
  const cover = project?.thumbnail ?? project?.images?.[0];
  const figures = (project?.images ?? []).filter((src) => src !== cover);

  useGSAP(
    () => {
      if (!project) return;
      gsap.from(".reveal", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.utils.toArray<HTMLElement>(".figure").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope, dependencies: [project?._id, lang], revertOnUpdate: true }
  );

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <ArchiveGround>
      <div ref={scope} className="mx-auto max-w-7xl px-6 md:px-12 pt-32 md:pt-40">
        <Link
          href="/craftings"
          onClick={go("/craftings")}
          className="font-garamond italic text-sm text-[#a39680] hover:text-amber-200 transition-colors"
        >
          {t.back}
        </Link>

        {isLoading && (
          <p className="mt-24 font-garamond italic text-[#8a7e69]">
            {translations[lang].common.loading}
          </p>
        )}

        {!isLoading && !project && (
          <p className="mt-24 pb-40 font-garamond italic text-xl text-[#c8bca5]">{t.notFound}</p>
        )}

        {project && (
          <>
            <h1 className="reveal mt-12 md:mt-16 font-garamond italic text-5xl md:text-7xl lg:text-8xl leading-none text-[#f3ead8]">
              {project.name}
            </h1>

            {cover && (
              <div className="reveal relative mt-12 md:mt-16 aspect-video overflow-hidden bg-neutral-900">
                <Image
                  src={cover}
                  alt={project.name}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}

            <section className="mt-14 md:mt-20 max-w-3xl">
              <p className="font-garamond text-xl md:text-2xl leading-[1.7] text-[#e9dfcc]">
                {project.description}
              </p>
              <p className="mt-6 text-sm text-[#8a7e69]">{projectMeta(project, t.states)}</p>
              {project.tech && project.tech.length > 0 && (
                <p className="mt-2 text-sm text-[#8a7e69]">
                  {project.tech.map((x) => x.name).join(", ")}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-garamond italic text-lg">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {t.visit}
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {t.source}
                  </a>
                )}
              </div>
            </section>

            {figures.length > 0 && (
              <section className="mt-28 md:mt-40 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
                {figures.map((src, i) => (
                  <div
                    key={src}
                    className="figure relative aspect-4/3 overflow-hidden bg-neutral-900"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </section>
            )}

            {next && next.slug !== project.slug && (
              <nav className="mt-32 md:mt-48 border-t border-amber-200/10 py-16 md:py-24">
                <p className="text-sm text-[#8a7e69]">{t.next}</p>
                <a
                  href={`/craftings/${next.slug}`}
                  onClick={go(`/craftings/${next.slug}`)}
                  className="mt-3 inline-block font-garamond italic text-5xl md:text-7xl text-[#f3ead8] hover:text-amber-200 transition-colors"
                >
                  {next.name}
                </a>
              </nav>
            )}
          </>
        )}
      </div>
    </ArchiveGround>
  );
}
