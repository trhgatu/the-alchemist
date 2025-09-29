'use client';

import Image from 'next/image';
import React from 'react';

export const BlurredImageHeader = ({
  imageUrl,
  icon,
  subtitle,
  iconColor = 'text-orange-400',
}: {
  imageUrl: string;
  icon: React.ReactNode;
  subtitle: string;
  iconColor?: string;
}) => (
  <div className="relative flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden bg-black">
    <div className="absolute inset-0 z-0">
      <Image
        src={imageUrl}
        alt="Blurred background"
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover filter blur-2xl scale-125"
        style={{ zIndex: 0 }}
        aria-hidden="true"
        priority={imageUrl.startsWith('/')}
      />
      <div className="absolute inset-0 bg-black/80" />
    </div>

    <div className="absolute inset-0 z-10">
      <Image
        src={imageUrl}
        alt="Clear image"
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, #fff 18%, #fff 82%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, #fff 18%, #fff 82%, transparent 100%)',
        }}
        priority={imageUrl.startsWith('/')}
      />
    </div>

    <div
      className="absolute inset-0 z-15 pointer-events-none"
      style={{
        background:
          'linear-gradient(90deg, black 0%, transparent 20%, transparent 80%, black 100%)',
      }}
    />

    <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
      <div className="text-center">
        <div className={`mx-auto h-12 w-12 ${iconColor} mb-2 drop-shadow-lg`}>
          {icon}
        </div>
        <span className="text-white text-sm font-medium drop-shadow-lg">
          {subtitle}
        </span>
      </div>
    </div>

    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-15" />

    <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 pointer-events-none z-30" />
  </div>
);
