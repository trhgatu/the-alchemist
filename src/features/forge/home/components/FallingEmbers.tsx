'use client';

interface FallingEmbersProps {
    count?: number;
    minDuration?: number;
    maxDuration?: number;
    minSize?: number;
    maxSize?: number;
    color?: string;
}

export function FallingEmbers({
    count = 20,
    minDuration = 5,
    maxDuration = 15,
    minSize = 2,
    maxSize = 6,
    color = 'bg-amber-400',
}: FallingEmbersProps) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
            {Array.from({ length: count }).map((_, i) => {
                const size = Math.random() * (maxSize - minSize) + minSize;
                const left = Math.random() * 100;
                const duration = Math.random() * (maxDuration - minDuration) + minDuration;
                const delay = Math.random() * 5;

                return (
                    <div
                        key={i}
                        className={`absolute rounded-full ${color} animate-ember`}
                        style={{
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: Math.random() * 0.5 + 0.2, // Random opacity
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            boxShadow: `0 0 ${size * 2}px ${size}px rgba(251, 191, 36, 0.4)`, // Amber glow
                        }}
                    />
                );
            })}

            <style jsx global>{`
        @keyframes ember-float {
          0% {
            transform: translateY(110vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
             opacity: 0.8;
             transform: translateY(50vh) translateX(20px);
          }
          100% {
            transform: translateY(-10vh) translateX(-20px);
            opacity: 0;
          }
        }
        .animate-ember {
          animation-name: ember-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
}
