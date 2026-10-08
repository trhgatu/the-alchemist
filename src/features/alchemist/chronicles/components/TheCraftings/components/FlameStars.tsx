"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import { onFrameWhileVisible } from "@/lib/frame";
import { getQuality, reducedMotion } from "@/lib/quality";
import { orbitPoint } from "../orbit";

/**
 * The works as fires burning in the night, along the orbit.
 *
 * One shader draws every flame in a single canvas: rising turbulence inside
 * a teardrop silhouette that sways, frays into tongues at the top and carries
 * bright strands up through it. Only the work in front is alight; the others
 * smoulder low and catch as they are scrolled to, then die back after, with a
 * few sparks rising from the one alight. Positions follow the orbit, driven by
 * the scroll progress ref.
 */

// The shader is unrolled per star, so keep this close to the number of works
const MAX_STARS = 6;
// Flame scale in CSS px; a flame at full fire stands about 1.6 times this tall
const FLAME_SIZE = 155;

const VERTEX = /* glsl */ `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform int uCount;
uniform vec4 uStars[${MAX_STARS}]; // x, y (CSS px from top-left), size, fire
uniform float uWind[${MAX_STARS}]; // sideways lean from the cursor, -1 … 1
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

// Heat of one flame at q: offset from its root in flame units, y pointing up.
// The root sits at y = 0. Fire runs from 0 (smouldering) to 1 (ablaze).
float flame(vec2 q, float fire, float seed, float wind) {
  if (q.y < -0.4 || q.y > 2.0 || abs(q.x) > 0.9) return 0.0;
  float t = uTime;

  // An unlit work is a small, low flame; it grows evenly as it catches,
  // never squashed
  float scale = mix(0.22, 1.0, fire);
  vec2 g = q / scale;
  if (g.y > 2.0 || abs(g.x) > 0.9) return 0.0;
  float y = max(g.y, 0.0);

  // The whole flame sways, more the higher it reaches
  vec2 sw = vec2(g.y * 1.3 - t * 1.6, seed);
  float sway = (noise(sw) * 0.67 + noise(sw * 2.03 + 11.0) * 0.33 - 0.5) * 0.55 * y;
  // A passing cursor bends it like a draught, the tip most of all
  sway += wind * y * y * 0.35;
  vec2 p = vec2(g.x - sway, g.y);

  // Rising turbulence, fine across so the edge splits into slender tongues
  float n = fbm(vec2(p.x * 5.0 + seed, p.y * 2.0 - t * 2.6));

  // Slim teardrop: full at the root, narrowing to the tip
  float width = 0.44 * pow(1.0 - smoothstep(0.0, 1.65, y), 0.75)
              * smoothstep(-0.35, 0.15, g.y);
  float f = width - abs(p.x) + (n - 0.5) * (0.22 + 0.4 * y);
  float body = smoothstep(0.0, 0.24, f) * (1.0 - smoothstep(1.4, 1.9, g.y));

  // Bright strands and darker gaps running up through the fire
  float strands = fbm(vec2(p.x * 8.0 + seed, p.y * 1.6 - t * 3.2));
  float h = body * mix(0.46, 1.1, strands * strands * 2.0);
  // Hottest low and in the middle, cooling toward the tips
  h *= mix(1.0, 0.5, smoothstep(0.1, 1.5, y));
  h += body * smoothstep(0.25, 0.0, abs(p.x)) * smoothstep(0.7, 0.05, g.y) * 0.2;

  // A bed of embers at its root, flickering coal by coal: the fire's ground
  vec2 eb = vec2(g.x / 0.55, (g.y + 0.02) / 0.1);
  float bedShape = exp(-dot(eb, eb) * 1.6);
  float coals = noise(vec2(g.x * 22.0 + seed, g.y * 34.0)) * (0.55 + 0.45 * noise(vec2(g.x * 9.0, t * 2.2 + seed)));
  h = max(h, bedShape * (0.35 + 0.75 * smoothstep(0.2, 0.7, coals)));

  // A faint glow around the fire
  float glow = exp(-length(vec2(g.x * 1.6, g.y - 0.5)) * 2.6) * 0.2;
  // A few sparks drifting up out of a fire that has caught
  float sparks = 0.0;
  for (int k = 0; k < 5; k++) {
    float fk = float(k);
    float life = fract(t * (0.28 + 0.07 * fk) + hash(vec2(fk, seed)));
    vec2 sp = vec2((hash(vec2(seed, fk)) - 0.5) * 0.5 + sin(life * 5.0 + fk * 2.1) * 0.12,
                   0.35 + life * 1.5);
    vec2 dd = (g - sp) * vec2(1.0, 0.7);
    sparks += exp(-dot(dd, dd) * 2200.0) * (1.0 - life);
  }
  h = max(h, sparks * smoothstep(0.5, 1.0, fire));

  // Unlit, it smoulders dark red; alight, it burns through to yellow
  return clamp(max(h, glow), 0.0, 1.0) * mix(0.42, 1.0, fire);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
  float h = 0.0;
  for (int i = 0; i < ${MAX_STARS}; i++) {
    if (i >= uCount) break;
    vec4 s = uStars[i];
    vec2 d = (px - s.xy) / s.z;
    // The flame burns around its point on the orbit
    h = max(h, flame(vec2(d.x, 0.45 - d.y), s.w, float(i) * 7.31, uWind[i]));
  }
  // Like real fire, only the hottest strands are near opaque
  float a = pow(clamp(h, 0.0, 1.0), 0.95);
  outColor = vec4(fireRamp(h) * a, a);
}
`;

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

