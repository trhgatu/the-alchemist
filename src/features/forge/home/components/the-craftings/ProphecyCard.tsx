import { Project } from "@/types";
import Link from "next/link";

interface ProphecyCardProps {
  project: Project;
  index: number;
  activeIndex: number;
}

export function ProphecyCard({ project: p, index: i, activeIndex }: ProphecyCardProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center pr-4 md:pr-12">
      <div
        className={`relative group/card p-8 md:p-10 rounded-3xl transition-all duration-700 ease-out transform-gpu overflow-hidden min-h-[50vh] flex flex-col border
                      bg-neutral-950/90 border-white/50 text-white shadow-none
                      ${
                        i === activeIndex
                          ? "translate-x-0 opacity-100 border-white/30"
                          : "translate-x-20 opacity-30 grayscale"
                      }`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-screen"
            style={{
              backgroundImage: `url("/assets/images/craftings/texture_washi.png")`,
              backgroundSize: "cover",
            }}
          />
        </div>

        {i === activeIndex && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/60" />
              <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/60" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/60" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/60" />
            </div>
            <div className="absolute -right-8 -bottom-24 text-[20rem] leading-none font-kings text-white/[0.08] select-none pointer-events-none z-0 rotate-[-10deg] mix-blend-screen blur-[1px]">
              {(i + 1).toString().padStart(2, "0")}
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            <div className="absolute left-[2px] top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-gradient-to-b from-transparent via-white/30 to-transparent" />

            {/* Light Beam / Ink Bleed Effect */}
            <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60 blur-2xl mix-blend-screen pointer-events-none" />
            <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-[200px] h-[300px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 blur-xl mix-blend-screen pointer-events-none" />
            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-[100px] h-[200px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 blur-lg mix-blend-screen pointer-events-none" />
          </>
        )}

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6 border-b pb-4 flex justify-between items-start transition-colors duration-500 border-white/60 border-double border-b-[3px]">
            <div>
              <span className="font-space-mono text-[10px] tracking-[0.4em] uppercase block mb-3 pl-1 transition-colors duration-500 text-white/50">
                Prophecy 0{i + 1}
              </span>
              <h2 className="font-kings leading-tight drop-shadow-sm transition-colors duration-500 text-4xl md:text-5xl lg:text-6xl text-white/90 group-hover/card:text-white">
                {p.name}
              </h2>
            </div>
            <div className="hidden md:block">
              <div className="w-12 h-12 rounded-full border flex items-center justify-center transition-all border-white/10 opacity-50 group-hover/card:opacity-100">
                <div className="w-1 h-1 rounded-full shadow-[0_0_10px_white] bg-white" />
              </div>
            </div>
          </div>

          <div className="prose prose-lg mb-8 font-serif leading-relaxed max-w-none transition-colors duration-700 prose-invert text-neutral-300 group-hover/card:text-neutral-200">
            <p>{p.description}</p>
          </div>

          <div className="mt-auto border-t-2 border-white/10">
            <div className="flex justify-between items-end mb-8 pt-8">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors text-white/80">
                  <span className="w-4 h-[1px] bg-white/40" />
                  Runes & Sigils
                </h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 border rounded-sm text-[10px] uppercase tracking-wider font-space-mono transition-all cursor-crosshair border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 border-t transition-colors duration-500 border-transparent pt-2">
              <Link
                href={`/project/${p.slug}`}
                className="group/btn flex-1 flex items-center justify-between px-6 py-4 transition-all relative overflow-hidden border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                {/* Hover Effects */}
                <div className="absolute inset-0 w-0 transition-all duration-500 group-hover/btn:w-full bg-white/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                <span className="font-space-mono text-xs uppercase tracking-widest transition-colors relative z-10 text-white/70 group-hover/btn:text-white font-medium">
                  Access Archives
                </span>
                <span className="text-lg transition-transform group-hover/btn:translate-x-1 relative z-10 text-white/50 group-hover/btn:text-white">
                  →
                </span>
              </Link>

              {p.link && (
                <Link
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex-1 flex items-center justify-between px-6 py-4 transition-all relative overflow-hidden border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  {/* Hover Effects */}
                  <div className="absolute inset-0 w-0 transition-all duration-500 group-hover/btn:w-full bg-white/5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                  <span className="font-space-mono text-xs uppercase tracking-widest transition-colors relative z-10 text-white/70 group-hover/btn:text-white font-medium">
                    Live Signal
                  </span>
                  <span className="text-lg transition-transform group-hover/btn:-translate-y-1 relative z-10 text-white/50 group-hover/btn:text-white">
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
