import { Grid3X3, Move } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  viewMode: 'marquee' | 'grid';
  onToggle: (mode: 'marquee' | 'grid') => void;
  className?: string;
}

export const ViewToggle = ({
  viewMode,
  onToggle,
  className,
}: ViewToggleProps) => {
  return (
    <div className={cn('flex items-center gap-2 mb-6', className)}>
      <button
        onClick={() => onToggle('marquee')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm',
          viewMode === 'marquee'
            ? 'bg-orange-500 text-white border-orange-500'
            : 'border-orange-500 text-orange-500 hover:bg-orange-500/10'
        )}
      >
        <Move size={16} />
        Showcase
      </button>
      <button
        onClick={() => onToggle('grid')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm',
          viewMode === 'grid'
            ? 'bg-orange-500 text-white border-orange-500'
            : 'border-orange-500 text-orange-500 hover:bg-orange-500/10'
        )}
      >
        <Grid3X3 size={16} />
        Grid
      </button>
    </div>
  );
};
