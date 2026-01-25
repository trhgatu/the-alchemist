"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface TransmutationParticlesProps {
  scrollProgress: React.MutableRefObject<number>;
}

export const TransmutationParticles = ({ scrollProgress }: TransmutationParticlesProps) => {
  const count = 2000;

  const { positions, randoms, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();

      color.setHSL(0, 0, 0.2 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, randoms, colors };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const target = new THREE.Vector3();
  const current = new THREE.Vector3();
  const tempColor = new THREE.Color();

  useFrame((state) => {
    if (!geometryRef.current) return;
    const progress = scrollProgress.current;
    const t = state.clock.elapsedTime;

    const posAttr = geometryRef.current.attributes.position as THREE.BufferAttribute;
    const colorAttr = geometryRef.current.attributes.color as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      current.set(posAttr.array[ix], posAttr.array[iy], posAttr.array[iz]);

      const r1 = randoms[ix];
      const r2 = randoms[iy];
      const r3 = randoms[iz];

      if (progress < 0.33) {
        const p = progress / 0.33;

        const jitter = 0.5 + p * 2;
        const size = 3;
        target.set(
          (r1 - 0.5) * size + Math.sin(t * 2 + r2 * 10) * 0.1 * jitter,
          (r2 - 0.5) * size + Math.cos(t * 1.5 + r1 * 10) * 0.1 * jitter,
          (r3 - 0.5) * size
        );

        tempColor.setHSL(0, 0, 0.3);
      } else if (progress < 0.66) {
        const p = (progress - 0.33) / 0.33;

        const angle = t * 0.5 + r3 * Math.PI * 2 + p * 10;
        const radius = 2 + Math.sin(t * 0.5 + r1 * 10) * 1 + p * 2;

        target.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * (radius * 0.2) + (r2 - 0.5) * 4,
          Math.sin(angle) * radius
        );

        if (r1 > 0.8) tempColor.setHSL(0.08, 1, 0.6);
        else tempColor.setHSL(0.05, 0.9, 0.5);
      } else {
        const p = (progress - 0.66) / 0.34;

        const scale = 5;
        const speed = 0.5;
        const angle = r1 * Math.PI * 2 + t * speed * (r3 > 0.5 ? 1 : -1);

        const denom = 1 + Math.sin(angle) * Math.sin(angle);

        const noiseX = (r2 - 0.5) * 0.3 * (1 - p);
        const noiseY = (r3 - 0.5) * 0.3 * (1 - p);
        const noiseZ = (Math.random() - 0.5) * 0.5;

        target.set(
          (scale * Math.cos(angle)) / denom + noiseX,
          (scale * Math.cos(angle) * Math.sin(angle)) / denom + noiseY,
          noiseZ
        );

        tempColor.setHSL(0.12 + r1 * 0.05, 1.0, 0.6 + Math.sin(t * 2 + r1 * 5) * 0.2);
      }

      current.lerp(target, 0.05);
      posAttr.setXYZ(i, current.x, current.y, current.z);

      const curR = colorAttr.array[ix];
      const curG = colorAttr.array[iy];
      const curB = colorAttr.array[iz];

      colorAttr.setXYZ(
        i,
        curR + (tempColor.r - curR) * 0.05,
        curG + (tempColor.g - curG) * 0.05,
        curB + (tempColor.b - curB) * 0.05
      );
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;

    if (pointsRef.current) {
      let targetX = 1.5;
      if (progress > 0.33 && progress < 0.66) targetX = -1.5;
      if (progress > 0.66) targetX = 0;

      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;

      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
