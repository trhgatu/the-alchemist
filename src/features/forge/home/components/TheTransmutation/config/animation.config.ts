/**
 * Animation configuration for TheTransmutation component
 *
 * This file contains all timing, easing, and content configuration
 * for the transmutation text animations.
 */

export interface TransmutationPhaseConfig {
  fadeInDuration: number;
  holdDuration: number;
  fadeOutDuration: number;
  startTime: number;
}

export interface TransmutationAnimationConfig {
  // Phase configurations
  phase1: TransmutationPhaseConfig;
  phase2: TransmutationPhaseConfig;
  phase3: TransmutationPhaseConfig;

  // Total timeline duration
  totalDuration: number;

  // Easing functions
  easing: {
    fadeIn: string;
    fadeOut: string;
    titleFadeIn: string;
  };

  // Text content
  content: {
    text1: {
      title: string;
      subtitle: string;
    };
    text2: {
      title: string;
      subtitle: string;
    };
    text3: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      latin: string;
      footer: string;
    };
  };

  // Animation properties
  motion: {
    text1Exit: { x: number; blur: string };
    text2Exit: { x: number; blur: string };
    text3Exit: { scale: number; blur: string };
  };
}

/**
 * Default animation configuration
 */
export const TRANSMUTATION_ANIMATION_CONFIG: TransmutationAnimationConfig = {
  // Phase 1: "In the alchemist's forge..."
  phase1: {
    fadeInDuration: 0.5,
    holdDuration: 1.0,
    fadeOutDuration: 0.5,
    startTime: 0,
  },

  // Phase 2: "Each project..."
  phase2: {
    fadeInDuration: 0.5,
    holdDuration: 1.0,
    fadeOutDuration: 0.5,
    startTime: 2.0,
  },

  // Phase 3: "The Transmutation" (shortened)
  phase3: {
    fadeInDuration: 0.8,
    holdDuration: 0.5,
    fadeOutDuration: 0.5,
    startTime: 4.0,
  },

  totalDuration: 5.8,

  easing: {
    fadeIn: "power2.out",
    fadeOut: "power2.in",
    titleFadeIn: "power4.out",
  },

  // Text content
  content: {
    text1: {
      title:
        '"In the alchemical dance of existence, nothing new can be born until the old is surrendered."',
      subtitle: "The fixed shell must shatter",
    },
    text2: {
      title:
        '"Life is a sacred furnace. To die a thousand small deaths is not destruction, but a necessary tempering of the soul."',
      subtitle: "Burning away the false",
    },
    text3: {
      title: '"And from the crucible, we rise.',
      titleHighlight: "Not just better, but truer.",
      subtitle: "The Magnum Opus",
      latin: "Solve et Coagula",
      footer: '"We begin again. With Gold in the marrow."',
    },
  },

  motion: {
    text1Exit: { x: -30, blur: "blur(10px)" },
    text2Exit: { x: 30, blur: "blur(10px)" },
    text3Exit: { scale: 0.95, blur: "blur(8px)" },
  },
};

/**
 * Canvas phase breakpoints (synced with text phases)
 */
export const CANVAS_PHASE_BREAKPOINTS = {
  phase1End: 0.345, // 34.5% - End of phase 1
  phase2End: 0.69, // 69% - End of phase 2
  // Phase 3 runs from 69% to 100%
} as const;
