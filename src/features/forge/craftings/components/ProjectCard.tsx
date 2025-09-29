'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300"
  >
    <div className="relative h-48">
      <Image
        src={project.image ?? 'https://placehold.co/600x400.png'}
        alt={project.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-white font-serif">{project.name}</h3>
        <span
          className={`font-serif px-2 py-1 text-xs rounded-full ${
            project.projectStatus === 'Completed'
              ? 'bg-green-600 text-white'
              : 'bg-yellow-600 text-white'
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="font-serif text-gray-300 text-sm mb-3 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech?.slice(0, 3).map((tech) => (
          <span
            key={tech.name}
            className="px-2 py-1 font-serif bg-zinc-700 text-gray-300 text-xs rounded"
          >
            {tech.name}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Demo
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 border border-zinc-600 text-gray-300 text-sm rounded hover:border-zinc-500 transition-colors"
          >
            Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);
