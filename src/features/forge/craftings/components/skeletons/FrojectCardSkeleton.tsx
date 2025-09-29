export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-700 bg-zinc-800/40 p-4 shadow">
      <div className="h-32 w-full rounded bg-zinc-700 mb-4" />
      <div className="h-5 w-3/4 rounded bg-zinc-600 mb-2" />
      <div className="h-4 w-1/2 rounded bg-zinc-700" />
    </div>
  );
}
