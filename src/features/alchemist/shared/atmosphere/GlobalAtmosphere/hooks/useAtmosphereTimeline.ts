import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseAtmosphereTimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  nebulaRef: React.RefObject<HTMLDivElement | null>;
  whiteStarsRef: React.RefObject<HTMLDivElement | null>;
  embersRef: React.RefObject<HTMLDivElement | null>;
  coolRef: React.RefObject<number>;
  setEmbersVisible: (visible: boolean) => void;
}

export const useAtmosphereTimeline = ({
  containerRef,
  nebulaRef,
  whiteStarsRef,
  embersRef,
  coolRef,
  setEmbersVisible,
}: UseAtmosphereTimelineProps) => {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. Initial State: The Forge (Hero -> The Alchemist)
      // - Nebula is fully visible in its warm forge palette (red & amber, coolRef = 0)
      // - Embers are blazing (autoAlpha: 1)
      // - 2D White stars are hidden (autoAlpha: 0) to avoid visual clutter with embers
      if (nebulaRef.current) {
        gsap.set(nebulaRef.current, { autoAlpha: 1, opacity: 1 });
      }
      if (embersRef.current) {
        gsap.set(embersRef.current, { autoAlpha: 1, opacity: 1 });
      }
      if (whiteStarsRef.current) {
        gsap.set(whiteStarsRef.current, { autoAlpha: 0, opacity: 0 });
      }
      coolRef.current = 0;
      setEmbersVisible(true);

      const techGrimoireEl = document.getElementById("tech-grimoire");

      // 2. Transmutation at Tech Grimoire:
      // As the magical book section enters:
      // - Forge embers die down (1 -> 0)
      // - Nebula cools from fiery red/amber to moonlit silver/blue (coolRef: 0 -> 1)
      // - 2D White Starfield fades in (0 -> 1)
      if (techGrimoireEl) {
        const updateAtmosphere = (progress: number) => {
          coolRef.current = progress;

          if (embersRef.current) {
            gsap.set(embersRef.current, {
              opacity: 1 - progress,
              autoAlpha: progress >= 1 ? 0 : 1,
            });
          }
          setEmbersVisible(progress < 1);

          if (whiteStarsRef.current) {
            gsap.set(whiteStarsRef.current, {
              opacity: progress,
              autoAlpha: progress > 0.01 ? 1 : 0,
            });
          }
        };

        ScrollTrigger.create({
          trigger: techGrimoireEl,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          onUpdate: (self) => updateAtmosphere(self.progress),
          onRefresh: (self) => updateAtmosphere(self.progress),
        });
      }

      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => clearTimeout(timeout);
    },
    { scope: containerRef }
  );
};
