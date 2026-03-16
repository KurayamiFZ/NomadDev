/**
 * Spacing Component - GameDev Academy Platform
 * 
 * A reusable spacing component for consistent gaps and padding
 * throughout the application. Replaces repetitive spacing patterns.
 * 
 * Features:
 * - Multiple spacing sizes (xs, sm, md, lg, xl, 2xl, 3xl)
 * - Gap and padding variants
 * - Responsive design support
 * - Consistent spacing scale
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.size] - Spacing size
 * @param {string} [props.variant] - Spacing variant
 * @param {string} [props.direction] - Spacing direction
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Spacing component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpacingProps {
  /** Spacing content */
  children?: ReactNode;
  
  /** Spacing size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  
  /** Spacing variant */
  variant?: "gap" | "padding" | "margin";
  
  /** Spacing direction */
  direction?: "x" | "y" | "all";
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Spacing Component
 * 
 * Provides consistent spacing utilities with standardized
 * sizes and variants throughout the application.
 */
export function Spacing({ 
  children, 
  size = "md", 
  variant = "gap", 
  direction = "all",
  className 
}: SpacingProps) {
  const sizeClasses = {
    xs: "1",
    sm: "2",
    md: "4",
    lg: "6",
    xl: "8",
    "2xl": "12",
    "3xl": "16"
  };
  
  const variantClasses = {
    gap: "gap",
    padding: "p",
    margin: "m"
  };
  
  const directionClasses = {
    x: "x",
    y: "y",
    all: ""
  };
  
  const spacingClass = `${variantClasses[variant]}${directionClasses[direction]}-${sizeClasses[size]}`;
  
  if (!children) {
    return <div className={cn(spacingClass, className)} />;
  }
  
  return (
    <div className={cn(spacingClass, className)}>
      {children}
    </div>
  );
}
