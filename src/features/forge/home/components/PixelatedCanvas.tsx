"use client";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export function PixelatedCanvasComponent() {
  return (
    <PixelatedCanvas
      src="/assets/images/frame.svg"
      width={250}
      height={250}
      cellSize={5}
      dotScale={0.85}
      shape="square"
      backgroundColor=""
      dropoutStrength={0.08}
      interactive
      distortionStrength={0.3}
      distortionRadius={250}
      distortionMode="repel"
      followSpeed={0.25}
      jitterStrength={3}
      jitterSpeed={1}
      sampleAverage
      className="object-contain mx-auto"
    />
  );
}
