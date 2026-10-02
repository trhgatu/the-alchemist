import { useState, useEffect } from "react";
import * as THREE from "three";

interface TechIconProps {
  url: string;
}

const GOLD = { r: 255, g: 200, b: 120 };
const ICON_SIZE = 256;

// Brand logos come in their own colours; recast them as gold by luminance
// so detail survives (e.g. the dark "JS" on its yellow square).
function toGold(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = ICON_SIZE;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, ICON_SIZE, ICON_SIZE);
  const data = ctx.getImageData(0, 0, ICON_SIZE, ICON_SIZE);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
    const k = 0.25 + 0.75 * lum;
    px[i] = GOLD.r * k;
    px[i + 1] = GOLD.g * k;
    px[i + 2] = GOLD.b * k;
  }
  ctx.putImageData(data, 0, 0);
  return canvas;
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
          // Ensure SVG has pixel dimensions for canvas drawing
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
            tex = new THREE.CanvasTexture(toGold(img));
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
