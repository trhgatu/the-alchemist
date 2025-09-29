'use client';
import Image from 'next/image';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';

export function TheAlchemistCard() {
  return (
    <div className="relative h-90 w-90 md:h-[450px] md:w-[450px] mx-auto">
      <div className="mt-4">
        <div className="h-[40rem] flex items-center justify-center">
          <TextHoverEffect text="trhgatu" />
        </div>
      </div>
      <Image
        src="/assets/images/gate.svg"
        alt="Gate Overlay"
        fill
        className="avatar-image-frame object-contain pointer-events-none opacity-30"
      />
      <Image
        src="/assets/images/avt.png"
        alt="The Alchemist Avatar"
        fill
        className="avatar-image object-cover"
      />

    </div>
  );
}
