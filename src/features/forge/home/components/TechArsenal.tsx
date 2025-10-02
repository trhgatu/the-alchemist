'use client';

import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { SKILLS } from '@/constants/Skills';

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const TechArsenal = () => {
  useEffect(() => {
    gsap.fromTo(
      '.arsenal-title span',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#tech-arsenal',
          start: 'top 70%',
        },
      }
    );

    const techTL = gsap.timeline({})
    techTL.fromTo(
      '.tech-icon',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#tech-arsenal',
          start: 'top 60%',
          end: 'bottom 100%',
          scrub: true,
        },
      }
    );


    gsap.to('.mountain-back', {
      yPercent: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#tech-arsenal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.mountain-front', {
      yPercent: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#tech-arsenal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.to('.dragon-front img', {
      scale: 1.05,
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#tech-arsenal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.dragon-front', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#tech-arsenal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

  }, []);

  return (
    <section id="tech-arsenal" className="relative bg-[#f0f0f0] w-full min-h-screen flex items-center justify-center">
      <div className="mountain-front absolute -top-[50px] md:-top-[200px] z-10 pointer-events-none">
        <Image
          src="/assets/images/mountain_divider.webp"
          alt="Divider"
          width={1200}
          height={150}
          className="h-full object-cover select-none w-full"
        />
      </div>
      <div className="mountain-back absolute -top-[18px] md:-top-[100px] left-0 right-0 w-full z-10 pointer-events-none">
        <Image
          src="/assets/images/mountain_2.svg"
          alt="Divider"
          width={1600}
          height={200}
          className="h-auto object-cover select-none w-full"
        />
      </div>
      <div className="absolute top-20 left-0 z-0 pointer-events-none">
        <Image
          src="/assets/images/the-sun.svg"
          alt="The Sun"
          width={250}
          height={250}
          className="opacity-20 select-none "
        />
      </div>

      <div className="dragon-front absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <Image
          src="/assets/images/medieval_dragon.png"
          alt="Dragon"
          width={900}
          height={900}
          className="object-contain opacity-10"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/assets/images/knight_state.svg"
          alt="The Sun"
          width={250}
          height={250}
          className="opacity-20 select-none "
        />
      </div>
      <div className="relative z-10 w-full pt-28 pb-20 max-w-5xl px-6 text-center">
        <h2 className="arsenal-title text-4xl md:text-6xl font-kings text-black mb-4 tracking-wide drop-shadow-sm">
          {'The Arsenal of Code'.split('').map((char, i) => (
            <span key={i} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <p className="text-black mb-10 italic text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Every line of code is forged with purpose.
          These are the tools, languages, and frameworks I have tempered —
          my arsenal in the endless forge of creation.
        </p>

        <TooltipProvider delayDuration={100}>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {SKILLS.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col tech-icon items-center justify-center cursor-pointer group">
                      <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ">
                        <Image
                          width={40}
                          height={40}
                          src={skill.iconPath}
                          alt={skill.name}
                        />
                      </div>
                      <p className="text-black text-xs font-mono font-medium text-center group-hover:text-red-600 transition-colors duration-300 mt-2">
                        {skill.name}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-background text-white border z-50"
                  >
                    <div className="px-3 py-2 text-center">
                      <p className="font-bold">{skill.name}</p>
                      <p className="text-xs capitalize mt-1">{skill.category}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};
