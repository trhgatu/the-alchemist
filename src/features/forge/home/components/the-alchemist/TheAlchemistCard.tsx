'use client';
import Image from 'next/image';
export function TheAlchemistCard() {
  return (
    <div className="relative w-full max-w-[600px] aspect-square mx-auto group perspective-1000 flex items-center justify-center">

      {/* Glow Behind */}
      <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-[80px] scale-75 group-hover:scale-110 transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-screen" />

      {/* Frame / "Tree" Gate - REMOVED as requested */}
      {/* <Image src="/assets/images/gate.svg" ... /> */}

      {/* Avatar Container with Magical Rings */}
      <div className="relative w-[60%] h-[60%] z-10 flex items-center justify-center">

        {/* Rotating Ring 1 - Outer (Thicker, Darker) */}
        <div className="absolute inset-[-20%] border-2 border-dashed border-amber-900/60 rounded-full animate-[spin_20s_linear_infinite]" />

        {/* Rotating Ring 2 - Inner (Counter-spin) */}
        <div className="absolute inset-[-10%] border-2 border-dotted border-amber-700/50 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

        {/* Static Stabilizer Ring */}
        <div className="absolute inset-[-5%] border border-amber-900/20 rounded-full" />

        {/* Main Avatar Circle */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-double border-amber-900/40 shadow-2xl group-hover:border-amber-600/60 transition-colors duration-500 bg-neutral-200">
          <Image
            src="/assets/images/avt.png"
            alt="The Alchemist Avatar"
            fill
            className="avatar-image object-cover hover:scale-110 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
          />
          {/* Inner Shadow to sit inside the frame */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
