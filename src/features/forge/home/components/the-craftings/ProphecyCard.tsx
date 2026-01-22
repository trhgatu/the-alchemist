import { Project } from "@/types";
import Link from "next/link";

interface ProphecyCardProps {
  project: Project;
  index: number;
  activeIndex: number;
  isDayMode?: boolean;
}

export function ProphecyCard({
  project: p,
  index: i,
  activeIndex,
  isDayMode = false,
}: ProphecyCardProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center pr-4 md:pr-12">
      <div
        className={`relative group/card p-8 md:p-10 rounded-3xl transition-all duration-700 ease-out transform-gpu overflow-hidden min-h-[50vh] flex flex-col border
                      ${
                        isDayMode
                          ? "bg-[#fafaf9]/95 border-stone-200/50 text-stone-800"
                          : "bg-neutral-950/90 border-white/10 text-white shadow-none"
                      }
                      ${
                        i === activeIndex
                          ? isDayMode
                            ? "translate-x-0 opacity-100 border-stone-300"
                            : "translate-x-0 opacity-100 border-white/30"
                          : "translate-x-20 opacity-30 grayscale"
                      }`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          {isDayMode && (
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
              style={{
                backgroundImage: `url("/assets/images/craftings/texture_washi.png")`,
                backgroundSize: "cover",
              }}
            />
          )}

          {/* NIGHT MODE EFFECTS */}
          {!isDayMode && (
            <>
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-50" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl opacity-50 mix-blend-overlay" />
            </>
          )}
        </div>

        {i === activeIndex && (
          <>
            {/* DAY MODE RAYS (Dark/Ink) & TECHNICAL DETAILS */}
            {isDayMode && (
              <>
                {/* Dot Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#44403c_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15] pointer-events-none" />

                {/* Corner Accents (Technical Brackets) */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-stone-800" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-stone-800" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-stone-800" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-stone-800" />
                </div>

                {/* Manuscript Watermark - BOLD & BLENDED */}
                <div className="absolute -right-8 -bottom-24 text-[20rem] leading-none font-kings text-stone-900/[0.08] select-none pointer-events-none z-0 rotate-[-10deg] mix-blend-multiply blur-[1px]">
                  {(i + 1).toString().padStart(2, "0")}
                </div>

                {/* Coordinates Stamp */}
                <div className="absolute top-8 right-10 flex flex-col items-end gap-0.5 pointer-events-none opacity-60">
                  <span className="font-space-mono text-[8px] text-stone-600 tracking-widest">
                    SEC.0{i + 1}
                  </span>
                  <span className="font-space-mono text-[8px] text-stone-600 tracking-widest">
                    LAT.{(42 + i * 5).toFixed(4)}
                  </span>
                  <span className="font-space-mono text-[8px] text-stone-600 tracking-widest">
                    LNG.{(108 + i * 3).toFixed(4)}
                  </span>
                </div>

                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-stone-400/50 to-transparent" />
                <div className="absolute left-[2px] top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-gradient-to-b from-transparent via-stone-300/30 to-transparent" />
              </>
            )}

            {/* NIGHT MODE RAYS (Light/Glow) & COSMIC HUD */}
            {!isDayMode && (
              <>
                {/* Star Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.03] pointer-events-none" />

                {/* HUD Corner Accents */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                  {/* Glowing Dots at corners */}
                  <div className="absolute top-6 left-6 w-1 h-1 bg-white/50 rounded-full shadow-[0_0_5px_white]" />
                  <div className="absolute top-6 right-6 w-1 h-1 bg-white/50 rounded-full shadow-[0_0_5px_white]" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/50 rounded-full shadow-[0_0_5px_white]" />
                  <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/50 rounded-full shadow-[0_0_5px_white]" />
                </div>

                {/* Starlight Watermark */}
                <div className="absolute -right-8 -bottom-24 text-[20rem] leading-none font-kings text-white/[0.02] select-none pointer-events-none z-0 rotate-[-10deg] blur-[2px]">
                  {(i + 1).toString().padStart(2, "0")}
                </div>

                {/* HUD Coordinates Stamp */}
                <div className="absolute top-8 right-10 flex flex-col items-end gap-0.5 pointer-events-none opacity-40">
                  <span className="font-space-mono text-[8px] text-cyan-200/70 tracking-widest drop-shadow-[0_0_2px_rgba(0,255,255,0.3)]">
                    SEC.0{i + 1}
                  </span>
                  <span className="font-space-mono text-[8px] text-emerald-200/70 tracking-widest drop-shadow-[0_0_2px_rgba(0,255,100,0.3)]">
                    LAT.{(42 + i * 5).toFixed(4)}
                  </span>
                  <span className="font-space-mono text-[8px] text-purple-200/70 tracking-widest drop-shadow-[0_0_2px_rgba(200,100,255,0.3)]">
                    LNG.{(108 + i * 3).toFixed(4)}
                  </span>
                </div>

                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[80%] bg-gradient-to-b from-transparent via-white/40 to-transparent blur-md shadow-[0_0_30px_white]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-gradient-to-b from-transparent via-gray-200 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.9)] opacity-90" />
                <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-2xl mix-blend-screen pointer-events-none" />
                <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-2xl mix-blend-screen pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 mix-blend-screen opacity-30" />
              </>
            )}
          </>
        )}

        <div className="relative z-10 flex-1 flex flex-col">
          <div
            className={`mb-6 border-b pb-4 flex justify-between items-start transition-colors duration-500 ${isDayMode ? "border-stone-800 border-double border-b-[3px]" : "border-white/5"}`}
          >
            <div>
              <span
                className={`font-space-mono text-[10px] tracking-[0.4em] uppercase block mb-3 pl-1 transition-colors duration-500 ${isDayMode ? "text-stone-500 font-bold" : "text-white/50"}`}
              >
                Prophecy 0{i + 1}
              </span>
              <h2
                className={`font-kings leading-tight drop-shadow-sm transition-colors duration-500 ${isDayMode ? "text-4xl md:text-5xl lg:text-6xl text-stone-900" : "text-3xl md:text-4xl lg:text-5xl text-white/90 group-hover/card:text-white"}`}
              >
                {p.name}
              </h2>
            </div>
            <div className="hidden md:block">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDayMode ? "border-stone-900/20 opacity-100" : "border-white/10 opacity-50 group-hover/card:opacity-100"}`}
              >
                <div
                  className={`w-1 h-1 rounded-full shadow-[0_0_10px_white] ${isDayMode ? "bg-stone-900 shadow-none scale-150" : "bg-white"}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`prose prose-lg mb-8 font-serif leading-relaxed max-w-none transition-colors duration-700 ${isDayMode ? "text-stone-600 prose-p:text-stone-600" : "prose-invert text-neutral-400 group-hover/card:text-neutral-300"}`}
          >
            <p>{p.description}</p>
          </div>

          <div className={`mt-auto ${isDayMode ? "border-t-2 border-stone-100/50" : ""}`}>
            <div className="flex justify-between items-end mb-8 pt-8">
              <div>
                <h4
                  className={`text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors ${isDayMode ? "text-stone-900" : "text-neutral-600"}`}
                >
                  <span
                    className={`w-4 h-[1px] ${isDayMode ? "bg-stone-900" : "bg-neutral-700"}`}
                  />
                  Runes & Sigils
                </h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech?.map((t, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 border rounded-sm text-[10px] uppercase tracking-wider font-space-mono transition-all cursor-crosshair
                                  ${
                                    isDayMode
                                      ? "border-stone-900/20 text-stone-600 hover:border-stone-900 hover:bg-stone-900 hover:text-white shadow-sm bg-white/50"
                                      : "border-white/5 bg-white/[0.02] text-neutral-500 hover:bg-white/10 hover:text-white hover:border-white/20 rounded"
                                  }`}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col md:flex-row gap-4 border-t transition-colors duration-500 ${isDayMode ? "border-transparent pt-2" : "border-white/5 pt-8"}`}
            >
              <Link
                href={`/project/${p.slug}`}
                className={`group/btn flex-1 flex items-center justify-between px-6 py-4 transition-all relative overflow-hidden
                           ${
                             isDayMode
                               ? "border-2 border-stone-900 bg-transparent hover:bg-stone-900 text-stone-900 hover:text-white"
                               : "border border-white/5 hover:border-white/20 bg-transparent hover:bg-white/[0.02] rounded-none"
                           }`}
              >
                {!isDayMode && (
                  <div className="absolute inset-0 w-0 transition-all duration-500 group-hover/btn:w-full bg-white/5" />
                )}

                <span
                  className={`font-space-mono text-xs uppercase tracking-widest transition-colors relative z-10 ${isDayMode ? "font-bold" : "text-neutral-400 group-hover/btn:text-white"}`}
                >
                  Access Archives
                </span>
                <span
                  className={`text-lg transition-transform group-hover/btn:translate-x-1 relative z-10 ${isDayMode ? "" : "text-neutral-600 group-hover/btn:text-white"}`}
                >
                  →
                </span>
              </Link>

              {p.link && (
                <Link
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/btn flex-1 flex items-center justify-between px-6 py-4 transition-all relative overflow-hidden
                             ${
                               isDayMode
                                 ? "border-2 border-stone-200 hover:border-stone-900/50 bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900"
                                 : "border border-white/5 hover:border-white/30 bg-transparent hover:bg-white/5 rounded-none"
                             }`}
                >
                  {!isDayMode && (
                    <div className="absolute inset-0 w-0 transition-all duration-500 group-hover/btn:w-full bg-white/5" />
                  )}

                  <span
                    className={`font-space-mono text-xs uppercase tracking-widest transition-colors relative z-10 ${isDayMode ? "font-bold" : "text-neutral-400 group-hover/btn:text-white"}`}
                  >
                    Live Signal
                  </span>
                  <span
                    className={`text-lg transition-transform group-hover/btn:-translate-y-1 relative z-10 ${isDayMode ? "" : "text-neutral-600 group-hover/btn:text-white"}`}
                  >
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
