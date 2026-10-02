import { cn } from "@/lib/utils";
import { OglStarField } from "@/features/alchemist/shared/atmosphere/StarField/OglStarField";

/** Night-sky ground with a low forge glow, shared by the craftings pages. */
export function ArchiveGround({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative min-h-screen bg-[#070605] text-[#e9dfcc] selection:bg-amber-300 selection:text-black",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-70">
          <OglStarField />
        </div>
        {/* Embers of the forge, low on the horizon */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_120%,rgba(180,83,9,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6))]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
