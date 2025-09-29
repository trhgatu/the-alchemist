'use client';
import Image from 'next/image';

const leaves = [
  '/assets/images/leaf-1.png',
  '/assets/images/leaf-2.png',
  '/assets/images/leaf-3.png',
  '/assets/images/leaf-4.png',
  '/assets/images/leaf-5.png',
];

interface FallingLeavesProps {
  count?: number;
  minDuration?: number;
  maxDuration?: number;
  delayRange?: number;
  size?: number;
  opacity?: number;
}

export function FallingLeaves({
  count = 15,
  minDuration = 10,
  maxDuration = 20,
  delayRange = 10,
  size = 40,
  opacity = 0.8,
}: FallingLeavesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      {Array.from({ length: count }).map((_, i) => {
        const leaf = leaves[i % leaves.length];
        const delay = Math.random() * delayRange;
        const duration = minDuration + Math.random() * (maxDuration - minDuration);
        const left = Math.random() * 100;

        return (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            <Image
              src={leaf}
              alt="Falling leaf"
              width={size}
              height={size}
              className="opacity-80"
              style={{ opacity }}
            />
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
