import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseAtmosphereTimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  starsRef: React.RefObject<HTMLDivElement | null>;
  embersRef: React.RefObject<HTMLDivElement | null>;
  coolRef: React.RefObject<number>;
  setEmbersVisible: (visible: boolean) => void;
}

export const useAtmosphereTimeline = ({
  containerRef,
  starsRef,
  embersRef,
  coolRef,
  setEmbersVisible,
}: UseAtmosphereTimelineProps) => {
  useGSAP(
    () => {
      if (!containerRef.current || !starsRef.current || !embersRef.current) return;
      gsap.set(starsRef.current, { autoAlpha: 1, opacity: 1 });
      gsap.set(embersRef.current, { autoAlpha: 1, opacity: 1 });
      setEmbersVisible(true);

      const techGrimoireEl = document.getElementById("tech-grimoire");

      if (techGrimoireEl) {
        ScrollTrigger.create({
          trigger: techGrimoireEl,
          start: "top 60%",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            coolRef.current = self.progress;
            gsap.set(embersRef.current, {
              opacity: 1 - self.progress,
              autoAlpha: self.progress >= 1 ? 0 : 1,
            });
            setEmbersVisible(self.progress < 1);
          },
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
