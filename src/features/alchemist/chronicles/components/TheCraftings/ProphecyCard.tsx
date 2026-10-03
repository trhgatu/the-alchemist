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
  const isActive = i === activeIndex;
  const lang = useLang();
  const t = translations[lang].chronicles.craftings;

  return (
    <div className="min-h-screen w-full flex items-center pr-6 md:pr-16 pl-4 md:pl-10">
      <div
        className={`flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 transition-opacity duration-700 ${
          isActive ? "opacity-100" : "opacity-20 pointer-events-none"
        }`}
      >
        <div className="lg:w-[40%] lg:shrink-0">
          {p.year && <p className="text-base text-neutral-500">{p.year}</p>}
          <h2 className="mt-2 font-garamond italic text-5xl leading-tight text-white">
            <Link href={`/craftings/${p.slug}`} className="hover:text-amber-200 transition-colors">
              {p.name}
            </Link>
          </h2>
          <p className="mt-5 font-garamond text-xl leading-relaxed text-white/70">
            {p.description}
          </p>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block font-garamond text-base text-neutral-400 hover:text-amber-200 transition-colors"
            >
              {t.liveManifestation}
            </a>
          )}
        </div>
        <Link
          href={`/craftings/${p.slug}`}
          className="block w-full min-w-0 lg:flex-1 lg:max-w-[calc((100vh-200px)*16/9)]"
        >
          <MasterpieceCanvas project={p} />
        </Link>
      </div>
    </div>
  );
}
