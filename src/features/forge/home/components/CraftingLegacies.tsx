'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CraftingLegacies() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.to('#page-wrapper', {
      backgroundColor: '#ffffff',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'bottom center',
        scrub: true,
      },
    });

    gsap.to('.legacies-parallax', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#legacies',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(
      sectionRef.current.querySelectorAll(
        '.crafting-title span, .crafting-text span, .crafting-quote span'
      ),
      {
        color: '#000000',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom center',
          scrub: true,
        },
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      '.crafting-title span',
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
      '.crafting-text span',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.03,
        duration: 0.5,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    gsap.fromTo(
      '.crafting-quote span',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      id="legacies"
      ref={sectionRef}
      className="legacies relative min-h-screen flex flex-col items-center overflow-hidden justify-center text-center px-6"
    >
      <div className="legacies-parallax absolute inset-0 z-0">
        <Image
          src="/assets/images/adventure.svg"
          alt="Desert Adventure"
          width={800}
          height={800}
          priority
          className="object-cover opacity-10"
        />
      </div>

      <h2 className="crafting-title text-5xl md:text-7xl font-kings tracking-wide mb-8 text-white">
        {'Crafting Legacies'.split('').map((char, i) => (
          <span key={i} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <p className="crafting-text text-xl md:text-2xl leading-relaxed max-w-3xl text-white">
        {'Every line of code is not just a solution — it’s a legacy, a trace left behind to inspire, empower, and endure.'
          .split(' ')
          .map((word, i) => (
            <span key={i} className="inline-block mr-2">
              {word}
            </span>
          ))}
      </p>


      <div className="crafting-quote relative mt-12 italic text-lg md:text-xl max-w-2xl text-white">
        <Image
          src="/assets/images/apos.svg"
          alt="quote open mark"
          width={64}
          height={64}
          className=" absolute -top-6 -left-10 opacity-30 select-none pointer-events-none"
        />
        <Image
          src="/assets/images/apos.svg"
          alt="quote close mark"
          width={64}
          height={64}
          className=" absolute -bottom-6 -right-10 opacity-30 rotate-180 select-none pointer-events-none"
        />
        <span className="relative z-10 block leading-relaxed text-3xl font-oldenburg">
          {'And, when you want something, all the universe conspires in helping you to achieve it.'
            .split(' ')
            .map((word, i) => (
              <span key={i} className="inline-block mr-2">
                {word}
              </span>
            ))}
        </span>

        <div className="mt-4 relative z-10 not-italic">
          — Paulo Coelho, <span className="italic">The Alchemist</span>
        </div>
      </div>
    </section>
  );
}
