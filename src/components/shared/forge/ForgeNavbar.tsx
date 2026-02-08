"use client";
import { ModeToggle } from "@/components/shared/ModeToggle";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useScrambleText } from "@/hooks/useScrambleText";

export function NavbarForge() {
  useScrambleText();
  const navItems = [
    {
      name: "Forge",
      link: "/forge",
    },
    {
      name: "Craftings",
      link: "/forge/craftings",
    },
    {
      name: "Timeline",
      link: "/forge/timeline",
    },
    {
      name: "The Alchemist",
      link: "/forge/the-alchemist",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Framer Motion Smart Scroll Logic
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide if scrolling down AND past 100px
    if (latest > previous && latest > 100) {
      setIsVisible(false);
    }
    // Show if scrolling up OR at the top
    else if (latest < previous || latest < 100) {
      setIsVisible(true);
    }
  });

  return (
    <Navbar
      className="fixed top-6 z-50 pointer-events-auto transition-none"
      initial={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        y: isVisible ? 0 : -20,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Very slow, ethereal ease
    >
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="nav-anim block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <ModeToggle />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
