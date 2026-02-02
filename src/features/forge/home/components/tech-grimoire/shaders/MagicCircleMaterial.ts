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
  uniform sampler2D uTexture;

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

    // Pulse effect
    float pulse = 0.8 + 0.2 * sin(uTime * 2.0);

    gl_FragColor = vec4(uColor, finalAlpha * uOpacity * pulse);
  }
`;

export const MagicCircleMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffd700"),
    uOpacity: 0,
    uTexture: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
);

export type MagicCircleMaterialType = {
  uTime: number;
  uColor: THREE.Color;
  uOpacity: number;
  uTexture: THREE.Texture;
};
