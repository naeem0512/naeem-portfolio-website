// utils/animations.js - Create this file
import { useReducedMotion } from "framer-motion";

// Hook to detect if user prefers reduced motion
export const useResponsiveAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return {
    shouldReduceMotion,
    isMobile,
    // Reduce animation intensity on mobile or for users who prefer reduced motion
    getAnimationProps: (desktopProps, mobileProps = {}) => {
      if (shouldReduceMotion) {
        return { animate: { opacity: 1 } }; // Minimal animation
      }
      if (isMobile) {
        return {
          ...desktopProps,
          transition: {
            ...desktopProps.transition,
            duration: (desktopProps.transition?.duration || 0.5) * 0.7, // Faster on mobile
          },
          ...mobileProps
        };
      }
      return desktopProps;
    }
  };
};

// Optimized animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Stagger container for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Mobile-optimized transitions
export const getMobileOptimizedTransition = (duration = 0.5) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return {
    duration: isMobile ? duration * 0.7 : duration,
    ease: "easeOut"
  };
};