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
    <div className="w-full flex items-start px-6 py-10 md:min-h-screen md:items-center md:py-0 md:pr-12 md:pl-8">
      <div
        className={`flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 transition-opacity duration-700 ${
          isActive ? "opacity-100" : "opacity-20 pointer-events-none"
        }`}
      >
        <div className="lg:w-[34%] lg:shrink-0">
          {p.year && <p className="text-xl md:text-2xl text-neutral-500 italic">{p.year}</p>}
          <h2 className="mt-2 font-garamond italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
            <Link href={`/craftings/${p.slug}`} className="hover:text-amber-200 transition-colors">
              {p.name}
            </Link>
          </h2>
          <p className="mt-6 font-garamond text-lg sm:text-xl md:text-2xl leading-relaxed text-white/70">
            {p.description}
          </p>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block font-garamond text-lg text-neutral-300 hover:text-amber-200 transition-colors"
            >
              {t.visitSite}
            </a>
          )}
        </div>
        <Link
          href={`/craftings/${p.slug}`}
          className="order-first block w-full min-w-0 lg:order-none lg:flex-1 lg:max-w-[calc((100vh-160px)*16/10)]"
        >
          <MasterpieceCanvas project={p} />
        </Link>
      </div>
    </div>
  );
}
