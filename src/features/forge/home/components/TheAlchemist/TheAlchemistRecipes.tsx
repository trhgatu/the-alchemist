"use client";
import Image from "next/image";

export function TheAlchemistRecipes() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-24">
      <div className="flex justify-center relative">
        <div className="relative p-8 rotate-[-1deg] transition-transform duration-500 hover:rotate-0 backdrop-blur-sm hover:scale-105 select-none max-w-2xl w-full">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neutral-800/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neutral-800/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neutral-800/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neutral-800/40" />

          <div className="text-neutral-700/80 font-['Courier_New'] text-sm md:text-base leading-relaxed select-none mix-blend-multiply">
            <div className="space-y-1">
              <div className="italic font-bold text-neutral-800/80">
                class <span className="text-purple-900/80">Self</span> extends{" "}
                <span className="text-neutral-500">Nobody</span> {"{"}
              </div>
              <div className="italic">&nbsp;&nbsp;async evolve() {"{"}</div>
              <div className="italic text-amber-700/60">
                &nbsp;&nbsp;&nbsp;&nbsp;// The Great Work
              </div>
              <div className="italic">
                &nbsp;&nbsp;&nbsp;&nbsp;await{" "}
                <span className="text-blue-900/60 font-bold">forge</span>(
              </div>
              <div className="italic">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.lead,{" "}
                <span className="text-orange-700/80 font-bold">PAIN</span>
              </div>
              <div className="italic">&nbsp;&nbsp;&nbsp;&nbsp;);</div>
              <div className="italic font-bold text-neutral-800/80">
                &nbsp;&nbsp;&nbsp;&nbsp;return new{" "}
                <span className="text-emerald-800/80">Creator</span>();
              </div>
              <div className="italic">&nbsp;&nbsp;{"}"}</div>
              <div className="italic font-bold text-neutral-800/80">{"}"}</div>
            </div>
          </div>
        </div>

        {/* Faint Transmutation Circle Background */}
        <div className="absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply scale-150 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
            <Image
              src="/assets/images/craftings/transmutation_circle.png"
              alt=""
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: The Equations */}
      <div className="border-t border-neutral-400/20 pt-16">
        {/* Alchemical Equation */}
        <div className="alchemy-equation flex flex-wrap items-center justify-center gap-8 md:gap-16 select-none mb-16">
          {/* LEAD */}
          <div className="flex flex-col items-center group/lead relative">
            <span className="text-5xl md:text-6xl text-neutral-600 font-serif leading-none transition-colors duration-500 group-hover/lead:text-neutral-800">
              ♄
            </span>
            <span className="font-bilbo text-2xl text-neutral-500 mt-2 tracking-wide group-hover/lead:text-neutral-700 transition-colors">
              Lead
            </span>
            <span className="absolute -bottom-8 text-sm text-neutral-400 font-mono opacity-0 group-hover/lead:opacity-100 transition-opacity duration-500">
              (Self)
            </span>
          </div>

          {/* ADDITION */}
          <span className="text-3xl text-neutral-400 font-bilbo pb-6">+</span>

          {/* FIRE */}
          <div className="flex flex-col items-center group/fire relative">
            <span className="text-5xl md:text-6xl text-orange-700/80 font-serif leading-none duration-1000 group-hover/fire:text-orange-600 transition-colors">
              🜂
            </span>
            <span className="font-bilbo text-2xl text-neutral-500 mt-2 tracking-wide group-hover/fire:text-orange-700/80 transition-colors">
              Pain
            </span>
            <span className="absolute -bottom-8 text-sm text-neutral-400 font-mono opacity-0 group-hover/fire:opacity-100 transition-opacity duration-500">
              (Effort)
            </span>
          </div>

          {/* TRANSMUTE */}
          <span className="text-3xl text-neutral-400 font-bilbo pb-6">→</span>

          {/* GOLD */}
          <div className="flex flex-col items-center group/gold relative">
            <div className="relative">
              <span className="text-6xl md:text-7xl text-amber-500 font-serif leading-none drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-700 group-hover/gold:text-amber-400 group-hover/gold:drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                ☉
              </span>
              <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full opacity-0 group-hover/gold:opacity-100" />
            </div>
            <span className="font-bilbo text-2xl text-amber-700 font-bold mt-2 tracking-wide">
              Creator
            </span>
            <span className="absolute -bottom-8 text-sm text-amber-600/60 font-mono opacity-0 group-hover/gold:opacity-100 transition-opacity duration-500">
              (Gold)
            </span>
          </div>
        </div>

        {/* Einstein's Equation - Scientific Complement */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 select-none font-mono opacity-70 hover:opacity-100 transition-opacity duration-500">
          {/* E (Energy/Creator) */}
          <div className="flex flex-col items-center group/energy relative">
            <span className="text-4xl md:text-5xl text-amber-500 font-bold leading-none drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-700 group-hover/energy:text-amber-400 group-hover/energy:drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
              E
            </span>
            <span className="absolute -bottom-8 text-xs text-amber-600/60 font-sans opacity-0 group-hover/energy:opacity-100 transition-opacity duration-500 whitespace-nowrap">
              Energy
            </span>
          </div>

          {/* EQUALS */}
          <span className="text-2xl text-neutral-400 font-bold pb-2">=</span>

          {/* m (Mass/Self) */}
          <div className="flex flex-col items-center group/mass relative">
            <span className="text-3xl md:text-4xl text-neutral-600 font-bold leading-none transition-colors duration-500 group-hover/mass:text-neutral-800">
              m
            </span>
            <span className="absolute -bottom-8 text-xs text-neutral-400 font-sans opacity-0 group-hover/mass:opacity-100 transition-opacity duration-500 whitespace-nowrap">
              Mass
            </span>
          </div>

          {/* MULTIPLY */}
          <span className="text-xl text-neutral-400 font-bold pb-2">×</span>

          {/* c² (Light²/Effort²) */}
          <div className="flex flex-col items-center group/light relative">
            <span className="text-3xl md:text-4xl text-orange-700/80 font-bold leading-none transition-colors duration-700 group-hover/light:text-orange-600">
              c<sup className="text-xl md:text-2xl">2</sup>
            </span>
            <span className="absolute -bottom-8 text-xs text-orange-600/60 font-sans opacity-0 group-hover/light:opacity-100 transition-opacity duration-500 whitespace-nowrap">
              Speed²
            </span>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-neutral-400 font-sans italic">
          The same truth, inscribed in different tongues
        </p>
      </div>
    </div>
  );
}
