import { Project } from "@/types";
import { forwardRef } from "react";

interface OrbitalSystemProps {
  projects: Project[];
  activeIndex: number;
  dimensions: { width: number; height: number };
}

export const OrbitalSystem = forwardRef<HTMLDivElement, OrbitalSystemProps>(
  ({ projects, activeIndex, dimensions }, ref) => {
    const radius = dimensions.height * 0.55;
    const centerX = -radius + 140;

    return (
      <div ref={ref} className="w-1/3 h-full relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* --- ASTROLABE / CELESTIAL CHART LAYERS --- */}
          <defs>
            <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
            </linearGradient>
            <mask id="fadeMask">
              <linearGradient id="maskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="black" />
                <stop offset="20%" stopColor="white" />
                <stop offset="80%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#maskGrad)" />
            </mask>
          </defs>

          <g mask="url(#fadeMask)">
            {/* 1. OUTER SCALE (Degree Ticks) */}
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius + 40}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeDasharray="1 8"
              opacity="0.08"
            />
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius + 45}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.1"
            />

            {/* 2. CONSTELLATION RING (Dashed) */}
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius + 20}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.05"
              strokeDasharray="4 4"
            />

            {/* 3. MAIN ORBIT PATH (Glowing) */}
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius}`}
              fill="none"
              stroke="url(#orbitalGradient)"
              strokeWidth="1.5"
              opacity="0.5"
            />

            {/* 4. INNER ALIGNMENT RINGS */}
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius - 30}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.1"
            />
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius - 35}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray="0.5 15"
              opacity="0.1"
            />

            {/* 5. GEOMETRIC CROSSHAIRS (The 'Scope') */}
            <line
              x1={centerX - radius * 1.2}
              y1="45%"
              x2={centerX + radius * 1.2}
              y2="45%"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.05"
            />
            <line
              x1={centerX}
              y1={dimensions.height * 0.45 - radius}
              x2={centerX}
              y2={dimensions.height * 0.45 + radius}
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.05"
            />

            {/* 6. DECORATIVE PLANETARY NODES */}
            <circle
              cx={centerX + Math.cos(-0.5) * radius}
              cy={Math.sin(-0.5) * radius + dimensions.height * 0.45}
              r="2"
              fill="white"
              opacity="0.4"
            />
            <circle
              cx={centerX + Math.cos(2.0) * (radius - 30)}
              cy={Math.sin(2.0) * (radius - 30) + dimensions.height * 0.45}
              r="1.5"
              fill="white"
              opacity="0.3"
            />

            {/* 7. STAR CHART LINES (Connecting Nodes) */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = i * 60 * (Math.PI / 180); // Hexagon
              const r = radius - 30;
              const x = centerX + Math.cos(angle) * r;
              const y = Math.sin(angle) * r + dimensions.height * 0.45;
              return (
                <g key={i}>
                  <line
                    x1={centerX}
                    y1="45%"
                    x2={x}
                    y2={y}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    opacity="0.03"
                  />
                  <circle cx={x} cy={y} r="1" fill="white" opacity="0.2" />
                </g>
              );
            })}
          </g>
        </svg>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {projects.map((p, i) => (
            <div
              key={p._id || i}
              className={`sidebar-item absolute left-0 top-0 flex items-center gap-4 origin-left w-full pointer-events-auto cursor-pointer group`}
            >
              <div className="relative group/token">
                <div
                  className={`relative w-24 h-24 transition-all duration-500 ease-out z-10 flex items-center justify-center
                              ${i === activeIndex ? "scale-110" : "opacity-90 scale-75"}`}
                >
                  {i === activeIndex && (
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
                  )}
                  <div className="relative group-hover:scale-110 transition-transform duration-500">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      className={`transition-all duration-700 ${i === activeIndex ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" : "drop-shadow-none opacity-60 grayscale"}`}
                    >
                      <defs>
                        <linearGradient
                          id={`starGradient-${i}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="50%" stopColor="#e2e8f0" />
                          <stop offset="100%" stopColor="#94a3b8" />
                        </linearGradient>
                        <filter id="glow-filter">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <path
                        d="M50 20 L60 40 L80 50 L60 60 L50 80 L40 60 L20 50 L40 40 Z"
                        fill={i === activeIndex ? "white" : "#cbd5e1"}
                        opacity={i === activeIndex ? "0.5" : "0.3"}
                        className="transition-all duration-700"
                      />

                      <path
                        d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z"
                        fill={`url(#starGradient-${i})`}
                        className={`transition-all duration-700 ${i === activeIndex ? "brightness-125" : "brightness-75"}`}
                      />

                      <circle
                        cx="50"
                        cy="50"
                        r="6"
                        fill="white"
                        className={`transition-all duration-500 ${i === activeIndex ? "shadow-[0_0_20px_white]" : ""}`}
                      />

                      {i === activeIndex && (
                        <>
                          <circle cx="50" cy="50" r="3" fill="#cbd5e1" />
                          <path
                            d="M50 10 L50 90 M10 50 L90 50"
                            stroke="white"
                            strokeWidth="0.5"
                            opacity="0.5"
                          />
                        </>
                      )}
                    </svg>

                    {i === activeIndex && (
                      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-1 bg-white blur-md opacity-60" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-40 bg-white blur-md opacity-60" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 blur-xl rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`relative transition-all duration-1000 ease-out flex items-center -ml-8 scale-110
                             ${i === activeIndex ? "w-56 md:w-96 opacity-100 translate-x-0" : "w-0 opacity-0"}`}
              >
                <svg
                  width="100%"
                  height="200"
                  className="overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`godRayGradient-${i}`} x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id={`coreBeamGradient-${i}`}
                      x1="0%"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                    >
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="90%" stopColor="white" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <filter id="intense-glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M0 100 L100% 0 L100% 200 Z"
                    fill={`url(#godRayGradient-${i})`}
                    opacity="0.5"
                  />

                  <path
                    d="M0 100 L100% 0 M0 100 L100% 200"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />

                  <path
                    d="M0 100 L95% 40 L95% 160 Z"
                    fill={`url(#coreBeamGradient-${i})`}
                    opacity="0.9"
                    style={{ filter: "blur(2px)" }}
                  />

                  <path
                    d="M0 100 L90% 90 L90% 110 Z"
                    fill="white"
                    opacity="1"
                    filter="url(#intense-glow)"
                  />

                  <circle
                    cx="10%"
                    cy="100"
                    r="2"
                    fill="white"
                    className="animate-[flow-right_2s_linear_infinite]"
                    opacity="1"
                  />
                  <circle
                    cx="20%"
                    cy="90"
                    r="1.5"
                    fill="white"
                    className="animate-[flow-right_3s_linear_infinite]"
                    style={{ animationDelay: "0.4s" }}
                    opacity="0.9"
                  />
                  <circle
                    cx="15%"
                    cy="110"
                    r="2.5"
                    fill="white"
                    className="animate-[flow-right_4s_linear_infinite]"
                    style={{ animationDelay: "1.2s" }}
                    opacity="1"
                  />
                  <circle
                    cx="5%"
                    cy="95"
                    r="1.5"
                    fill="white"
                    className="animate-[flow-right_2.5s_linear_infinite]"
                    style={{ animationDelay: "0.8s" }}
                    opacity="1"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

OrbitalSystem.displayName = "OrbitalSystem";
