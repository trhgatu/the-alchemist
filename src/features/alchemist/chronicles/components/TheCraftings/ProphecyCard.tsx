import { useRef } from "react";
import { Project } from "@/types";
import Link from "next/link";
import { MasterpieceCanvas } from "./components/MasterpieceCanvas";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

interface ProphecyCardProps {
  project: Project;
  index: number;
  activeIndex: number;
}

export function ProphecyCard({ project: p, index: i, activeIndex }: ProphecyCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = i === activeIndex;
  const lang = useLang();
  const t = translations[lang].chronicles.craftings;

  return (
    <div className="min-h-screen w-full flex flex-col justify-center pr-4 md:pr-16 pl-2 md:pl-8 py-8">
      {/* 🌌 Borderless Spatial Project Showcase */}
      <div
        ref={containerRef}
        className={`relative w-full transition-all duration-700 ease-out transform-gpu flex flex-col justify-center
                   ${
                     isActive
                       ? "translate-x-0 opacity-100 scale-100 filter-none pointer-events-auto"
                       : "translate-x-8 opacity-25 scale-[0.96] blur-[0.5px] grayscale-[30%] pointer-events-none"
                   }`}
      >
        {/* 🌟 1. Top Horizon: Category & Year Inscription */}
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-amber-500/15 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="font-garamond text-xs tracking-[0.25em] uppercase text-amber-300 font-medium">
              {p.category || "PROJECT"}
            </span>
            {p.year && (
              <>
                <span className="text-neutral-600 text-xs">•</span>
                <span className="font-garamond text-xs tracking-wider text-neutral-400">
                  {p.year}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 👑 2. Majestic Monumental Display Title */}
        <h2 className="font-kings text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-wide mb-8 drop-shadow-[0_4px_35px_rgba(245,158,11,0.2)]">
          {p.name}
        </h2>

        {/* 🏛️ 3. Main Stage: Split Layout (Lore on Left, Gilded Masterpiece Folio on Right) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">
          {/* Left: Lore & Signature Action Link */}
          <div className="flex-1 flex flex-col justify-between max-w-xl">
            {/* Narrative Quote */}
            <div className="font-garamond italic text-xl md:text-2xl lg:text-[1.75rem] leading-relaxed text-white/90 mb-10">
              <p>&ldquo;{p.description}&rdquo;</p>
            </div>

            {/* Signature Artisanal Editorial Action Links */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4">
              <Link
                href={`/craftings/${p.slug}`}
                className="group/link relative inline-flex items-center gap-2 py-1.5 text-amber-300 hover:text-amber-200 transition-colors duration-300 whitespace-nowrap"
              >
                <span className="font-garamond italic text-base sm:text-lg tracking-wide text-amber-300 group-hover/link:text-amber-200">
                  {t.examineChronicle}
                </span>
                <span className="text-base text-amber-400 group-hover/link:translate-x-1.5 transition-transform duration-300">
                  ⟶
                </span>

                {/* Gilded Underline Rule */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-400/80 via-amber-400/40 to-transparent group-hover/link:from-amber-300 group-hover/link:via-amber-300/80 group-hover/link:to-amber-300/20 transition-all duration-300" />
              </Link>

              {p.link && (
                <Link
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live relative inline-flex items-center gap-1.5 py-1.5 text-neutral-400 hover:text-amber-300 transition-colors duration-300 whitespace-nowrap"
                >
                  <span className="font-garamond italic text-sm sm:text-base tracking-wide">
                    {t.liveManifestation}
                  </span>
                  <span className="text-sm text-amber-500/70 group-hover/live:text-amber-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-all duration-300">
                    ↗
                  </span>

                  {/* Subtle Underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 group-hover/live:w-full h-[1px] bg-amber-400/50 transition-all duration-300" />
                </Link>
              )}
            </div>
          </div>

          {/* Right: The Gilded Obsidian Masterpiece Folio */}
          <div className="w-full lg:w-[480px] shrink-0 flex items-center justify-center">
            <MasterpieceCanvas project={p} index={i} isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
