import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Project } from '@/types';

interface GridCardsProps {
  items: Project[];
  className?: string;
}

export const GridCards = ({ items, className }: GridCardsProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4',
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item._id}
          className="relative w-full rounded-2xl border border-zinc-700 hover:border-orange-500 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-5 shadow-lg transition-transform hover:scale-[1.02]"
        >
          <Link
            href={`/forge/craftings/${item.slug}`}
            className="flex flex-col gap-3 group"
          >
            <Image
              src={item.image ?? 'https://placehold.co/600x400.png'}
              alt={item.name}
              className="rounded-lg w-full h-36 object-cover mb-2 border border-zinc-700 group-hover:opacity-90 transition"
              width={400}
              height={144}
            />
            <h3 className="text-lg font-bold text-orange-400">{item.name}</h3>
            <p className="text-sm text-zinc-300 line-clamp-3">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tech?.slice(0, 4).map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded"
                >
                  {tech.name}
                </span>
              ))}
              {(item.tech?.length ?? 0) > 4 && (
                <span className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded">
                  +{(item.tech?.length ?? 0) - 4} more
                </span>
              )}
            </div>
          </Link>

          <div className="flex gap-3 mt-4">
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-400 hover:underline"
              >
                Demo
              </a>
            )}
            {item.repo && (
              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:underline"
              >
                Code
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
