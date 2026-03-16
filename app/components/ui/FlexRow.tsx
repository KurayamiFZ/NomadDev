/**
 * FlexRow Component - GameDev Academy Platform
 * 
 * A reusable flex row component that standardizes common flex layouts
 * with consistent spacing and alignment patterns.
 * 
 * Features:
 * - Configurable alignment and justification
 * - Standardized gap sizes
 * - Responsive behavior
 * - Common layout patterns
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Row content
 * @param {string} [props.align] - Vertical alignment
 * @param {string} [props.justify] - Horizontal justification
 * @param {string} [props.gap] - Gap size between items
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Styled flex row component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FlexRowProps {
  /** Row content */
  children: ReactNode;
  
  /** Vertical alignment */
  align?: "start" | "center" | "end" | "stretch";
  
  /** Horizontal justification */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  
  /** Gap size between items */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Flex Row Component
 * 
 * Provides consistent flex row layouts with standardized spacing
 * and alignment options throughout the application.
 */
export function FlexRow({ 
  children, 
  align = "center", 
  justify = "start", 
  gap = "md",
  className 
}: FlexRowProps) {
  const baseClasses = "flex";
  
  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  };
  
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };
  
  const gapClasses = {
    none: "",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };
  
  return (
    <div
      className={cn(
        baseClasses,
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
