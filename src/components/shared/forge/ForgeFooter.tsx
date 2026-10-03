"use client";

import { useState } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const year = new Date().getFullYear();

export const ForgeFooter = () => {
  const [isColophonOpen, setIsColophonOpen] = useState(false);
  const lang = useLang();
  const t = translations[lang];
  const { transitionTo } = useTransitionRouter();

  return (
    <footer className="w-full bg-black border-t border-white/10 text-white font-garamond relative overflow-hidden">
      <style jsx>{`
        @keyframes fire-flicker {
          0%,
          100% {
            text-shadow:
              0 0 4px #fff,
              0 -2px 4px #ff3,
              2px -4px 6px #f90,
              -2px -10px 10px #f60,
              2px -15px 15px #f30;
            transform: scale(1);
          }
          50% {
            text-shadow:
              0 0 4px #fff,
              0 -4px 8px #ff3,
              3px -8px 12px #f90,
              -3px -15px 18px #f60,
              3px -22px 22px #f30;
            transform: scale(1.01);
          }
        }
        .burning-text {
          color: #fff;
          animation: fire-flicker 2s infinite alternate ease-in-out;
          letter-spacing: -0.02em;
        }
      `}</style>

      {/* Colophon / Author's Note - Manuscript Fold Ribbon */}
      <div className="w-full border-b border-white/[0.04] bg-neutral-950/20 backdrop-blur-sm relative z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col items-center">
          <button
            onClick={() => setIsColophonOpen((prev) => !prev)}
            className="group/ribbon inline-flex items-center gap-4 py-1 cursor-pointer select-none text-neutral-400 hover:text-amber-400 transition-colors duration-300"
            aria-expanded={isColophonOpen}
          >
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/60 group-hover/ribbon:via-amber-400/50 group-hover/ribbon:to-amber-400 transition-all duration-300" />

            <div className="flex items-center gap-2.5">
              <span className="font-garamond text-2xl sm:text-3xl text-neutral-300 group-hover/ribbon:text-amber-300 transition-colors duration-300">
                {t.colophon.badge}
              </span>
              <span className="text-xs text-amber-500/40 font-serif transition-transform duration-300 group-hover/ribbon:text-amber-400">
                {isColophonOpen ? "▴" : "▾"}
              </span>
            </div>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/60 group-hover/ribbon:via-amber-400/50 group-hover/ribbon:to-amber-400 transition-all duration-300" />
          </button>
          <div
            className={`grid transition-all duration-500 ease-out w-full ${
              isColophonOpen
                ? "grid-rows-[1fr] opacity-100 mt-4 pb-4"
                : "grid-rows-[0fr] opacity-0 mt-0 pb-0"
            }`}
          >
            <div className="overflow-hidden flex flex-col items-center">
              <div className="p-6 rounded-2xl bg-amber-950/[0.08] border border-amber-500/15 max-w-2xl relative shadow-inner">
                <p className="font-garamond italic text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed text-center">
                  “{t.colophon.quote}”
                </p>

                <div className="font-garamond text-xl sm:text-2xl text-amber-400/90 mt-3 text-right tracking-wider">
                  {t.colophon.signature}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
        <div className="flex flex-col gap-6 text-lg md:text-base order-2 md:order-1">
          {[
            { name: t.nav.chronicles, link: "/chronicles" },
            { name: t.nav.craftings, link: "/craftings" },
          ].map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                transitionTo(item.link);
              }}
              className="nav-link relative w-fit group"
            >
              <span className="text-neutral-500 group-hover:text-amber-500 transition-colors duration-300 font-garamond text-sm uppercase tracking-widest">
                {item.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center relative order-1 md:order-2">
          <div className="relative group text-center">
            <span className="text-8xl md:text-9xl lg:text-[10rem] font-kings leading-none select-none burning-text block">
              trhgatu
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6 text-right order-3">
          <div className="flex gap-5">
            {[
              { icon: IconMail, href: "mailto:trhgatu.dev@gmail.com", label: "Email" },
              { icon: IconBrandGithub, href: "https://github.com/trhgatu", label: "GitHub" },
              {
                icon: IconBrandLinkedin,
                href: "https://linkedin.com/in/trhgatu1103",
                label: "LinkedIn",
              },
              { icon: IconBrandFacebook, href: "https://facebook.com/trhgatu", label: "Facebook" },
              {
                icon: IconBrandInstagram,
                href: "https://instagram.com/th_atu",
                label: "Instagram",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-neutral-500 hover:text-amber-500 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0)] hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              >
                <social.icon size={24} stroke={1.5} />
              </a>
            ))}
          </div>

          <div className="space-y-1">
            <span className="block text-xs text-neutral-500 font-garamond uppercase tracking-widest">
              &copy; {year} trhgatu — The Alchemical Engine
            </span>
            <span className="block text-[10px] text-neutral-600 font-garamond italic">
              “Infinity in every line of code.”
            </span>
          </div>
        </div>
      </div>

      <div className="w-full text-center py-4 bg-neutral-950/80 border-t border-white/5 backdrop-blur-md">
        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 select-none">
          Maktub — It is Written
        </span>
      </div>
    </footer>
  );
};
