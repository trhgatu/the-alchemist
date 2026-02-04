/**
 * ⚙️ TECH PARTICLES COMPONENT
 * ═══════════════════════════════════════════════════════════
 *
 * Manages the tech stack icon particles animation through three phases:
 * 1. Initial spawn from magic circle center
 * 2. Scattered orbital phase (cylindrical golden spiral)
 * 3. Final constellation formation with MST connections
 *
 * @module tech-grimoire/components/scene/TechParticles
 */

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS } from "@/constants/Skills";

import { ConstellationLine } from "./ConstellationLine";
import {
  CONSTELLATION_LAYOUT,
  CONSTELLATION_EDGES,
  SCATTERED_POSITIONS,
  INITIAL_SPAWN,
} from "../../constants";
import { PARTICLE_TIMING, PARTICLE_ANIMATION } from "../../constants";

const distance = (
  p1: { x: number; y: number; z: number },
  p2: { x: number; y: number; z: number }
) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
};

export interface TechParticlesProps {
  scrollProgress: React.MutableRefObject<number>;
}

// 🎨 Helper: Generate High-Fidelity Star Texture with Tapered Spikes
const createStarTexture = () => {
  if (typeof document === "undefined") return null; // SSR safety
  const canvas = document.createElement("canvas");
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Clear buffer explicitely
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  // 1. Core Glow (Soft Halo)
  // Interpolate to White-Transparent instead of Black-Transparent to avoid dark fringes
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.4);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.1, "rgba(0, 255, 255, 0.8)");
  gradient.addColorStop(0.5, "rgba(0, 200, 255, 0.1)");
  gradient.addColorStop(1, "rgba(0, 200, 255, 0)"); // Clean fade

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // 2. Cross Flares
  const drawSoftRay = (isHorizontal: boolean) => {
    const grd = ctx.createLinearGradient(
      isHorizontal ? 0 : cx,
      isHorizontal ? cy : 0,
      isHorizontal ? size : cx,
      isHorizontal ? cy : size
    );
    // Use White-Transparent for clean ends
    grd.addColorStop(0, "rgba(255, 255, 255, 0)");
    grd.addColorStop(0.3, "rgba(255, 255, 255, 0.1)");
    grd.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
    grd.addColorStop(0.7, "rgba(255, 255, 255, 0.1)");
    grd.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = grd;

    if (isHorizontal) {
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, cy - 3, size, 6);
      ctx.globalAlpha = 0.6;
      ctx.fillRect(10, cy - 1, size - 20, 2);
      ctx.globalAlpha = 1.0;
      ctx.fillRect(20, cy - 0.5, size - 40, 1);
    } else {
      ctx.globalAlpha = 0.3;
      ctx.fillRect(cx - 3, 0, 6, size);
      ctx.globalAlpha = 0.6;
      ctx.fillRect(cx - 1, 10, 2, size - 20);
      ctx.globalAlpha = 1.0;
      ctx.fillRect(cx - 0.5, 20, 1, size - 40);
    }
    ctx.globalAlpha = 1.0;
  };

  drawSoftRay(true);
  drawSoftRay(false);

  // 3. Central Hotspot
  // Reduced intensity/size slightly to not overpower the icon sitting on top
  const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.05); // Smaller hot core
  coreGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)"); // Not full 1.0 opacity
  coreGlow.addColorStop(0.5, "rgba(220, 240, 255, 0.4)");
  coreGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = coreGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.05, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Custom Icon Component to handle Material properties cleanly
function TechIcon({ url }: { url: string }) {
  const texture = useTexture(url);
  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        depthWrite={false} // CRITICAL: Prevents "Black Box" occlusion artifacts
        toneMapped={false}
      />
    </mesh>
  );
}

