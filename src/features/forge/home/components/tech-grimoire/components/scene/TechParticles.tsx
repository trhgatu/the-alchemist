import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SKILLS } from "@/constants/Skills";

import { ConstellationLine } from "./ConstellationLine";
import { TechIcon } from "./TechIcon";
import {
  CONSTELLATION_LAYOUT,
  CONSTELLATION_EDGES,
  SCATTERED_POSITIONS,
  INITIAL_SPAWN,
  STAR_GLOW_CONFIG,
} from "../../constants";
import { PARTICLE_TIMING, PARTICLE_ANIMATION } from "../../constants";
import { distance } from "../../utils/math";
import { createStarTexture } from "../../utils/starTexture";

export interface TechParticlesProps {
  scrollProgress: React.MutableRefObject<number>;
}

/**
 * Render an animated constellation of technology icons that explodes, scatters, and converges based on scroll progress.
 *
 * @param scrollProgress - Mutable ref whose current numeric value (typically 0–1) drives the particle animation timeline
 * @returns The React element containing the particle group, icon sprites, and connecting constellation lines
 */
export function TechParticles({ scrollProgress }: TechParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [starTexture, setStarTexture] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    const texture = createStarTexture();
    if (texture) {
      setStarTexture(texture);
    }

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
      if (i === 0) {
        return { x: -CONSTELLATION_LAYOUT.CORE_TECH_SPACING, y: 0, z: 0 };
      }
      if (i === 1) {
        return { x: CONSTELLATION_LAYOUT.CORE_TECH_SPACING, y: 0, z: 0 };
      }

      const idx = i - 2;

      const angle = idx * CONSTELLATION_LAYOUT.GOLDEN_ANGLE;

      const radius =
        CONSTELLATION_LAYOUT.ORBIT_RADIUS_MIN +
        Math.sqrt(idx / (sortedSkills.length - 2)) * CONSTELLATION_LAYOUT.ORBIT_RADIUS_MAX;

      const seed = idx * 1337;
      const pseudoRandomX = Math.sin(seed) * 0.5 + 0.5;
      const pseudoRandomY = Math.cos(seed * 0.7) * 0.5 + 0.5;

      const offsetX = (pseudoRandomX - 0.5) * CONSTELLATION_LAYOUT.RANDOM_OFFSET * 0.3;
      const offsetY = (pseudoRandomY - 0.5) * CONSTELLATION_LAYOUT.RANDOM_OFFSET * 0.3;

      return {
        x: radius * Math.cos(angle) * CONSTELLATION_LAYOUT.HORIZONTAL_MULTIPLIER + offsetX,
        y: radius * Math.sin(angle) * CONSTELLATION_LAYOUT.VERTICAL_MULTIPLIER + offsetY,
        z: 0,
      };
    });
  }, [sortedSkills]);

  const edges = useMemo(() => {
    const connections: [number, number][] = [];
    const n = sortedSkills.length;
    if (n === 0) return connections;

    const positions = finalPositions;

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

      if (convergeFactor > 0.5) {
        const breath = Math.sin(state.clock.elapsedTime * 2.0 + i * 1.5) * 0.15;

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

      const combinedGroup = child;

      const iconMesh = combinedGroup.children.find((c) => c.type === "Mesh") as THREE.Mesh;
      if (iconMesh && iconMesh.material) {
        const iconMaterial = iconMesh.material as THREE.MeshBasicMaterial;

        let opacityFactor = THREE.MathUtils.smoothstep(
          progress,
          explosionStart,
          explosionStart + 0.05
        );

        if (progress > PARTICLE_TIMING.DISPERSE.START) {
          const fadeOut = 1 - (progress - PARTICLE_TIMING.DISPERSE.START) / 0.02;
          opacityFactor *= THREE.MathUtils.clamp(fadeOut, 0, 1);
        }

        iconMaterial.opacity = opacityFactor;
      }

      const starSprite = combinedGroup.children.find((c) => c.type === "Sprite") as THREE.Sprite;
      if (starSprite && starSprite.material) {
        const opacityFactor = THREE.MathUtils.smoothstep(
          progress,
          explosionStart,
          explosionStart + 0.05
        );
        starSprite.material.opacity = opacityFactor * 1.0;

        if (progress > PARTICLE_TIMING.EXPLOSION.START) {
          const flicker = Math.sin(state.clock.elapsedTime * 3 + i * 10) * 0.2 + 0.8;
          starSprite.material.opacity *= flicker;

          const pulse = Math.sin(state.clock.elapsedTime * 2 + i * 5) * 0.1 + 1.0;
          starSprite.scale.setScalar(STAR_GLOW_CONFIG.SCALE.BASE * pulse);
        }
      }
    });
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

    const rotationStopFactor =
      1 -
      THREE.MathUtils.smoothstep(
        progress,
        PARTICLE_TIMING.ROTATION_STOP.START,
        PARTICLE_TIMING.ROTATION_STOP.END
      );
    const swayAngle = Math.PI / 12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    if (progress <= PARTICLE_TIMING.DISPERSE.START) {
      if (progress > PARTICLE_TIMING.EXPLOSION.START) {
        const swayProgress =
          (progress - PARTICLE_TIMING.EXPLOSION.START) / (1 - PARTICLE_TIMING.EXPLOSION.START);
        groupRef.current.rotation.y =
          THREE.MathUtils.lerp(-swayAngle * 0.5, swayAngle * 0.5, swayProgress) *
          rotationStopFactor;
      } else {
        groupRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {sortedSkills.map((skill) => (
        <group key={skill.name}>
          {starTexture && (
            <sprite
              scale={[
                STAR_GLOW_CONFIG.SCALE.SPRITE,
                STAR_GLOW_CONFIG.SCALE.SPRITE,
                STAR_GLOW_CONFIG.SCALE.SPRITE,
              ]}
              renderOrder={-1}
              position={[0, 0, -0.1]}
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
