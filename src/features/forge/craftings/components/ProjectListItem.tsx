'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectListItemProps {
  project: Project;
}

export const ProjectListItem = ({ project }: ProjectListItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-red-500 transition-all"
  >
    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
      <Image
        src={project.image || ''}
        alt={project.name}
        fill
        className="object-cover"
      />
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-bold text-white">{project.name}</h3>
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
      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tech?.map((tech) => (
          <span
            key={tech.name}
            className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>

    <div className="flex gap-2 flex-shrink-0">
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-zinc-600 text-gray-300 rounded hover:border-zinc-500 transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
      )}
    </div>
  </motion.div>
);
