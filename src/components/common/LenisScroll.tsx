// components/common/LenisScroll.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { setLenis } from "@/lib/lenis";

export default function LenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    // Prioritised: in every frame the scroll settles before anything draws
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick, false, true);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Every page opens at its first line. Next resets the window, but Lenis
  // still holds the old position and would glide back to it, so it has to
  // jump too (the route changes behind the transition, so this is unseen).
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
