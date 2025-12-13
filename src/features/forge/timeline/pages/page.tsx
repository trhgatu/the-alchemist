'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconFlame, IconCode, IconRocket, IconHammer, IconArrowDown } from '@tabler/icons-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DATA = [
  {
    year: '2025',
    title: 'The Year of Forging Excellence',
    icon: <IconFlame className="w-6 h-6 text-red-500" />,
    desc: 'Forged and launched revolutionary UI systems from the depths of creativity, each component tempered by passion and refined through countless iterations.',
    images: [
      "https://assets.aceternity.com/templates/startup-1.webp",
      "https://assets.aceternity.com/templates/startup-2.webp",
      "https://assets.aceternity.com/templates/startup-3.webp"
    ]
  },
  {
    year: 'Early 2023',
    title: 'The Foundation Era',
    icon: <IconCode className="w-6 h-6 text-orange-500" />,
    desc: 'In the early flames of creation, every line of code was a battle against mediocrity. Each design forged with purpose, each component crafted with soul.',
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png"
    ]
  },
  {
    year: 'Forge Log',
    title: 'Latest Weapons Forged',
    icon: <IconRocket className="w-6 h-6 text-yellow-500" />,
    desc: "Today's conquests in the eternal battle against mediocrity. New templates, new systems, new powers.",
    images: [
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png"
    ],
    tags: ["Card Grid", "Startup Template", "File Upload", "Music Integration"]
  },
  {
    year: '2022',
    title: 'The Awakening',
    icon: <IconHammer className="w-6 h-6 text-purple-500" />,
    desc: 'The first sparks of creation ignited. Learning the ancient arts of web development, each tutorial a step closer to mastery.',
    images: []
  },
];

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !lineRef.current) return;

    // 1. Thread Animation (Draw on scroll)
    const totalHeight = containerRef.current.offsetHeight;

    gsap.fromTo(lineRef.current,
      { strokeDasharray: totalHeight, strokeDashoffset: totalHeight },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1
        }
      });

    // Parallax Background
    gsap.to('.timeline-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // 2. Node & Content Reveals
    const nodes = gsap.utils.toArray('.timeline-node');
    nodes.forEach((node: Element) => {
      gsap.from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: node,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    const cards = gsap.utils.toArray('.timeline-card');
    cards.forEach((card: Element, i: number) => {
      const isLeft = i % 2 === 0;
      gsap.from(card, {
        x: isLeft ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-serif overflow-hidden selection:bg-red-900 selection:text-white">

      {/* Background Texture with Parallax */}
      <div className="fixed inset-0 z-0 timeline-bg opacity-40 mix-blend-screen pointer-events-none scale-105">
        <Image
          src="/assets/images/craftings/alchemist_forge_bg.png"
          alt="Forge Background"
          fill
          className="object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Static Overlay Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/images/craftings/texture_washi.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* --- PROLOGUE HERO --- */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center z-10">
        <h1 className="text-6xl md:text-8xl font-kings text-white mb-6 text-center shadow-red-500/50 drop-shadow-2xl">
          The Path of Mastery
        </h1>
        <p className="font-space-mono text-white/50 text-center max-w-xl px-4">
          Tracing the thread of fate through years of code, design, and relentless creation.
        </p>
        <div className="absolute bottom-12 animate-bounce opacity-50">
          <IconArrowDown className="text-white" />
        </div>
      </section>


      {/* --- THE WEAVE (TIMELINE) --- */}
      <section ref={containerRef} className="relative container mx-auto px-4 pb-48 z-10 max-w-5xl">

        {/* The Thread (Main SVG Line) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] h-full pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Base Line (Dark) */}
            <path
              d="M 1 0 V 99999"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            {/* Glowing Thread (Animated) - Vagabond White */}
            <path
              ref={lineRef}
              d="M 1 0 V 99999"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-32 relative">
          {DATA.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>

                {/* Spacer for other side */}
                <div className="hidden md:block w-1/2" />
                {/* Central Node - White/Ink Style - Elongated Rhombus */}
                <div className="timeline-node absolute left-4 md:left-1/2 md:-ml-6 w-12 h-12 flex items-center justify-center z-20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    <path d="M12 2L20 12L12 22L4 12Z" fill="black" stroke="white" strokeWidth="2" />
                    <rect x="11" y="11" width="2" height="2" fill="white" />
                  </svg>
                </div>

                {/* Connector (Mobile only - horizontal) */}
                <div className="md:hidden absolute left-10 top-6 w-8 h-[1px] bg-white/50" />

                {/* Content Card */}
                <div className={`timeline-card w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <div className="mb-2">
                    <span className="font-space-mono text-white/70 text-sm tracking-widest uppercase">{item.year}</span>
                  </div>
                  <h3 className="text-3xl font-kings text-white mb-4">{item.title}</h3>
                  <p className="font-serif text-gray-400 leading-relaxed mb-6 text-lg">
                    {item.desc}
                  </p>

                  {/* Tags if any */}
                  {item.tags && (
                    <div className={`flex flex-wrap gap-2 mb-6 ${isLeft ? 'md:justify-end' : ''}`}>
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-space-mono text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Images Grid */}
                  {item.images.length > 0 && (
                    <div className={`grid grid-cols-2 gap-3 opacity-80 hover:opacity-100 transition-opacity duration-500 ${isLeft ? 'md:ml-auto' : ''} max-w-sm`}>
                      {item.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded overflow-hidden border border-white/10 group">
                          <Image src={img} alt="evidence" fill className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* --- EPILOGUE --- */}
      <section className="py-32 text-center relative z-10">
        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent mx-auto mb-8" />
        <h2 className="text-2xl font-kings text-white/30">The chronicle continues...</h2>
      </section>

    </div>
  );
}
