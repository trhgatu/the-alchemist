import { Project } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const FoundationCard = ({
  foundation,
  featured = false,
}: {
  foundation: Project;
  featured?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`group relative bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden hover:border-orange-500 transition-all duration-300 ${
      featured ? 'shadow-lg shadow-orange-900/20' : ''
    }`}
  >
    <div className={`relative ${featured ? 'h-64' : 'h-48'}`}>
      <Image
        src={foundation.image ?? 'https://placehold.co/600x400.png'}
        alt={foundation.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-orange-600 text-white text-xs rounded-full">
            Featured
          </span>
        </div>
      )}
      <div className="absolute top-4 left-4">
        <span className="px-2 py-1 bg-zinc-900/80 text-orange-300 text-xs rounded-full border border-orange-500/30">
          foundation
        </span>
      </div>
    </div>

    <div className={featured ? 'p-6' : 'p-4'}>
      <div className="flex items-center gap-2 mb-2">
        <h3
          className={`font-bold font-serif text-white ${featured ? 'text-xl' : ''}`}
        >
          {foundation.name}
        </h3>
        <span className="font-serif px-2 py-1 text-xs bg-green-600 text-white rounded-full">
          {foundation.downloads} downloads
        </span>
      </div>

      <p className="text-gray-300 font-serif text-sm mb-3">
        {foundation.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {foundation.tech?.slice(0, featured ? 4 : 3).map((tech) => (
          <span
            key={tech.name}
            className="font-serif px-2 py-1 bg-orange-800/50 text-orange-200 text-xs rounded"
          >
            {tech.name}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {foundation.link && (
          <a
            href={foundation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 font-serif text-center py-2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-sm rounded hover:from-orange-700 hover:to-yellow-700 transition-all"
          >
            Preview
          </a>
        )}
        {foundation.repo && (
          <a
            href={foundation.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-serif py-2 border border-orange-600 text-orange-300 text-sm rounded hover:bg-orange-600/10 transition-colors"
          >
            Download
          </a>
        )}
      </div>
    </div>
  </motion.div>
);
