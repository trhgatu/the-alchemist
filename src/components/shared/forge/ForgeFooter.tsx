"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { OglStarField } from "@/features/alchemist/shared/atmosphere/StarField/OglStarField";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const year = new Date().getFullYear();

const OWNER = "trhgatu";
const EMAIL = "trhgatu.dev@gmail.com";
const LINKS = [
  { label: "Mail", href: `mailto:${EMAIL}` },
  { label: "GitHub", href: "https://github.com/trhgatu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/trhgatu1103" },
  { label: "Instagram", href: "https://instagram.com/th_atu" },
];

/**
 * The last page of the book. The name rises like the sun over the horizon,
 * with minimal, elegant contact links arranged below.
 */
export const ForgeFooter = () => {
  const scope = useRef<HTMLElement>(null);
  const lang = useLang();
  const t = translations[lang];

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-name",
        { yPercent: 40, opacity: 0.6 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    },
    { scope }
  );

  return (
    <footer
      ref={scope}
      className="relative w-full overflow-hidden font-garamond text-neutral-300"
      style={{
        background:
          "radial-gradient(130% 100% at 50% 100%, #1a0c06 0%, #0d0813 35%, #06050b 70%, #030306 100%)",
      }}
    >
      {/* Soft celestial transition from the dunes/sections above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b0806] via-transparent to-transparent opacity-80 z-10"
      />

      {/* Living Cosmos: Volumetric Nebula Clouds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-80 overflow-hidden"
      >
        <OglStarField cool={0.4} />
      </div>

      {/* Ambient alchemical furnace aura behind the signature name */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[380px] rounded-full bg-radial from-amber-500/25 via-orange-600/10 to-transparent blur-3xl z-0"
      />

      <style jsx>{`
        /* The glow is painted once; only the opacity of a second, brighter copy
           flickers, which the compositor handles without repainting the text */
        .fire {
          color: #fff;
          text-shadow:
            0 0 0.02em #fff,
            0 -0.01em 0.03em #ff3,
            0.01em -0.03em 0.05em #f90,
            -0.01em -0.06em 0.08em #f60,
            0.01em -0.09em 0.12em #f30;
        }
        .fire-flare {
          color: transparent;
          text-shadow:
            0.02em -0.05em 0.08em #f90,
            -0.02em -0.09em 0.12em #f60,
            0.02em -0.13em 0.17em #f30;
          will-change: opacity;
          animation: flare 2s infinite alternate ease-in-out;
        }
        @keyframes flare {
          from {
            opacity: 0.15;
          }
          to {
            opacity: 0.85;
          }
        }
      `}</style>

      {/* Grand Signature: Name Rises First at the Top of the Footer */}
      <div aria-hidden className="relative pt-24 md:pt-36 pb-8 md:pb-12 select-none z-10">
        <div className="footer-name relative whitespace-nowrap text-center font-kings text-[15vw] leading-[0.8] will-change-transform">
          <span className="fire-flare absolute inset-0 block">trhgatu</span>
          <span className="fire relative block">trhgatu</span>
        </div>
      </div>

      {/* Horizontal Links: Mail · GitHub · LinkedIn · Instagram */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-6 pb-16 md:pb-24">
        <nav aria-label="Social and contact links" className="text-center">
          <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 font-garamond text-xl md:text-2xl text-neutral-400">
            {LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group relative inline-block py-1 tracking-wide transition-colors duration-300 hover:text-amber-200"
                >
                  <span>{item.label}</span>
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/70 to-transparent scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Colophon */}
        <div className="mt-14 md:mt-20 flex items-center justify-center border-t border-neutral-800/60 pt-8 text-center font-garamond text-base sm:text-lg md:text-xl text-neutral-400 tracking-wider">
          <p>
            &copy; {year} {OWNER}. {t.colophon.rights}
          </p>
        </div>
      </div>
      <span className="sr-only">trhgatu</span>
    </footer>
  );
};
