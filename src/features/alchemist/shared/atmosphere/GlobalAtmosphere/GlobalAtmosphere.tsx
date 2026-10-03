"use client";

import React, { useRef, useState } from "react";
import { View } from "@react-three/drei";
import { GoldenSparks } from "../GoldenSparks";
import { StarField } from "../StarField";
import { OglStarField } from "../StarField/OglStarField";
import { MagicCircle, CameraRig } from "../ForgeEmbers";
import { useAtmosphereTimeline } from "./hooks/useAtmosphereTimeline";

interface GlobalAtmosphereProps {
  isIgnited?: boolean;
  showSeal?: boolean;
  showStars?: boolean;
  sparkCount?: number;
}

export const GlobalAtmosphere = ({
  isIgnited = false,
  showSeal = false,
  showStars = true,
  sparkCount = 200,
}: GlobalAtmosphereProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [embersVisible, setEmbersVisible] = useState(true);
  const coolRef = useRef(0);

  useAtmosphereTimeline({
    containerRef,
    starsRef,
    embersRef,
    coolRef,
    setEmbersVisible: (visible) => {
      setEmbersVisible((prev) => (prev !== visible ? visible : prev));
    },
  });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {showStars && (
        <div ref={starsRef} className="absolute inset-0 z-0 global-stars pointer-events-none">
          <OglStarField coolRef={coolRef} />
          <StarField />
        </div>
      )}

      <div ref={embersRef} className="absolute inset-0 z-30 global-embers pointer-events-none">
        <View className="w-full h-full">
          {showSeal && <MagicCircle isIgnited={isIgnited} />}
          {showSeal && <CameraRig isIgnited={isIgnited} />}
          <GoldenSparks isIgnited={isIgnited} count={sparkCount} visible={embersVisible} />
          <ambientLight intensity={0.5} />
        </View>
      </div>
    </div>
  );
};
