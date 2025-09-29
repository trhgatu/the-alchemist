export function FoundationListItemSkeleton() {
  return (
    <div className="animate-pulse flex items-start gap-4 rounded-xl border border-orange-700 bg-orange-900/30 p-4 shadow">
      <div className="h-24 w-24 rounded bg-orange-800" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-1/2 rounded bg-orange-700" />
        <div className="h-4 w-2/3 rounded bg-orange-800" />
        <div className="h-3 w-1/3 rounded bg-orange-700" />
      </div>
    </div>
  );
}
