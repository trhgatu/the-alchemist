'use client';

import Image from 'next/image';
import { TECH_ICON_MAP } from '@/constants/Skills';

export const TechIcon = ({ name, size = 40 }: { name: string; size?: number }) => {
  const src = TECH_ICON_MAP[name] || '/assets/icons/default.svg';
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className="object-contain select-none"
    />
  );
};
