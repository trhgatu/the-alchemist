'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Image from 'next/image';
import { TheAlchemistCard } from '@/features/forge/home/components/the-alchemist';
import { FallingLeaves } from '@/features/forge/home/components/FallingLeaves';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemist() {
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      '.about-title.line-1 span',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.05, duration: 0.8 }
    )
      .fromTo(
        '.about-title.line-2 span',
        { opacity: 0, scale: 0.8, yPercent: 50 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          stagger: 0.05,
          duration: 1,
          ease: 'elastic.out(1,0.6)',
        },
        '-=0.4'
      )
      .to('.about-title span', {
        duration: 0.6,
        repeat: 1,
        yoyo: true,
      });

    gsap.to('.about-desc-1 span, .about-desc-2 span', {
      opacity: 1,
      color: '#ffffff',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.about-content-container',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: true,
      },
    });

    gsap.to('.avatar-image-frame', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.to('.avatar-image', {
      yPercent: -15,
      ease: 'none',
      scale: 1.05,
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="about"
      className="about min-h-screen relative z-0 border-t border-white/20"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <Image
          src="/assets/images/frame.svg"
          alt="Background Frame"
          fill
          className="object-cover"
        />
      </div>
      <div className="about-wrapper max-w-7xl mx-auto py-20 relative">
        <FallingLeaves />
        <div className="about-title-container text-center text-white md:mb-16">
          <div className="about-title line-1 text-4xl md:text-7xl font-kings tracking-wide">
            {'Forged in Code'.split('').map((char, idx) => (
              <span key={idx} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          <div className="about-title line-2 text-2xl font-kings md:text-4xl italic mt-4">
            {'Tempered by Challenge'.split('').map((char, idx) => (
              <span key={idx} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        <div className="about-content-container font-serif">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
            <div className="space-y-12">
              <p className="about-desc-1 text-xl md:text-2xl leading-relaxed">
                {'A passionate software engineer — an alchemist of code who forges ideas where logic meets imagination. Every challenge is a forge, every bug a spark, and from each trial I carry forward one mission: to grow, to learn, and to shape raw concepts into lasting creations.'
                  .split(' ')
                  .map((word, wi) => (
                    <span key={wi} className="word inline-block mr-2">
                      {word.split('').map((char, ci) => (
                        <span
                          key={ci}
                          className="char inline-block opacity-30 text-gray-400"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
              </p>

              <p className="about-desc-2 text-xl md:text-2xl leading-relaxed">
                {'To create digital experiences that breathe with elegance and strike with impact — not just tools, but stories that resonate and endure.'
                  .split(' ')
                  .map((word, wi) => (
                    <span key={wi} className="word inline-block mr-2">
                      {word.split('').map((char, ci) => (
                        <span
                          key={ci}
                          className="char inline-block opacity-30 text-gray-400"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
              </p>
            </div>
            <div className="flex justify-center">
              <TheAlchemistCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
