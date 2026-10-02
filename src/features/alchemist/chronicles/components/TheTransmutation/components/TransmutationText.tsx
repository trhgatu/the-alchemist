import type { TransmutationTextProps } from "../types";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

export function TransmutationText({ textRefs }: TransmutationTextProps) {
  const lang = useLang();
  const t = translations[lang].chronicles.transmutation;

  return (
    <>
      <div
        ref={textRefs.text1}
        className="absolute top-1/2 -translate-y-4 left-8 md:left-24 lg:left-32 z-20 w-full md:w-1/2 lg:w-2/5 text-left opacity-0 pointer-events-none pr-12"
        style={{ transform: "translateX(-50px) translateY(-50%)", filter: "blur(10px)" }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-garamond italic text-neutral-300 mb-6 tracking-wide leading-[1.4] drop-shadow-lg">
          {t.text1}
        </h2>
        <div className="w-16 h-[2px] bg-neutral-600 mb-6 ml-1"></div>
      </div>
      <div
        ref={textRefs.text2}
        className="absolute top-1/2 -translate-y-4 right-8 md:right-24 lg:right-32 z-20 w-full md:w-1/2 lg:w-2/5 text-right opacity-0 pointer-events-none pl-12"
        style={{ transform: "translateX(50px) translateY(-50%)", filter: "blur(10px)" }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-garamond italic text-orange-400 mb-6 tracking-wide leading-[1.4] drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          {t.text2}
        </h2>
        <div className="w-16 h-[2px] bg-orange-700 mb-6 ml-auto mr-1"></div>
      </div>
      <div
        ref={textRefs.text3}
        className="absolute z-20 text-center opacity-0 scale-90 pointer-events-none px-8 max-w-4xl"
        style={{ filter: "blur(20px)" }}
      >
        <p className="text-3xl md:text-4xl lg:text-5xl font-garamond italic text-amber-100 leading-[1.5] tracking-wide mb-12 drop-shadow-[0_0_40px_rgba(251,191,36,0.2)]">
          {t.text3}
          <br />
          <span className="text-amber-300">{t.text3Highlight}</span>&quot;
        </p>

        <div className="flex flex-col items-center gap-8">
          <p className="font-serif italic text-neutral-500 text-sm md:text-base tracking-widest leading-relaxed mt-4">
            {t.footer}
          </p>
        </div>
      </div>
    </>
  );
}
