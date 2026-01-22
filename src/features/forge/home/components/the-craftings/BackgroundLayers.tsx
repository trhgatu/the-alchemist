import { Project } from "@/types";

interface BackgroundLayersProps {
  projects: Project[];
  activeIndex: number;
}

export function BackgroundLayers({ projects, activeIndex }: BackgroundLayersProps) {
  return (
    <>
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.2); }
          100% { transform: scale(1.4); }
        }
        @keyframes aurora-shift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          33% { transform: translate(10%, -5%) scale(1.1); opacity: 0.6; }
          66% { transform: translate(-5%, 5%) scale(1.05); opacity: 0.4; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
        }
        @keyframes flow-right {
          0% { transform: translateX(-20%); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateX(120%); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {projects.map((p, i) => (
          <div
            key={`bg-${i}`}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out
                       ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
          ></div>
        ))}
      </div>
    </>
  );
}
