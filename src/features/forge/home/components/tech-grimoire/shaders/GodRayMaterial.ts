import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    vUv = uv;
    vHeight = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
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
`;

export const GodRayMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffd700"),
    uOpacity: 0,
  },
  vertexShader,
  fragmentShader
);

export type GodRayMaterialType = {
  uTime: number;
  uColor: THREE.Color;
  uOpacity: number;
};
