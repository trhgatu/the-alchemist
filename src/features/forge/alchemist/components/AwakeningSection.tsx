import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AwakeningSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. The Spark Ignition (Scale & intensity)
        gsap.fromTo(
            '.the-spark-core',
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                },
            }
        );

        // 2. Light Bloom Expansion
        gsap.to('.light-bloom', {
            opacity: 0.6,
            scale: 1.5,
            duration: 3,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
        });

        // 3. Text Reveal (Illuminated)
        gsap.fromTo(
            '.awakening-content > *',
            { y: 50, opacity: 0, filter: 'blur(10px)' },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 50%',
                },
            }
        );

    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 bg-black overflow-visible selection:bg-red-500 selection:text-white z-10">

            {/* --- TOP MERGER (From Prologue) --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black to-transparent z-[60] pointer-events-none" />

            {/* --- ATMOSPHERE --- */}
            {/* Background Gradient Void */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-[#100000] to-black" />

            {/* Rising Embers Generator */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-orange-500 blur-[2px] animate-float-up"
                        style={{
                            width: Math.random() * 6 + 2 + 'px',
                            height: Math.random() * 6 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            bottom: '-20%',
                            opacity: Math.random() * 0.7,
                            animationDuration: Math.random() * 5 + 5 + 's',
                            animationDelay: Math.random() * 5 + 's',
                        }}
                    />
                ))}
            </div>


            {/* --- THE CORE (CENTERPIECE) --- */}
            <div className="relative z-20 mb-16 md:mb-24">
                {/* Main Light Bloom */}
                <div className="light-bloom absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-red-600/20 rounded-full blur-[100px] opacity-0" />

                {/* Inner Heat */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/10 rounded-full blur-[50px] animate-pulse" />

                {/* The Spark Itself */}
                <div className="the-spark-core relative w-4 h-4">
                    {/* Core White Hot */}
                    <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse" />
                    {/* Horizontal Flare */}
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                    {/* Vertical Flare */}
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-80" />
                    {/* Ring */}
                    <div className="absolute inset-0 -m-8 border border-red-500/30 rounded-full animate-spin-slow scale-110 opacity-50" />
                </div>
            </div>


            {/* --- NARRATIVE --- */}
            <div className="awakening-content relative z-30 flex flex-col items-center text-center max-w-4xl gap-8">

                <h2 className="font-kings text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-red-900 drop-shadow-[0_10px_20px_rgba(255,0,0,0.2)]">
                    Zero To One
                </h2>

                <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

                <p className="font-cinzel-decorative text-xl text-red-400 tracking-widest uppercase">
                    "The spark isn't magic. It's friction."
                </p>

                <p className="font-space-mono text-gray-400 text-lg leading-relaxed max-w-2xl px-4">
                    <span className="text-white">Creation is violent.</span> It requires tearing apart silence to make sound. Breaking emptiness to build structure. That first line of code wasn't just logic—it was an act of defiance against the void.
                </p>

            </div>

            {/* --- BOTTOM MERGER (To Forge) --- */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black to-transparent z-[60] pointer-events-none" />

        </section>
    );
}
