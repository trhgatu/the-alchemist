'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface FilterPanelProps {
  showFilters: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  selectedTech: string[];
  setSelectedTech: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
  techStack: string[];
}

export const FilterPanel = ({
  showFilters,
  selectedCategory,
  setSelectedCategory,
  selectedTech,
  setSelectedTech,
  categories,
  techStack,
}: FilterPanelProps) => {
  if (!showFilters) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 mb-8"
    >
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Category)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-white font-semibold mb-3">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <button
              key={tech}
              onClick={() => {
                setSelectedTech((prev) =>
                  prev.includes(tech)
                    ? prev.filter((t) => t !== tech)
                    : [...prev, tech]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTech.includes(tech)
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
