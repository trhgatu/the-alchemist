"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { cn } from "@/lib/utils";
import { QUOTE_CLASS } from "../quoteStyle";
import { DawnAir } from "./components/DawnAir";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The caravan, as a box of the square sketch (percent of its side). The sketch
// is a single path, so the camels are cut out of a second copy and moved, and
// the same box is punched out of the still scene.
const CARAVAN_BOX = { left: 59, top: 64, right: 87, bottom: 82 };
const { left: L, top: T, right: Rr, bottom: B } = CARAVAN_BOX;
const CARAVAN_ONLY = `polygon(${L}% ${T}%, ${Rr}% ${T}%, ${Rr}% ${B}%, ${L}% ${B}%)`;
// Outer square clockwise, inner box counter-clockwise: a hole under nonzero fill
const WITHOUT_CARAVAN = `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${L}% ${T}%, ${L}% ${B}%, ${Rr}% ${B}%, ${Rr}% ${T}%, ${L}% ${T}%)`;

/**
 * The last leg: three lines spoken in the night, then dawn breaks over the
 * desert the journal promised. Amber returns to the sky, closing the colour
 * arc of the chronicle: forge amber, night silver, dawn gold.
 */
export function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].chronicles.journey;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const entries = containerRef.current.querySelectorAll(".narrative-entry");
      gsap.set(entries, { opacity: 0, scale: 0.9 });
      gsap.set(".dawn-sky", { opacity: 0 });
      gsap.set(".dawn-sun", { yPercent: 60, opacity: 0 });
      gsap.set(".dawn-land", { yPercent: 12, opacity: 0 });
      gsap.set(".dawn-air", { opacity: 0 });
      gsap.set([".dawn-quote", ".dawn-author"], { opacity: 0, y: 24 });
      gsap.set(".maktub-pen", { attr: { x: -420 } });
      gsap.set(".caravan-trail", { strokeDashoffset: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          refreshPriority: 50,
        },
      });

      // The last stretch of night
      entries.forEach((entry, i) => {
        const at = i * 6;
        tl.to(entry, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, at)
          .to(entry, { opacity: 1, duration: 2.5 }, at + 2)
          .to(entry, { opacity: 0, scale: 1.08, duration: 1.5, ease: "power2.in" }, at + 4.5);
      });

      // Dawn: the sky lightens from the horizon up, the sun rises, the land appears
      tl.to(".dawn-sky", { opacity: 1, duration: 4, ease: "power1.inOut" }, "+=0.5")
        .to(".dawn-sun", { yPercent: 0, opacity: 1, duration: 4, ease: "power2.out" }, "<1")
        .to(".dawn-land", { yPercent: 0, opacity: 1, duration: 3, ease: "power2.out" }, "<0.5")
        .to(".dawn-air", { opacity: 1, duration: 3, ease: "power1.inOut" }, "<0.5");

      // The caravan sets off towards the pyramid (the sketch draws the camels
      // facing left), leaving footprints behind
      tl.addLabel("onward", "-=1")
        .to(
          ".dawn-caravan",
          { xPercent: -14, yPercent: -4, scale: 0.82, duration: 9, ease: "none" },
          "onward"
        )
        .to(".caravan-trail", { strokeDashoffset: 0, duration: 9, ease: "none" }, "onward");

      // One quote, then the word that answers it, written by hand
      tl.to(".dawn-quote", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, "onward")
        .to(".dawn-author", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "-=0.8")
        .to(".maktub-pen", { attr: { x: 0 }, duration: 3.5, ease: "power1.inOut" }, "+=0.8")
        .to({}, { duration: 1.5 });
    },
    { scope: containerRef, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      id="the-journey"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {/* Dawn sky, lightening from the horizon */}
      <div
        aria-hidden
        className="dawn-sky absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, #0d1022 0%, #262747 22%, #5e4a66 40%, #b9806c 54%, #eab07e 62%, #f8dcaa 68%, #f8dcaa 100%)",
        }}
      />

      {/* The rising sun, a soft disc on the horizon */}
      <div
        aria-hidden
        className="dawn-sun absolute left-1/2 top-[67%] z-10 h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #fff3d6 0%, #ffd99a 32%, rgba(255,190,110,0.55) 52%, rgba(255,170,90,0) 72%)",
        }}
      />

      {/* The desert, engraved like the sketch it holds: inked dune crests and
          hatched shadow, denser and darker towards the viewer */}
      <div aria-hidden className="dawn-land absolute inset-x-0 bottom-0 z-20 h-[36%]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0 72 C 180 44, 360 66, 560 46 S 920 24, 1120 40 S 1340 62, 1440 50 L1440 320 L0 320 Z"
            fill="#f2d3a1"
          />
        </svg>

        {/* The sketch, square like its viewBox so percentages map onto it */}
        <div className="absolute bottom-[38%] left-1/2 aspect-square h-[150%] -translate-x-1/2 opacity-50 mix-blend-multiply">
          <div className="absolute inset-0" style={{ clipPath: WITHOUT_CARAVAN }}>
            <Image src="/assets/images/adventure.svg" alt="" fill sizes="500px" />
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 1200">
            <defs>
              <mask id="caravan-trail-mask" maskUnits="userSpaceOnUse">
                <path
                  className="caravan-trail"
                  d="M 965 940 C 910 932, 850 920, 790 910"
                  pathLength={1}
                  fill="none"
                  stroke="white"
                  strokeWidth="40"
                  strokeDasharray="1 1"
                />
              </mask>
            </defs>
            {/* Footprints in the sand */}
            <path
              d="M 965 940 C 910 932, 850 920, 790 910"
              fill="none"
              stroke="#3a2516"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1 17"
              mask="url(#caravan-trail-mask)"
            />
          </svg>

          <div
            className="dawn-caravan absolute inset-0"
            style={{ clipPath: CARAVAN_ONLY, transformOrigin: `${(L + Rr) / 2}% ${B}%` }}
          >
            <Image src="/assets/images/adventure.svg" alt="" fill sizes="500px" />
          </div>
        </div>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="hatch-light"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-24)"
            >
              <line x1="0" y1="0" x2="0" y2="7" stroke="#5a3b25" strokeWidth="0.8" />
            </pattern>
            <pattern
              id="hatch-dense"
              width="3.5"
              height="3.5"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-24)"
            >
              <line x1="0" y1="0" x2="0" y2="3.5" stroke="#3a2516" strokeWidth="1" />
            </pattern>
            <linearGradient id="to-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b0806" stopOpacity="0" />
              <stop offset="100%" stopColor="#0b0806" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Far dune crest */}
          <path
            d="M0 72 C 180 44, 360 66, 560 46 S 920 24, 1120 40 S 1340 62, 1440 50"
            fill="none"
            stroke="#5a3b25"
            strokeWidth="1.2"
            opacity="0.55"
          />

          {/* Middle dune */}
          <path
            d="M0 196 C 160 170, 330 150, 520 182 S 860 214, 1040 176 S 1330 148, 1440 168 L1440 320 L0 320 Z"
            fill="#e8c08a"
          />
          <path
            d="M0 196 C 160 170, 330 150, 520 182 S 860 214, 1040 176 S 1330 148, 1440 168 L1440 320 L0 320 Z"
            fill="url(#hatch-light)"
            opacity="0.35"
          />
          <path
            d="M0 196 C 160 170, 330 150, 520 182 S 860 214, 1040 176 S 1330 148, 1440 168"
            fill="none"
            stroke="#4a3020"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Near dune, in shadow */}
          <path
            d="M0 262 C 240 236, 470 252, 700 274 S 1110 238, 1440 252 L1440 320 L0 320 Z"
            fill="#d2a271"
          />
          <path
            d="M0 262 C 240 236, 470 252, 700 274 S 1110 238, 1440 252 L1440 320 L0 320 Z"
            fill="url(#hatch-dense)"
            opacity="0.6"
          />
          <path
            d="M0 262 C 240 236, 470 252, 700 274 S 1110 238, 1440 252"
            fill="none"
            stroke="#2e1d11"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Ground falls into the night of the footer */}
          <rect y="250" width="1440" height="70" fill="url(#to-night)" />
        </svg>
      </div>

      {/* Clouds over the horizon */}
      <DawnAir className="dawn-air absolute inset-0 z-30" />

      {/* Three lines in the night */}
      <div key={`narratives-${lang}`} className="absolute inset-0 z-40 pointer-events-none">
        {[t.narrative1, t.narrative2, t.narrative3].map((line) => (
          <div
            key={line}
            className="narrative-entry absolute inset-0 mx-auto flex max-w-5xl items-center justify-center px-6"
          >
            <p className={cn(QUOTE_CLASS, "text-center")}>{line}</p>
          </div>
        ))}
      </div>

      {/* Dawn: the quote, and Maktub */}
      <div
        key={`dawn-${lang}`}
        className="absolute inset-x-0 top-[12%] z-40 mx-auto max-w-4xl px-6 text-center pointer-events-none"
      >
        <p className={cn(QUOTE_CLASS, "dawn-quote")}>{t.quote}</p>
        <p className="dawn-author mt-4 font-garamond text-sm tracking-wide text-white/70">
          {t.author}
        </p>
        {/* Maktub, "it is written": revealed left to right as if by a pen */}
        <svg
          className="mx-auto mt-6 h-20 w-80 overflow-visible drop-shadow-[0_0_14px_rgba(255,220,160,0.55)]"
          viewBox="0 0 400 100"
          role="img"
          aria-label={t.maktub}
        >
          <defs>
            <linearGradient id="maktub-nib" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="white" />
              <stop offset="88%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <mask
              id="maktub-ink"
              maskUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width="440"
              height="140"
            >
              <rect
                className="maktub-pen"
                x="-420"
                y="-20"
                width="420"
                height="140"
                fill="url(#maktub-nib)"
              />
            </mask>
          </defs>
          <text
            x="200"
            y="70"
            textAnchor="middle"
            className="font-garamond italic"
            fontSize="60"
            letterSpacing="1"
            fill="#fde9c4"
            mask="url(#maktub-ink)"
          >
            {t.maktub}
          </text>
        </svg>
      </div>
    </section>
  );
}
