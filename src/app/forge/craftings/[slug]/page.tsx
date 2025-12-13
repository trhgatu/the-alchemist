'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
} from '@tabler/icons-react';
// import { useLang } from '@/hooks'; // Unused with mock data
// import { usePublicProjectBySlug } from '@/features/forge/craftings/hooks'; // Unused with mock data

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ARTIFACTS = [
  {
    id: 1,
    slug: 'the-solstice-blade',
    name: 'The Solstice Blade', // API might use 'name', mock used 'title'. Adjusting to 'name' for consistency with page code or mapping later.
    title: 'The Solstice Blade',
    type: 'Web App',
    year: '2023',
    description: 'A 3D configurator for custom katanas using Three.js and WebGL. Users can customize every aspect of the blade, from the hamon pattern to the tsuba design, in a real-time physically based rendering environment.',
    thumbnail: '/assets/images/craftings/bg-sumi-e-snow.png',
    icon: '/assets/images/craftings/icon-blade.png',
    category: '3D Web',
    status: 'Stable',
    tech: [{ name: 'Three.js' }, { name: 'React' }, { name: 'WebGL' }, { name: 'GSAP' }],
    link: 'https://example.com/demo',
    repo: 'https://github.com/example/repo'
  },
  {
    id: 2,
    slug: 'alchemy-engine',
    name: 'Alchemy Engine',
    title: 'Alchemy Engine',
    type: 'Backend',
    year: '2024',
    description: 'Node.js distributed system for processing alchemical data streams. Handles real-time transmutation requests with high throughput and eventual consistency guarantees.',
    thumbnail: '/assets/images/craftings/alchemist_forge_bg.png',
    icon: '/assets/images/craftings/icon-alchemy.png',
    category: 'System',
    status: 'Beta',
    tech: [{ name: 'Node.js' }, { name: 'Redis' }, { name: 'Kafka' }, { name: 'Docker' }],
    repo: 'https://github.com/example/repo'
  },
  {
    id: 3,
    slug: 'rune-reader',
    name: 'Rune Reader',
    title: 'Rune Reader',
    type: 'Mobile',
    year: '2024',
    description: 'React Native app for deciphering ancient runic scripts via camera. Uses on-device ML models to identify and translate elder futhark runes in real-time.',
    thumbnail: '/assets/images/craftings/alchemist_mountain_path.png', // Using existing assets as placeholder
    icon: '/assets/images/craftings/icon-rune.png',
    category: 'Mobile AI',
    status: 'Concept',
    tech: [{ name: 'React Native' }, { name: 'TensorFlow.js' }, { name: 'Vision Camera' }],
  },
  {
    id: 4,
    slug: 'void-walker',
    name: 'Void Walker',
    title: 'Void Walker',
    type: 'Game Prototype',
    year: '2025',
    description: 'Unity prototype exploring void mechanics in a 2D platformer. Players manipulate gravity and dimension shifting to traverse a broken world.',
    thumbnail: '/assets/images/craftings/bg-sumi-e-snow.png',
    icon: '/assets/images/craftings/icon-blade.png',
    category: 'Game Dev',
    status: 'Prototype',
    tech: [{ name: 'Unity' }, { name: 'C#' }, { name: 'HLSL' }],
  },
  {
    id: 5,
    slug: 'shadow-ledger',
    name: 'Shadow Ledger',
    title: 'Shadow Ledger',
    type: 'Blockchain',
    year: '2023',
    description: 'Decentralized ledger for tracking guild transactions seamlessly. Ensures transparency in the underworld economy using smart contracts.',
    thumbnail: '/assets/images/craftings/alchemist_forge_bg.png',
    icon: '/assets/images/craftings/icon-alchemy.png',
    category: 'Web3',
    status: 'Archived',
    tech: [{ name: 'Solidity' }, { name: 'Ethers.js' }, { name: 'Hardhat' }],
  },
  {
    id: 6,
    slug: 'wind-whisper',
    name: 'Wind Whisper',
    title: 'Wind Whisper',
    type: 'IoT',
    year: '2025',
    description: 'Environmental sensors connected to a central weather shrine. Broadcasts ambient data to a dashboard for adjusting alchemy parameters.',
    thumbnail: '/assets/images/craftings/alchemist_mountain_path.png',
    icon: '/assets/images/craftings/icon-rune.png',
    category: 'IoT',
    status: 'Active',
    tech: [{ name: 'Arduino' }, { name: 'MQTT' }, { name: 'React' }],
  },
];

