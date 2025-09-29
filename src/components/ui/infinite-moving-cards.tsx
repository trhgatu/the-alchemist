"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

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
    addAnimation();
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
      gsap.to(card, {
        y: 12,
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  });

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    if (!containerRef.current) return;
    if (speed === "fast") {
      containerRef.current.style.setProperty("--animation-duration", "20s");
    } else if (speed === "normal") {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    } else {
      containerRef.current.style.setProperty("--animation-duration", "80s");
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            key={item._id}
            className={cn(
              "project-card relative w-[320px] md:w-[420px] shrink-0 rounded-2xl border border-zinc-200 dark:border-zinc-700",
              "bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800",
              "shadow-xl px-6 py-5 group transition-transform duration-500 will-change-transform"
            )}
          >
            {/* cinematic glow overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />

            <Link
              href={`/forge/craftings/${item.slug}`}
              className="flex flex-col gap-3 relative z-10"
            >
              <Image
                src={item.image ?? "https://placehold.co/600x400.png"}
                alt={item.name}
                className="rounded-lg w-full h-44 object-cover border border-zinc-200 dark:border-zinc-700 group-hover:opacity-90 transition"
                width={400}
                height={176}
              />
              <h3 className="text-lg font-semibold text-orange-500 group-hover:underline">
                {item.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tech?.slice(0, 3).map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-xs rounded text-zinc-700 dark:text-zinc-200"
                  >
                    {tech.name}
                  </span>
                ))}
                {(item.tech?.length ?? 0) > 3 && (
                  <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-xs rounded text-zinc-700 dark:text-zinc-200">
                    +{(item.tech?.length ?? 0) - 3} more
                  </span>
                )}
              </div>
            </Link>

            <div className="flex gap-4 mt-4 text-xs relative z-10">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  Demo
                </a>
              )}
              {item.repo && (
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
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
