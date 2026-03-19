"use client";

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useState, useRef, useEffect } from 'react';

// Optimized dynamic import with loading fallback
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: () => React.ReactNode
) {
  return dynamic(importFunc, {
    loading: fallback || (() => <div className="animate-pulse bg-gray-800 rounded-lg h-32 w-full" />),
    ssr: false // Disable SSR for better performance
  });
}

// Intersection Observer based lazy loading
export function useLazyLoad(threshold = 0.1) {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, isLoaded]);

  return { ref: elementRef, isLoaded };
}
