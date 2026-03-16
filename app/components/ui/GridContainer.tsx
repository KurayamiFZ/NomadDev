/**
 * GridContainer Component - GameDev Academy Platform
 * 
 * A reusable grid container component for consistent
 * layouts throughout the application.
 * 
 * Features:
 * - Multiple grid variants (auto, fixed, responsive)
 * - Configurable columns and gaps
 * - Responsive breakpoints
 * - Consistent spacing patterns
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Grid content
 * @param {string} [props.variant] - Grid variant
 * @param {number} [props.cols] - Number of columns
 * @param {string} [props.gap] - Gap size
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Grid container component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridContainerProps {
  /** Grid content */
  children: ReactNode;
  
  /** Grid variant */
  variant?: "auto" | "fixed" | "responsive";
  
  /** Number of columns */
  cols?: number;
  
  /** Gap size */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Grid Container Component
 * 
 * Provides consistent grid layouts with standardized
 * column and gap configurations.
 */
export function GridContainer({ 
  children, 
  variant = "auto", 
  cols, 
  gap = "md",
  className 
}: GridContainerProps) {
  const gapClasses = {
    xs: "gap-2",
    sm: "gap-3", 
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };
  
  const variantClasses = {
    auto: "grid grid-cols-1",
    fixed: cols ? `grid grid-cols-${cols}` : "grid grid-cols-1",
    responsive: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };
  
  return (
    <div className={cn(
      variantClasses[variant],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}
