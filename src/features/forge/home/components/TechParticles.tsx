import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS } from "@/constants/Skills";

export function TechParticles({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const initialPositions = useMemo(() => {
    return SKILLS.map(() => ({
      x: (Math.random() - 0.5) * 0.2,
      y: (Math.random() - 0.5) * 0.2,
      z: (Math.random() - 0.5) * 0.2,
    }));
  }, []);

  const targetPositions = useMemo(() => {
    return SKILLS.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / SKILLS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = 3.5;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.current;

    const explosionFactor = THREE.MathUtils.smoothstep(progress, 0.4, 0.7);

    const spaceFactor = THREE.MathUtils.smoothstep(progress, 0.8, 0.95);

    groupRef.current.children.forEach((child, i) => {
      const initial = initialPositions[i];
      const target = targetPositions[i];

      const currentTarget = {
        x: target.x * (1 + spaceFactor * 2),
        y: target.y * (1 + spaceFactor * 2),
        z: target.z * (1 + spaceFactor * 2),
      };

      const ease = 1 - Math.pow(1 - explosionFactor, 3);

      child.position.x = THREE.MathUtils.lerp(initial.x, currentTarget.x, ease);
      child.position.y = THREE.MathUtils.lerp(initial.y, currentTarget.y + 1, ease);
      child.position.z = THREE.MathUtils.lerp(initial.z, currentTarget.z, ease);

      let scale = THREE.MathUtils.lerp(0, 0.6, ease);

      if (explosionFactor >= 0.9 && spaceFactor < 0.1) {
        scale += Math.sin(state.clock.elapsedTime * 3 + i) * 0.05;
      }

      if (spaceFactor > 0) {
        scale = THREE.MathUtils.lerp(scale, 0.3, spaceFactor);
      }

      child.scale.setScalar(scale);

      child.lookAt(state.camera.position);
    });

    const scrollRotation = progress * Math.PI * 2;

    groupRef.current.rotation.y = scrollRotation * 0.2 + state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill) => (
        <group key={skill.name}>
          <DreiImage url={skill.iconPath} transparent opacity={1} />
        </group>
      ))}
    </group>
  );
}
