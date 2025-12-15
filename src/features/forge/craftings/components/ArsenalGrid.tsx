import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ARTIFACTS = [
    {
        id: 1,
        slug: 'the-solstice-blade',
        title: 'The Solstice Blade',
        type: 'Web App',
        year: '2023',
        description: 'A 3D configurator for custom katanas using Three.js and WebGL.',
        image: '/assets/images/craftings/bg-sumi-e-snow.png', // Placeholder for now
        icon: '/assets/images/craftings/icon-blade.png',
    },
    {
        id: 2,
        slug: 'alchemy-engine',
        title: 'Alchemy Engine',
        type: 'Backend',
        year: '2024',
        description: 'Node.js distributed system for processing alchemical data streams.',
        image: '/assets/images/craftings/alchemist_forge_bg.png',
        icon: '/assets/images/craftings/icon-alchemy.png',
    },
    {
        id: 3,
        slug: 'rune-reader',
        title: 'Rune Reader',
        type: 'Mobile',
        year: '2024',
        description: 'React Native app for deciphering ancient runic scripts via camera.',
        image: '/assets/images/craftings/alchemist_mountain_path.png',
        icon: '/assets/images/craftings/icon-rune.png',
    },
    {
        id: 4,
        slug: 'void-walker',
        title: 'Void Walker',
        type: 'Game Prototype',
        year: '2025',
        description: 'Unity prototype exploring void mechanics in a 2D platformer.',
        image: '/assets/images/craftings/bg-sumi-e-snow.png',
        icon: '/assets/images/craftings/icon-blade.png',
    },
    {
        id: 5,
        slug: 'shadow-ledger',
        title: 'Blockchain',
        type: 'Blockchain',
        year: '2023',
        description: 'Decentralized ledger for tracking guild transactions seamlessly.',
        image: '/assets/images/craftings/alchemist_forge_bg.png',
        icon: '/assets/images/craftings/icon-alchemy.png',
    },
    {
        id: 6,
        slug: 'wind-whisper',
        title: 'Wind Whisper',
        type: 'IoT',
        year: '2025',
        description: 'Environmental sensors connected to a central weather shrine.',
        image: '/assets/images/craftings/alchemist_mountain_path.png',
        icon: '/assets/images/craftings/icon-rune.png',
    },
];

export function ArsenalGrid() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !containerRef.current) return;

        // Horizontal Scroll Animation with Kinetic Skew
        const scrollTween = gsap.to(containerRef.current, {
            x: () => -(containerRef.current!.scrollWidth - window.innerWidth + 100),
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 1,
                end: () => `+=${containerRef.current!.scrollWidth}`,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Kinetic Skew Effect
                    const velocity = self.getVelocity();
                    // Clamp skew to prevent extreme distortion (max 10 degrees)
                    const skewAmount = gsap.utils.clamp(-10, 10, velocity / -300);

                    gsap.to(containerRef.current, {
                        skewX: skewAmount,
                        duration: 0.5,
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                }
            },
        });

        // Parallax for Card Content (Internal Depth)
        (gsap.utils.toArray('.artifact-card-bg') as Element[]).forEach((bg: Element) => {
            gsap.to(bg, {
                xPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: bg.parentElement,
                    containerAnimation: scrollTween,
                    horizontal: true,
                    scrub: true
                }
            })
        });

        // Atmospheric Mist Parallax (Foreground)
        gsap.to('.mist-layer-1', {
            xPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top', // based on pinned duration
                scrub: 1.5 // slower scrub for depth
            }
        });

        gsap.to('.mist-layer-2', {
            xPercent: -60,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1 // faster scrub for foreground
            }
        });

    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center">
            {/* Base Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay fixed">
                <Image
                    src="/assets/images/craftings/texture_washi.png"
                    alt="Texture"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Atmospheric Mist Layers (Foreground Parallax) */}
            <div className="mist-layer-1 absolute inset-0 z-20 pointer-events-none opacity-20 mix-blend-screen bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 w-[150vw]" />
            <div className="mist-layer-2 absolute top-1/2 left-0 w-[200vw] h-full z-30 pointer-events-none opacity-10 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('/assets/images/craftings/texture_washi.png')] bg-repeat opacity-30 invert" />
            </div>

            <div className="container mx-auto px-6 mb-8 relative z-10 w-full pt-24">
                <h2 className="text-4xl md:text-6xl font-kings text-white mb-2">Forged Artifacts</h2>
                <p className="font-space-mono text-gray-500 text-sm">Drag to explore the collection.</p>
            </div>

            {/* Horizontal Container with Group for Spotlight */}
            <div
                ref={containerRef}
                className="flex gap-8 px-6 md:px-24 w-max items-center h-full group/gallery perspective-[1000px]"
            >
                {ARTIFACTS.map((item, index) => (
                    <Link
                        key={item.id}
                        href={`/forge/craftings/${item.slug}`}
                        className="artifact-card group relative w-[220px] h-[340px] flex-shrink-0 border border-white/5 bg-neutral-900 overflow-hidden transition-all duration-700 ease-out
                hover:border-white/30 hover:-translate-y-4 hover:scale-105 hover:z-20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                group-hover/gallery:opacity-30 hover:!opacity-100 group-hover/gallery:blur-[2px] hover:!blur-none cursor-pointer"
                    >
                        {/* Background Image with Parallax */}
                        <div className="absolute inset-0 z-0 bg-neutral-800">
                            <div className="artifact-card-bg absolute inset-0 -left-[20%] w-[140%] h-full opacity-50 group-hover:opacity-80 transition-opacity duration-700">
                                <Image
                                    src={item.image}
                                    alt="Background"
                                    fill
                                    className="object-cover grayscale contrast-125 group-hover:blur-[1px] transition-all duration-700"
                                />
                            </div>
                            {/* Vignette Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                        </div>

                        {/* Content info */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                            <div className="flex justify-between items-start opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-space-mono text-[10px] text-white/50 uppercase tracking-widest">
                                    0{index + 1}
                                </span>
                                <Image src={item.icon} alt="Icon" width={20} height={20} className="invert opacity-60" />
                            </div>

                            <div className="relative transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-6 h-[1px] bg-red-600 mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <h3 className="text-lg font-kings text-white/90 mb-1 group-hover:text-white transition-colors duration-300 leading-tight">
                                    {item.title}
                                </h3>

                                <p className="font-space-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">
                                    {item.type} <span className="text-red-900 mx-1">{'//'}</span> {item.year}
                                </p>

                                <p className="font-space-mono text-[9px] text-gray-400 leading-relaxed mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 max-h-0 group-hover:max-h-20 overflow-hidden text-ellipsis line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Hover Frame */}
                        <div className="absolute inset-3 border border-white/0 group-hover:border-white/5 transition-colors duration-700 pointer-events-none" />
                    </Link>
                ))}

                {/* End Spacer */}
                <div className="w-[30vw]" />
            </div>
        </section>
    );
}
