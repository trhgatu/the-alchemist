"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCardsSkeleton = ({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6 animate-scroll">
        {Array.from({ length: count }).map((_, i) => (
          <li
            key={i}
            className="w-[320px] md:w-[400px] shrink-0 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-lg px-5 py-4 animate-pulse"
          >
            <div className="w-full h-36 bg-zinc-300 dark:bg-zinc-700 rounded-md mb-3" />

            <div className="flex gap-2 mb-3 overflow-x-auto">
              <div className="w-20 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
              <div className="w-20 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
              <div className="w-20 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
            </div>

            <div className="h-5 w-1/2 bg-orange-200 dark:bg-orange-900 rounded mb-2" />
            <div className="h-3 w-full bg-zinc-300 dark:bg-zinc-700 rounded mb-2" />
            <div className="h-3 w-4/5 bg-zinc-300 dark:bg-zinc-700 rounded mb-2" />

            <div className="flex gap-2 mt-3 flex-wrap">
              <div className="h-4 w-16 bg-zinc-400 dark:bg-zinc-600 rounded" />
              <div className="h-4 w-12 bg-zinc-400 dark:bg-zinc-600 rounded" />
              <div className="h-4 w-20 bg-zinc-400 dark:bg-zinc-600 rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
