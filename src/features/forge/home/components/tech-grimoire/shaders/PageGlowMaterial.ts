import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);

    float glow = 1.0 - smoothstep(0.0, 0.45, dist);
    glow = pow(glow, 2.0);

    float pulse = 0.8 + 0.2 * sin(uTime * 3.0);

    gl_FragColor = vec4(uColor, glow * uOpacity * pulse * 0.6);
  }
`;

export const PageGlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffaa00"),
    uOpacity: 0,
  },
  vertexShader,
  fragmentShader
);

export type PageGlowMaterialType = {
  uTime: number;
  uColor: THREE.Color;
  uOpacity: number;
};
