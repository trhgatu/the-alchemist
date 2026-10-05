"use client";

import { useEffect, useRef } from "react";
import { onFrameWhileVisible } from "@/lib/frame";
import { onQualityChange, reducedMotion, softDpr } from "@/lib/quality";
import { Mesh, Program, Renderer, Triangle } from "ogl";

// The air over the desert at dawn: a band of clouds lit from below near the
// horizon, drifting with the wind. Same fbm smoke as the mist frames, so it
// reads as the same material as the rest of the site.

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 x) {
  vec2 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.0 + 17.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;      // y up; the horizon sits near y = 0.33
  float aspect = uRes.x / uRes.y;
  float t = uTime;

  // --- Clouds: long, flat streaks in a band above the horizon -------------
  // Drift to the left with the wind (~40px/s on a laptop) and slowly change shape
  vec2 cp = vec2(uv.x * aspect * 1.4 + t * 0.06, uv.y * 7.0);
  float c = fbm(cp + vec2(0.0, fbm(cp * 0.5 + vec2(t * 0.03, 0.0)) * 0.8));
  float band = smoothstep(0.36, 0.44, uv.y) * (1.0 - smoothstep(0.56, 0.68, uv.y));
  float cloud = smoothstep(0.44, 0.66, c) * band;
  // Lit from the sun below: the underside warm, the tops in the blue of night
  float under = clamp((fbm(cp - vec2(0.0, 0.25)) - c) * 6.0 + 0.5, 0.0, 1.0);
  float warmth = 1.0 - smoothstep(0.38, 0.66, uv.y);
  vec3 cloudCol = mix(vec3(0.33, 0.27, 0.40), vec3(0.98, 0.66, 0.50), clamp(warmth * 0.8 + under * 0.5, 0.0, 1.0));

  float a = cloud * 0.85;
  vec3 col = cloudCol;
  gl_FragColor = vec4(col, a);
}
`;

export function DawnAir({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: softDpr(1), // soft clouds; full resolution buys nothing but fill cost
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.className = "absolute inset-0 h-full w-full";
    host.appendChild(canvas);

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: { uRes: { value: [1, 1] }, uTime: { value: 0 } },
      transparent: true,
      depthTest: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.dpr = softDpr(1);
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const still = reducedMotion();
    const offQuality = onQualityChange(resize);
    const stop = onFrameWhileVisible(host, (time) => {
      // Reduced motion: the clouds hold still
      program.uniforms.uTime.value = still ? 12 : time;
      renderer.render({ scene: mesh });
    });

    return () => {
      stop();
      offQuality();
      ro.disconnect();
      if (canvas.parentElement === host) host.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
