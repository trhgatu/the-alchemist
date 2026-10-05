"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GoldenSparksProps {
  isIgnited?: boolean;
  activeColor?: string;
  idleColor?: string;
  count?: number;
  blending?: THREE.Blending;
  opacity?: number;
  visible?: boolean;
}

const SparkShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uIgnited: { value: 0 },
    uOpacity: { value: 1.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uIgnited;
    
    attribute float aScale;
    attribute float aSpeed;
    attribute float aRandom;
    attribute vec3 aOffset;

    varying float vProgress;
    varying float vRandom;

    void main() {
      vRandom = aRandom;

      // Slow down drift speed (0.03 to 0.08 speed factor for serene floating)
      float speed = (0.03 + uIgnited * 0.05) * aSpeed;
      float progress = mod(uTime * speed + aRandom * 100.0, 1.0);
      vProgress = progress;

      vec3 pos = aOffset;
      pos.y = mix(-6.0, 6.0, progress);
      
      // Gentle natural turbulence sway
      pos.x += sin(uTime * 0.6 + aRandom * 15.0) * 0.3;
      pos.z += cos(uTime * 0.5 + aRandom * 12.0) * 0.3;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Medium-large ember spark size
      float sizePulse = 0.8 + 0.3 * sin(uTime * 2.5 + aRandom * 25.0);
      float fade = sin(progress * 3.14159);
      gl_PointSize = aScale * 125.0 * fade * sizePulse / (-mvPosition.z);
    }
  `,
  fragmentShader: `
    uniform float uOpacity;
    uniform float uIgnited;

    varying float vProgress;
    varying float vRandom;

    void main() {
      // Angular Spark Shard Shape (Diamond / Asymmetric Fragment)
      vec2 st = gl_PointCoord - vec2(0.5);

      // Rotate point coordinates slightly per particle to give angular variation
      float angle = vRandom * 6.28318;
      float cosA = cos(angle);
      float sinA = sin(angle);
      vec2 rotatedSt = vec2(
        cosA * st.x - sinA * st.y,
        sinA * st.x + cosA * st.y
      );

      // Diamond / Shard Manhattan distance shape instead of plain circle
      float diamondDist = abs(rotatedSt.x) * 1.2 + abs(rotatedSt.y) * 0.8;
      if (diamondDist > 0.45) discard;

      // Sharp core with soft edge falloff
      float strength = pow(1.0 - diamondDist / 0.45, 2.0);
      
      // Ember Color Ramp: Bright Gold Core -> Ember Orange -> Dark Red/Tro
      vec3 core = vec3(1.0, 0.98, 0.85);
      vec3 amber = vec3(1.0, 0.55, 0.08);
      vec3 crimson = mix(vec3(0.85, 0.15, 0.05), vec3(0.3, 0.7, 1.0), 1.0 - uIgnited);

      vec3 color = mix(core, amber, vProgress * 1.2);
      color = mix(color, crimson, smoothstep(0.4, 1.0, vProgress));

      gl_FragColor = vec4(color, strength * uOpacity * 0.85);
    }
  `,
};

export function GoldenSparks({
  isIgnited = false,
  count = 400,
  blending = THREE.NormalBlending,
  opacity = 0.95,
  visible = true,
}: GoldenSparksProps) {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, offsets, scales, speeds, randoms } = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const offsetsArr = new Float32Array(count * 3);
    const scalesArr = new Float32Array(count);
    const speedsArr = new Float32Array(count);
    const randomsArr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 0] = 0;
      posArr[i * 3 + 1] = 0;
      posArr[i * 3 + 2] = 0;

      offsetsArr[i * 3 + 0] = (Math.random() - 0.5) * 18;
      offsetsArr[i * 3 + 1] = 0;
      offsetsArr[i * 3 + 2] = (Math.random() - 0.5) * 10;

      scalesArr[i] = 1.0 + Math.random() * 1.0;
      speedsArr[i] = 0.5 + Math.random() * 0.8;
      randomsArr[i] = Math.random();
    }

    return {
      positions: posArr,
      offsets: offsetsArr,
      scales: scalesArr,
      speeds: speedsArr,
      randoms: randomsArr,
    };
  }, [count]);

  useFrame((state, delta) => {
    if (!shaderMaterialRef.current) return;
    shaderMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    shaderMaterialRef.current.uniforms.uIgnited.value = THREE.MathUtils.lerp(
      shaderMaterialRef.current.uniforms.uIgnited.value,
      isIgnited ? 1 : 0,
      delta * 3
    );
    const targetOpacity = visible ? opacity : 0.0;
    shaderMaterialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      shaderMaterialRef.current.uniforms.uOpacity.value,
      targetOpacity,
      Math.min(delta * 8, 1)
    );
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={count}
          array={offsets}
          itemSize={3}
          args={[offsets, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={count}
          array={speeds}
          itemSize={1}
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={1}
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderMaterialRef}
        args={[SparkShaderMaterial]}
        transparent={true}
        depthWrite={false}
        blending={blending}
      />
    </points>
  );
}
