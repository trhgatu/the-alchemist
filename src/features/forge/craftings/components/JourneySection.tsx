import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MILESTONES = [
    {
        id: 1,
        title: 'The First Spark',
        lesson: 'Initialization',
        description: 'The moment the forge was lit. Setting up the core architecture.',
        year: '2023',
        side: 'left',
    },
    {
        id: 2,
        title: 'Iron & Code',
        lesson: 'Structure',
        description: 'Building the skeletal framework with React and Tailwind.',
        year: '2024',
        side: 'right',
    },
    {
        id: 3,
        title: 'Void Essence',
        lesson: 'Animation',
        description: 'Infusing life through GSAP and Three.js integration.',
        year: '2024',
        side: 'left',
    },
    {
        id: 4,
        title: 'Mastery',
        lesson: 'Optimization',
        description: 'Refining the blade. Performance tuning and state management.',
        year: '2025',
        side: 'right',
    },
];

export function JourneySection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Parallax Background
        gsap.to('.sumi-e-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Milestone Stones
        const stones = gsap.utils.toArray('.milestone-stone') as Element[];
        stones.forEach((stone: Element) => {
            gsap.fromTo(
                stone,
                { opacity: 0, y: 100, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: stone,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Path Line Drawing
        gsap.fromTo(
            '.journey-path-line',
            { height: '0%' },
            {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.journey-path-container',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[200vh] overflow-hidden py-32">
            {/* Sumi-e Background */}
            <div className="absolute inset-0 z-0 sumi-e-bg opacity-40">
                <Image
                    src="/assets/images/craftings/bg_sumi_e_snow.png"
                    alt="Sumi-e Mountains"
                    fill
                    className="object-cover grayscale contrast-125"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>

            {/* Washi Texture Overlay */}
            <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay">
                <Image
                    src="/assets/images/craftings/texture_washi.png"
                    alt="Washi Texture"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <h2 className="text-6xl md:text-8xl font-kings text-white text-center mb-32 tracking-wider opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    The Path of Craftings
                </h2>

                {/* Path Container */}
                <div className="journey-path-container relative max-w-4xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-white/20 top-0">
                        <div className="journey-path-line w-full bg-white shadow-[0_0_10px_white]" />
                    </div>

                    <div className="flex flex-col gap-32 md:gap-48 pb-32">
                        {MILESTONES.map((item) => (
                            <div
                                key={item.id}
                                className={`milestone-stone relative flex items-center w-full ${item.side === 'left' ? 'justify-end md:pr-12' : 'justify-start md:pl-12'
                                    } ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse md:flex-row'}`}
                            >
                                {/* Content */}
                                <div
                                    className={`w-full md:w-[45%] p-8 border border-white/10 bg-black/40 backdrop-blur-sm rounded-sm hover:border-white/40 transition-colors duration-500 group relative overflow-hidden`}
                                >
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-kings text-3xl text-white/80">{item.year}</span>
                                        <Image
                                            src="/assets/images/craftings/icon-rune.png"
                                            alt="Rune"
                                            width={32}
                                            height={32}
                                            className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 invert"
                                        />
                                    </div>
                                    <h3 className="font-cinzel-decorative text-2xl text-white mb-2 group-hover:text-white/90 transition-colors">{item.title}</h3>
                                    <div className="text-xs font-space-mono text-white/50 mb-3 uppercase tracking-widest border-b border-white/10 pb-2 inline-block">
                                        {item.lesson}
                                    </div>
                                    <p className="font-space-mono text-sm text-gray-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Center Node on Line */}
                                <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-4 h-4 bg-black border-2 border-white rotate-45 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_white]`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
