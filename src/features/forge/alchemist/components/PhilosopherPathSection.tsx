import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PhilosopherPathSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Background Scroll
        gsap.to('.mountain-bg', {
            scale: 1.1,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })

        // Vision Text
        gsap.fromTo(
            '.vision-text',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                },
            }
        );

        // Avatar Appearance
        gsap.fromTo(
            '.alchemist-avatar',
            { opacity: 0, scale: 0.9, filter: 'grayscale(100%) blur(5px)' },
            {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)', // Removed grayscale from here so Tailwind can handle it
                duration: 2,
                ease: 'power3.out',
                clearProps: 'filter', // Clear filter after animation so hover works perfectly
                scrollTrigger: {
                    trigger: '.avatar-container',
                    start: 'top 70%'
                }
            }
        )
    }, []);

    return (
        // Added -mt-24 to overlap with previous section, bg-black to prevent white gaps
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-black -mt-24 pt-24">
            {/* --- SECTION MERGER (Top Blend) --- */}
            {/* z-10 to be ABOVE background (z-0) but BELOW content (which we will ensure is z-20) */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />

            {/* Mountain Background */}
            <div className="absolute inset-0 z-0 mountain-bg">
                <Image
                    src="/assets/images/craftings/alchemist_mountain_path.png"
                    alt="Philosopher's Path"
                    fill
                    className="object-cover opacity-60 scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="relative z-20 container mx-auto flex flex-col items-center text-center">
                <h2 className="vision-text font-kings text-5xl md:text-7xl text-white mb-16">
                    Who I Am Becoming
                </h2>

                {/* User Avatar Integration */}
                <div className="avatar-container relative w-48 h-48 md:w-64 md:h-64 mb-12 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] group cursor-pointer transition-transform duration-500 hover:scale-105">
                    <Image
                        src="/assets/images/avt.png"
                        alt="The Alchemist"
                        fill
                        className="alchemist-avatar object-cover grayscale brightness-75 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:brightness-100"
                    />
                    {/* Overlay to blend with sumi-e style - fades out on hover */}
                    <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                </div>

                <div className="vision-text max-w-2xl font-space-mono text-gray-300 text-lg leading-relaxed mb-16">
                    <p className="mb-6">
                        &quot;I am no longer just a builder of things. I am a student of the craft.
                        The code is simply the hammer; the mind is the steel.&quot;
                    </p>
                    <p className="text-sm text-gray-400">
                        My journey is not towards a destination, but towards a deeper understanding of the art itself.
                    </p>
                </div>

                <Link
                    href="/forge/craftings"
                    className="vision-text group relative px-8 py-3 overflow-hidden border border-white/30 hover:border-white transition-colors duration-500"
                >
                    <span className="relative z-10 font-cinzel-decorative text-white tracking-widest uppercase text-sm group-hover:text-black transition-colors duration-500">
                        Continue the Journey
                    </span>
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                </Link>
            </div>

            {/* --- SECTION MERGER --- */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black to-transparent z-50 pointer-events-none" />

        </section>
    );
}
