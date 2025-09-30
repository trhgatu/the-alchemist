"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TechIcon } from "@/components/shared/TechIcon";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Project[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    if (scrollerRef.current.children.length <= scrollerContent.length) {
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
    }

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    );

    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            key={item._id}
            className="relative w-[320px] md:w-[400px] shrink-0 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 shadow-lg px-5 py-4"
          >
            <Link href={`/forge/craftings/${item.slug}`} className="group block">
              <Image
                src={
                  item.thumbnail ??
                  item.images?.[0] ??
                  "https://placehold.co/600x400.png"
                }
                alt={item.name}
                width={400}
                height={200}
                className="rounded-md w-full h-36 object-cover mb-3 border border-zinc-200 dark:border-zinc-700 group-hover:opacity-90 transition"
              />

              {/* Extra images preview */}
              {item.images && item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto mb-3">
                  {item.images.slice(1, 4).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`${item.name} screenshot ${idx}`}
                      width={80}
                      height={50}
                      className="rounded-md border border-zinc-200 dark:border-zinc-700 object-cover"
                    />
                  ))}
                </div>
              )}

              <h3 className="text-lg font-semibold text-orange-500 group-hover:underline">
                {item.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                {item.description}
              </p>

              {/* Tech stack with icons */}
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                {item.tech?.slice(0, 4).map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-1 px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-xs rounded text-zinc-700 dark:text-zinc-200"
                  >
                    <TechIcon name={tech.name} size={14} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </Link>

            <div className="flex gap-4 mt-3 text-xs">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="text-orange-500 hover:underline"
                >
                  Demo
                </a>
              )}
              {item.repo && (
                <a
                  href={item.repo}
                  target="_blank"
                  className="text-zinc-500 hover:underline"
                >
                  Code
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