export function FlameStars({
  names,
  progressRef,
  height,
  onSelect,
}: {
  /** One per work, in orbit order */
  names: string[];
  /** Fractional index of the work in front, 0 … count - 1 */
  progressRef: React.RefObject<number>;
  /** Height the orbit is laid out for */
  height: number;
  /** Bring work `i` to the front */
  onSelect: (i: number) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(height);
  // One marker per work: its chapter numeral, and its name on hover
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = Math.min(names.length, MAX_STARS);

  useEffect(() => {
    heightRef.current = height;
  }, [height]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || count === 0) return;
    // The orbit is hidden below md; there is nothing to draw, so take no context
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    // Soft fire loses nothing at 1x, and costs a third of the pixels of 1.5x
    const dpr = getQuality() === "low" ? 0.75 : 1;
    const still = reducedMotion();
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, dpr, webgl: 2 });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.className = "absolute inset-0 h-full w-full";
    host.appendChild(canvas);

    // Plain arrays: OGL only resolves uStars[0] against Array values
    const stars: number[] = new Array(MAX_STARS * 4).fill(0);
    const winds: number[] = new Array(MAX_STARS).fill(0);
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uRes: { value: [1, 1] },
        uDpr: { value: dpr },
        uTime: { value: 0 },
        uCount: { value: count },
        uStars: { value: stars },
        uWind: { value: winds },
      },
      transparent: true,
      depthTest: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // The cursor, in the column's px; only precise pointers stir the flames
    const pointer = { x: -1e4, y: -1e4 };
    const fine = window.matchMedia("(pointer: fine)").matches && !still;
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    // Fire and wind ease toward their targets, so nothing switches abruptly
    const fire = new Float32Array(MAX_STARS);

    const draw = (time: number, deltaMs: number) => {
      const progress = progressRef.current ?? 0;
      const height = heightRef.current;
      const ease = 1 - Math.exp(-deltaMs / 220);
      const windEase = 1 - Math.exp(-deltaMs / 300);

      for (let i = 0; i < count; i++) {
        const { x, y } = orbitPoint(i, progress, height);
        // Only the work in front burns; a slot away it dies back to a smoulder
        const front = Math.max(0, 1 - Math.abs(i - progress) * 1.6);
        fire[i] += (front - fire[i]) * ease;
        stars[i * 4] = x;
        stars[i * 4 + 1] = y;
        stars[i * 4 + 2] = FLAME_SIZE;
        stars[i * 4 + 3] = fire[i];

        // Lean away from a cursor passing close by
        const dx = x - pointer.x;
        const dy = y - 30 - pointer.y;
        const near = Math.exp(-(dx * dx + dy * dy) / (2 * 110 * 110));
        const target = Math.max(-1, Math.min(1, dx / 60)) * near;
        winds[i] += (target - winds[i]) * windEase;

        // The marker follows its fire; it brightens as the fire catches
        const marker = markerRefs.current[i];
        if (marker) {
          marker.style.transform = `translate3d(${x - 60}px, ${y - 70}px, 0)`;
          marker.style.setProperty("--fire", fire[i].toFixed(3));
        }
      }

      program.uniforms.uTime.value = still ? 2 : time;
      renderer.render({ scene: mesh });
    };

    // The driver compiles the shader on its first draw; do that now, while
    // the page loads, rather than as a stall when the flames scroll into view
    resize();
    draw(0, 0);

    const stop = onFrameWhileVisible(host, draw);

    return () => {
      stop();
      ro.disconnect();
      if (fine) window.removeEventListener("pointermove", onPointer);
      if (canvas.parentElement === host) host.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [count, progressRef]);

  return (
    <div className="absolute inset-0">
      <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0" />
      {names.slice(0, count).map((name, i) => (
        <button
          key={name}
          ref={(el) => {
            markerRefs.current[i] = el;
          }}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={name}
          className="group absolute top-0 left-0 h-[215px] w-[120px] cursor-pointer will-change-transform"
          style={{ transform: "translate3d(-300px, -300px, 0)" }}
        >
          {/* A caption under the fire, as under a plate in an old book: the
              chapter numeral, and the name on hover */}
          <span
            className="pointer-events-none absolute inset-x-0 top-[152px] flex flex-col items-center"
            style={{
              opacity: "calc(0.4 + 0.6 * var(--fire, 0))",
              color: "color-mix(in oklab, #fde68a calc(var(--fire, 0) * 100%), #a3a3a3)",
            }}
          >
            <span className="font-kings text-xl leading-none">{NUMERALS[i]}</span>
            <span className="mt-1.5 -translate-y-1 whitespace-nowrap font-garamond text-sm italic opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
              {name}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
