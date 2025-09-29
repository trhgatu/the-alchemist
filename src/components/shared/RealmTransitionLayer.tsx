import { motion } from 'framer-motion';
import { useEffect } from 'react';

type RealmTransitionLayerProps = {
  message: string;
  onComplete: () => void;
  theme?: 'forge' | 'verse';
};

const ForgeSquareLights = () => {
  return (
    <>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
      />

      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-orange-500/70 to-transparent"
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-transparent via-orange-500/70 to-transparent"
      />
    </>
  );
};

export function RealmTransitionLayer({
  message,
  onComplete,
  theme = 'forge',
}: RealmTransitionLayerProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black" />

      {theme === 'forge' ? (
        <ForgeTransition message={message} />
      ) : (
        <VerseTransition message={message} />
      )}
    </motion.div>
  );
}

const ForgeTransition = ({ message }: { message: string }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-stone-900" />
    <ForgeSquareLights />

    {/* Fantasy rune/tech border */}
    <div className="absolute inset-4 border-4 border-orange-400/60 rounded-xl shadow-[0_0_40px_10px_rgba(255,152,0,0.15)] animate-glow" />

    {/* Particle sparkles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{
          duration: 1.5 + Math.random(),
          delay: Math.random(),
          repeat: Infinity,
        }}
        className="absolute bg-orange-200 rounded-full pointer-events-none"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 3}px`,
          height: `${Math.random() * 6 + 3}px`,
          filter: 'blur(0.5px)',
        }}
      />
    ))}

    {/* Metal grid overlay */}
    <div className="absolute inset-0 opacity-30 mix-blend-overlay">
      <div className="w-full h-full bg-[url('/textures/metal-grid.png')] bg-[length:200px] animate-pulse-slow" />
    </div>

    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="relative z-10 text-xl md:text-2xl font-mono text-orange-300 tracking-widest animate-pulse-slow"
    >
      {message}
    </motion.span>
  </>
);

const VerseTransition = ({ message }: { message: string }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-sky-900/50" />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute w-64 h-64 bg-white/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute w-48 h-48 bg-white/30 rounded-full blur-2xl"
      />
    </div>

    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: i * 0.1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute rounded-full bg-white"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
        }}
      />
    ))}

    <motion.span
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className="relative z-10 text-xl md:text-2xl italic font-serif text-sky-200 tracking-wide"
    >
      {message}
    </motion.span>
  </>
);
