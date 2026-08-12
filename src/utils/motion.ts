import { TargetAndTransition, Variant } from 'framer-motion';

export interface MotionVariantOptions {
  delay?: number;
  y?: number;
}

export interface FadeUpVariants {
  hidden: Variant;
  visible: TargetAndTransition;
}

const BASE_TRANSITION = {
  duration: 0.4,
  ease: 'easeOut' as const,
};

export const createFadeUp = ({ delay = 0, y = 18 }: MotionVariantOptions = {}): FadeUpVariants => ({
  hidden: {
    opacity: 0,
    y,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...BASE_TRANSITION,
      delay,
    },
  },
});

export const fadeUp = createFadeUp();

export const fadeUpDelayed = (delay = 0) => createFadeUp({ delay });
