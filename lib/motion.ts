export const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const motionDurations = {
  instant: 0.12,
  quick: 0.18,
  base: 0.22,
  slow: 0.32
} as const;

export const motionTransitions = {
  micro: {
    duration: motionDurations.quick,
    ease: premiumEase
  },
  quick: {
    duration: motionDurations.quick,
    ease: premiumEase
  },
  base: {
    duration: motionDurations.base,
    ease: premiumEase
  },
  panel: {
    duration: motionDurations.slow,
    ease: premiumEase
  },
  spring: {
    type: "spring",
    stiffness: 460,
    damping: 34,
    mass: 0.8
  }
} as const;

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(3px)"
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: motionTransitions.base
  }
} as const;

export const panelSwap = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.995
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: motionTransitions.panel
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.998,
    transition: motionTransitions.micro
  }
} as const;

export const modalBackdrop = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: motionTransitions.quick
  },
  exit: {
    opacity: 0,
    transition: motionTransitions.quick
  }
} as const;

export const modalPanel = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.985,
    filter: "blur(4px)"
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: motionTransitions.panel
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.99,
    filter: "blur(2px)",
    transition: motionTransitions.quick
  }
} as const;

export const softTap = {
  scale: 0.985,
  y: 0
} as const;

export const subtleLift = {
  y: -2,
  transition: motionTransitions.micro
} as const;

export const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.035
    }
  }
} as const;
