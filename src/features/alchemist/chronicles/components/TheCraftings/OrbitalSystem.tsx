import { Project } from "@/types";
import { forwardRef } from "react";
import { FlameStars } from "./components/FlameStars";

interface OrbitalSystemProps {
  projects: Project[];
  /** Fractional index of the work in front, written by the scroll */
  progressRef: React.RefObject<number>;
  dimensions: { width: number; height: number };
  /** Bring work `i` to the front */
  onSelect: (i: number) => void;
}

/**
 * The works as fires burning in the night. They sit on an unseen orbit that
 * turns as the visitor scrolls, bringing one fire forward at a time; each
 * carries its chapter numeral, and a click brings that work forward.
 */
export const OrbitalSystem = forwardRef<HTMLDivElement, OrbitalSystemProps>(
  ({ projects, progressRef, dimensions, onSelect }, ref) => (
    <div
      ref={ref}
      className="hidden md:block w-[300px] shrink-0 h-full relative overflow-visible z-10"
    >
      <FlameStars
        names={projects.map((p) => p.name)}
        progressRef={progressRef}
        height={dimensions.height}
        onSelect={onSelect}
      />
    </div>
  )
);

OrbitalSystem.displayName = "OrbitalSystem";
