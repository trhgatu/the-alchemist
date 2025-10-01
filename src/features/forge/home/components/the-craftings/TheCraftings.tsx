'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { GridCardsSkeleton } from '../skeletons';
import { Project } from '@/types';
import { Spotlight } from '@/components/ui/spotlight-new';

gsap.registerPlugin(ScrollTrigger);

interface ProjectHomeProps {
  projects: Project[];
  isLoading?: boolean;
  isError?: boolean;
}

export function TheCraftings({
  projects,
  isLoading,
  isError,
}: ProjectHomeProps) {
  useEffect(() => {
    gsap.to('.cloud-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#craftings',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="craftings" className="relative w-full py-20 overflow-hidden">
      <Spotlight />
      <div className="absolute top-0 left-0 w-40 h-40 md:w-60 md:h-60 z-20">
        <Image
          src="/assets/images/the-sun-left.svg"
          alt="The Sun"
          fill
          className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        />
      </div>

      <div className="absolute top-0 right-0 w-40 h-40 md:w-60 md:h-60 z-20">
        <Image
          src="/assets/images/the-moon-right.svg"
          alt="The Moon"
          fill
          className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        />
      </div>

      <div className="absolute top-10 left-0 right-0 w-full z-10 cloud-parallax">
        <Image
          src="/assets/images/cloud.avif"
          alt="Cloud"
          width={1600}
          height={500}
          className="w-full object-contain opacity-70"
        />
      </div>

      <div className="relative text-white max-w-7xl mx-auto text-center px-6 z-30">
        <h2 className="text-5xl md:text-7xl font-kings tracking-wide drop-shadow-sm mb-4">
          The Craftings
        </h2>
        <p className="font-serif italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          Forged in fire, each project is a testament to battles fought, lessons
          learned, and dreams brought to life through code and will.
        </p>
        <div>
          {isLoading ? (
            <GridCardsSkeleton />
          ) : isError ? (
            <div className="text-red-400 text-sm italic text-center mt-4">
              Failed to load projects.
            </div>
          ) : projects.length === 0 ? (
            <div className="text-zinc-400 text-sm italic text-center mt-4">
              No projects found.
            </div>
          ) : (
            <InfiniteMovingCards
              items={projects}
              direction="left"
              speed="normal"
            />
          )}
        </div>
      </div>
    </section>
  );
}
