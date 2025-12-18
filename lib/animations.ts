/**
 * BuildVision Animation System
 * 
 * Standardized animation presets for Framer Motion.
 * All animations use consistent easing and timing for a cohesive feel.
 */

// Easing curves
export const easings = {
  easeOut: [0.16, 1, 0.3, 1] as const,        // Primary - most animations
  easeInOut: [0.65, 0, 0.35, 1] as const,     // Symmetric movements
  spring: [0.34, 1.56, 0.64, 1] as const,     // Bouncy, use sparingly
};

// Duration constants (in seconds for Framer Motion)
export const durations = {
  fast: 0.1,      // 100ms - Hover states, color changes
  normal: 0.15,   // 150ms - Standard transitions
  slow: 0.25,     // 250ms - Window open/close, larger movements
  slower: 0.35,   // 350ms - Complex multi-element animations
};

// Window animations
export const windowAnimations = {
  open: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  close: {
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  maximize: {
    transition: { duration: 0.2, ease: easings.easeOut },
  },
  minimize: {
    exit: { opacity: 0, scale: 0.1 },
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
};

// Dropdown/menu animations
export const dropdownAnimations = {
  open: {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  close: {
    exit: { opacity: 0 },
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

// Button animations
export const buttonAnimations = {
  tap: { scale: 0.98 },
  hover: { transition: { duration: durations.fast } },
};

// Checkbox animation
export const checkboxAnimations = {
  check: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: durations.normal, ease: easings.spring },
  },
  pop: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: durations.normal, ease: easings.spring },
  },
};

// Toast animations
export const toastAnimations = {
  enter: {
    initial: { opacity: 0, x: 100, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  exit: {
    exit: { opacity: 0, x: 50 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
};

// Card/list item animations
export const cardAnimations = {
  appear: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: easings.easeOut },
  },
  hover: {
    scale: 1.02,
    transition: { duration: durations.fast },
  },
};

// Stagger animation helper
export const staggerContainer = (staggerMs = 50) => ({
  animate: {
    transition: { staggerChildren: staggerMs / 1000 },
  },
});

// Dock icon animations
export const dockAnimations = {
  hover: {
    scale: 1.15,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

// Progress bar animation
export const progressAnimations = {
  fill: {
    transition: { duration: 0.3, ease: easings.easeOut },
  },
};

// Skeleton pulse animation (for CSS, not Framer Motion)
export const skeletonKeyframes = `
  @keyframes skeleton-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

// Float animation for drop zone icon
export const floatKeyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
`;

// Combined animations export for easy spreading
export const animations = {
  window: windowAnimations,
  dropdown: dropdownAnimations,
  button: buttonAnimations,
  checkbox: checkboxAnimations,
  toast: toastAnimations,
  card: cardAnimations,
  dock: dockAnimations,
  progress: progressAnimations,
  stagger: staggerContainer,
};

export default animations;
