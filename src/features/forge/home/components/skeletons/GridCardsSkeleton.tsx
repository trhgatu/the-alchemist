export const GridCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-zinc-800 border border-zinc-700 rounded-2xl p-5"
        >
          <div className="w-full h-36 bg-zinc-700 rounded mb-4" />
          <div className="h-4 bg-zinc-600 rounded w-2/3 mb-2" />
          <div className="h-3 bg-zinc-700 rounded w-full mb-2" />
          <div className="h-3 bg-zinc-700 rounded w-5/6 mb-2" />
          <div className="flex gap-2 mt-3">
            <div className="h-4 w-16 bg-orange-900 rounded" />
            <div className="h-4 w-12 bg-orange-900 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
