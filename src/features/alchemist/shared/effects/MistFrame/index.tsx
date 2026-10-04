"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";

// Ported from the thatu portfolio (ProjectMistPortal), reduced to the resting
// frame: one image whose edge dissolves into slow silver smoke, with the
// cursor ripple and mist vortex.
//
// Every MistFrame draws into the one shared canvas (ViewCanvas) through a
// drei <View>, which scissors each frame to its element's box. A page full of
// frames costs no extra WebGL contexts.

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uTex;
uniform vec2 uImageSize;
varying vec2 vUv;
uniform vec2 uRes;      // this frame's size in drawing-buffer px
uniform float uOpacity; // CSS opacity of the frame's ancestors
uniform float uTime;
uniform vec2 uFocus;   // 0–1, the point of the image kept in frame
uniform float uZoom;   // 1 = cover fit, >1 crops tighter around uFocus
uniform float uFill;    // share of the canvas the image occupies; the rest is mist room
uniform vec2 uMouse;    // drawing-buffer px, origin bottom-left
uniform float uMouseStrength;
uniform float uHover;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 4; ++i) {
    v += a * snoise(p);
    p = p * 2.05 + shift;
    a *= 0.5;
  }
  return v;
}

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + vec2(r);
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec2 getCoverUv(vec2 uv, vec2 imgSize, vec2 targetSize) {
  vec2 ratio = vec2(
    min((targetSize.x / targetSize.y) / (imgSize.x / imgSize.y), 1.0),
    min((targetSize.y / targetSize.x) / (imgSize.y / imgSize.x), 1.0)
  ) / uZoom;
  // uFocus picks which part of the image stays in view (GL uv, y up)
  return uv * ratio + (1.0 - ratio) * uFocus;
}

