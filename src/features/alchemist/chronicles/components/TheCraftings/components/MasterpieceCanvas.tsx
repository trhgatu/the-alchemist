"use client";

import { Project } from "@/types";
import { MistFrame } from "@/features/alchemist/shared/effects/MistFrame";

interface MasterpieceCanvasProps {
  project: Project;
}

export function MasterpieceCanvas({ project: p }: MasterpieceCanvasProps) {
  const displayImage =
    p.thumbnail || p.images?.[0] || "/assets/images/craftings/alchemist_mountain_path.png";

  return <MistFrame src={displayImage} alt={p.name} />;
}
