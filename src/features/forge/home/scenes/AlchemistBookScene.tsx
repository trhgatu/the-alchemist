"use client";

import { useRef } from "react";

import { Group } from "three";
import { Environment, Center, Float } from "@react-three/drei";
import { AlchemistBook } from "@/features/forge/home/components/AlchemistBook";

export default function AlchemistBookScene() {
  const modelRef = useRef<Group>(null);

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Center>
          <AlchemistBook ref={modelRef} scale={[5, 5, 5]} />
        </Center>
      </Float>
      <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={1.5} />
    </group>
  );
}
