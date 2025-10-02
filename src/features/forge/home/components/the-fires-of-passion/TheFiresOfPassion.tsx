'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TheFiresOfPassion() {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; type: '1' | '2'; depth: number; dir: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 8,
      type: (Math.random() > 0.5 ? '1' : '2') as '1' | '2',
      depth: Math.random() * 0.6 + 0.2,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));
    setStars(generated);
  }, []);

  useGSAP(() => {
    // timeline chung cho 2 dòng
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#fires',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      '.quote-main.line-1 span',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      }
    ).fromTo(
      '.quote-main.line-2 span',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.3' // overlap nhẹ với line-1
    );

    // sub quote
    gsap.fromTo(
      '.quote-sub',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#fires',
          start: 'top 75%',
        },
      }
    );

    // apos marks
    gsap.fromTo(
      '.apos',
      { opacity: 0, scale: 0.8, rotate: -10 },
      {
        opacity: 0.25,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '#fires',
          start: 'top 75%',
        },
      }
    );
  }, [stars]);


  return (
    <section
      id="fires"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-yellow-100/10 via-black to-black" />

      <div className="relative font-oldenburg z-20 text-white text-center px-6 max-w-7xl mx-auto py-28 md:py-40 select-none">
        <div className="relative inline-block max-w-3xl mx-auto">
          <Image
            src="/assets/images/apos.svg"
            alt="quote open mark"
            width={64}
            height={64}
            className="apos absolute -top-8 -left-10 opacity-0 select-none pointer-events-none filter invert"
          />
          <Image
            src="/assets/images/apos.svg"
            alt="quote close mark"
            width={64}
            height={64}
            className="apos absolute -bottom-8 -right-10 opacity-0 rotate-180 select-none pointer-events-none filter invert"
          />

          <p className="quote-main line-1 text-lg sm:text-xl md:text-4xl italic drop-shadow leading-relaxed">
            {"I don't just write code."
              .split('')
              .map((char, i) => (
                <span key={i} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
          </p>

          <p className="quote-main line-2 text-lg sm:text-xl md:text-4xl italic drop-shadow leading-relaxed mt-2">
            {'I temper spirit into logic.'
              .split('')
              .map((char, i) => (
                <span key={i} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
          </p>
        </div>

        <p className="quote-sub text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-light tracking-wide max-w-2xl mx-auto mt-6">
          In this forge, every line of code is a hammer strike.
          <br />
          Every project is a blade tempered through trials and passion.
          <br />I don&apos;t code just to survive — I code to live true to who I am.
        </p>
      </div>

      {stars.map((star) => (
        <Image
          key={star.id}
          src={`/assets/images/union_${star.type}.svg`}
          alt="star"
          width={star.size}
          height={star.size}
          className="star-parallax absolute pointer-events-none"
          data-depth={star.depth}
          data-dir={star.dir}
          data-type={star.type}
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
