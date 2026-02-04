/**
 * Star Glow Shader
 * Creates a cinematic ring glow effect around tech icons
 */

import * as THREE from "three";

export class StarGlowMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uColor: { value: new THREE.Color("#00E5FF") }, // Cyan color
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);

          // Create ring glow (hollow center so icon is visible)
          float innerRadius = 0.25;
          float outerRadius = 0.5;

          // Ring mask
          float ring = smoothstep(innerRadius - 0.05, innerRadius, dist) *
                       (1.0 - smoothstep(outerRadius - 0.1, outerRadius, dist));

          // Pulsing effect
          float pulse = sin(uTime * 2.0) * 0.3 + 0.7;
          ring *= pulse;

          // Add sparkle rays (4 rays rotating)
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float rays = abs(sin(angle * 4.0 + uTime * 1.5)) * 0.5;
          rays *= (1.0 - smoothstep(0.2, 0.5, dist));

          float finalGlow = ring + rays * 0.3;

          gl_FragColor = vec4(uColor, finalGlow * uOpacity);
        }
      `,
    });
  }
}
