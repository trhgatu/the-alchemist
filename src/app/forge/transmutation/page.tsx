"use client";

import { TheTransmutation } from "@/features/forge/home/components/TheTransmutation";
import { TheAlchemist } from "@/features/forge/home/components/TheAlchemist";
import { useEffect } from "react";

import Link from "next/link";

/**
 * Render the Transmutation page and its call-to-action.
 *
 * Renders TheTransmutation and TheAlchemist components and a centered CTA section linking to /forge/chronicles. When mounted, the component scrolls the window to the top.
 *
 * @returns The page's JSX element containing the layout and CTA.
 */
export default function TransmutationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-neutral-950 min-h-screen">
      <TheTransmutation />
      <TheAlchemist />
      <div className="w-full flex flex-col items-center justify-center py-32 bg-[#f4f2ef]">
        <p className="font-kings text-2xl text-neutral-500 mb-6">The knowledge awaits.</p>
        <Link
          href="/forge/chronicles"
          className="group relative px-8 py-4 overflow-hidden rounded-full border border-neutral-800 transition-all hover:border-amber-600"
        >
          <span className="relative z-10 font-space-mono text-neutral-800 group-hover:text-amber-700 transition-colors uppercase tracking-widest text-sm">
            Open The Grimoire Chapter II
          </span>
          <div className="absolute inset-0 bg-amber-100/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
        </Link>
      </div>
    </main>
  );
}