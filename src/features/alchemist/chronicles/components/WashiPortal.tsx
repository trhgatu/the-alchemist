"use client";

import { useEffect, useRef } from "react";
import { onFrameWhileVisible } from "@/lib/frame";
import { getQuality, reducedMotion } from "@/lib/quality";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";

/**
 * The washi paper with the name cut out of it, drawn in one shader.
 *
 * The zoom through the letters happens in the shader by scaling texture
 * coordinates, so its cost is the same at 1x and at 80x: the browser never
 * re-rasterises the paper or the type. The letters are rendered once into a
 * softened mask and thresholded per pixel (alpha-tested magnification), which
 * keeps their edges crisp while they are blown up.
 */

export type PortalState = { zoom: number; alpha: number };

const VERTEX = /* glsl */ `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D uMask;
uniform sampler2D uPaper;
uniform vec2 uRes;
uniform float uDpr;
uniform float uZoom;
uniform float uAlpha;
uniform float uTime;
out vec4 outColor;

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
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 11.0; a *= 0.5; }
  return v;
}

vec3 fireRamp(float h) {
  vec3 c = mix(vec3(0.23, 0.06, 0.01), vec3(0.71, 0.25, 0.04), smoothstep(0.0, 0.4, h));
  c = mix(c, vec3(0.91, 0.44, 0.07), smoothstep(0.35, 0.65, h));
  c = mix(c, vec3(1.0, 0.77, 0.36), smoothstep(0.6, 0.85, h));
  return mix(c, vec3(1.0, 0.95, 0.76), smoothstep(0.85, 1.0, h));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  vec2 zuv = (uv - 0.5) / uZoom + 0.5;

  // Letters: threshold the softened mask, anti-aliased by screen derivatives
  float d = texture(uMask, zuv).r;
  float w = max(fwidth(d) * 0.75, 1e-4);
  float letter = smoothstep(0.5 - w, 0.5 + w, d);

  // Paper: warm off-white, fibres multiplied in, the texture rotated 180°
  vec2 pp = (frag - 0.5 * uRes) / uZoom / (800.0 * uDpr);
  vec3 fibres = texture(uPaper, -pp).rgb;
  vec3 paper = vec3(0.956, 0.943, 0.915) * mix(vec3(1.0), fibres, 0.4);
  // Scorched edges of the sheet
  vec2 edge = min(zuv, 1.0 - zuv) * uRes / uDpr;
  float ed = min(edge.x, edge.y);
  float burn = (1.0 - smoothstep(0.0, 150.0, ed)) * 0.12 + (1.0 - smoothstep(0.0, 50.0, ed)) * 0.06;
  paper = mix(paper, vec3(1.0, 0.39, 0.0), burn);

  // Fire seen through the letters, rising; it fades as the portal opens so
  // the night behind takes its place
  vec2 fp = frag / uRes.y * 3.2;
  fp.y -= uTime * 0.55;
  float n = fbm(fp + vec2(0.0, fbm(fp * 0.6 + uTime * 0.15)));
  float heat = clamp(n * 1.25 - (uv.y - 0.5) * 0.9 + 0.05, 0.0, 1.0);
  vec3 fire = fireRamp(heat);
  float fireAlpha = 1.0 - smoothstep(1.4, 5.0, uZoom);

  vec3 col = mix(paper, fire, letter);
  float a = mix(1.0, fireAlpha, letter) * uAlpha;
  outColor = vec4(col, a);
}
`;

const FONT_VW = 0.22;

/** Draws the name into a softened white-on-black mask, centred like the old h1. */
function drawMask(canvas: HTMLCanvasElement, w: number, h: number, dpr: number) {
  const fontFamily =
    getComputedStyle(document.documentElement).getPropertyValue("--font-kings").trim() || "serif";
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const size = (w / dpr) * FONT_VW * dpr;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.font = `bold ${size}px ${fontFamily}`;
  if ("letterSpacing" in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${-0.025 * size}px`;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const m = ctx.measureText("trhgatu");
  const y = h / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
  // A soft edge turns the mask into a rough distance field, so the shader's
  // threshold stays sharp when the letters are magnified
  ctx.filter = `blur(${Math.max(1, size * 0.004)}px)`;
  ctx.fillStyle = "#fff";
  ctx.fillText("trhgatu", w / 2, y);
}

export function WashiPortal({
  stateRef,
  className = "",
}: {
  stateRef: React.RefObject<PortalState>;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const dpr = getQuality() === "low" ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const still = reducedMotion();
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr, webgl: 2 });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.className = "absolute inset-0 h-full w-full";
    host.appendChild(canvas);

    const maskCanvas = document.createElement("canvas");
    const mask = new Texture(gl, { generateMipmaps: false });
    const paper = new Texture(gl, { wrapS: gl.REPEAT, wrapT: gl.REPEAT });
    const img = new Image();
    img.onload = () => {
      paper.image = img;
    };
    img.src = "/assets/images/craftings/texture_washi.png";

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uMask: { value: mask },
        uPaper: { value: paper },
        uRes: { value: [1, 1] },
        uDpr: { value: dpr },
        uZoom: { value: 1 },
        uAlpha: { value: 1 },
        uTime: { value: 0 },
      },
      transparent: true,
      depthTest: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let alive = true;
    const rebuildMask = () => {
      const w = gl.canvas.width;
      const h = gl.canvas.height;
      drawMask(maskCanvas, w, h, dpr);
      mask.image = maskCanvas;
      mask.needsUpdate = true;
    };
    const resize = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
      rebuildMask();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // The mask needs the real typeface, which may still be loading
    document.fonts.ready.then(() => alive && resize());

    const stop = onFrameWhileVisible(host, (time) => {
      const { zoom, alpha } = stateRef.current;
      host.style.visibility = alpha < 0.001 ? "hidden" : "";
      if (alpha < 0.001) return;
      program.uniforms.uZoom.value = zoom;
      program.uniforms.uAlpha.value = alpha;
      program.uniforms.uTime.value = still ? 3 : time;
      renderer.render({ scene: mesh });
    });

    return () => {
      alive = false;
      stop();
      ro.disconnect();
      if (canvas.parentElement === host) host.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [stateRef]);

  return <div ref={hostRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
