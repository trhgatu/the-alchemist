// src/app/forge/page.tsx
'use client';

import {
  HeroForgeEntry,
  TechArsenal,
  TheCraftings,
  TheFiresOfPassion,
  TheAlchemist,
} from '@/features/forge/home/components';
import { View } from '@react-three/drei';
import InfinityLoopScene from '@/features/forge/home/scenes/InfinityLoopScene';
import { useAppStore } from '@/hooks';
import LoaderWithOverlay from '@/components/PreLoaderOverlay';
import { ScenePhase } from '@/constants/ScenePhase';
import ScrollVelocity from '@/features/forge/home/components/ScrollVelocity';
import { CraftingLegacies } from '@/features/forge/home/components/the-alchemist/CraftingLegacies';
import { Project } from '@/types';

const mockProjects: Project[] = [
  {
    _id: '1',
    slug: 'trhgatu-ecommerce',
    name: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce platform with product management, cart, and payment integration.',
    image: '/assets/images/projects/ecommerce.png',
    tech: [
      { name: 'React', icon: '/assets/icons/React.svg' },
      { name: 'Node.js', icon: '/assets/icons/Node.js.svg' },
      { name: 'MongoDB', icon: '/assets/icons/MongoDB.svg' },
      { name: 'Redis', icon: '/assets/icons/Redis.svg' },
    ],
    category: 'Full-Stack',
    projectStatus: 'Completed',
    status: 'published',
    link: 'https://ecommerce-demo.vercel.app',
    repo: 'https://github.com/trhgatu/trhgatu-e-commerce',
    featured: true,
    downloads: 0,
    year: 2024,
    publishedAt: '2024-06-10',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-10',
  },
  {
    _id: '2',
    slug: 'tao-verse',
    name: 'TAO Verse',
    description:
      'A personal portfolio and storytelling platform blending code, design, and philosophy.',
    image: '/assets/images/projects/tao.png',
    tech: [
      { name: 'Next.js', icon: '/assets/icons/Next.js.svg' },
      { name: 'Three.js', icon: '/assets/icons/Three.js.svg' },
      { name: 'GSAP', icon: '/assets/icons/GSAP.svg' },
    ],
    category: 'Frontend',
    projectStatus: 'In Progress',
    status: 'published',
    link: 'https://trhgatu.vercel.app',
    repo: 'https://github.com/trhgatu/trhgatu-tao-frontend',
    featured: true,
    downloads: 0,
    year: 2025,
    publishedAt: '2025-01-20',
    createdAt: '2024-11-05',
    updatedAt: '2025-01-20',
  },
  {
    _id: '3',
    slug: 'sport-booking',
    name: 'Sport Booking Platform',
    description:
      'A booking system for sports venues with court scheduling, payments, and user management.',
    image: '/assets/images/projects/sport-booking.png',
    tech: [
      { name: 'NestJS', icon: '/assets/icons/Nest.js.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/PostgreSQL.svg' },
      { name: 'Docker', icon: '/assets/icons/Docker.svg' },
    ],
    category: 'Backend',
    projectStatus: 'In Progress',
    status: 'published',
    link: 'https://sport-booking-demo.vercel.app',
    repo: 'https://github.com/trhgatu/trhgatu-sport-booking-backend',
    featured: false,
    downloads: 0,
    year: 2025,
    publishedAt: '2025-03-01',
    createdAt: '2025-01-12',
    updatedAt: '2025-03-01',
  },
];

export default function ForgeHome() {
  const { scenePhase } = useAppStore();

  return (
    <section>
      {scenePhase !== ScenePhase.HERO_ANIMATION && <LoaderWithOverlay />}
      <View className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none">
        <InfinityLoopScene />
      </View>
      <HeroForgeEntry />

      <TheAlchemist />
      <TheFiresOfPassion />
      <TechArsenal />
      <ScrollVelocity
        texts={[
          'Forging Ideas Into Reality - Code is the Fire, Imagination the Anvil - Every Bug is a Spark, Every Fix a Blade - Tempered by Challenge, Sharpened by Failure - Building Dreams One Line at a Time - The Forge Never Sleeps -',
        ]}
        velocity={80}
        className="md:text-4xl font-beau-rivage text-light text-4xl border-t border-b border-white/20 py-6 italic tracking-wide"
      />
      <TheCraftings
        projects={mockProjects}
        isLoading={false}
        isError={false}
      />
      <CraftingLegacies />
    </section>
  );
}