void main() {
  // Pixel position inside this frame (the shared canvas draws many frames,
  // so gl_FragCoord would be relative to the whole screen)
  vec2 frag = vUv * uRes;
  vec2 uv = frag / uRes;
  float H = uRes.y;
  float aspect = uRes.x / uRes.y;
  vec2 center = uRes * 0.5;
  vec2 halfSize = uRes * 0.5 * uFill;

  vec3 mistColor = vec3(0.92, 0.94, 0.98);

  float smoke1 = fbm(uv * vec2(2.5, 2.0) + vec2(uTime * 0.05, -uTime * 0.08));
  float smoke2 = fbm(uv * vec2(5.5, 4.5) + vec2(-uTime * 0.09, uTime * 0.12) + smoke1 * 0.4);

  // Cursor: ripple + mist vortex
  vec2 mDelta = (frag - uMouse) / H;
  float mDist = length(mDelta);
  float rippleWave = sin(mDist * 28.0 - uTime * 6.5) * exp(-mDist * 4.2) * uHover;
  vec2 rippleDisp = normalize(mDelta + vec2(0.0001)) * rippleWave * 0.022;
  float mSwirl = exp(-mDist * 3.5) * (uHover * 0.75 + uMouseStrength * 0.25);
  vec2 swirlDisp = vec2(-mDelta.y, mDelta.x) * mSwirl * 0.045;
  vec2 hoverDisp = rippleDisp + swirlDisp;

  vec2 mistDisplace = vec2(smoke1, smoke2) * 0.055 + hoverDisp * 1.4;
  vec2 warpedP = (frag - center) / H + mistDisplace * vec2(aspect, 1.0);
  float dist = sdRoundedBox(warpedP, halfSize / H, 0.04);

  float alpha = smoothstep(0.015, -0.035, dist);
  if (alpha <= 0.001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 localUv = clamp((frag - (center - halfSize)) / (2.0 * halfSize), 0.0, 1.0);
  vec2 imgUv = getCoverUv(localUv, uImageSize, 2.0 * halfSize) + hoverDisp;
  float chroma = length(hoverDisp) * 1.6;
  vec3 color;
  color.r = texture2D(uTex, clamp(imgUv + hoverDisp * chroma, 0.001, 0.999)).r;
  vec4 centerTexel = texture2D(uTex, clamp(imgUv, 0.001, 0.999));
  color.g = centerTexel.g;
  color.b = texture2D(uTex, clamp(imgUv - hoverDisp * chroma, 0.001, 0.999)).b;
  // Transparent images (cut-out portraits) sit on a pale backdrop, not black
  color = mix(vec3(0.93, 0.92, 0.89), color, centerTexel.a);

  float spotlight = exp(-mDist * 3.2) * uHover;
  color += vec3(1.0, 0.94, 0.84) * spotlight * 0.32;
  float focusRing = exp(-pow((mDist - 0.12 - sin(uTime * 3.5) * 0.018) * 18.0, 2.0)) * uHover * 0.25;
  color += vec3(0.95, 0.98, 1.0) * focusRing;

  float internalSmoke = smoke1 * 0.5 + smoke2 * 0.5;
  color += vec3(internalSmoke) * 0.06;

  float rim = exp(-pow((dist + 0.008) * 36.0, 2.0)) * 0.35;
  rim += exp(-pow((dist + 0.004) * 32.0, 2.0)) * uHover * 0.40;
  gl_FragColor = vec4(color + mistColor * rim, alpha * uOpacity);
}
`;

const FILL = 0.88;

type MistFrameProps = {
  src: string;
  alt: string;
  className?: string;
  /** Point of the image to keep in view, [x, y] from the top-left, 0–1 */
  focus?: [number, number];
  /** Crop tighter around `focus`; 1 = plain cover fit */
  zoom?: number;
};

/** Product of the CSS opacity of an element and its ancestors (0 if hidden). */
function effectiveOpacity(el: HTMLElement): number {
  let o = 1;
  for (let n: HTMLElement | null = el; n && n !== document.body; n = n.parentElement) {
    const cs = getComputedStyle(n);
    if (cs.visibility === "hidden" || cs.display === "none") return 0;
    o *= Number(cs.opacity);
  }
  return o;
}

function MistPlane({
  src,
  focus,
  zoom,
  frameRef,
}: {
  src: string;
  focus: [number, number];
  zoom: number;
  frameRef: React.RefObject<HTMLDivElement | null>;
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uTex: { value: null },
          uImageSize: { value: new THREE.Vector2(16, 9) },
          uRes: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uFill: { value: FILL },
          uFocus: { value: new THREE.Vector2(focus[0], 1 - focus[1]) },
          uZoom: { value: zoom },
          uMouse: { value: new THREE.Vector2(-9999, -9999) },
          uMouseStrength: { value: 0 },
          uHover: { value: 0 },
          uOpacity: { value: 1 },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    // focus and zoom are constants per frame
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    let alive = true;
    const tex = new THREE.TextureLoader().load(src, (t) => {
      if (!alive) return;
      const img = t.image as HTMLImageElement;
      material.uniforms.uImageSize.value.set(img.naturalWidth || 16, img.naturalHeight || 9);
      material.uniforms.uTex.value = t;
    });
    // Raw colours straight through: this shader has no colour-space conversion
    tex.colorSpace = THREE.NoColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    return () => {
      alive = false;
      tex.dispose();
    };
  }, [src, material]);

  useEffect(() => () => material.dispose(), [material]);

  // Pointer in client px; hover eases in/out so the ripple fades gently
  const mouse = useRef({ x: -9999, y: -9999, strength: 0, hovered: false, hover: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const m = mouse.current;
      m.x = e.clientX;
      m.y = e.clientY;
      const el = frameRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      m.hovered =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (m.hovered) m.strength = Math.min(m.strength + 0.35, 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [frameRef]);

  const frame = useRef(0);
  useFrame((state) => {
    const el = frameRef.current;
    if (!el) return;
    const u = material.uniforms;
    const dpr = state.viewport.dpr;
    const r = el.getBoundingClientRect();
    u.uRes.value.set(r.width * dpr, r.height * dpr);
    u.uTime.value = state.clock.elapsedTime;

    // Cards fade and hide through CSS on their ancestors; mirror that here
    if (frame.current++ % 10 === 0) u.uOpacity.value = effectiveOpacity(el);

    const m = mouse.current;
    u.uMouse.value.set(
      ((m.x - r.left) / r.width) * r.width * dpr,
      ((r.bottom - m.y) / r.height) * r.height * dpr
    );
    u.uMouseStrength.value = m.strength;
    m.strength *= 0.94;
    m.hover += ((m.hovered ? 1 : 0) - m.hover) * 0.12;
    u.uHover.value = m.hover;
  });

  return (
    <mesh frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

// Screenshots keep their header in view by default
const TOP_CENTER: [number, number] = [0.5, 0];

/** An image framed by drifting silver mist, drawn into the shared canvas. */
export function MistFrame({ src, alt, className, focus = TOP_CENTER, zoom = 1 }: MistFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={alt}
      className={cn("relative aspect-video w-full select-none", className)}
    >
      <View className="absolute inset-0">
        <MistPlane src={src} focus={focus} zoom={zoom} frameRef={frameRef} />
      </View>
    </div>
  );
}
