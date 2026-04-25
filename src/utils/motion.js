const BASE_TRANSITION = {
  duration: 0.4,
  ease: 'easeOut',
};

const createFadeUp = ({ delay = 0, y = 18 } = {}) => ({
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

export const fadeUpDelayed = (delay = 0) =>
  createFadeUp({ delay });

export { createFadeUp };