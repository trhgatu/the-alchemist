import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SKILLS } from "@/constants/Skills";

import { TechIcon } from "./TechIcon";
import {
  CONSTELLATION_LAYOUT,
  SCATTERED_POSITIONS,
  INITIAL_SPAWN,
  STAR_GLOW_CONFIG,
} from "../../constants";
import { PARTICLE_TIMING, PARTICLE_ANIMATION } from "../../constants";
import { createStarTexture } from "../../utils/starTexture";

export interface TechParticlesProps {
  scrollProgress: React.MutableRefObject<number>;
}

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

    groupRef.current.children.forEach((child: THREE.Object3D, i: number) => {
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

      const easePosition = 1 - Math.pow(1 - particleExplosionFactor, 2);

      const easeScale = 1 - Math.pow(1 - particleExplosionFactor, 5);

      const easeConverge = convergeFactor * convergeFactor * (3 - 2 * convergeFactor);

      let x = THREE.MathUtils.lerp(initial.x, scattered.x, easePosition);
      let y = THREE.MathUtils.lerp(initial.y, scattered.y, easePosition);
      let z = THREE.MathUtils.lerp(initial.z, scattered.z, easePosition);

      x = THREE.MathUtils.lerp(x, final.x, easeConverge);
      y = THREE.MathUtils.lerp(y, final.y, easeConverge);
      z = THREE.MathUtils.lerp(z, final.z, easeConverge);

      child.position.set(x, y, z);

      let scale = THREE.MathUtils.lerp(
        PARTICLE_ANIMATION.SCALE.MIN,
        PARTICLE_ANIMATION.SCALE.SCATTERED,
        easeScale
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

      const iconMesh = combinedGroup.children.find(
        (c: THREE.Object3D) => c.type === "Mesh"
      ) as THREE.Mesh;
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

      const starSprite = combinedGroup.children.find(
        (c: THREE.Object3D) => c.type === "Sprite"
      ) as THREE.Sprite;
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
      groupRef.current.children.forEach((child: THREE.Object3D, i: number) => {
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
    </group>
  );
}
