"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { MistFrame } from "@/features/alchemist/shared/effects/MistFrame";

// The four photos of the journal, darkest to brightest. focus is the point of
// each photo kept in frame, [x, y] from the top-left.
const PHOTOS = {
  nigredo: { src: "/assets/images/the-alchemist/old.webp", focus: [0.42, 0.62], zoom: 1 },
  albedo: { src: "/assets/images/the-alchemist/night.webp", focus: [0.62, 0.5], zoom: 1.9 },
  citrinitas: { src: "/assets/images/the-alchemist/desk.webp", focus: [0.62, 0.6], zoom: 1 },
  rubedo: { src: "/assets/images/the-alchemist/now.webp", focus: [0.55, 0.52], zoom: 1 },
} as const satisfies Record<string, { src: string; focus: [number, number]; zoom: number }>;

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemistJournal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].chronicles.alchemist.journal;

  useGSAP(
    () => {
      const phases = gsap.utils.toArray<HTMLElement>(".journal-phase");
      phases.forEach((phase) => {
        const text = phase.querySelector(".journal-text");
        const image = phase.querySelector(".journal-image");

        // Fade & Blur reveal for text
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: phase,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (image) {
          gsap.fromTo(
            image,
            { scale: 0.85, y: -40 },
            {
              scale: 1.05,
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: phase,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <div key={lang} ref={containerRef} className="space-y-24 md:space-y-32 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center relative group journal-phase">
        <div className="text-left space-y-4 order-2 md:order-1 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.nigredo.title}
          </h3>
          <p className="font-garamond text-xl sm:text-2xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-4px] leading-none drop-shadow-sm">
              {t.nigredo.desc.charAt(0)}
            </span>
            {t.nigredo.desc.slice(1)}
          </p>
        </div>
        <div className="order-1 md:order-2 journal-image">
          <MistFrame
            src={PHOTOS.nigredo.src}
            alt="Looking out over a grey sea"
            focus={[...PHOTOS.nigredo.focus]}
            zoom={PHOTOS.nigredo.zoom}
            className="aspect-4/5 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center group journal-phase">
        <div className="order-1 journal-image">
          {/* A real night at the keys, held in the same drifting mist as the craftings */}
          <MistFrame
            src={PHOTOS.albedo.src}
            alt="Coding alone late at night, lit only by the screens"
            focus={[...PHOTOS.albedo.focus]}
            zoom={PHOTOS.albedo.zoom}
            className="aspect-4/5 w-full"
          />
        </div>
        <div className="text-left space-y-4 order-2 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.albedo.title}
          </h3>
          <p className="font-garamond text-xl sm:text-2xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-4px] leading-none drop-shadow-sm">
              {t.albedo.desc.charAt(0)}
            </span>
            {t.albedo.desc.slice(1)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center group journal-phase">
        <div className="text-left space-y-4 order-2 md:order-1 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.citrinitas.title}
          </h3>
          <p className="font-garamond text-xl sm:text-2xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-4px] leading-none drop-shadow-sm">
              {t.citrinitas.desc.charAt(0)}
            </span>
            {t.citrinitas.desc.slice(1)}
          </p>
        </div>
        <div className="order-1 md:order-2 journal-image">
          <MistFrame
            src={PHOTOS.citrinitas.src}
            alt="A desk under warm lamplight, The Alchemist on the shelf"
            focus={[...PHOTOS.citrinitas.focus]}
            zoom={PHOTOS.citrinitas.zoom}
            className="aspect-4/5 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center group journal-phase">
        <div className="order-1 journal-image">
          <MistFrame
            src={PHOTOS.rubedo.src}
            alt="Standing in the sun, looking out to sea"
            focus={[...PHOTOS.rubedo.focus]}
            zoom={PHOTOS.rubedo.zoom}
            className="aspect-4/5 w-full"
          />
        </div>
        <div className="text-left space-y-4 order-2 journal-text">
          <h3 className="text-3xl sm:text-4xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            {t.rubedo.title}
          </h3>
          <p className="font-garamond text-xl sm:text-2xl leading-relaxed text-neutral-700">
            <span className="float-left text-7xl font-kings text-neutral-900 mr-3 mt-[-4px] leading-none drop-shadow-sm">
              {t.rubedo.desc.charAt(0)}
            </span>
            {t.rubedo.desc.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
