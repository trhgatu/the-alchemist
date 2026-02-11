"use client";
import Image from "next/image";
import { TheAlchemistCard } from "./TheAlchemistCard";

export function TheAlchemistJournal() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto px-4">
      {/* Row 1: Text 70% | Avatar 30% */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center relative overflow-visible group">
        <div className="text-left space-y-4 order-2 md:order-1">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Prima Materia
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              T
            </span>
            he work begins in silence—a fleeting vision, a chaotic impulse. This is my{" "}
            <span className="italic text-neutral-800">Prima Materia</span>. Not a business
            requirement, but a raw fragment of the soul demanding a body. It is the unshaped dream
            that I must capture before it fades.
          </p>
        </div>
        <div className="relative h-64 overflow-visible order-1 md:order-2 flex justify-center">
          <div className="absolute top-1/2 left-[50%] md:left-[70%] -translate-x-1/2 -translate-y-1/2 z-50 scale-140 overflow-visible w-64 md:w-80">
            <TheAlchemistCard />
          </div>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>

      {/* Row 2: Symbol 30% | Text 70% */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group">
        <div className="flex justify-center opacity-20 mix-blend-multiply order-1">
          <div className="relative w-48 h-48">
            <Image
              src="/assets/images/craftings/transmutation_circle.png"
              alt="Ouroboros"
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
        <div className="text-left space-y-4 order-2">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            The Great Work
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              T
            </span>
            o transmute a thought into a thing requires more than skill; it demands obsession. The{" "}
            <span className="italic text-neutral-800">Magnum Opus</span> is the relentless pursuit
            to solidify the abstract. It is the fire that burns until the ghost in the machine takes
            physical form.
          </p>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>

      {/* Row 3: Text 70% | Symbol 30% */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center group">
        <div className="text-left space-y-4 order-2 md:order-1">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Philosopher&apos;s Stone
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              I
            </span>
            seek no gold, only the power of projection. The{" "}
            <span className="italic text-neutral-800">Philosopher&apos;s Stone</span> is the
            realization that with enough will and logic, any dream can be forced to manifest. It is
            the ultimate freedom to create worlds from nothingness.
          </p>
        </div>
        <div className="flex justify-center order-1 md:order-2 opacity-60 mix-blend-multiply">
          <div className="relative w-48 h-48">
            <Image
              src="/assets/images/craftings/symbols/squared_circle.svg"
              alt="Philosopher's Stone"
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>

      {/* Row 4: Universal Solvent (Symbol 30% | Text 70%) */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group">
        <div className="flex justify-center opacity-60 mix-blend-multiply order-1">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <Image
              src="/assets/images/craftings/symbols/code_symbol.png"
              alt="Philosopher's Stone"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-left space-y-4 order-2">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Universal Solvent
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              C
            </span>
            ode is the <span className="italic text-neutral-800">Alkahest</span> that dissolves the
            barrier between dream and reality. It is the ritual by which I force the invisible to
            manifest. I do not just write syntax; I inscribe the laws of a new world.
          </p>
        </div>
      </div>

      {/* Ornamental Divider - End of Journal */}
      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>
    </div>
  );
}
