'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

// Register GSAP plugins (if not already registered globally)
// gsap.registerPlugin(useGSAP); // Usually done in a global provider, but safe here too

export default function Template({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    return (
        <div ref={containerRef} className="relative min-h-screen">

            {/* INK FILTER DEFINITION - Inline for portability */}
            <svg className="absolute w-0 h-0 pointer-events-none">
                <defs>
                    <filter id="ink-paper-texture">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>

                    {/* Stronger Displacement for the "Bleed" edges */}
                    <filter id="ink-bleed-edge">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="1" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black z-[100] pointer-events-auto"
                style={{
                    maskImage: 'radial-gradient(circle at center, transparent 0%, black 0%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 0%)',
                    filter: 'url(#ink-bleed-edge)' // Apply the uneven edge effect
                }}
            />

            {children}

            <ScriptForAnimation overlayRef={overlayRef} />
        </div>
    );
}

// Separate component to handle the logic cleanly or just use inline GSAP above
function ScriptForAnimation({ overlayRef }: { overlayRef: React.RefObject<HTMLDivElement | null> }) {
    useGSAP(() => {
        // Animate the mask-image gradient stops
        // Since we can't easily animate complex gradients with simple tweens,
        // we use a CSS variable or snap properties.
        // Actually, GSAP can animate CSS variables.

        const overlay = overlayRef.current;
        if (!overlay) return;

        // Reset to "Closed Hole" (Full Black Screen)
        // Stop 1: transparent 0%
        // Stop 2: black 0%
        // Result: All black.

        const state = { percentage: 0 };

        gsap.to(state, {
            percentage: 150,
            duration: 1.8,
            ease: 'power4.inOut',
            onUpdate: () => {
                const p = state.percentage;
                // Hard edge for ink, fuzzy edge for water? Let's go sort of hard but with displacement
                const mask = `radial-gradient(circle at center, transparent ${p}%, black ${p + 10}%)`;
                overlay.style.maskImage = mask;
                overlay.style.WebkitMaskImage = mask;
            },
            onComplete: () => {
                overlay.style.display = 'none';
                // Allow clicks after transition
                overlay.style.pointerEvents = 'none';
            }
        });

    }, [overlayRef]); // Add overlayRef dependency

    return null;
}
