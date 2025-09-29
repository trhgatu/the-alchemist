"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";

interface InfinityCardsProps {
  items: Project[];
}

export const InfinityCards = ({ items }: InfinityCardsProps) => {
  return (
    <div className="relative w-full py-10">
      <InfiniteMovingCards
        direction="left"
        speed="slow"
        items={items.map((item) => (
          <Link
            key={item._id}
            href={`/forge/craftings/${item.slug}`}
            className="group relative flex flex-col w-72 rounded-xl border border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg hover:scale-[1.02] transition-transform p-4"
          >
            <Image
              src={item.image ?? "https://placehold.co/600x400.png"}
              alt={item.name}
              width={400}
              height={200}
              className="rounded-md w-full h-36 object-cover mb-3 border border-zinc-700 group-hover:opacity-90 transition"
            />
            <h3 className="text-lg font-bold text-orange-400 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-zinc-300 line-clamp-2">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tech?.slice(0, 3).map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded"
                >
                  {tech.name}
                </span>
              ))}
              {(item.tech?.length ?? 0) > 3 && (
                <span className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded">
                  +{(item.tech?.length ?? 0) - 3} more
                </span>
              )}
            </div>
          </Link>
        ))}
      />
    </div>
  );
};
