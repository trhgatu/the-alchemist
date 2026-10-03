"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLang } from "@/hooks/useLang";
import { useAppStore } from "@/hooks/useAppStore";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { translations } from "@/constants/translations";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Ink on washi paper, or starlight on the dark scenes
const TONES = {
  ink: {
    text: "text-neutral-900",
    link: "text-neutral-900/75 hover:text-neutral-900",
    seal: "bg-amber-800",
    veil: "from-transparent",
  },
  light: {
    text: "text-neutral-100",
    link: "text-neutral-300 hover:text-white",
    seal: "bg-amber-400",
    veil: "from-black/70",
  },
} as const;

export function NavbarForge() {
  const lang = useLang();
  const t = translations[lang].nav;
  const pathname = usePathname();
  const navTone = useAppStore((s) => s.navTone);
  const { transitionTo } = useTransitionRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const navItems = [
    { name: t.chronicles, link: "/chronicles" },
    { name: t.craftings, link: "/craftings" },
  ];

  // Hide while scrolling down, reveal on scroll up or near the top
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) setIsHidden(true);
    else if (latest < previous || latest < 120) setIsHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // The open mobile menu is always dark, so it overrides the page tone
  const tone = TONES[isMenuOpen ? "light" : navTone];

  const navigate = (href: string) => {
    setIsMenuOpen(false);
    transitionTo(href);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden && !isMenuOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[60] pointer-events-auto"
      >
        {/* Soft veil so the links stay legible over bright nebulae */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent transition-colors duration-700",
            tone.veil
          )}
        />

        <nav className="relative mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-5 md:px-12 md:py-7">
          <a
            href="/chronicles"
            onClick={(e) => {
              e.preventDefault();
              navigate("/chronicles");
            }}
            className={cn(
              "font-kings text-2xl md:text-[1.75rem] leading-none transition-colors duration-700",
              tone.text
            )}
          >
            trhgatu
          </a>

          <ul className="hidden md:flex items-center gap-9">
            {navItems.map((item) => {
              const active = isActive(item.link);
              return (
                <li key={item.link}>
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.link);
                    }}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative font-garamond font-medium text-[17px] tracking-[0.01em] transition-colors duration-500",
                      active ? tone.text : tone.link
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-seal"
                        className={cn(
                          "absolute -bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-colors duration-700",
                          tone.seal
                        )}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            className={cn(
              "md:hidden font-garamond font-medium text-[17px] transition-colors duration-700",
              tone.text
            )}
          >
            {isMenuOpen ? "close" : "menu"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[55] md:hidden bg-neutral-950"
          >
            <ul className="flex h-full flex-col justify-center gap-7 px-8">
              {navItems.map((item, idx) => {
                const active = isActive(item.link);
                return (
                  <motion.li
                    key={item.link}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.06 * idx + 0.1 }}
                  >
                    <a
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.link);
                      }}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-garamond italic text-4xl",
                        active ? "text-amber-200" : "text-neutral-400"
                      )}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
