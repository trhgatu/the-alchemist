'use client';

import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SKILLS } from '@/constants/Skills';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const TechArsenal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.to('.dragon-layer', {
            yPercent: 10,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            }
        });

        gsap.fromTo(titleRef.current,
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            }
        );

        const wrappers = gsap.utils.toArray('.tech-icon-wrapper');
        gsap.fromTo(wrappers,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: {
                    amount: 0.8,
                    grid: "auto",
                    from: "start"
                },
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#tech-arsenal',
                    start: 'top 70%',
                }
            }
        );

        // Removed random floating to keep it clean and organized "Arsenal" style

    }, []);

    return (
        <section ref={containerRef} id="tech-arsenal" className="relative bg-[#f0f0f0] w-full min-h-screen flex items-center justify-center overflow-hidden">

            {/* --- BACKGROUND LAYERS --- */}

            {/* Sun - Top Left */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 z-0 pointer-events-none mix-blend-multiply opacity-10 select-none">
                <Image src="/assets/images/the-sun.svg" alt="The Sun" width={300} height={300} className="w-32 md:w-64" />
            </div>

            {/* Knight - Bottom Right */}
            <div className="absolute right-0 bottom-0 z-0 pointer-events-none opacity-10 select-none">
                <Image src="/assets/images/knight_state.svg" alt="Knight" width={300} height={300} className="w-48 md:w-80" />
            </div>

            {/* Dragon - Center/Background */}
            <div className="dragon-layer absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10 select-none">
                <Image src="/assets/images/medieval_dragon.png" alt="Dragon" width={1000} height={1000} className="object-contain w-[120%] h-[120%]" />
            </div>




            {/* --- CONTENT --- */}
            <div className="relative z-20 w-full pt-40 pb-32 max-w-7xl px-6 text-center">

                {/* Title Group */}
                <div className="mb-20">
                    <h2 ref={titleRef} className="text-5xl md:text-7xl font-kings text-neutral-800 mb-6 drop-shadow-sm flex items-center justify-center gap-6">
                        <span className="text-4xl text-neutral-300 opacity-50">✦</span>
                        The Arsenal of Code
                        <span className="text-4xl text-neutral-300 opacity-50">✦</span>
                    </h2>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-16 h-[1px] bg-neutral-300" />
                        <div className="w-2 h-2 rotate-45 border border-neutral-400" />
                        <div className="w-16 h-[1px] bg-neutral-300" />
                    </div>

                    <p className="text-neutral-600 italic text-lg md:text-xl max-w-4xl mx-auto leading-loose font-serif">
                        &quot;Every line of code is forged with purpose. These are the tools, languages, and frameworks I have tempered — my arsenal in the endless forge of creation.&quot;
                    </p>
                </div>
                <TooltipProvider delayDuration={0}>
                    <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto py-10 px-4">
                        {SKILLS.map((skill) => (
                            <div
                                key={skill.name}
                                className="tech-icon-wrapper group relative"
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="relative">
                                            <div className="tech-icon-item w-24 h-24 bg-gradient-to-br from-white to-neutral-100 rotate-45 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-white flex items-center justify-center cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-white hover:scale-110 hover:z-20 hover:border-amber-500/30">
                                                <div className="-rotate-45 w-full h-full flex items-center justify-center p-5">
                                                    <Image
                                                        src={skill.iconPath}
                                                        alt={skill.name}
                                                        width={48}
                                                        height={48}
                                                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="bg-neutral-900/90 text-white border-none backdrop-blur-md shadow-2xl font-space-mono text-xs px-3 py-1.5 translate-y-4">
                                        <p className="font-semibold tracking-wider font-kings text-lg text-amber-500">{skill.name}</p>
                                        <p className="text-[10px] text-neutral-400 capitalize">{skill.category} Rune</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </TooltipProvider>

            </div>
        </section>
    );
};
