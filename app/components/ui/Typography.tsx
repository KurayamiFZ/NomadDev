/**
 * Typography Component - GameDev Academy Platform
 * 
 * A reusable typography component for consistent text styling
 * with custom fonts and weights throughout the application.
 * 
 * Features:
 * - Multiple font families (Inter, custom)
 * - Weight variants (light, normal, medium, bold, extrabold)
 * - Size variants (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)
 * - Color variants
 * - Custom gradient text support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} [props.variant] - Typography variant
 * @param {string} [props.size] - Text size
 * @param {string} [props.weight] - Font weight
 * @param {string} [props.color] - Text color
 * @param {boolean} [props.gradient] - Enable gradient text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Typography component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  /** Text content */
  children: ReactNode;
  
  /** Typography variant */
  variant?: "heading" | "body" | "caption" | "custom";
  
  /** Text size */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  
  /** Font weight */
  weight?: "light" | "normal" | "medium" | "bold" | "extrabold";
  
  /** Text color */
  color?: string;
  
  /** Enable gradient text */
  gradient?: boolean;
  
  /** Custom font family */
  font?: string;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Typography Component
 * 
 * Provides consistent typography styling with standardized
 * fonts, sizes, and weights throughout the application.
 */
export function Typography({ 
  children, 
  variant = "body", 
  size = "base", 
  weight = "normal",
  color,
  gradient = false,
  font,
  className 
}: TypographyProps) {
  const baseClasses = "transition-colors";
  
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm", 
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl"
  };
  
  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium", 
    bold: "font-bold",
    extrabold: "font-extrabold"
  };
  
  const variantClasses = {
    heading: "font-bold",
    body: "font-normal",
    caption: "font-medium text-sm",
    custom: ""
  };
  
  const fontClasses = font ? `font-[${font}]` : "";
  
  const gradientClasses = gradient 
    ? "bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
    : "";
  
  return (
    <span className={cn(
      baseClasses,
      sizeClasses[size],
      weightClasses[weight],
      variantClasses[variant],
      fontClasses,
      gradientClasses,
      color,
      className
    )}>
      {children}
    </span>
  );
}
