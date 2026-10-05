"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Distance tuned for landscape screens; portrait ones move back to keep the book whole. */
const BASE_Z = 8;
const MAX_Z = 15;

/**
 * The scene was framed for a landscape viewport. A perspective camera keeps
 * its vertical field of view, so on a tall phone the sides of the book fall
 * off screen; backing the camera away by the aspect ratio keeps the book's
 * width in frame.
 */
export function CameraFit() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    // 1.4 is roughly the narrowest aspect the original framing still fits
    const z = aspect >= 1.4 ? BASE_Z : Math.min(MAX_Z, BASE_Z * (1.4 / aspect) * 0.75);
    camera.position.z = Math.max(BASE_Z, z);
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}
