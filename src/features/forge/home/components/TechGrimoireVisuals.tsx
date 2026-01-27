import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

const GodRayMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffd700"),
    uOpacity: 0,
  },
  `
    varying vec2 vUv;
    varying float vHeight;
    void main() {
      vUv = uv;
      vHeight = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    varying float vHeight;

    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main() {
      float n = noise(vec2(vUv.x * 10.0, vUv.y * 3.0 - uTime * 0.5));

      float alpha = smoothstep(0.0, 0.4, vUv.y) * (1.0 - smoothstep(0.6, 1.0, vUv.y));

      float beam = smoothstep(0.3, 0.7, n);

      vec3 finalColor = uColor + beam * 0.2;

      gl_FragColor = vec4(finalColor, alpha * uOpacity * (0.2 + beam * 0.5));
    }
  `
);

const MagicCircleMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffd700"),
    uOpacity: 0,
    uTexture: new THREE.Texture(),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform sampler2D uTexture; // Texture sampler
    varying vec2 vUv;

    void main() {
      // Rotation logic directly on UVs
      float angle = uTime * 0.2;
      mat2 rotate = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

      // Center UVs, Rotate, then Restore
      vec2 centeredUv = vUv - 0.5;
      vec2 rotatedUv = rotate * centeredUv + 0.5;

      // Sample texture
      vec4 texColor = texture2D(uTexture, rotatedUv);

      // 1. Texture Mask (Brightness)
      float pattern = texColor.r;

      // 2. Circular Fade Mask (Crucial for removing square edges)
      // Fade out from 0.45 to 0.5 radius to soften the edge and kill the square corners
      float dist = length(centeredUv);
      float circleEdge = 1.0 - smoothstep(0.45, 0.5, dist);

      // Combine patterns
      float finalAlpha = pattern * circleEdge;

      // Pulse
      float pulse = 0.8 + 0.2 * sin(uTime * 2.0);

      gl_FragColor = vec4(uColor, finalAlpha * uOpacity * pulse);
    }
  `
);

const PageGlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffaa00"),
    uOpacity: 0,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center);

      // Vignette Style Glow: Bright center, rapid falloff to dark/transparent edges
      // 0.0 -> 0.45 gives a tighter bright spot (book page is rectangular 1.2x0.8, so 0.4 radius fits)
      float glow = 1.0 - smoothstep(0.0, 0.45, dist);

      // Make the falloff non-linear (squared) for distinct "burned/dark" edges effect
      glow = pow(glow, 2.0);

      float pulse = 0.8 + 0.2 * sin(uTime * 3.0);

      gl_FragColor = vec4(uColor, glow * uOpacity * pulse * 0.6);
    }
  `
);

extend({ GodRayMaterial, MagicCircleMaterial, PageGlowMaterial });

interface GrimoireMaterialType extends THREE.ShaderMaterial {
  uTime: number;
  uOpacity: number;
  uColor?: THREE.Color;
  uTexture?: THREE.Texture;
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    godRayMaterial: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    magicCircleMaterial: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageGlowMaterial: any;
  }
}

export function PageGlow({ opacity }: { opacity: number }) {
  const materialRef = useRef<GrimoireMaterialType>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uOpacity = opacity;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
      <planeGeometry args={[1.2, 0.8]} />
      <pageGlowMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function MagicCircle({ opacity, scale = 1 }: { opacity: number; scale?: number }) {
  const materialRef = useRef<GrimoireMaterialType>(null);
  const texture = useTexture("/assets/images/craftings/magic_circle.png");

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uOpacity = opacity;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]} scale={scale}>
      <planeGeometry args={[1.5, 1.5]} />
      <magicCircleMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function GodRays({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const rayGroupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<GrimoireMaterialType>(null);
  const glowRef = useRef<GrimoireMaterialType>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const circleGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !materialRef.current) return;

    const p = scrollProgress.current;
    const time = state.clock.elapsedTime;

    let opacity = 0;
    let rayGrow = 0;
    let circleGrow = 0;

    if (p < 0.3) {
      opacity = 0;
      rayGrow = 0;
      circleGrow = 0;
    } else if (p >= 0.3 && p < 0.4) {
      // STEP 1: Magic Circle Opens (0.3 -> 0.4)
      const circleProgress = (p - 0.3) / 0.1;
      opacity = circleProgress;
      circleGrow = circleProgress;
      rayGrow = 0;
    } else if (p >= 0.4 && p < 0.5) {
      const rayProgress = (p - 0.4) / 0.1;
      opacity = 1;
      circleGrow = 1;
      rayGrow = rayProgress;
    } else if (p >= 0.5 && p < 0.75) {
      opacity = 1;
      rayGrow = 1;
      circleGrow = 1;
    } else if (p >= 0.75 && p < 0.85) {
      const exitP = (p - 0.75) / 0.1;

      if (exitP < 0.5) {
        rayGrow = 1 - exitP * 2;
        circleGrow = 1;
      } else {
        rayGrow = 0;
        circleGrow = 1 - (exitP - 0.5) * 2;
      }

      opacity = 1 - exitP;
    }

    const pulse = Math.sin(time * 2) * 0.1 + 0.9;

    materialRef.current.uTime = time;
    materialRef.current.uOpacity = opacity * pulse;

    if (glowRef.current) {
      glowRef.current.uTime = time;
      glowRef.current.uOpacity = opacity * 0.3 * pulse;
    }

    if (lightRef.current) {
      lightRef.current.intensity = rayGrow * 2.0 + pulse * 0.5;
    }
    if (rayGroupRef.current) {
      rayGroupRef.current.scale.set(rayGrow, rayGrow * (1 + Math.sin(time * 3) * 0.1), rayGrow);
    }

    if (circleGroupRef.current) {
      circleGroupRef.current.scale.setScalar(circleGrow);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <PageGlow opacity={1} />

      <group ref={circleGroupRef}>
        <MagicCircle opacity={1} />
      </group>

      <group ref={rayGroupRef}>
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.4, 0.6, 5, 32, 1, true]} />
          <godRayMaterial
            ref={materialRef}
            transparent
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uColor={new THREE.Color("#ffd700")}
          />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.8, 1.2, 5, 32, 1, true]} />
          <godRayMaterial
            ref={glowRef}
            transparent
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uColor={new THREE.Color("#ffaa00")}
          />
        </mesh>
      </group>
    </group>
  );
}
