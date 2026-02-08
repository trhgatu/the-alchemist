"use client";

import Image from "next/image";

export function TriaPrimaHeader() {
  return (
    <div className="relative w-full max-w-md mx-auto h-32 flex items-center justify-center -mb-8 z-20 opacity-80 mix-blend-multiply">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 120">
        <path
          d="M 140 60 L 260 60"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-500"
          fill="none"
        />
        <path
          d="M 200 60 L 200 90"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-500"
          fill="none"
        />
        <circle cx="140" cy="60" r="2" fill="currentColor" className="text-neutral-800" />
        <circle cx="260" cy="60" r="2" fill="currentColor" className="text-neutral-800" />
      </svg>
      <div className="absolute left-[20%] md:left-[25%] w-12 h-12">
        <Image
          src="/assets/images/craftings/symbols/sol_symbol.svg"
          alt="Sol"
          fill
          className="object-contain"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 -mt-4">
        <Image
          src="/assets/images/craftings/symbols/mercury_symbol.svg"
          alt="Mercury"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute right-[20%] md:right-[25%] w-12 h-12">
        <Image
          src="/assets/images/craftings/symbols/luna_symbol.svg"
          alt="Luna"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
