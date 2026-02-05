import { useTexture } from "@react-three/drei";

interface TechIconProps {
  url: string;
}

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
