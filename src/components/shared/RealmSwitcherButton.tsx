'use client';

import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RealmTransitionLayer } from './RealmTransitionLayer';
import { Slot } from '@radix-ui/react-slot';

type Props = {
  to: string;
  label?: string;
  message: string;
  align?: 'left' | 'right' | 'center';
  theme?: 'forge' | 'verse';
  asChild?: boolean;
  children?: ReactNode;
};

export function RealmGateButton({
  to,
  label,
  message,
  align = 'right',
  theme = 'forge',
  asChild = false,
  children,
}: Props) {
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);

  const handleClick = () => setShowTransition(true);

  if (asChild && children) {
    return (
      <>
        <Slot onClick={handleClick}>{children}</Slot>
        <AnimatePresence>
          {showTransition && (
            <RealmTransitionLayer
              message={message}
              onComplete={() => router.push(to)}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`fixed z-30 px-5 py-3 rounded-md border border-white text-white font-semibold
          transition-all duration-300 hover:scale-105
          ${align === 'left' && 'left-6 top-1/2 -translate-y-1/2'}
          ${align === 'right' && 'right-6 top-1/2 -translate-y-1/2'}
          ${align === 'center' && 'left-1/2 top-2/3 -translate-x-1/2'}
        `}
      >
        {label}
      </button>

      <AnimatePresence>
        {showTransition && (
          <RealmTransitionLayer
            message={message}
            onComplete={() => router.push(to)}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </>
  );
}
