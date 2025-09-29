'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconFlame, IconCode, IconTemplate } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ViewMode, Category } from '@/types';
import { useLang } from '@/hooks';
import {
  ProjectControls,
  FilterPanel,
  FeaturedProjectCard,
  ProjectCard,
  ProjectListItem,
  FoundationCard,
  FoundationListItem,
} from '../components';
import { usePublicProjects } from '../hooks';
import { ProjectTypeEnum } from '../enums';
import { CraftingsSkeletonSection } from '@/features/forge/craftings/components/skeletons';

type ContentType = 'projects' | 'foundations' | 'all';

export default function CraftingsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('all');

  const lang = useLang();

  const {
    data: regularProjects = [],
    isLoading: loadingRegularProjects,
    isError: errorRegularProjects,
  } = usePublicProjects(lang, ProjectTypeEnum.PROJECT);

  const {
    data: regularTemplates = [],
    isLoading: loadingRegularTemplates,
    isError: errorRegularTemplates,
  } = usePublicProjects(lang, ProjectTypeEnum.TEMPLATE);

  const {
    data: featuredProjects = [],
    isLoading: loadingProjects,
    isError: errorProjects,
  } = usePublicProjects(lang, ProjectTypeEnum.PROJECT, true);

  const {
    data: featuredTemplates = [],
    isLoading: loadingTemplates,
    isError: errorTemplates,
  } = usePublicProjects(lang, ProjectTypeEnum.TEMPLATE, true);

  const allItems = [
    ...featuredTemplates,
    ...featuredProjects,
    ...regularProjects,
    ...regularTemplates,
  ];

  const categories: string[] = Array.from(
    new Set([
      'All',
      ...allItems
        .map((item) => item.category)
        .filter((cat): cat is string => !!cat),
    ])
  );

  const techStack = Array.from(
    new Set(allItems.flatMap((item) => item.tech?.map((t) => t.name) ?? []))
  ).sort();

  const filteredProjects = regularProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesTech =
      selectedTech.length === 0 ||
      selectedTech.some((tech) =>
        project.tech?.some((item) => item.name === tech)
      );

    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTech && matchesSearch;
  });

  const filteredTemplates = regularTemplates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'All' || template.category === selectedCategory;
    const matchesTech =
      selectedTech.length === 0 ||
      selectedTech.some((tech) =>
        template.tech?.some((item) => item.name === tech)
      );

    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTech && matchesSearch;
  });
  const isLoading =
    loadingProjects ||
    loadingTemplates ||
    loadingRegularProjects ||
    loadingRegularTemplates;

  const isError =
    errorProjects ||
    errorTemplates ||
    errorRegularProjects ||
    errorRegularTemplates;

  if (isError) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-red-950">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20 -z-10" />
      <div className="absolute inset-0 -z-10 opacity-40">
        <Image
          src="/assets/images/frame.svg"
          alt="Forge Background Frame"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-serif md:text-6xl font-bold mb-4">
              The{' '}
              <span className="relative z-10 bg-gradient-to-r from-red-600 via-orange-700 to-yellow-800 bg-clip-text text-transparent font-extrabold animate-forge-glow [text-shadow:_0_2px_6px_rgba(0,0,0,0.5)]">
                Craftings
              </span>
            </h1>
            <div className="my-3 w-24 md:w-36 h-1 rounded bg-gradient-to-r from-red-800 via-orange-700 to-yellow-800 shadow-lg mx-auto" />
            <p className="flex items-center gap-2 text-sm md:text-lg font-semibold italic bg-gradient-to-r from-orange-600 via-yellow-700 to-red-800 bg-clip-text text-transparent drop-shadow-[0_1px_6px_rgba(255,80,40,0.3)] mb-1 justify-center">
              <IconFlame color="red" className="w-5 h-5" />
              <span className="font-serif">
                Born in fire. Forged to conquer.
              </span>
            </p>
            <p className="text-xl font-serif text-gray-300 max-w-2xl mx-auto">
              Where ideas are tempered into reality through code, passion, and
              relentless iteration.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Type Toggle */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="flex bg-zinc-800/50 border border-zinc-700 rounded-lg p-1">
            {(['all', 'projects', 'foundations'] as ContentType[]).map(
              (type) => {
                const Icon =
                  type === 'all'
                    ? IconFlame
                    : type === 'projects'
                      ? IconCode
                      : IconTemplate;

                return (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      contentType === type
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-zinc-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type === 'all'
                      ? 'All Craftings'
                      : type === 'projects'
                        ? 'Projects'
                        : 'Foundations'}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Controls & Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProjectControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <FilterPanel
          showFilters={showFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
          categories={categories}
          techStack={techStack}
        />

        {/* Main Content Section */}
        {isLoading ? (
          <CraftingsSkeletonSection />
        ) : (
          <>
            {/* Featured Projects */}
            {(contentType === 'all' || contentType === 'projects') &&
              featuredProjects.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <IconCode className="w-6 h-6 text-red-400" />
                    <h2 className="text-2xl font-bold text-white">
                      Featured Projects
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-red-600/50 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredProjects.map((project) => (
                      <div
                        key={project._id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/forge/craftings/${project.slug}`)
                        }
                      >
                        <FeaturedProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Featured Foundations */}
            {(contentType === 'all' || contentType === 'foundations') &&
              featuredTemplates.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <IconTemplate className="w-6 h-6 text-orange-400" />
                    <h2 className="text-2xl font-bold text-white">
                      Featured Foundations
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-orange-600/50 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredTemplates.map((foundation) => (
                      <div
                        key={foundation._id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/forge/craftings/${foundation.slug}`)
                        }
                      >
                        <FoundationCard foundation={foundation} featured />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* All Projects */}
            {(contentType === 'all' || contentType === 'projects') && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <IconCode className="w-6 h-6 text-red-400" />
                  <h2 className="text-2xl font-bold text-white">
                    All Projects ({regularProjects.length})
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-600/50 to-transparent" />
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularProjects.map((project) => (
                      <div
                        key={project._id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/forge/craftings/${project.slug}`)
                        }
                      >
                        <ProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {regularProjects.map((project) => (
                      <div
                        key={project._id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/forge/craftings/${project.slug}`)
                        }
                      >
                        <ProjectListItem project={project} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* All Foundations */}
            {(contentType === 'all' || contentType === 'foundations') && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <IconTemplate className="w-6 h-6 text-orange-400" />
                  <h2 className="text-2xl font-bold text-white">
                    All Foundations ({regularTemplates.length})
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-orange-600/50 to-transparent" />
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularTemplates.map((foundation) => (
                      <div
                        key={foundation._id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/forge/craftings/${foundation.slug}`)
                        }
                      >
                        <FoundationCard foundation={foundation} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {regularTemplates.map((foundation) => (
                      <div
                        key={foundation._id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/forge/craftings/${foundation.slug}`)
                        }
                      >
                        <FoundationListItem foundation={foundation} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {(contentType === 'projects'
              ? filteredProjects
              : contentType === 'foundations'
                ? filteredTemplates
                : [...filteredProjects, ...filteredTemplates]
            ).length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg">
                  No {contentType === 'all' ? 'craftings' : contentType} found
                  matching your criteria.
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedTech([]);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
