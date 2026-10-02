"use client";
import React from "react";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

export function ManuscriptNotes() {
  const lang = useLang();
  const t = translations[lang].chronicles.techGrimoire;
  const manuscripts = t.manuscripts || [];

  const positions = [
    { top: "15%", left: "10%", rotate: "-5deg", width: "250px" },
    { top: "20%", right: "12%", rotate: "3deg", width: "280px" },
    { bottom: "18%", left: "15%", rotate: "4deg", width: "260px" },
    { bottom: "25%", right: "8%", rotate: "-2deg", width: "300px" },
  ];

  return (
    <div key={lang} className="absolute inset-0 z-10 pointer-events-none p-10 overflow-hidden">
      {manuscripts.map((text, idx) => {
        const pos = positions[idx % positions.length];
        return (
          <div
            key={idx}
            className="absolute p-2 opacity-70 hover:opacity-100 transition-opacity duration-700 select-none"
            style={{
              ...pos,
              transform: `rotate(${pos.rotate})`,
            }}
          >
            <p className="font-garamond text-2xl md:text-4xl text-amber-900/80 leading-relaxed drop-shadow-sm">
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