export function TechParticles({ scrollProgress }: TechParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  // State for texture to ensure it's client-side only and disposable
  const [starTexture, setStarTexture] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    // Generate texture only on client mount
    const texture = createStarTexture();
    if (texture) {
      setStarTexture(texture);
    }

    // Cleanup: Dispose texture to prevent memory leaks
    return () => {
      if (texture) texture.dispose();
    };
  }, []);

  const sortedSkills = useMemo(() => {
    const centerTechs = SKILLS.filter((s) => ["TypeScript", "JavaScript"].includes(s.name));
    const otherTechs = SKILLS.filter((s) => !["TypeScript", "JavaScript"].includes(s.name));
    centerTechs.sort((a) => (a.name === "TypeScript" ? -1 : 1));
    return [...centerTechs, ...otherTechs];
  }, []);

  const initialPositions = useMemo(() => {
    return sortedSkills.map(() => ({
      x: 0,
      y: 0,
      z: 0,
    }));
  }, [sortedSkills]);

  const scatteredPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];

    sortedSkills.forEach((_, idx) => {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = idx * goldenAngle;

      const h =
        SCATTERED_POSITIONS.VERTICAL_RANGE.min +
        (idx / sortedSkills.length) * SCATTERED_POSITIONS.VERTICAL_RANGE.max;
      const r = SCATTERED_POSITIONS.CYLINDER_RADIUS;

      const x = r * SCATTERED_POSITIONS.HORIZONTAL_MULTIPLIER * Math.cos(theta);
      const y = h * SCATTERED_POSITIONS.VERTICAL_MULTIPLIER;
      const z = r * SCATTERED_POSITIONS.DEPTH_MULTIPLIER * Math.sin(theta);

      positions.push({ x, y, z });
    });
    return positions;
  }, [sortedSkills]);

  const finalPositions = useMemo(() => {
    return sortedSkills.map((_, i) => {
      // TypeScript and JavaScript at the heart
      if (i === 0) {
        return { x: -CONSTELLATION_LAYOUT.CORE_TECH_SPACING, y: 0, z: 0 };
      }
      if (i === 1) {
        return { x: CONSTELLATION_LAYOUT.CORE_TECH_SPACING, y: 0, z: 0 };
      }

      // Others orbit around the core
      const idx = i - 2;

      // Removed random angle increment to ensure proper spiral distribution without overlap
      const angle = idx * CONSTELLATION_LAYOUT.GOLDEN_ANGLE;

      const radius =
        CONSTELLATION_LAYOUT.ORBIT_RADIUS_MIN +
        Math.sqrt(idx / (sortedSkills.length - 2)) * CONSTELLATION_LAYOUT.ORBIT_RADIUS_MAX;

      // Reduced random offset significantly to prevent overlap
      // Just a tiny bit of jitter for organic feel, but safe enough
      const seed = idx * 1337;
      const pseudoRandomX = Math.sin(seed) * 0.5 + 0.5;
      const pseudoRandomY = Math.cos(seed * 0.7) * 0.5 + 0.5;

      // Reduced from 1.5 to 0.3 of the config value
      const offsetX = (pseudoRandomX - 0.5) * CONSTELLATION_LAYOUT.RANDOM_OFFSET * 0.3;
      const offsetY = (pseudoRandomY - 0.5) * CONSTELLATION_LAYOUT.RANDOM_OFFSET * 0.3;

      return {
        x: radius * Math.cos(angle) * CONSTELLATION_LAYOUT.HORIZONTAL_MULTIPLIER + offsetX,
        y: radius * Math.sin(angle) * CONSTELLATION_LAYOUT.VERTICAL_MULTIPLIER + offsetY,
        z: 0, // Keep 2D
      };
    });
  }, [sortedSkills]);

  /**
   * Generate constellation edges using MST + selective k-NN
   */
  const edges = useMemo(() => {
    const connections: [number, number][] = [];
    const n = sortedSkills.length;
    if (n === 0) return connections;

    const positions = finalPositions;

    // Build MST
    const visited = new Array(n).fill(false);
    const minDist = new Array(n).fill(Infinity);
    const parent = new Array(n).fill(-1);

    minDist[0] = 0;

    for (let count = 0; count < n - 1; count++) {
      let u = -1;
      let minVal = Infinity;
      for (let i = 0; i < n; i++) {
        if (!visited[i] && minDist[i] < minVal) {
          minVal = minDist[i];
          u = i;
        }
      }

      if (u === -1) break;
      visited[u] = true;

      for (let v = 0; v < n; v++) {
        if (!visited[v]) {
          const dist = distance(positions[u], positions[v]);
          if (dist < minDist[v]) {
            minDist[v] = dist;
            parent[v] = u;
          }
        }
      }
    }

    // Convert MST to edges
    const mstEdges = new Set<string>();
    for (let i = 1; i < n; i++) {
      if (parent[i] !== -1) {
        const u = Math.min(parent[i], i);
        const v = Math.max(parent[i], i);
        const key = `${u}-${v}`;
        mstEdges.add(key);
        connections.push([u, v]);
      }
    }

    // Add extra short edges
    const extraEdges: { u: number; v: number; d: number }[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const key = `${i}-${j}`;
        if (!mstEdges.has(key)) {
          const d = distance(positions[i], positions[j]);
          if (d < CONSTELLATION_EDGES.MAX_EXTRA_EDGE_LENGTH) {
            extraEdges.push({ u: i, v: j, d });
          }
        }
      }
    }
    extraEdges.sort((a, b) => a.d - b.d);

    for (let k = 0; k < Math.min(CONSTELLATION_EDGES.EXTRA_EDGE_COUNT, extraEdges.length); k++) {
      connections.push([extraEdges[k].u, extraEdges[k].v]);
    }

    return connections;
  }, [finalPositions, sortedSkills.length]);

  const staggerDelays = useMemo(() => {
    return sortedSkills.map(() => Math.random() * PARTICLE_TIMING.MAX_STAGGER_DELAY);
  }, [sortedSkills]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.current;
    const convergeFactor = THREE.MathUtils.smoothstep(
      progress,
      PARTICLE_TIMING.CONVERGENCE.START,
      PARTICLE_TIMING.CONVERGENCE.END
    );

    groupRef.current.children.forEach((child, i) => {
      if (child.type !== "Group") return;

      const initial = initialPositions[i];
      const scattered = scatteredPositions[i];
      const final = finalPositions[i];

      const delay = staggerDelays[i];
      const explosionStart = PARTICLE_TIMING.EXPLOSION.START + delay;
      const explosionEnd = PARTICLE_TIMING.EXPLOSION.END + delay;

      const particleExplosionFactor = THREE.MathUtils.smoothstep(
        progress,
        explosionStart,
        explosionEnd
      );

      const easeExplosion = 1 - Math.pow(1 - particleExplosionFactor, 3);
      const easeConverge = convergeFactor * convergeFactor * (3 - 2 * convergeFactor);

      // Orbital movement logic
      let x = THREE.MathUtils.lerp(initial.x, scattered.x, easeExplosion);
      let y = THREE.MathUtils.lerp(initial.y, scattered.y, easeExplosion);
      let z = THREE.MathUtils.lerp(initial.z, scattered.z, easeExplosion);

      x = THREE.MathUtils.lerp(x, final.x, easeConverge);
      y = THREE.MathUtils.lerp(y, final.y, easeConverge);
      z = THREE.MathUtils.lerp(z, final.z, easeConverge);

      child.position.set(x, y, z);

      let scale = THREE.MathUtils.lerp(
        PARTICLE_ANIMATION.SCALE.MIN,
        PARTICLE_ANIMATION.SCALE.SCATTERED,
        easeExplosion
      );

      // Pulse Animation logic (Enhanced Breathing)
      // Allow pulsing during final phase (convergeFactor > 0.5)
      if (convergeFactor > 0.5) {
        // Create a slow, deep "breathing" effect
        // Frequency: 2.0 (Slow breath), Amplitude: 0.15 (Noticeable but gentle)
        const breath = Math.sin(state.clock.elapsedTime * 2.0 + i * 1.5) * 0.15;

        // Apply to the base FINAL scale
        scale = THREE.MathUtils.lerp(
          scale,
          PARTICLE_ANIMATION.SCALE.FINAL * (1 + breath),
          convergeFactor
        );
      } else if (convergeFactor > 0) {
        scale = THREE.MathUtils.lerp(scale, PARTICLE_ANIMATION.SCALE.FINAL, convergeFactor);
      }

      if (progress < PARTICLE_TIMING.EXPLOSION.START) {
        scale = 0;
      }

      child.scale.setScalar(scale);
      child.lookAt(state.camera.position);
      child.visible = progress >= PARTICLE_TIMING.EXPLOSION.START;

      // Handle Opacity & Glow
      const combinedGroup = child;

      // 1. Tech Icon Image (Mesh)
      const iconMesh = combinedGroup.children.find((c) => c.type === "Mesh") as THREE.Mesh;
      if (iconMesh && iconMesh.material) {
        const iconMaterial = iconMesh.material as THREE.MeshBasicMaterial;
        const opacityFactor = THREE.MathUtils.smoothstep(
          progress,
          explosionStart,
          explosionStart + 0.05
        );
        iconMaterial.opacity = opacityFactor;
      }

      // 2. Star Glow Sprite
      const starSprite = combinedGroup.children.find((c) => c.type === "Sprite") as THREE.Sprite;
      if (starSprite && starSprite.material) {
        const opacityFactor = THREE.MathUtils.smoothstep(
          progress,
          explosionStart,
          explosionStart + 0.05
        );
        // Higher opacity for visibility
        starSprite.material.opacity = opacityFactor * 1.0;

        // Twinkle & Pulse
        if (progress > PARTICLE_TIMING.EXPLOSION.START) {
          const flicker = Math.sin(state.clock.elapsedTime * 3 + i * 10) * 0.2 + 0.8;
          starSprite.material.opacity *= flicker;

          const pulse = Math.sin(state.clock.elapsedTime * 2 + i * 5) * 0.1 + 1.0;
          // Apply pulse to scale
          starSprite.scale.setScalar(3.8 * pulse); // Base size 3.8
        }
      }
    });

    // 2D Drift Logic (Organic Movement)
    if (progress > PARTICLE_TIMING.EXPLOSION.START) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        if (child.type !== "Group") return;
        const driftX =
          Math.sin(time * INITIAL_SPAWN.DRIFT.SPEED + i * 1.5) * INITIAL_SPAWN.DRIFT.AMPLITUDE;
        const driftY =
          Math.cos(time * INITIAL_SPAWN.DRIFT.SPEED * 0.8 + i * 2.1) *
          INITIAL_SPAWN.DRIFT.AMPLITUDE;
        child.position.x += driftX;
        child.position.y += driftY;
      });
    }

    // Stop rotation before convergence
    // Logic: We want full rotation (1.0) initially, then fade to 0.0 as we lock in
    const rotationStopFactor =
      1 -
      THREE.MathUtils.smoothstep(
        progress,
        PARTICLE_TIMING.ROTATION_STOP.START,
        PARTICLE_TIMING.ROTATION_STOP.END
      );

    // Cinematic Sway (Tilt & Pan)
    const swayAngle = Math.PI / 12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    if (progress > PARTICLE_TIMING.EXPLOSION.START) {
      const swayProgress =
        (progress - PARTICLE_TIMING.EXPLOSION.START) / (1 - PARTICLE_TIMING.EXPLOSION.START);
      groupRef.current.rotation.y =
        THREE.MathUtils.lerp(-swayAngle * 0.5, swayAngle * 0.5, swayProgress) * rotationStopFactor;
    } else {
      groupRef.current.rotation.y = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {sortedSkills.map((skill) => (
        <group key={skill.name}>
          {/* Star Glow Sprite
              - MOVED BEHIND ICON (z=-0.1) so it backgrounds the icon vs washing it out
              - Scale increased slightly vs previous to ensure visibility
          */}
          {starTexture && (
            <sprite
              scale={[4.2, 4.2, 4.2]} // Larger to frame the icon
              renderOrder={-1} // Ensure it renders BEHIND the icon
              position={[0, 0, -0.1]} // Physical Z-push back
            >
              <spriteMaterial
                map={starTexture}
                transparent
                opacity={1.0}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </sprite>
          )}

          {/* Tech Icon Overlay - Maintained at Z=0 */}
          <TechIcon url={skill.iconPath} />
        </group>
      ))}
      {edges.map(([start, end], i) => (
        <ConstellationLine
          key={`line-${i}`}
          startIdx={start}
          endIdx={end}
          groupRef={groupRef}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
}
