import { useTexture } from "@react-three/drei";

interface TechIconProps {
  url: string;
}

/**
 * Render a 1×1 plane mesh textured from the provided image URL, configured as an unlit material and initially fully transparent.
 *
 * @param url - URL of the texture image to use as the plane's material map
 * @returns The React element for the textured plane mesh
 */
export function TechIcon({ url }: TechIconProps) {
  const texture = useTexture(url);

  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}