import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { TheAlchemistCard } from "./TheAlchemistCard";
import { AlchemyPageDecoration } from "./AlchemyPageDecoration";
/* import { GoldenSparks } from "../GoldenSparks"; */

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemist() {
  const containerRef = useRef<HTMLDivElement>(null);

  const theAlchemistText =
    "In the digital forge where logic meets imagination, I transmute raw concepts into living code. Each project is an alchemical experiment—combining the precision of algorithms with the artistry of design. Through countless iterations and refinements, I pursue the Magnum Opus: software that doesn't just function, but transforms. My mission is to craft solutions that endure, to learn from every challenge, and to push the boundaries of what's possible when creativity and engineering unite.";
  const theAlchemistText2 = "Tempered by Challenge";
  useGSAP(
    () => {
      gsap.fromTo(
        ".the-alchemist-title.line-1 span",
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 1,
          scrollTrigger: {
            trigger: ".the-alchemist-title.line-1",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".the-alchemist-title.line-2 span",
        { opacity: 0, scale: 0.8, yPercent: 50 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".the-alchemist-title.line-2",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".the-alchemist-desc-1 .char",
        { opacity: 0.3, color: "#a3a3a3" },
        {
          opacity: 1,
          color: "#171717",
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: ".the-alchemist-desc-1",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="the-alchemist"
      ref={containerRef}
      className="the-alchemist min-h-screen relative z-0 pb-32"
    >
      <div className="absolute inset-0 pointer-events-none z-0 bg-[#e8e4d9]">
        <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />
        <div className="absolute rotate-180 inset-0 opacity-40 pointer-events-none mix-blend-multiply z-0">
          <Image
            src="/assets/images/craftings/texture_washi.png"
            alt="Washi Texture"
            fill
            className="object-cover"
          />
        </div>
        <AlchemyPageDecoration />

        {/* <div className="absolute inset-0 z-[1] opacity-50 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
            <GoldenSparks
              count={100}
              idleColor="#b8390bff" // Deep Orange-Red (hot ember core)
              activeColor="#ffaa00" // Bright Yellow-Orange (ember glow)
              isIgnited={false}
              blending={THREE.AdditiveBlending} // Additive for glow effect
            />
          </Canvas>
        </div> */}
      </div>

      {/* Dedicated wrapper for edge decorations */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {/* SOLVE - Left Edge */}
        <div
          className="absolute left-10 top-1/2 origin-center"
          aria-hidden="true"
          style={{
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "left center",
          }}
        >
          <div className="flex items-center gap-2 text-neutral-400/35 font-kings select-none mix-blend-multiply">
            <span className="text-neutral-500/20 text-xl">◆</span>
            <span className="text-4xl md:text-6xl tracking-[0.5em]">SOLVE</span>
            <span className="text-neutral-500/20 text-xl">◆</span>
          </div>
        </div>

        {/* COAGULA - Right Edge */}
        <div
          className="absolute right-10 top-1/2 origin-center"
          aria-hidden="true"
          style={{
            transform: "translateY(-50%) rotate(90deg)",
            transformOrigin: "right center",
          }}
        >
          <div className="flex items-center gap-2 text-neutral-400/35 font-kings select-none mix-blend-multiply">
            <span className="text-neutral-500/20 text-xl">◆</span>
            <span className="text-4xl md:text-6xl tracking-[0.5em]">COAGULA</span>
            <span className="text-neutral-500/20 text-xl">◆</span>
          </div>
        </div>
      </div>

      <div className="the-alchemist-wrapper max-w-4xl mx-auto py-12 relative z-10 flex flex-col items-center px-4 h-full justify-center">
        <div className="relative w-40 h-40 md:w-40 md:h-40 opacity-40 mix-blend-multiply z-50 pointer-events-none">
          <Image
            src="/assets/images/craftings/eye_of_providence.png"
            alt="Eye of Providence"
            fill
            className="object-contain"
          />
        </div>
        <div className="the-alchemist-title-container text-center text-neutral-900 mb-8 pt-32 md:pt-40">
          <div
            className="the-alchemist-title line-1 text-5xl md:text-7xl font-kings tracking-wide relative z-20"
            aria-label="Forged in Code"
          >
            {"Forged in Code".split("").map((char, idx) => (
              <span key={idx} className="inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 my-4 relative z-20">
            <div className="w-24 h-[1px] bg-neutral-400" />
            <div className="w-3 h-3 rotate-45 border border-neutral-600" />
            <div className="w-24 h-[1px] bg-neutral-400" />
          </div>

          <div
            className="the-alchemist-title line-2 text-3xl font-kings md:text-4xl italic mt-0 text-neutral-700 relative z-20"
            aria-label={theAlchemistText2}
          >
            {theAlchemistText2.split("").map((char, idx) => (
              <span key={idx} className="inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="the-alchemist-content-container font-serif relative z-10 w-full flex flex-col items-center gap-8">
          <div className="space-y-6 p-6 md:p-0 relative z-20 text-center max-w-3xl mx-auto">
            <p
              className="the-alchemist-desc-1 text-2xl md:text-3xl leading-relaxed text-neutral-900 font-medium font-bilbo"
              aria-label={theAlchemistText}
            >
              {theAlchemistText.split(" ").map((word, wi) => (
                <span key={wi} className="word inline-block mr-2" aria-hidden="true">
                  {word.split("").map((char, ci) => (
                    <span key={ci} className="char inline-block text-neutral-600">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>

          {/* Book-style Alternating Layout */}
          <div className="mt-12 space-y-12 max-w-5xl mx-auto px-4">
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
                  requirement, but a raw fragment of the soul demanding a body. It is the unshaped
                  dream that I must capture before it fades.
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
                  o transmute a thought into a thing requires more than skill; it demands obsession.
                  The <span className="italic text-neutral-800">Magnum Opus</span> is the relentless
                  pursuit to solidify the abstract. It is the fire that burns until the ghost in the
                  machine takes physical form.
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
                  realization that with enough will and logic, any dream can be forced to manifest.
                  It is the ultimate freedom to create worlds from nothingness.
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

            {/* Row 4: Symbol 30% | Text 70% */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group">
              <div className="flex justify-center order-1 relative">
                {/* Alchemical Formula - The Code (Inscribed Style) */}
                <div className="relative p-6 rotate-[-1deg] transition-transform duration-500 group-hover:rotate-0 backdrop-blur-sm group-hover:scale-105 select-none">
                  {/* Background Decor */}
                  {/* Etched Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-800/40" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-800/40" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-800/40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-800/40" />

                  <div className="text-neutral-700/70 font-['Courier_New'] text-xs md:text-sm leading-relaxed select-none mix-blend-multiply">
                    <div className="space-y-0.5">
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
                <div className="absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply scale-150 pointer-events-none">
                  <Image
                    src="/assets/images/craftings/transmutation_circle.png"
                    alt=""
                    fill
                    className="object-contain animate-[spin_120s_linear_infinite]"
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
                  ode is the <span className="italic text-neutral-800">Alkahest</span> that
                  dissolves the barrier between dream and reality. It is the ritual by which I force
                  the invisible to manifest. I do not just write syntax; I inscribe the laws of a
                  new world.
                </p>
                <div className="flex">
                  <div className="flex flex-col w-full mt-8 pt-8 border-t border-neutral-400/20">
                    {/* Alchemical Equation */}
                    <div className="alchemy-equation flex items-center justify-center gap-4 md:gap-8 select-none">
                      {/* LEAD */}
                      <div className="flex flex-col items-center group/lead relative">
                        <span className="text-4xl md:text-5xl text-neutral-600 font-serif leading-none transition-colors duration-500 group-hover/lead:text-neutral-800">
                          ♄
                        </span>
                        <span className="font-bilbo text-xl text-neutral-500 mt-2 tracking-wide group-hover/lead:text-neutral-700 transition-colors">
                          Lead
                        </span>
                        <span className="absolute -bottom-6 text-xs text-neutral-400 font-mono opacity-0 group-hover/lead:opacity-100 transition-opacity duration-500">
                          (Self)
                        </span>
                      </div>

                      {/* ADDITION */}
                      <span className="text-2xl text-neutral-400 font-bilbo pb-6">+</span>

                      {/* FIRE */}
                      <div className="flex flex-col items-center group/fire relative">
                        <span className="text-4xl md:text-5xl text-orange-700/80 font-serif leading-none duration-1000 group-hover/fire:text-orange-600 transition-colors">
                          🜂
                        </span>
                        <span className="font-bilbo text-xl text-neutral-500 mt-2 tracking-wide group-hover/fire:text-orange-700/80 transition-colors">
                          Pain
                        </span>
                        <span className="absolute -bottom-6 text-xs text-neutral-400 font-mono opacity-0 group-hover/fire:opacity-100 transition-opacity duration-500">
                          (Effort)
                        </span>
                      </div>

                      {/* TRANSMUTE */}
                      <span className="text-2xl text-neutral-400 font-bilbo pb-6">→</span>

                      {/* GOLD */}
                      <div className="flex flex-col items-center group/gold relative">
                        <div className="relative">
                          <span className="text-5xl md:text-6xl text-amber-500 font-serif leading-none drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-700 group-hover/gold:text-amber-400 group-hover/gold:drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                            ☉
                          </span>
                          <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full opacity-0 group-hover/gold:opacity-100" />
                        </div>
                        <span className="font-bilbo text-xl text-amber-700 font-bold mt-2 tracking-wide">
                          Creator
                        </span>
                        <span className="absolute -bottom-6 text-xs text-amber-600/60 font-mono opacity-0 group-hover/gold:opacity-100 transition-opacity duration-500">
                          (Gold)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
