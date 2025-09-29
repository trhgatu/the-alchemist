import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export function useProgressLoader(onDone: () => void) {
  const { progress } = useProgress();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      setCount((prev) => {
        const delta = (progress - prev) * 0.1;
        const newCount = prev + delta;
        if (newCount >= 99.9 && !done) {
          setDone(true);
          onDone();
        }
        return newCount;
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [progress, done, onDone]);

  return Math.floor(count);
}
