// hooks/useScrambleText.ts
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import gsap from "gsap";

gsap.registerPlugin(ScrambleTextPlugin);

export function useScrambleText(selector = ".nav-link", childSelector = ".nav-anim") {
  useGSAP(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const cleanupMap = new WeakMap<Element, () => void>();
    const links = gsap.utils.toArray<HTMLAnchorElement>(selector);

    links.forEach((link) => {
      const anim = link.querySelector<HTMLElement>(childSelector);
      if (!anim) return;
      const original = anim.innerText;

      const onEnter = () => {
        gsap.to(anim, {
          duration: 0.6,
          scrambleText: {
            text: original,
            chars: "01",
            speed: 0.6,
            revealDelay: 0.05,
          },
          ease: "none",
        });
      };

      const onLeave = () => {
        gsap.to(anim, {
          duration: 0.8,
          scrambleText: {
            text: original,
            chars: "01",
            speed: 0.3,
            revealDelay: 0.05,
          },
          ease: "power1.out",
        });
      };


      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);

      cleanupMap.set(link, () => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      links.forEach((link) => cleanupMap.get(link)?.());
    };
  }, []);
}
