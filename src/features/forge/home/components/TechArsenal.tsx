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



        // Dragon - Subtle float parallax
        gsap.to('.dragon-layer', {
            yPercent: 10,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2, // Smooth follow
            }
        });

        // 2. Title Animation
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

        // 3. Staggered Grid Entry
        const wrappers = gsap.utils.toArray('.tech-icon-wrapper');
        gsap.fromTo(wrappers,
            { opacity: 0, y: 30, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.03, // Fast ripple
                duration: 0.8,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: '.tech-grid',
                    start: 'top 80%',
                }
            }
        );

        // 4. Magnetic & Hover Effect
        // We bind events individually for that premium feel
        const iconItems = gsap.utils.toArray('.tech-icon-item') as HTMLElement[];

        iconItems.forEach((item) => {
            const image = item.querySelector('img');

            item.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Move container slightly
                gsap.to(item, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                // Move inner image slightly more (parallax inside button)
                if (image) {
                    gsap.to(image, {
                        x: x * 0.2,
                        y: y * 0.2,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                gsap.to([item, image], {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });

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

                {/* --- GRID --- */}
                <TooltipProvider delayDuration={0}>
                    <div className="tech-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-12 mx-auto justify-items-center">
                        {SKILLS.map((skill) => (
                            <div key={skill.name} className="tech-icon-wrapper flex flex-col items-center group relative w-24">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {/* Magnetic Icon Container */}
                                        <div className="tech-icon-item w-20 h-20 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-neutral-100 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:border-neutral-200 hover:-translate-y-2 z-10">
                                            <Image
                                                src={skill.iconPath}
                                                alt={skill.name}
                                                width={48}
                                                height={48}
                                                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-neutral-800 text-white border-none shadow-xl font-space-mono text-xs px-3 py-1.5">
                                        <p className="font-semibold">{skill.name}</p>
                                    </TooltipContent>
                                </Tooltip>

                                {/* Label - Appears on Hover */}
                                <span className="absolute -bottom-8 text-[10px] font-space-mono text-neutral-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </TooltipProvider>

            </div>
        </section>
    );
};
