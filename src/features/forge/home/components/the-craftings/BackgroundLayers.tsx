import { Project } from "@/types";
import Image from "next/image";

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

      <div className="absolute inset-0 bg-neutral-950 z-0" />

      {/* Cosmic Immersion Background Layer - Elevated */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {projects.map((p, i) => (
          <div
            key={`bg-${i}`}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out
                       ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            {p.thumbnail && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{ animation: "subtle-zoom 20s infinite alternate linear" }}
              >
                <Image
                  src={p.thumbnail}
                  alt=""
                  fill
                  className="object-cover blur-[80px] saturate-150 opacity-50 mix-blend-screen"
                  priority={i === 0}
                />
              </div>
            )}

            {/* Living Aurora Gradient Mesh - Boosted Visibility */}
            {i === activeIndex && (
              <>
                <div
                  className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-500/20 blur-[100px] mix-blend-screen animate-pulse"
                  style={{ animationDuration: "8s" }}
                />
                <div
                  className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-500/20 blur-[100px] mix-blend-screen animate-pulse"
                  style={{ animationDuration: "10s", animationDelay: "1s" }}
                />
                <div
                  className="absolute top-[30%] left-[30%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[80px] mix-blend-overlay"
                  style={{ animation: "aurora-shift 15s infinite ease-in-out" }}
                />
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/20 to-neutral-950" />
          </div>
        ))}
        {/* Noise Overlay for Obsidian Feel */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('/assets/noise.png')] bg-repeat mix-blend-overlay" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950 pointer-events-none z-0" />
    </>
  );
}
