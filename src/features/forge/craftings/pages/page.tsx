'use client';

import { ArsenalGrid } from '../components/ArsenalGrid';
import { MasteryPanel } from '../components/MasteryPanel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CraftingsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/*
        Main Composition
        - Journey Section: The Path
        - Arsenal Grid: The Weapons
        - Mastery Panel: The Training
       */}

      <main className="relative z-10">
        <ArsenalGrid />
        <MasteryPanel />
      </main>

      {/* Global Grain/Noise Overlay (Optional cinematic feel) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
