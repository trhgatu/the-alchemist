"use client";

import { useAppStore, type Language } from "@/hooks/useAppStore";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

const LANGS: { code: Language; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "vi", label: "VI", name: "Tiếng Việt" },
];

type LanguageToggleProps = {
  className?: string;
  /** Classes for the current language and for the other one */
  activeClassName: string;
  idleClassName: string;
};

/** "EN · VI" set in type, living in the navbar beside the page links. */
export function LanguageToggle({ className, activeClassName, idleClassName }: LanguageToggleProps) {
  const lang = useLang();
  const setLang = useAppStore((s) => s.setLang);

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("flex items-baseline gap-2 font-garamond text-[15px]", className)}
    >
      {LANGS.map((l, i) => {
        const active = l.code === lang;
        return (
          <span key={l.code} className="flex items-baseline gap-2">
            {i > 0 && <span className={cn("opacity-60", idleClassName)}>·</span>}
            <button
              type="button"
              lang={l.code}
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              title={l.name}
              className={cn(
                "cursor-pointer tracking-[0.08em] transition-colors duration-500",
                active ? activeClassName : idleClassName
              )}
            >
              {l.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
