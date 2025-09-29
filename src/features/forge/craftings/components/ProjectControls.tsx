'use client';

import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { ViewMode } from '@/types';

interface ProjectControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const ProjectControls = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
}: ProjectControlsProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* View Toggle & Filters */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white hover:border-red-500 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>

        <div className="flex border border-zinc-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-400'} hover:text-white transition-colors`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-400'} hover:text-white transition-colors`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
