"use client";

import { useEffect, useRef } from "react";
import { isHiddenOnScreen } from "@/lib/visibility";
import { onFrame } from "@/lib/frame";
import { Renderer, Camera, Program, Mesh, Triangle } from "ogl";

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uCool; // 0 = forge amber, 1 = night silver

  // Hash function for noise
  float hash(vec2 p) {
      vec3 p3  = fract(vec3(p.xyx) * .1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
  }

  // Value Noise
  float noise(vec2 x) {
      vec2 p = floor(x);
      vec2 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float res = mix(mix(hash(p), hash(p + vec2(1.0, 0.0)), f.x),
                      mix(hash(p + vec2(0.0, 1.0)), hash(p + vec2(1.0, 1.0)), f.x), f.y);
      return res;
  }

  // Fractal Brownian Motion
  float fbm(vec2 x) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
    // Normalize coordinates based on resolution
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Scale st for the nebula to ensure clouds are distributed evenly across the screen
    vec2 nebulaSt = st * 3.0; // Base coordinates without scroll

    // Nebula Effect (FBM)
    // Layer 1: Deepest layer moves slowest
    vec2 q = vec2(0.);
    q.x = fbm(nebulaSt + vec2(0.0, uScroll * 0.05) + 0.00 * uTime);
    q.y = fbm(nebulaSt + vec2(0.0, uScroll * 0.08) + vec2(1.0));

    // Layer 2: Middle layer moves slightly faster
    vec2 r = vec2(0.);
    r.x = fbm(nebulaSt + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime + uMouse.x * 0.5 + vec2(0.0, uScroll * 0.12));
    r.y = fbm(nebulaSt + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime + uMouse.y * 0.5 + vec2(0.0, uScroll * 0.15));

    // Layer 3: Top layer moves fastest, creating volumetric separation
    float f = fbm(nebulaSt + r + vec2(0.0, uScroll * 0.22));

    // Forge palette (amber) cools into the night palette (ink blue, moonlit silver)
    vec3 warm = mix(vec3(0.01, 0.01, 0.01), vec3(0.1, 0.03, 0.0), clamp((f * f) * 3.0, 0.0, 1.0));
    warm = mix(warm, vec3(0.4, 0.15, 0.0), clamp(length(q), 0.0, 1.0));
    warm = mix(warm, vec3(0.6, 0.3, 0.0), clamp(length(r.x), 0.0, 1.0));

    vec3 cool = mix(vec3(0.005, 0.007, 0.014), vec3(0.03, 0.04, 0.08), clamp((f * f) * 3.0, 0.0, 1.0));
    cool = mix(cool, vec3(0.14, 0.17, 0.28), clamp(length(q), 0.0, 1.0));
    cool = mix(cool, vec3(0.34, 0.36, 0.44), clamp(length(r.x), 0.0, 1.0));
    cool = mix(cool, vec3(0.30, 0.17, 0.06), clamp(r.y * r.y * 0.6, 0.0, 0.35));

    vec3 color = mix(warm, cool, uCool);

    // Thin out the clouds using smoothstep to only keep the denser wisps
    float density = smoothstep(0.4, 1.0, f);
    color *= density * 1.5;

    // Procedural Stars removed so we only render Nebula

    // Add vignette
    vec2 vignetteUv = gl_FragCoord.xy / uResolution.xy;
    vignetteUv *=  1.0 - vignetteUv.yx;
    float vig = vignetteUv.x * vignetteUv.y * 15.0; // multiply with sth for intensity
    vig = pow(vig, 0.25); // change pow for modifying the extend of the vignette
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;

type OglStarFieldProps = {
  /** Fixed temperature, 0 = forge amber, 1 = night silver */
  cool?: number;
  /** Live temperature, read every frame; overrides `cool` */
  coolRef?: React.RefObject<number>;
};

export function OglStarField({ cool = 1, coolRef }: OglStarFieldProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Soft clouds need no retina detail; 1x is a quarter of the pixels at dpr 2
    const renderer = new Renderer({ alpha: true, dpr: 1 });
    const gl = renderer.gl;
    gl.canvas.className = "absolute inset-0 w-full h-full pointer-events-none";
    container.appendChild(gl.canvas);
    rendererRef.current = renderer;

    const camera = new Camera(gl);
    camera.position.z = 1;

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: [window.innerWidth * renderer.dpr, window.innerHeight * renderer.dpr],
        },
        uMouse: { value: [0, 0] },
        uScroll: { value: 0 },
        uCool: { value: coolRef?.current ?? cool },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetScroll = 0;
    let currentScroll = 0;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    let frame = 0;
    let hidden = false;
    const update = (_time: number, deltaMs: number) => {
      // The scroll timelines fade this layer out for long stretches; check
      // a few times a second and skip drawing while it cannot be seen
      if (frame++ % 15 === 0) hidden = isHiddenOnScreen(container);
      if (hidden) return;

      const delta = Math.min(deltaMs / 1000, 0.1);

      program.uniforms.uTime.value += delta;

      // Smooth scroll interpolation normalized by viewport height
      targetScroll = (window.scrollY || 0) / Math.max(window.innerHeight, 1);
      currentScroll += (targetScroll - currentScroll) * 0.08;
      program.uniforms.uScroll.value = currentScroll;

      const targetCool = coolRef?.current ?? cool;
      program.uniforms.uCool.value += (targetCool - program.uniforms.uCool.value) * 0.08;

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      program.uniforms.uMouse.value = [currentMouseX, currentMouseY];

      renderer.render({ scene: mesh, camera });
    };

    const stop = onFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      stop();
      if (container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
    };
    // coolRef is read per frame; only a change of the fixed value needs a rebuild
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cool]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
