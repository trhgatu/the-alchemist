"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const year = new Date().getFullYear();

const OWNER = "trhgatu";
const EMAIL = "trhgatu.dev@gmail.com";
const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com/trhgatu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/trhgatu1103" },
  { label: "Instagram", href: "https://instagram.com/th_atu" },
];

const QUIET_LINK = "text-neutral-400 hover:text-amber-200 transition-colors duration-300";
const LABEL = "mb-3 text-sm italic text-neutral-600";

/**
 * The last page of the book. The name rises out of the bottom edge like the
 * sun the desert scene above just watched come up, and burns.
 */
export const ForgeFooter = () => {
  const scope = useRef<HTMLElement>(null);
  const lang = useLang();
  const t = translations[lang];
  const { transitionTo } = useTransitionRouter();

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-name",
        { yPercent: 45 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    },
    { scope }
  );

  const pages = [
    { name: t.nav.chronicles, link: "/chronicles" },
    { name: t.nav.craftings, link: "/craftings" },
  ];

  return (
    <footer
      ref={scope}
      className="relative w-full overflow-hidden bg-[#0b0806] font-garamond text-neutral-300"
    >
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

      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-12 md:pt-32">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* The invitation */}
          <div className="md:col-span-7">
            <p className="text-xl italic text-neutral-500">{t.colophon.write}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-3 inline-block text-3xl leading-tight text-neutral-100 sm:text-4xl lg:text-5xl"
            >
              <span className="bg-linear-to-r from-amber-200 to-amber-200 bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 group-hover:bg-[length:100%_1px] group-hover:text-amber-100">
                {EMAIL}
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-lg md:col-span-5 md:grid-cols-3">
            <div>
              <p className={LABEL}>Elsewhere</p>
              <ul className="space-y-1.5">
                {ELSEWHERE.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={QUIET_LINK}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={LABEL}>Pages</p>
              <ul className="space-y-1.5">
                {pages.map((item) => (
                  <li key={item.link}>
                    <a
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        transitionTo(item.link);
                      }}
                      className={QUIET_LINK}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={LABEL}>{year}</p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`${QUIET_LINK} cursor-pointer text-left`}
              >
                {lang === "vi" ? "Về trang đầu ↑" : "Back to the start ↑"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-20 text-sm text-neutral-500">
          &copy; {year} {OWNER}. {t.colophon.rights}
        </p>
      </div>

      {/* The name, wide across the page, its descenders sunk below the edge */}
      <div aria-hidden className="relative mt-16 h-[14vw] select-none">
        <div className="footer-name absolute inset-x-0 top-0 whitespace-nowrap text-center font-kings text-[16vw] leading-[0.8] will-change-transform">
          {/* Flare sits behind, so it only warms the halo, never the letters */}
          <span className="fire-flare absolute inset-0 block">trhgatu</span>
          <span className="fire relative block">trhgatu</span>
        </div>
      </div>
      <span className="sr-only">trhgatu</span>
    </footer>
  );
};
