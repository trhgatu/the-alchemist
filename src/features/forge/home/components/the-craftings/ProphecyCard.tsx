import { Project } from "@/types";
import Link from "next/link";

interface ProphecyCardProps {
  project: Project;
  index: number;
  activeIndex: number;
}

export function ProphecyCard({ project: p, index: i, activeIndex }: ProphecyCardProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center">
      <div
        className={`relative group/card bg-neutral-950/90 p-10 md:p-12 rounded-3xl transition-all duration-700 ease-out transform-gpu overflow-hidden min-h-[60vh] flex flex-col border
                      ${
                        i === activeIndex
                          ? "translate-x-0 opacity-100 border-white/30"
                          : "translate-x-20 opacity-30 grayscale border-white/10"
                      }`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-50" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl opacity-50 mix-blend-overlay" />
        </div>

        {i === activeIndex && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[80%] bg-gradient-to-b from-transparent via-white/40 to-transparent blur-md shadow-[0_0_30px_white]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-gradient-to-b from-transparent via-gray-200 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.9)] opacity-90" />
            <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-2xl mix-blend-screen pointer-events-none" />
            <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-2xl mix-blend-screen pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 mix-blend-screen opacity-30" />
          </>
        )}

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-8 border-b border-white/5 pb-6 flex justify-between items-start">
            <div>
              <span className="text-white/50 font-space-mono text-[10px] tracking-[0.4em] uppercase block mb-3 pl-1">
                Prophecy 0{i + 1}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-kings text-white/90 leading-tight drop-shadow-sm group-hover/card:text-white transition-colors duration-500">
                {p.name}
              </h2>
            </div>
            <div className="hidden md:block">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover/card:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
              </div>
            </div>
          </div>

          <div className="prose prose-invert prose-lg mb-8 font-serif text-neutral-400 leading-relaxed max-w-none group-hover/card:text-neutral-300 transition-colors duration-700">
            <p>{p.description}</p>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h4 className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-neutral-700" />
                  Runes & Sigils
                </h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 border border-white/5 bg-white/[0.02] rounded text-[10px] uppercase tracking-wider font-space-mono text-neutral-500 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-crosshair"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-white/5">
              <Link
                href={`/project/${p.slug}`}
                className="group/btn flex-1 flex items-center justify-between px-6 py-4 border border-white/5 rounded-none hover:border-white/20 transition-all bg-transparent hover:bg-white/[0.02] relative overflow-hidden"
              >
                <div className="absolute inset-0 w-0 bg-white/5 transition-all duration-500 group-hover/btn:w-full" />
                <span className="font-space-mono text-xs text-neutral-400 uppercase tracking-widest group-hover/btn:text-white transition-colors relative z-10">
                  Access Archives
                </span>
                <span className="text-neutral-600 text-lg transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-white relative z-10">
                  →
                </span>
              </Link>

              {p.link && (
                <Link
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex-1 flex items-center justify-between px-6 py-4 border border-white/5 rounded-none hover:border-white/30 transition-all bg-transparent hover:bg-white/5 relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-0 bg-white/5 transition-all duration-500 group-hover/btn:w-full" />
                  <span className="font-space-mono text-xs text-neutral-400 uppercase tracking-widest group-hover/btn:text-white transition-colors relative z-10">
                    Live Signal
                  </span>
                  <span className="text-neutral-600 text-lg transition-transform group-hover/btn:-translate-y-1 group-hover/btn:text-white relative z-10">
                    ↗
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
