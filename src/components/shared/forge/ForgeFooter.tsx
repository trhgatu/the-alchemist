'use client';

import Link from 'next/link';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconHammer,
} from '@tabler/icons-react';

const year = new Date().getFullYear();

export const ForgeFooter = () => (
  <footer className="relative w-full bg-gradient-to-t from-black/90 via-red-950/30 to-transparent backdrop-blur-md border-t border-red-900/40 font-serif">
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-900 via-orange-700 to-yellow-700 flex items-center justify-center shadow-lg border-2 border-red-800 ring-2 ring-orange-400/40"
          aria-hidden="true"
        >
          <IconHammer
            className="text-2xl text-orange-200 drop-shadow-[0_0_8px_rgba(255,140,0,0.7)]"
            size={24}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl md:text-2xl text-orange-100 tracking-widest drop-shadow-[0_0_6px_rgba(255,140,0,0.5)] select-none">
            The Forge
          </span>
          <span className="text-xs text-red-300/80 font-medium tracking-wider">
            Digital Crafting Workshop
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-wrap gap-5 md:gap-8 text-orange-200/80 font-medium text-sm md:text-base tracking-wider"
        aria-label="Footer Navigation"
      >
        <Link href="/" passHref>
          <span className="hover:text-red-300 hover:underline transition cursor-pointer">
            Home
          </span>
        </Link>
        <Link href="/forge/the-alchemist" passHref>
          <span className="hover:text-red-300 hover:underline transition cursor-pointer">
            The Alchemist
          </span>
        </Link>
        <Link href="/forge/craftings" passHref>
          <span className="hover:text-red-300 hover:underline transition cursor-pointer">
            Craftings
          </span>
        </Link>
        <Link href="/contact" passHref>
          <span className="hover:text-red-300 hover:underline transition cursor-pointer">
            Contact
          </span>
        </Link>
      </nav>

      {/* Social Icons */}
      <div className="flex gap-4">
        <a
          href="mailto:contact@trhgatu.dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="text-orange-300 hover:text-red-400 transition-all duration-300 hover:scale-110"
        >
          <IconMail size={26} />
        </a>
        <a
          href="https://github.com/trhgatu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-orange-300 hover:text-white transition-all duration-300 hover:scale-110"
        >
          <IconBrandGithub size={26} />
        </a>
        <a
          href="https://www.linkedin.com/in/trhgatu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-orange-300 hover:text-blue-400 transition-all duration-300 hover:scale-110"
        >
          <IconBrandLinkedin size={26} />
        </a>
        <a
          href="https://instagram.com/tu.trhgatu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-orange-300 hover:text-pink-400 transition-all duration-300 hover:scale-110"
        >
          <IconBrandInstagram size={26} />
        </a>
        <a
          href="https://facebook.com/tu.trhgatu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-orange-300 hover:text-blue-500 transition-all duration-300 hover:scale-110"
        >
          <IconBrandFacebook size={26} />
        </a>
      </div>
    </div>

    {/* Forge Elements Decoration */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-4 left-8 w-2 h-2 bg-red-500/30 rounded-full animate-pulse"></div>
      <div className="absolute top-8 right-12 w-1 h-1 bg-orange-400/40 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-12 left-16 w-1.5 h-1.5 bg-yellow-500/20 rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-6 right-20 w-2 h-2 bg-red-400/25 rounded-full animate-pulse delay-1000"></div>
    </div>

    {/* Bottom Line */}
    <div className="border-t border-red-900/40 py-4 px-4 text-center text-xs text-orange-200/60 bg-black/40 backdrop-blur-sm font-mono tracking-wide">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <span className="inline-flex items-center justify-center gap-2">
          &copy; {year} The Forge.
          <span className="text-red-400 animate-pulse">🔥</span>
          Crafted by The Alchemist.
        </span>
        <span className="text-orange-300/80 italic">
          &quot;Where code meets craftsmanship&quot;
        </span>
      </div>
    </div>
  </footer>
);
