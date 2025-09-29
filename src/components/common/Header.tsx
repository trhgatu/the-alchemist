"use client";

import Link from "next/link";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const cleanupMap = new WeakMap<Element, () => void>();
    const links = gsap.utils.toArray<HTMLAnchorElement>(".nav-link");

    links.forEach((link) => {
      const anim = link.querySelector<HTMLElement>(".nav-anim");
      if (!anim) return;
      const original = anim.innerText;

      const onEnter = () => {
        gsap.to(anim, {
          duration: 0.6,
          scrambleText: { text: original, chars: "01", speed: 0.6, revealDelay: 0.05 },
          ease: "none",
        });
      };
      const onLeave = () => {
        gsap.killTweensOf(anim);
        anim.textContent = original;
      };

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);

      cleanupMap.set(link, () => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      links.forEach((link) => cleanupMap.get(link)?.());
    };
  }, []);

  return (
    <header className="header fixed top-0 z-100 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-bold tracking-wide text-white hover:text-cyan-300">
          <span className="font-share-tech-mono">
            trhgatu
          </span>
          <span className="text-cyan-300">.</span>
        </Link>

        {/* Nav (desktop) */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative inline-block font-mono text-white/80 transition hover:text-cyan-300"
              aria-label={item.label}
            >
              <span className="font-share-tech-mono px-4 py-2 whitespace-nowrap">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="text-white/80">
          <span>Get in touch</span>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white/80 hover:text-cyan-300"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-cyan-300 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
