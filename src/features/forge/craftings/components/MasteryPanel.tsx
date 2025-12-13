import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SKILLS = [
    { name: 'TypeScript', level: 'Mastery' },
    { name: 'React / Next.js', level: 'Mastery' },
    { name: 'Three.js / R3F', level: 'Proficient' },
    { name: 'GLSL Shaders', level: 'Adept' },
    { name: 'Node.js', level: 'Proficient' },
    { name: 'Rust', level: 'Novice' },
];

export function MasteryPanel() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo(
            '.skill-sigil',
            { scale: 0, rotation: -45, opacity: 0 },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
            }
        );

        gsap.fromTo(
            '.skill-text',
            { x: -20, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 flex items-center justify-center min-h-screen bg-black">
            {/* Background with less overlay for clean look */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <Image
                    src="/assets/images/craftings/texture_washi.png"
                    alt="Texture"
                    fill
                    className="object-cover invert"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto border-y border-white/20 py-16 px-8 relative bg-black/50 backdrop-blur-md">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4">
                        <Image
                            src="/assets/images/craftings/icon_alchemy.png"
                            alt="Mastery Sigil"
                            width={64}
                            height={64}
                            className="invert opacity-80"
                        />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-kings text-white text-center mb-16 mt-8">
                        Training & Mastery Logs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                        {SKILLS.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between group border-b border-dashed border-white/10 pb-4 hover:border-white/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="skill-sigil w-3 h-3 bg-white rotate-45 group-hover:bg-cyan-200 transition-colors shadow-[0_0_5px_white]" />
                                    <span className="skill-text font-space-mono text-lg text-gray-300 group-hover:text-white transition-colors">
                                        {skill.name}
                                    </span>
                                </div>
                                <span className="skill-text font-cinzel-decorative text-xs text-gray-500 uppercase tracking-widest group-hover:text-cyan-200/70 transition-colors">
                                    [{skill.level}]
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="font-space-mono text-xs text-gray-500 italic">
                            "To know ten thousand things, know one well." — Miyamoto Musashi
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
