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
      <div ref={ref} className="w-[300px] shrink-0 h-full relative overflow-visible z-10">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0.02" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.02" />
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
              stroke="#8b5a2b"
              strokeWidth="6"
              strokeDasharray="1 8"
              opacity="0.12"
            />
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius + 45}`}
              fill="none"
              stroke="#b45309"
              strokeWidth="0.5"
              opacity="0.15"
            />

            {/* 2. CONSTELLATION RING (Dashed) */}
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius + 20}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
              opacity="0.1"
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
              opacity="0.6"
            />

            {/* 4. INNER ALIGNMENT RINGS */}
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius - 30}`}
              fill="none"
              stroke="#8b5a2b"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <circle
              cx={centerX}
              cy="45%"
              r={`${radius - 35}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeDasharray="0.5 15"
              opacity="0.25"
            />

            {/* 5. GEOMETRIC CROSSHAIRS (The 'Scope') */}
            <line
              x1={centerX - radius * 1.2}
              y1="45%"
              x2={centerX + radius * 1.2}
              y2="45%"
              stroke="#8b5a2b"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <line
              x1={centerX}
              y1={dimensions.height * 0.45 - radius}
              x2={centerX}
              y2={dimensions.height * 0.45 + radius}
              stroke="#8b5a2b"
              strokeWidth="0.5"
              opacity="0.2"
            />

            {/* 6. DECORATIVE PLANETARY NODES */}
            <circle
              cx={centerX + Math.cos(-0.5) * radius}
              cy={Math.sin(-0.5) * radius + dimensions.height * 0.45}
              r="2"
              fill="#f59e0b"
              opacity="0.5"
            />
            <circle
              cx={centerX + Math.cos(2.0) * (radius - 30)}
              cy={Math.sin(2.0) * (radius - 30) + dimensions.height * 0.45}
              r="1.5"
              fill="#b45309"
              opacity="0.4"
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
                    stroke="#8b5a2b"
                    strokeWidth="0.5"
                    opacity="0.08"
                  />
                  <circle cx={x} cy={y} r="1" fill="#f59e0b" opacity="0.3" />
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
                    <div className="absolute inset-0 bg-amber-400/25 blur-2xl rounded-full scale-125 pointer-events-none" />
                  )}
                  <div className="relative group-hover:scale-110 transition-transform duration-500">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      className={`transition-all duration-700 ${i === activeIndex ? "drop-shadow-[0_0_20px_rgba(245,158,11,0.9)] drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]" : "drop-shadow-none opacity-50 grayscale"}`}
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
                          <stop offset="25%" stopColor="#fef3c7" />
                          <stop offset="65%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#b45309" />
                        </linearGradient>

                        <linearGradient
                          id={`diagonalStarGrad-${i}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#78350f" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>

                      {/* 🌟 UNIFIED 8-POINTED STAR (Khối 8 cánh liền mạch tĩnh lặng, sắc nét) */}
                      <g>
                        {/* 4 Cánh Chéo 45 độ */}
                        <path
                          d="M50 10 L57 43 L90 50 L57 57 L50 90 L43 57 L10 50 L43 43 Z"
                          transform="rotate(45 50 50)"
                          fill={`url(#diagonalStarGrad-${i})`}
                          className="transition-all duration-700"
                        />

                        {/* 4 Cánh Chính Thẳng Đứng */}
                        <path
                          d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z"
                          fill={`url(#starGradient-${i})`}
                          className={`transition-all duration-700 ${i === activeIndex ? "brightness-125" : "brightness-75"}`}
                        />
                      </g>

                      {/* 🌟 3. CELESTIAL ASTROLABE INNER RINGS (Vòng tròn thiên văn trung tâm tĩnh) */}
                      {i === activeIndex && (
                        <>
                          <circle
                            cx="50"
                            cy="50"
                            r="18"
                            fill="none"
                            stroke="#fde68a"
                            strokeWidth="0.75"
                            strokeDasharray="2 3"
                            opacity="0.8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="12"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="0.5"
                            opacity="0.6"
                          />
                          <path
                            d="M50 12 L50 88 M12 50 L88 50"
                            stroke="#ffffff"
                            strokeWidth="0.75"
                            opacity="0.8"
                          />
                        </>
                      )}

                      {/* 🌟 4. LUMINOUS CORE JEWEL (Tâm ngọc phát sáng) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="6"
                        fill="#ffffff"
                        className={`transition-all duration-500 ${i === activeIndex ? "shadow-[0_0_25px_#ffffff]" : ""}`}
                      />
                      <circle cx="50" cy="50" r="3" fill="#fef3c7" />
                    </svg>

                    {/* High-intensity Lens Flare on Active Star */}
                    {i === activeIndex && (
                      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-1 bg-gradient-to-r from-transparent via-amber-100 to-transparent blur-[1px] opacity-90" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-52 bg-gradient-to-b from-transparent via-amber-100 to-transparent blur-[1px] opacity-90" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/30 blur-2xl rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

OrbitalSystem.displayName = "OrbitalSystem";
