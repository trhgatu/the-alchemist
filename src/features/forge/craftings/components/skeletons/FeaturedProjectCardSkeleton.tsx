export function FeaturedProjectCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-700 bg-zinc-800/40 p-6 shadow-md">
      <div className="h-48 w-full rounded-lg bg-zinc-700 mb-4" />
      <div className="h-6 w-2/3 rounded bg-zinc-600 mb-2" />
      <div className="h-4 w-1/2 rounded bg-zinc-600 mb-2" />
      <div className="h-3 w-full rounded bg-zinc-700" />
    </div>
  );
}
