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
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Heading content
 * @param {string} [props.size] - Heading size variant
 * @param {boolean} [props.gradient] - Enable gradient text effect
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.gradientFrom] - Gradient start color
 * @param {string} [props.gradientTo] - Gradient end color
 * @returns {JSX.Element} Styled heading component
 */

"use client";

import { ReactNode } from "react";
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
}

/**
 * Heading Component
 * 
 * Provides consistent typography styling for headings throughout
 * the application with standardized sizes and optional gradients.
 */
export function Heading({ 
  children, 
  size = "lg", 
  gradient = false, 
  className,
  gradientFrom = "from-purple-400",
  gradientTo = "to-pink-400"
}: HeadingProps) {
  const baseClasses = "font-bold leading-tight";
  
  const sizeClasses = {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
    "3xl": "text-6xl"
  };
  
  const gradientClasses = gradient 
    ? `bg-linear-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`
    : "text-white";
  
  return (
    <h1 className={cn(
      baseClasses,
      sizeClasses[size],
      gradientClasses,
      className
    )}>
      {children}
    </h1>
  );
}
