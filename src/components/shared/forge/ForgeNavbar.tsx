'use client';
import { ModeToggle } from '@/components/shared/ModeToggle';
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
} from '@/components/ui/resizable-navbar';
import { useState } from 'react';
import { ScrambleTextPlugin, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScrambleText } from '@/hooks/useScrambleText';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin)

export function NavbarForge() {
  useScrambleText();
  const navItems = [
    {
      name: 'Forge',
      link: '/forge',
    },
    {
      name: 'Craftings',
      link: '/forge/craftings',
    },
    {
      name: 'Timeline',
      link: '/forge/timeline',
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
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

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
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
