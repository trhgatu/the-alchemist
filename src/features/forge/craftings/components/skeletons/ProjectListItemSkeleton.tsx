export function ProjectListItemSkeleton() {
  return (
    <div className="animate-pulse flex items-start gap-4 rounded-xl border border-zinc-700 bg-zinc-800/40 p-4 shadow">
      <div className="h-24 w-24 rounded bg-zinc-700" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-1/2 rounded bg-zinc-600" />
        <div className="h-4 w-2/3 rounded bg-zinc-700" />
        <div className="h-3 w-1/3 rounded bg-zinc-600" />
      </div>
    </div>
  );
}
