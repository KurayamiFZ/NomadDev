/**
 * useScrollAnimation Hook
 * 
 * Provides scroll-triggered animation capabilities for React components.
 * Uses Intersection Observer API to detect when elements come into view.
 * 
 * @hook
 * @param {Object} options - Animation options
 * @param {string} [options.threshold=0.1] - Visibility threshold (0-1)
 * @param {string} [options.rootMargin='0px'] - Root margin for detection
 * @param {boolean} [options.triggerOnce=true] - Whether to trigger only once
 * @returns {Object} Animation state and ref
 */
"use client";

import { useState, useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: ScrollAnimationOptions = {}): ScrollAnimationReturn {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { ref, isVisible, hasAnimated };
}
