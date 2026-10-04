"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { onFrame } from "@/lib/frame";
import { Renderer, Camera, Program, Mesh, Triangle } from "ogl";

export interface OglTransitionRef {
  setProgress: (p: number) => void;
}

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
      // Fix aspect ratio for noise scaling
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 uv = vUv * aspect;
      
      // Multi-octave noise for rich smoke/liquid effect
      float n = snoise(uv * 2.0 + uTime * 0.1);
      float n2 = snoise(uv * 4.0 - uTime * 0.2) * 0.5;
      float n3 = snoise(uv * 8.0 + uTime * 0.3) * 0.25;
      float noise = (n + n2 + n3) * 0.5 + 0.5; 

      // Distance from center to create a circular reveal
      float dist = distance(vUv, vec2(0.5));
      
      // Threshold controlled by uProgress (0.0 to 1.0)
      // When uProgress is 0, threshold is very low (-1.0).
      // When uProgress is 1, threshold is very high (2.0).
      float threshold = uProgress * 2.5 - 0.5; 
      
      // Mix noise and distance so it burns outwards organically
      float dissolveValue = noise * 0.6 + dist * 0.6;
      
      // Calculate alpha (0 means transparent, 1 means solid black)
      float alpha = smoothstep(threshold, threshold + 0.3, dissolveValue);
      
      // Golden burning edge
      float edge = smoothstep(threshold - 0.1, threshold + 0.1, dissolveValue) - smoothstep(threshold + 0.1, threshold + 0.3, dissolveValue);
      
      // Base color: Very Dark Space/Charcoal
      vec3 baseColor = vec3(0.04, 0.04, 0.05); 
      
      // Edge color: Glowing Amber/Gold
      vec3 edgeColor = vec3(1.0, 0.6, 0.1) * (1.5 + snoise(uv * 10.0 + uTime) * 0.5); 
      
      vec3 finalColor = mix(baseColor, edgeColor, edge);
      
      // Force full opacity at the start to hide everything
      if (uProgress < 0.01) {
          alpha = 1.0;
          finalColor = baseColor;
      }
      
      // Handle pre-multiplied alpha
      gl_FragColor = vec4(finalColor * alpha, alpha);
  }
`;

export interface OglTransitionOverlayProps {
  className?: string;
}

export const OglTransitionOverlay = forwardRef<OglTransitionRef, OglTransitionOverlayProps>(
  (_props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const programRef = useRef<Program | null>(null);

    const currentProgress = useRef<number>(0);

    useImperativeHandle(ref, () => ({
      setProgress: (p: number) => {
        currentProgress.current = p;
        if (programRef.current) {
          programRef.current.uniforms.uProgress.value = p;
        }
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      // Initialize OGL Renderer with alpha enabled
      const renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
      const gl = renderer.gl;
      containerRef.current.appendChild(gl.canvas);
      rendererRef.current = renderer;

      const camera = new Camera(gl);
      camera.position.z = 1;

      // A single triangle that covers the full screen
      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: currentProgress.current }, // Initialize with the correct value
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      programRef.current = program;

      const mesh = new Mesh(gl, { geometry, program });

      // Handle Resize
      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (programRef.current) {
          programRef.current.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
        }
      };
      window.addEventListener("resize", resize, false);
      resize();

      // At progress 0 the shader discards every pixel, so once the canvas has
      // been cleared there is nothing to draw until the next transition
      let idleDrawn = false;
      const stop = onFrame((time) => {
        const idle = currentProgress.current < 0.01;
        if (idle && idleDrawn) return;
        idleDrawn = idle;
        if (programRef.current) programRef.current.uniforms.uTime.value = time;
        renderer.render({ scene: mesh, camera });
      });

      return () => {
        window.removeEventListener("resize", resize);
        stop();
        if (gl.canvas && gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
      };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
  }
);

OglTransitionOverlay.displayName = "OglTransitionOverlay";
