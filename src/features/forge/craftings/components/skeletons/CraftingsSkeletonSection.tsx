import { ProjectCardSkeleton } from './FrojectCardSkeleton';
import { FeaturedProjectCardSkeleton } from './FeaturedProjectCardSkeleton';

export const CraftingsSkeletonSection = () => {
  return (
    <div className="space-y-12">
      {/* Featured Projects Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <FeaturedProjectCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(2)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
