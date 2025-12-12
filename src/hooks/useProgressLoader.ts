import { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";

export function useProgressLoader(onDone: () => void) {
  const { progress } = useProgress();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Persist simulated progress across renders/effect re-runs
  const simulatedProgressRef = useRef(0);
  const onDoneRef = useRef(onDone);

  // Update ref if onDone changes
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      // Increment simulated progress from the ref value
      simulatedProgressRef.current += (100 - simulatedProgressRef.current) * 0.05;
      if (simulatedProgressRef.current > 99.5) simulatedProgressRef.current = 100;

      // Use the greater of actual progress or simulated progress
      const targetProgress = Math.max(progress, simulatedProgressRef.current);

      setCount((prev) => {
        const delta = (targetProgress - prev) * 0.1;
        const newCount = prev + delta;

        // Ensure we finish if we're very close
        if (newCount >= 99.5 && !done) {
          setDone(true);
          onDoneRef.current();
          return 100;
        }
        return newCount;
      });

      if (!done) {
        raf = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [progress, done]);

  return Math.floor(count);
}
