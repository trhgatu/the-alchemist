import { Project } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const FoundationListItem = ({ foundation }: { foundation: Project }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-orange-500 transition-all"
  >
    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
      <Image
        src={foundation.image || ''}
        alt={foundation.name}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-orange-900/20" />
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-bold text-white">{foundation.name}</h3>
        <span className="px-2 py-1 text-xs bg-orange-600 text-white rounded-full">
          foundation
        </span>
        <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full">
          {foundation.downloads} downloads
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-2">{foundation.description}</p>
      <div className="flex flex-wrap gap-1">
        {foundation.tech?.slice(0, 5).map((tech) => (
          <span
            key={tech.name}
            className="px-2 py-1 bg-orange-800/50 text-orange-200 text-xs rounded"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>

    <div className="flex gap-2 flex-shrink-0">
      {foundation.link && (
        <a
          href={foundation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
        >
          Preview
        </a>
      )}
      {foundation.repo && (
        <a
          href={foundation.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-orange-600 text-orange-300 rounded hover:bg-orange-600/10 transition-colors"
        >
          Download
        </a>
      )}
    </div>
  </motion.div>
);
