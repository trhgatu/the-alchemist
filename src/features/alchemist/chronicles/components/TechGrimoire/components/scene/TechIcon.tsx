import { useState, useEffect } from "react";
import * as THREE from "three";

interface TechIconProps {
  url: string;
}

export function TechIcon({ url }: TechIconProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;
    let tex: THREE.Texture | null = null;
    let blobUrl = "";

    fetch(url)
      .then((res) => res.text())
      .then((svgStr) => {
        if (!active) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgStr, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (svg) {
          if (!svg.getAttribute("width") || svg.getAttribute("width")?.includes("%")) {
            svg.setAttribute("width", "512");
          }
          if (!svg.getAttribute("height") || svg.getAttribute("height")?.includes("%")) {
            svg.setAttribute("height", "512");
          }
          const serializer = new XMLSerializer();
          const newSvgStr = serializer.serializeToString(svg);
          const blob = new Blob([newSvgStr], { type: "image/svg+xml;charset=utf-8" });
          blobUrl = URL.createObjectURL(blob);

          const img = new Image();
          img.onload = () => {
            if (!active) return;
            tex = new THREE.Texture(img);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;
            setTexture(tex);
          };
          img.src = blobUrl;
        }
      })
      .catch((err) => console.error("Failed to load SVG:", err));

    return () => {
      active = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      if (tex) tex.dispose();
    };
  }, [url]);

  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      {texture ? (
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      ) : (
        <meshBasicMaterial transparent opacity={0} />
      )}
    </mesh>
  );
}
