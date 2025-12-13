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
    const [isAnimating, setIsAnimating] = useState(true);

    useGSAP(() => {
        if (!overlayRef.current) return;

        // Reset state for new page load
        setIsAnimating(true);

        // THE INK BLEED EFFECT
        // 1. Initial State: Screen is covered in black (Overlay visible)
        // 2. Animation: A "hole" opens up with jagged, heavy turbulence edges (Ink receding)

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                // Optional: Hide overlay completely to prevent interaction blocking
                gsap.set(overlayRef.current, { display: 'none' });
            }
        });

        // Current clip-path: Circle(0% at 50% 50%) -> Screen full black
        // Target clip-path: Circle(150% at 50% 50%) -> Screen full revealed
        // We use a custom SVG filter (defined in layout or global) to distort this circle

        tl.fromTo(overlayRef.current,
            {
                clipPath: 'circle(0% at 50% 50%)',
                filter: 'url(#ink-paper-texture)', // Assuming we'll add this filter
            },
            {
                clipPath: 'circle(150% at 50% 50%)',
                duration: 1.5,
                ease: 'power2.inOut',
            }
        );

    }, [pathname]); // Re-run on route change

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

            {/* THE VEIL (Overlay) */}
            {/* We invert the logic: The DIV is the CONTENT revealing itself?
                No, usually overlay is on top.
                If overlay is black, and we clip-path circle 0% -> 150%, the overlay GROWS.
                So we start with full black overlay?

                Correction:
                To "Reveal" content from black:
                Method A: Overlay is Black. ClipPath starts at circle(150%) (Full visible) -> shrinks to 0%? No.
                Method B: Overlay is Black. ClipPath starts at "Inverted Circle"? CSS doesn't support inverted shapes easily without mask-composite.

                Method C (Simplest):
                The Overlay surrounds the content? No.

                Let's use mask-image instead of clip-path for "Holed" overlay.
                mask-image: radial-gradient(circle, transparent 0%, black 0%);
                Animate the transparent stop from 0% to 150%.
            */}

            {/*
                Update: Changed pointer-events-none to pointer-events-auto initially
                to BLOCK interactions until the reveal is done.
            */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black z-[100] pointer-events-auto"
                style={{
                    // Masking logic:
                    // Black pixels = Visible Overlay (Screen Black)
                    // Transparent pixels = Invisible Overlay (Content Visible)
                    // We want a hole expanding from center.
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
function ScriptForAnimation({ overlayRef }: { overlayRef: any }) {
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
