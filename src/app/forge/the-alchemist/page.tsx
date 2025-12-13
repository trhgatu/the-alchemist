'use client';

import { AwakeningSection } from '@/features/forge/alchemist/components/AwakeningSection';
import { PhilosopherPathSection } from '@/features/forge/alchemist/components/PhilosopherPathSection';
import { PrologueSection } from '@/features/forge/alchemist/components/PrologueSection';
import { TheForgeSection } from '@/features/forge/alchemist/components/TheForgeSection';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AlchemistPage() {
    return (
        <div className="min-h-screen bg-neutral-900 text-white selection:bg-red-900 selection:text-white overflow-hidden">
            {/*
        The Alchemist's Journey
        1. Prologue: Who I Was (Silhouette)
        2. Awakening: The Spark (Ember)
        3. The Forge: Tempering (Timeline)
        4. Philosopher's Path: Vision (Avatar)
       */}

            <main className="relative z-10">
                <PrologueSection />
                <AwakeningSection />
                <TheForgeSection />
                <PhilosopherPathSection />
            </main>

            {/* Cinematic Film Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay">
                <svg className="w-full h-full">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            {/* Vignette Overlay */}
            <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
}
