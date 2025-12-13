import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PrologueSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Background Parallax (Subtle)
        gsap.to('.sumi-bg', {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        // 2. Text Reveal (Cinematic & Slow)
        gsap.fromTo(
            '.prologue-content > *',
            { y: 30, opacity: 0, filter: 'blur(10px)' },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 2,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                },
            }
        );

    }, []);

    return (
        // Key Fix: -mt-32 pulls the section up to cover any header gap. pt-32 compensates.
        <section ref={containerRef} className="relative h-[110vh] min-h-[900px] w-full flex flex-col items-center justify-center bg-black overflow-hidden -mt-32 pt-32 selection:bg-gray-700 selection:text-white">

            {/* --- ATMOSPHERE --- */}

            {/* Main Background: Fixed Scale Coverage */}
            <div className="sumi-bg absolute inset-0 z-0">
                <Image
                    src="/assets/images/craftings/bg_sumi_e_snow.png"
                    alt="Snow Wanderer"
                    fill
                    className="object-cover opacity-40 grayscale contrast-125 scale-125 origin-center"
                    priority
                />

                {/* 1. Heavy Vignette & Void edges */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-90" />

                {/* 2. Abyssal Gradients (Deep Mystery) */}
                <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
            </div>

            {/* Grain Texture */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/assets/images/craftings/texture_washi.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
            </div>


            {/* --- CONTENT LAYERS --- */}
            <div className="prologue-content relative z-20 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center gap-10">

                {/* Tag */}
                <div className="flex items-center gap-4 opacity-80">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <span className="font-space-mono text-gray-300 text-xs tracking-[0.4em] uppercase">
                        Archive // 001
                    </span>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                {/* Headline: The Concept */}
                <div className="relative">
                    <h2 className="font-kings text-7xl md:text-9xl text-gray-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-2">
                        The Void
                    </h2>
                    <p className="font-cinzel-decorative text-xl md:text-2xl text-gray-400 tracking-widest uppercase opacity-80">
                        Before the Spark
                    </p>
                </div>


                {/* Divider */}
                <div className="w-[1px] h-24 bg-gradient-to-b from-white via-gray-500 to-transparent opacity-60" />


                {/* Body Text: The Memory */}
                <div className="font-serif text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl space-y-4">
                    <p className="drop-shadow-lg">There was motion, but no becoming.</p>
                    <p className="text-gray-400 italic drop-shadow-md">I carried raw iron — heavy, unshaped, without an edge.</p>
                </div>



            </div>

            {/* --- SECTION MERGER (The "Cover" requested) --- */}
            {/* A deep, high-z-index gradient that ensures a seamless blend into the Awakening Section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black to-transparent z-50 pointer-events-none" />

        </section>
    );
}
