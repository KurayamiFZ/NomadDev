/**
 * Heading Component - GameDev Academy Platform
 *
 * A reusable heading component that standardizes typography
 * across the application with consistent sizing and styling.
 *
 * Features:
 * - Multiple size variants (xs, sm, md, lg, xl, 2xl, 3xl)
 * - Optional gradient text effects
 * - Consistent font weights and spacing
 * - Responsive design support
 * - Fade + slide-in animation on mount
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Heading content
 * @param {string} [props.size] - Heading size variant
 * @param {boolean} [props.gradient] - Enable gradient text effect
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.gradientFrom] - Gradient start color
 * @param {string} [props.gradientTo] - Gradient end color
 * @param {boolean} [props.animate] - Enable mount animation (default: true)
 * @param {number} [props.animationDelay] - Delay before animation starts in ms (default: 0)
 * @returns {JSX.Element} Styled heading component
 */
"use client";
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  /** Heading content */
  children: ReactNode;

  /** Heading size variant */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

  /** Enable gradient text effect */
  gradient?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Gradient start color */
  gradientFrom?: string;

  /** Gradient end color */
  gradientTo?: string;

  /**
   * Enable fade + slide-in animation on mount.
   * @default true
   */
  animate?: boolean;

  /**
   * Delay (in milliseconds) before the animation begins.
   * Useful for staggering multiple headings.
   * @default 0
   */
  animationDelay?: number;
}

/**
 * Heading Component
 *
 * Provides consistent typography styling for headings throughout
 * the application with standardized sizes and optional gradients.
 * Animates in with a fade + upward slide on mount.
 */
export function Heading({
  children,
  size = "lg",
  gradient = false,
  className,
  gradientFrom = "from-purple-400",
  gradientTo = "to-pink-400",
  animate = true,
  animationDelay = 0,
}: HeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!animate || !ref.current) return;

    const el = ref.current;

    // Start hidden and translated down
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "none";

    const timer = setTimeout(() => {
      // Force a reflow so the initial state is painted before transitioning
      void el.offsetHeight;

      el.style.transition = `opacity 3s cubic-bezier(0.22, 1, 0.36, 1), transform 3s cubic-bezier(0.22, 1, 0.36, 1)`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animate, animationDelay]);

  const baseClasses = "font-bold leading-tight";

  const sizeClasses = {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
    "3xl": "text-6xl",
  };

  const gradientClasses = gradient
    ? `bg-linear-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`
    : "text-white";

  return (
    <h1
      ref={ref}
      className={cn(baseClasses, sizeClasses[size], gradientClasses, className)}
    >
      {children}
    </h1>
  );
}
