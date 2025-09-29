'use client';

import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types';

interface FeaturedProjectCardProps {
  project: Project;
}

export const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => (
  <div className="group relative bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300"
  >
    <div className="relative h-64">
      <Image
        src={project.image ?? 'https://placehold.co/600x400.png'}
        alt={project.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4">
        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
          Featured
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-white">{project.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            project.projectStatus === 'Completed'
              ? 'bg-green-600 text-white'
              : 'bg-yellow-600 text-white'
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-gray-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech?.slice(0, 4).map((tech) => (
          <span
            key={tech.name}
            className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded"
          >
            {tech.name}
          </span>
        ))}
        {(project.tech?.length ?? 0) > 4 && (
          <span className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded">
            +{(project.tech?.length ?? 0) - 4} more
          </span>
        )}
      </div>

      <div className="flex gap-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-zinc-600 text-gray-300 rounded-lg hover:border-zinc-500 transition-colors"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        )}
      </div>
    </div>
  </div>
);
