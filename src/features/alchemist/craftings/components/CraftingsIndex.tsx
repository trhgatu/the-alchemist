"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { projectMeta } from "../utils/format";

const FILTER_ID = "craftings-ink-reveal";
const CURSOR_GAP = 48;

/**
 * Table of contents of the works. Hovering a name summons its screenshot,
 * which follows the cursor and settles out of an ink displacement.
 */
export function CraftingsIndex({ projects }: { projects: Project[] }) {
  const lang = useLang();
  const t = translations[lang].craftingsPage;
  const { transitionTo } = useTransitionRouter();

  const [active, setActive] = useState<number | null>(null);
  // Last summoned image; kept while the preview fades out so it never shows an empty frame
  const [shown, setShown] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (!previewRef.current) return;
    gsap.set(previewRef.current, { xPercent: 0, yPercent: -50, autoAlpha: 0, scale: 0.9 });
    moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.7, ease: "power3.out" });
    moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.7, ease: "power3.out" });
  });

  const follow = (e: React.MouseEvent) => {
    moveX.current?.(e.clientX + CURSOR_GAP);
    moveY.current?.(e.clientY);
  };

  const summon = (index: number, e: React.MouseEvent) => {
    if (active === null) {
      // Appear at the cursor instead of sliding in from the last position
      gsap.set(previewRef.current, { x: e.clientX + CURSOR_GAP, y: e.clientY });
    }
    setActive(index);
    setShown(index);
    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
    dissolve();
  };

  // Ink settles: displacement eases from strong to none, then the filter is dropped
  const ink = useRef({ scale: 0 });
  const dissolve = () => {
    const preview = previewRef.current;
    const map = displacementRef.current;
    if (!preview || !map) return;
    gsap.killTweensOf(ink.current);
    preview.style.filter = `url(#${FILTER_ID})`;
    gsap.fromTo(
      ink.current,
      { scale: 120 },
      {
        scale: 0,
        duration: 1.1,
        ease: "power3.out",
        onUpdate: () => map.setAttribute("scale", String(ink.current.scale)),
        onComplete: () => {
          preview.style.filter = "none";
        },
      }
    );
  };

  const dismiss = () => {
    setActive(null);
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
      overwrite: "auto",
    });
  };

  return (
    <>
      <svg aria-hidden className="absolute h-0 w-0">
        <filter id={FILTER_ID} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <ol onMouseMove={follow} onMouseLeave={dismiss}>
        {projects.map((project, i) => {
          const href = `/craftings/${project.slug}`;
          const image = project.thumbnail ?? project.images?.[0];
          const dimmed = active !== null && active !== i;

          return (
            <li key={project._id} className="index-row">
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  transitionTo(href);
                }}
                onMouseEnter={(e) => summon(i, e)}
                className="flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-7"
              >
                <span
                  className={cn(
                    "font-garamond italic text-5xl leading-[1.05] text-[#f3ead8] transition-opacity duration-500 md:text-7xl lg:text-8xl",
                    dimmed && "opacity-20"
                  )}
                >
                  {project.name}
                </span>
                <span
                  className={cn(
                    "text-sm text-[#8a7e69] transition-opacity duration-500 md:shrink-0",
                    dimmed && "opacity-30"
                  )}
                >
                  {projectMeta(project, t.states)}
                </span>
              </a>

              {/* Touch screens have no hover, so show the image inline */}
              {image && (
                <div className="relative mb-12 aspect-video overflow-hidden bg-neutral-900 md:hidden">
                  <Image
                    src={image}
                    alt={project.name}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[440px] md:block"
      >
        <div className="relative aspect-video overflow-hidden bg-neutral-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          {projects.map((project, i) => {
            const image = project.thumbnail ?? project.images?.[0];
            if (!image) return null;
            return (
              <Image
                key={project._id}
                src={image}
                alt=""
                fill
                sizes="440px"
                className={cn(
                  "object-cover object-top transition-opacity duration-300",
                  shown === i ? "opacity-100" : "opacity-0"
                )}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
