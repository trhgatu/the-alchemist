'use client';

import Link from 'next/link';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
} from '@tabler/icons-react';

const year = new Date().getFullYear();

export const ForgeFooter = () => (
  <footer className="w-full bg-black border-t border-white/10 text-white font-mono relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
      <div className="flex flex-col gap-7 text-lg md:text-base">
        <Link
          href="/"
          className="nav-link relative cursor-pointer px-1 text-neutral-600 dark:text-neutral-300"
        >
          <span className="nav-anim block">Forge</span>
        </Link>

        <Link
          href="/forge/craftings"
          className="nav-link relative cursor-pointer px-1 text-neutral-600 dark:text-neutral-300"
        >
          <span className="nav-anim block">Craftings</span>
        </Link>

        <Link
          href="/forge/timeline"
          className="nav-link relative cursor-pointer px-1 text-neutral-600 dark:text-neutral-300"
        >
          <span className="nav-anim block">Timeline</span>
        </Link>

        <Link
          href="/forge/the-alchemist"
          className="nav-link relative cursor-pointer px-1 text-neutral-600 dark:text-neutral-300"
        >
          <span className="nav-anim block">The Alchemist</span>
        </Link>
      </div>



      <div className="flex flex-col items-center justify-center relative">
        <span className="text-7xl md:text-9xl font-black tracking-tight font-kings leading-tight whitespace-pre special-font drop-shadow-2xl select-none">
          trhgatu
        </span>
        <div className="absolute top-1/2 left-1/2 w-40 h-24 bg-gradient-to-r from-white/10 via-gray-200/10 to-blue-200/10 blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <span className="mt-4 text-base md:text-lg italic text-gray-200 tracking-widest opacity-80">
          Crafted with passion
        </span>
      </div>

      <div className="flex flex-col items-end gap-4 text-right">
        <span className="text-sm text-gray-400">
          &copy; {year} trhgatu <span className="text-white/60">&mdash; All rights reserved</span>
        </span>
        <div className="flex gap-3 mt-2">
          <a href="mailto:contact@trhgatu.dev" target="_blank" rel="noopener noreferrer" aria-label="Email" className="text-gray-300 hover:text-white transition">
            <IconMail size={22} />
          </a>
          <a href="https://github.com/trhgatu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-300 hover:text-white transition">
            <IconBrandGithub size={22} />
          </a>
          <a href="https://linkedin.com/in/trhgatu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-blue-400 transition">
            <IconBrandLinkedin size={22} />
          </a>
          <a href="https://facebook.com/tu.trhgatu" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-blue-500 transition">
            <IconBrandFacebook size={22} />
          </a>
          <a href="https://instagram.com/tu.trhgatu" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-pink-400 transition">
            <IconBrandInstagram size={22} />
          </a>
        </div>
        <span className="mt-3 text-xs text-gray-400 font-sans italic opacity-80">
          “Coding in silence, building worlds in logic.”
        </span>
      </div>
    </div>
    <div className="w-full text-center py-2 text-sm text-gray-500 bg-black/80 border-t border-white/10 backdrop-blur">
      trhgatu — Infinity in every line of code.
    </div>
  </footer>
);
