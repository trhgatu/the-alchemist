'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TheFiresOfPassion() {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; type: '1' | '2'; depth: number; dir: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      type: (Math.random() > 0.5 ? '1' : '2') as '1' | '2',
      depth: Math.random() * 0.6 + 0.2, // độ sâu (ảnh hưởng Y)
      dir: Math.random() > 0.5 ? 1 : -1, // hướng trôi ngang
    }));
    setStars(generated);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#fires',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.utils.toArray<HTMLElement>('.star-parallax').forEach((star) => {
      const depth = Number(star.dataset.depth);
      const dir = Number(star.dataset.dir);
      const moveY = -(80 * depth);
      const moveX = dir * (30 * depth);
      tl.to(star, { x: moveX, y: moveY, ease: 'none' }, 0);
    });
  }, [stars]);

  return (
    <section id="fires" className="relative min-h-screen">
      <div className="relative text-white text-center px-2 sm:px-4 md:px-12 lg:px-24 max-w-5xl mx-auto py-28 md:py-40 select-none">
        <div className="relative z-20">
          <p className="text-lg sm:text-xl md:text-4xl font-serif italic mb-6 drop-shadow">
            “I don&apos;t just write code. I temper spirit into logic.”
          </p>
          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-light tracking-wide max-w-2xl mx-auto bg-gradient-to-b from-stone-200/80 to-stone-400/40 bg-clip-text">
            In this forge, every line of code is a hammer strike.
            <br />
            Every project is a blade tempered through trials and passion.
            <br />I don&apos;t code just to survive — I code to live true to who I
            am.
          </p>
        </div>
      </div>
      {stars.map((star) => (
        <Image
          key={star.id}
          src={`/assets/images/union_${star.type}.svg`}
          alt="Star"
          width={star.size}
          height={star.size}
          className="star-parallax absolute pointer-events-none animate-pulse"
          data-depth={star.depth}
          data-dir={star.dir}
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 6px #facc15aa)',
          }}
        />
      ))}
    </section>
  );
}