export default function CraftingDetailPage() {
  const { slug } = useParams() as { slug: string };
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock Data Lookup
  // In a real scenario, this would be a fetch or context lookup.
  // For now, we find the item in our constant array.
  const item = ARTIFACTS.find(artifact => artifact.slug === slug);

  useGSAP(() => {
    if (!containerRef.current || !item) return;

    // Hero Reveal
    const tl = gsap.timeline();

    tl.from('.hero-title-char', {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5
    })
      .from('.hero-meta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.scroll-indicator', {
        opacity: 0,
        y: -10,
        duration: 0.5
      });

    // Content Parallax
    gsap.to('.hero-bg', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, [item]);

  if (!item) return notFound();

  const hasGithub = !!item.repo;

  // Split title for animation
  const titleChars = item.name.split('');

  return (
    <div ref={containerRef} className="min-h-screen font-serif bg-black text-white overflow-x-hidden selection:bg-red-900 selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Parallax Background */}
        <div className="hero-bg absolute inset-0 z-0 scale-110">
          {item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt={item.name}
              fill
              className="object-cover opacity-40 blur-sm brightness-75 mix-blend-screen"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[url('/assets/images/craftings/texture_washi.png')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Floating Particles/Dust (Optional, simplified) */}

        {/* Navigation */}
        <div className="absolute top-8 left-6 md:left-12 z-50">
          <Link
            href="/forge/craftings"
            className="group flex items-center gap-2 text-white/50 hover:text-red-500 transition-colors duration-300"
          >
            <div className="p-2 border border-white/10 rounded-full group-hover:border-red-500/50 transition-colors">
              <IconArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-sm font-space-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              Return to Archive
            </span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Meta Badges */}
          <div className="hero-meta flex justify-center gap-4 mb-6 font-space-mono text-xs uppercase tracking-[0.2em] text-red-500">
            <span>{item.type || 'Undefined'}</span>
            <span>//</span>
            <span>{item.year || '20XX'}</span>
          </div>

          {/* Cinematic Title */}
          <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-kings text-white mb-8 mix-blend-difference leading-[0.8]">
            {titleChars.map((char, i) => (
              <span key={i} className="hero-title-char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h1>

          {/* Short Description */}
          <p className="hero-meta max-w-xl mx-auto font-space-mono text-white/60 text-sm md:text-base leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] font-space-mono uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </div>
      </section>

      {/* --- CHRONICLE CONTENT --- */}
      <section className="relative z-10 bg-black py-24 md:py-32">
        {/* Paper texture overlay for content area */}
        <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay">
          <Image src="/assets/images/craftings/texture_washi.png" alt="texture" fill className="object-cover" />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            {/* Left Column: The Narrative */}
            <div className="md:col-span-7 space-y-12">
              <div>
                <h2 className="text-3xl font-kings text-white mb-6 border-b border-white/10 pb-4 inline-block">The Chronicle</h2>
                <div className="prose prose-invert prose-lg text-gray-400 font-serif leading-loose">
                  {/* Render description as paragraphs if it's long, or just the text */}
                  {/* In a real scenario, this might be rich text. For now we mimic it. */}
                  <p>{item.description}</p>
                  <p className="mt-4">
                    An artifact forged in the depths of the codebase. It represents a streamlined approach to {item.type?.toLowerCase() || 'development'}, utilizing ancient techniques merged with modern alchemy.
                  </p>
                  <p>
                    Primary directive: To solve complexity through elegant design and robust architecture.
                  </p>
                </div>
              </div>

              {/* Tech Stack Sigils */}
              <div>
                <h3 className="text-xl font-space-mono text-red-500 mb-6 uppercase tracking-widest text-sm">Alchemy Components</h3>
                <div className="flex flex-wrap gap-4">
                  {item.tech?.map((tech) => (
                    <div key={tech.name} className="group relative px-6 py-3 border border-white/10 bg-white/5 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm cursor-default">
                      <div className="absolute inset-0 bg-red-900/10 scale-0 group-hover:scale-100 transition-transform origin-center duration-500" />
                      <span className="relative font-space-mono text-sm text-gray-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-red-500 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-red-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Artifact Stats & Summoning */}
            <div className="md:col-span-5 space-y-12 md:sticky md:top-32 h-fit">

              {/* Status Panel */}
              <div className="p-8 border border-white/10 bg-neutral-900/50 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <h3 className="font-space-mono text-xs text-white/40 uppercase tracking-widest mb-6 text-center">Artifact Status</h3>

                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-gray-500 font-space-mono text-sm">Designation</span>
                  <span className="text-white font-serif italic text-lg">{item.name}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-gray-500 font-space-mono text-sm">Class</span>
                  <span className="text-red-400 font-space-mono text-sm uppercase">{item.category || 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-gray-500 font-space-mono text-sm">Integrity</span>
                  <span className="text-green-500 font-space-mono text-sm uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {item.status || 'Stable'}
                  </span>
                </div>
              </div>

              {/* Summoning Circle (Actions) */}
              <div className="space-y-4">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full relative h-16 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white group-hover:bg-red-600 transition-colors duration-500" />
                    <div className="absolute inset-[1px] bg-black flex items-center justify-center gap-3 group-hover:bg-black/90 transition-colors">
                      <IconExternalLink className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
                      <span className="font-kings text-2xl text-white pt-1">Initiate Protocol (Demo)</span>
                    </div>
                  </a>
                )}

                {hasGithub && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full relative h-14 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-zinc-800 group-hover:bg-white transition-colors duration-500" />
                    <div className="absolute inset-[1px] bg-black flex items-center justify-center gap-3">
                      <IconBrandGithub className="w-5 h-5 text-zinc-500 group-hover:text-black transition-colors" />
                      <span className="font-space-mono text-sm text-zinc-500 group-hover:text-black uppercase tracking-widest transition-colors">
                        Inspect Source
                      </span>
                    </div>
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- VISUAL ARCHIVE (GALLERY MOCKUP) --- */}
      <section className="py-24 border-t border-white/5 bg-neutral-900/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-center font-space-mono text-xs text-white/30 uppercase tracking-[0.3em] mb-12">Visual Records</h2>

          {/* Just reusing the thumbnail as a 'gallery' placeholder for now since we don't have multiple images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video relative grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in border border-white/5">
              {item.thumbnail && <Image src={item.thumbnail} alt="record 1" fill className="object-cover" />}
              <div className="absolute bottom-4 left-4 font-space-mono text-[10px] text-white/50 bg-black/50 px-2 py-1">FIG. 01</div>
            </div>
            <div className="aspect-video relative grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in border border-white/5 bg-neutral-900 flex items-center justify-center">
              <span className="font-space-mono text-xs text-white/20">[DATA CORRUPTED]</span>
              <div className="absolute bottom-4 left-4 font-space-mono text-[10px] text-white/50 bg-black/50 px-2 py-1">FIG. 02</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
