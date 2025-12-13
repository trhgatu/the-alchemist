import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PHILOSOPHY_STEPS = [
    {
        phase: 'Equivalent Exchange',
        subtitle: 'The Law of Input',
        description: 'To create something of value, something of equal value must be lost. I trade sleepless nights and endless focus for systems that endure.',
        element: 'Earth',
    },
    {
        phase: 'Transmutation',
        subtitle: 'The Art of Change',
        description: 'Code is not static. It is a living, breathing entity. I specialize in transforming raw data into meaningful, interactive experiences.',
        element: 'Fire',
    },
    {
        phase: 'Flow State',
        subtitle: 'The Rhythm of Water',
        description: 'Adaptability is the only true strength. Like water, my solutions take the shape of the problem, seamless and unbreakable.',
        element: 'Water',
    },
    {
        phase: 'Aether',
        subtitle: 'The Invisible Bond',
        description: 'The user experience is the spirit of the application. It cannot be seen, only felt. It is the magic that binds logic to emotion.',
        element: 'Air',
    },
];

export function TheForgeSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Parallax Background
        gsap.to('.forge-bg', {
            yPercent: 5, // Minimal movement to avoid high scale requirements
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Timeline Steps - Hammer Blow Effect
        const steps = gsap.utils.toArray('.forge-step');
        steps.forEach((step: any, i) => {
            gsap.fromTo(
                step,
                { opacity: 0, scale: 0.9, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.2)', // Impact feel
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 80%',
                    },
                }
            );
        });
    }, []);

    return (
        // Aggressive Overlap Fix: -mt-64 guarantees no gap. Increased pt-96 gives more breathing room between sections.
        <section ref={containerRef} className="relative min-h-[150vh] py-32 overflow-hidden bg-black -mt-64 pt-96">
            {/* Forge Background */}
            <div className="absolute inset-0 z-0 forge-bg opacity-30">
                <Image
                    src="/assets/images/craftings/alchemist_forge_bg.png"
                    alt="Ancient Forge"
                    fill
                    className="object-cover grayscale contrast-125 scale-105" // Reduced scale significantly
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-kings text-white text-center mb-12 drop-shadow-[0_0_10px_rgba(255,200,200,0.2)]">
                    The Alchemist's Code
                </h2>
                <p className="font-space-mono text-center text-gray-500 max-w-2xl mx-auto mb-32">
                    The principles that govern every line of code I write.
                </p>

                <div className="relative max-w-4xl mx-auto flex flex-col gap-24">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-red-900/50 to-transparent" />

                    {PHILOSOPHY_STEPS.map((step, index) => (
                        <div
                            key={index}
                            className={`forge-step relative flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-left' : 'text-left md:text-right'
                                }`}
                        >
                            {/* Content */}
                            <div className="w-full md:w-[45%] p-6 border-l-2 md:border-l-0 md:border-b-2 border-red-900/30 bg-black/60 backdrop-blur-sm group hover:border-red-500 transition-colors duration-500">
                                <div className="font-cinzel-decorative text-red-500 mb-2 text-sm tracking-widest uppercase flex items-center gap-2 md:justify-end">
                                    {index % 2 !== 0 && <span>{step.element}</span>}
                                    <span>// {step.subtitle}</span>
                                    {index % 2 === 0 && <span>{step.element}</span>}
                                </div>
                                <h3 className="font-kings text-3xl text-white mb-4 group-hover:text-red-500 transition-colors">{step.phase}</h3>
                                <p className="font-space-mono text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Center Marker */}
                            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-black border-2 border-red-600 rotate-45 shadow-[0_0_15px_red] z-20 mt-1 md:mt-0" />

                            {/* Spacer for alternate side */}
                            <div className="hidden md:block w-0 md:w-[45%]" />
                        </div>
                    ))}
                </div>

                {/* CTA to Full Timeline */}
                <div className="mt-32 flex justify-center">
                    <Link
                        href="/forge/timeline"
                        className="group relative px-8 py-4 bg-black border border-red-900/50 text-white font-space-mono text-sm uppercase tracking-widest hover:bg-red-900/20 hover:border-red-500 transition-all duration-300 flex items-center gap-4"
                    >
                        <span>View The Full Chronicle</span>
                        <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

        </section>
    );
}
