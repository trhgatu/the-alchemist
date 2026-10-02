"use client";

import { useAppStore } from "@/hooks/useAppStore";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useAppStore();

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] flex items-center select-none",
        className
      )}
    >
      <div className="flex items-center p-1 rounded-full bg-neutral-950/75 border border-white/[0.1] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {/* EN Button */}
        <button
          onClick={() => setLang("en")}
          aria-label="Switch to English"
          className={cn(
            "relative px-3.5 py-1 text-xs font-garamond tracking-wider transition-colors duration-300 cursor-pointer rounded-full",
            lang === "en"
              ? "text-amber-200 font-semibold"
              : "text-neutral-400 hover:text-neutral-200"
          )}
        >
          {lang === "en" && (
            <motion.div
              layoutId="active-lang-bg"
              className="absolute inset-0 rounded-full bg-amber-500/15 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10">EN</span>
        </button>

        {/* Minimal Divider */}
        <span className="text-white/20 text-[10px] px-0.5 select-none font-garamond">/</span>

        {/* VI Button */}
        <button
          onClick={() => setLang("vi")}
          aria-label="Chuyển sang Tiếng Việt"
          className={cn(
            "relative px-3.5 py-1 text-xs font-garamond tracking-wider transition-colors duration-300 cursor-pointer rounded-full",
            lang === "vi"
              ? "text-amber-200 font-semibold"
              : "text-neutral-400 hover:text-neutral-200"
          )}
        >
          {lang === "vi" && (
            <motion.div
              layoutId="active-lang-bg"
              className="absolute inset-0 rounded-full bg-amber-500/15 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10">VI</span>
        </button>
      </div>
    </div>
  );
}
