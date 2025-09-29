'use client';

import React from 'react';
import { Timeline as TimelineComponent } from '@/components/ui/timeline';
import Image from 'next/image';
import {
  IconFlame,
  IconCode,
  IconRocket,
  IconHammer,
} from '@tabler/icons-react';

export function Timeline() {
  const data = [
    {
      title: '2025',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <IconFlame className="w-5 h-5 text-red-500" />
            <p className="text-sm font-semibold italic bg-gradient-to-r from-orange-600 via-yellow-700 to-red-800 bg-clip-text text-transparent">
              The Year of Forging Excellence
            </p>
          </div>
          <p className="mb-8 text-sm text-gray-300 leading-relaxed">
            Forged and launched revolutionary UI systems from the depths of
            creativity, each component tempered by passion and refined through
            countless iterations.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/templates/startup-1.webp"
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-red-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-red-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/templates/startup-2.webp"
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-red-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-red-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/templates/startup-3.webp"
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-red-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-red-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/templates/startup-4.webp"
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-red-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-red-900/20 md:h-44 lg:h-60"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Early 2023',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <IconCode className="w-5 h-5 text-orange-500" />
            <p className="text-sm font-semibold italic bg-gradient-to-r from-orange-600 via-yellow-700 to-red-800 bg-clip-text text-transparent">
              The Foundation Era
            </p>
          </div>
          <p className="mb-4 text-sm text-gray-300 leading-relaxed">
            In the early flames of creation, every line of code was a battle
            against mediocrity. Each design forged with purpose, each component
            crafted with soul.
          </p>
          <p className="mb-8 text-sm text-gray-300 leading-relaxed">
            These are not mere templates - they are weapons of mass creation,
            tools forged in the fire of relentless iteration and unwavering
            vision.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/pro/hero-sections.png"
                alt="hero template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-orange-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-orange-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/features-section.png"
                alt="feature template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-orange-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-orange-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/pro/bento-grids.png"
                alt="bento template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-orange-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-orange-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/cards.png"
                alt="cards template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-orange-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-orange-900/20 md:h-44 lg:h-60"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Forge Log',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <IconRocket className="w-5 h-5 text-yellow-500" />
            <p className="text-sm font-semibold italic bg-gradient-to-r from-orange-600 via-yellow-700 to-red-800 bg-clip-text text-transparent">
              Latest Weapons Forged
            </p>
          </div>
          <p className="mb-6 text-sm text-gray-300">
            {`Today's conquests in the eternal battle against mediocrity`}
          </p>
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 hover:border-yellow-500/50 transition-colors">
              <span className="text-green-400 font-bold">⚔️</span>
              <span>Card grid component - Forged with precision</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 hover:border-yellow-500/50 transition-colors">
              <span className="text-green-400 font-bold">🔥</span>
              <span>Startup template - Tempered in the flames</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 hover:border-yellow-500/50 transition-colors">
              <span className="text-green-400 font-bold">⚡</span>
              <span>File upload system - Lightning fast</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 hover:border-yellow-500/50 transition-colors">
              <span className="text-green-400 font-bold">🎵</span>
              <span>Music integration - Harmony in chaos</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 hover:border-yellow-500/50 transition-colors">
              <span className="text-green-400 font-bold">👥</span>
              <span>Community features - United we forge</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/pro/hero-sections.png"
                alt="hero template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-yellow-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-yellow-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/features-section.png"
                alt="feature template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-yellow-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-yellow-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/pro/bento-grids.png"
                alt="bento template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-yellow-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-yellow-900/20 md:h-44 lg:h-60"
              />
            </div>
            <div className="group relative">
              <Image
                src="https://assets.aceternity.com/cards.png"
                alt="cards template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover border border-zinc-700 hover:border-yellow-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-yellow-900/20 md:h-44 lg:h-60"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2022',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <IconHammer className="w-5 h-5 text-purple-500" />
            <p className="text-sm font-semibold italic bg-gradient-to-r from-purple-600 via-pink-700 to-red-800 bg-clip-text text-transparent">
              The Awakening
            </p>
          </div>
          <p className="mb-4 text-sm text-gray-300 leading-relaxed">
            The first sparks of creation ignited. Learning the ancient arts of
            web development, each tutorial a step closer to mastery.
          </p>
          <p className="mb-8 text-sm text-gray-300 leading-relaxed">
            From humble beginnings to ambitious dreams - the forge was being
            built, one line of code at a time.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative">
              <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-zinc-700 hover:border-purple-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-purple-900/20 flex items-center justify-center">
                <span className="text-purple-300 text-sm font-medium">
                  First HTML Page
                </span>
              </div>
            </div>
            <div className="group relative">
              <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-pink-900/30 to-red-900/30 border border-zinc-700 hover:border-pink-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-pink-900/20 flex items-center justify-center">
                <span className="text-pink-300 text-sm font-medium">
                  CSS Mastery
                </span>
              </div>
            </div>
            <div className="group relative">
              <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-zinc-700 hover:border-indigo-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-indigo-900/20 flex items-center justify-center">
                <span className="text-indigo-300 text-sm font-medium">
                  JavaScript Journey
                </span>
              </div>
            </div>
            <div className="group relative">
              <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-zinc-700 hover:border-red-500 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-red-900/20 flex items-center justify-center">
                <span className="text-red-300 text-sm font-medium">
                  First Project
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-gradient-to-br from-zinc-900 via-black to-red-950">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-orange-900/10" />
      <div className="absolute inset-0 -z-10 opacity-40">
        <Image
          src="/assets/images/frame.svg"
          alt="Forge Background Frame"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              The Forge Chronicles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-800 via-orange-700 to-yellow-800 mx-auto mb-4 rounded shadow-lg" />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A journey through fire and code, where every milestone was forged
              in the flames of determination.
            </p>
          </div>
        </div>
        <TimelineComponent data={data} />
      </div>
    </div>
  );
}
