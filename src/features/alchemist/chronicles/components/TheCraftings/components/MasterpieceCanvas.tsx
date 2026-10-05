"use client";

import { Project } from "@/types";
import { MistFrame } from "@/features/alchemist/shared/effects/MistFrame";

interface MasterpieceCanvasProps {
  project: Project;
}

export function MasterpieceCanvas({ project: p }: MasterpieceCanvasProps) {
  const displayImage =
    p.thumbnail || p.images?.[0] || "/assets/images/craftings/the-alchemist.webp";

  // The screenshots are 16:10; show them whole
  return <MistFrame src={displayImage} alt={p.name} className="aspect-16/10" />;
}
