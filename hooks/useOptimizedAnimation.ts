import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOptimizedAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
}

export function useOptimizedAnimation<T extends HTMLElement = HTMLDivElement>(options: UseOptimizedAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    duration = 700
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer with optimized settings
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay for staggered animations
          setTimeout(() => {
            setIsVisible(true);
            // Disconnect after animation triggers to save resources
            observerRef.current?.disconnect();
          }, delay);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(elementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  const getAnimationClass = useCallback((baseClass: string) => {
    return `${baseClass} transition-all duration-${duration} ease-out ${
      isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
    }`;
  }, [isVisible, duration]);

  return {
    ref: elementRef,
    isVisible,
    getAnimationClass
  };
}
