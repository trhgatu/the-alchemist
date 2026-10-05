"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { translations } from "@/constants/translations";
import { usePublicProjects } from "@/features/alchemist/craftings/hooks";
import { ArchiveGround } from "@/features/alchemist/craftings/components/ArchiveGround";
import { LINK } from "@/features/alchemist/craftings/utils/format";
import { MistFrame } from "@/features/alchemist/shared/effects/MistFrame";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CENTER: [number, number] = [0.5, 0.5];

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
  const nextCover = next?.thumbnail ?? next?.images?.[0];

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
      gsap.utils.toArray<HTMLElement>(".rise").forEach((el) => {
        gsap.from(el, {
          y: 60,
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

  const ledger = project
    ? [
        { label: t.labels.year, value: project.year },
        { label: t.labels.discipline, value: project.category },
        { label: t.labels.state, value: t.states[project.projectStatus] },
      ].filter((row) => row.value)
    : [];

  return (
    <ArchiveGround>
      <div ref={scope} className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-36">
        <Link
          href="/craftings"
          onClick={go("/craftings")}
          className="font-garamond text-base italic text-[#a39680] transition-colors hover:text-amber-200"
        >
          ← {t.back}
        </Link>

        {isLoading && (
          <p className="mt-24 font-garamond italic text-[#8a7e69]">
            {translations[lang].common.loading}
          </p>
        )}

        {!isLoading && !project && (
          <p className="mt-24 pb-40 font-garamond text-xl italic text-[#c8bca5]">{t.notFound}</p>
        )}

        {project && (
          <>
            {/* Title */}
            <header className="mt-14 text-center md:mt-16">
              <p className="reveal font-garamond text-base italic text-[#a39680]">
                {[project.year, project.category].filter(Boolean).join(" · ")}
              </p>
              <h1 className="reveal mt-4 font-garamond text-6xl italic leading-none text-[#f3ead8] md:text-8xl lg:text-9xl">
                {project.name}
              </h1>
            </header>

            {/* The work itself, held in the same mist as on the chronicle */}
            {cover && (
              <div className="reveal mx-auto mt-10 max-w-6xl md:mt-14">
                <MistFrame src={cover} alt={project.name} />
              </div>
            )}

            {/* Folio: the account of the work, and its ledger */}
            <section className="mt-16 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
              <div className="rise md:col-span-7">
                <p className="font-garamond text-2xl leading-[1.6] text-[#e9dfcc] md:text-3xl">
                  {project.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-garamond text-xl italic">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK}
                    >
                      {t.visit}
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK}
                    >
                      {t.source}
                    </a>
                  )}
                </div>
                {project.credit && (
                  <p className="mt-8 font-garamond text-base italic text-[#8a7e69]">
                    {project.credit}
                  </p>
                )}
              </div>

              <dl className="rise font-garamond text-lg md:col-span-4 md:col-start-9">
                {ledger.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-t border-[#e9dfcc]/10 py-3"
                  >
                    <dt className="text-base italic text-[#8a7e69]">{row.label}</dt>
                    <dd className="text-right text-[#e9dfcc]">{row.value}</dd>
                  </div>
                ))}
                {project.tech && project.tech.length > 0 && (
                  <div className="border-y border-[#e9dfcc]/10 py-3">
                    <dt className="text-base italic text-[#8a7e69]">{t.labels.materials}</dt>
                    <dd className="mt-2 space-y-1 text-[#c8bca5]">
                      {project.tech.map((x) => (
                        <p key={x.name}>{x.name}</p>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            {/* Further plates, staggered like loose prints */}
            {figures.length > 0 && (
              <section className="mt-28 grid grid-cols-1 gap-12 md:mt-40 md:grid-cols-12 md:gap-8">
                {figures.map((src, i) => (
                  <div
                    key={src}
                    className={
                      i % 2 === 0
                        ? "rise md:col-span-7"
                        : "rise md:col-span-5 md:col-start-8 md:mt-40"
                    }
                  >
                    <MistFrame
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      focus={CENTER}
                      className="aspect-4/3"
                    />
                  </div>
                ))}
              </section>
            )}

            {/* The next work */}
            {next && next.slug !== project.slug && (
              <a
                href={`/craftings/${next.slug}`}
                onClick={go(`/craftings/${next.slug}`)}
                className="group mt-36 grid grid-cols-1 items-center gap-10 border-t border-[#e9dfcc]/10 py-20 md:mt-48 md:grid-cols-12 md:py-28"
              >
                <div className="md:col-span-6">
                  <p className="font-garamond text-lg italic text-[#8a7e69]">{t.next}</p>
                  <p className="mt-3 font-garamond text-6xl italic leading-none text-[#f3ead8] transition-colors duration-500 group-hover:text-amber-200 md:text-8xl">
                    {next.name}
                  </p>
                </div>
                {nextCover && (
                  <div className="opacity-60 transition-opacity duration-700 group-hover:opacity-100 md:col-span-5 md:col-start-8">
                    <MistFrame src={nextCover} alt={next.name} />
                  </div>
                )}
              </a>
            )}
          </>
        )}
      </div>
    </ArchiveGround>
  );
}
