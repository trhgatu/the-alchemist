/**
 * TransmutationText Component
 *
 * Pure presentation component for text animations.
 * Renders the three text phases with proper styling.
 */

import { TRANSMUTATION_ANIMATION_CONFIG } from "../config/animation.config";
import type { TransmutationTextProps } from "../types";

export function TransmutationText({ textRefs }: TransmutationTextProps) {
  const { content } = TRANSMUTATION_ANIMATION_CONFIG;

  return (
    <>
      {/* Text 1: "In the alchemist's forge..." */}
      <div
        ref={textRefs.text1}
        className="absolute top-1/2 -translate-y-4 left-8 md:left-24 lg:left-32 z-20 w-full md:w-1/2 lg:w-2/5 text-left opacity-0 pointer-events-none pr-12"
        style={{ transform: "translateX(-50px) translateY(-50%)", filter: "blur(10px)" }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair-display italic text-neutral-300 mb-6 tracking-wide leading-[1.4] drop-shadow-lg">
          {content.text1.title}
        </h2>
        <div className="w-16 h-[2px] bg-neutral-600 mb-6 ml-1"></div>
        <p className="font-space-mono text-xs md:text-sm text-neutral-500 uppercase tracking-[0.4em] leading-loose">
          {content.text1.subtitle}
        </p>
      </div>

      {/* Text 2: "Life is a sacred furnace..." */}
      <div
        ref={textRefs.text2}
        className="absolute top-1/2 -translate-y-4 right-8 md:right-24 lg:right-32 z-20 w-full md:w-1/2 lg:w-2/5 text-right opacity-0 pointer-events-none pl-12"
        style={{ transform: "translateX(50px) translateY(-50%)", filter: "blur(10px)" }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair-display italic text-orange-400 mb-6 tracking-wide leading-[1.4] drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          {content.text2.title}
        </h2>
        <div className="w-16 h-[2px] bg-orange-700 mb-6 ml-auto mr-1"></div>
        <p className="font-space-mono text-xs md:text-sm text-orange-800/60 uppercase tracking-[0.4em] leading-loose">
          {content.text2.subtitle}
        </p>
      </div>

      {/* Text 3: "And from the crucible..." */}
      <div
        ref={textRefs.text3}
        className="absolute z-20 text-center opacity-0 scale-90 pointer-events-none px-8 max-w-4xl"
        style={{ filter: "blur(20px)" }}
      >
        <p className="text-3xl md:text-4xl lg:text-5xl font-playfair-display italic text-amber-100 leading-[1.5] tracking-wide mb-12 drop-shadow-[0_0_40px_rgba(251,191,36,0.2)]">
          {content.text3.title}
          <br />
          <span className="text-amber-300">{content.text3.titleHighlight}</span>&quot;
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-[1px] bg-amber-700/40"></div>
            <p className="font-kings text-xl md:text-2xl text-amber-600/80 tracking-[0.3em] uppercase">
              {content.text3.subtitle}
            </p>
            <div className="w-24 h-[1px] bg-amber-700/40"></div>
          </div>

          <p className="font-space-mono text-xs text-amber-700/60 uppercase tracking-[0.5em]">
            {content.text3.latin}
          </p>

          <p className="font-serif italic text-neutral-500 text-sm md:text-base tracking-widest leading-relaxed mt-4">
            {content.text3.footer}
          </p>
        </div>
      </div>
    </>
  );
}
