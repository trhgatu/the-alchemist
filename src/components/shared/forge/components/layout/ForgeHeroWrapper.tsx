// src/components/layout/HeroWrapper.tsx

'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';

interface HeroWrapperProps {
  children: ReactNode;
  className?: string;
  showGrid?: boolean;
}

export const ForgeHeroWrapper = ({
  children,
  className,
  showGrid = true,
}: HeroWrapperProps) => {
  return (
    <section
      className={cn('relative w-full opacity-0 overflow-hidden min-h-screen', className)}
    >
      {showGrid && (
        <div className="absolute inset-0">
          <AnimatedGridPattern
            maxOpacity={0.2}
            strokeDasharray={4}
            numSquares={30}
            duration={2}
            repeatDelay={0.7}
            className="w-full h-full"
          />
        </div>
      )}
      <div className="relative z-10 min-h-[80vh] sm:min-h-screen md:min-h-screen flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};
