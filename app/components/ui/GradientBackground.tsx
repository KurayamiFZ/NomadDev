/**
 * GradientBackground Component - GameDev Academy Platform
 * 
 * A reusable gradient background component for creating
 * consistent gradient effects throughout the application.
 * 
 * Features:
 * - Multiple gradient presets
 * - Custom gradient directions
 * - Animation support
 * - Overlay options
 * - Responsive sizing
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Background content
 * @param {string} [props.variant] - Gradient variant
 * @param {string} [props.direction] - Gradient direction
 * @param {boolean} [props.animated] - Enable animation
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.overlay] - Overlay effect
 * @returns {JSX.Element} Gradient background component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  /** Background content */
  children?: ReactNode;
  
  /** Gradient variant */
  variant?: "purple-pink" | "blue-cyan" | "yellow-orange" | "green-emerald" | "red-rose";
  
  /** Gradient direction */
  direction?: "to-r" | "to-l" | "to-b" | "to-t" | "to-br" | "to-bl" | "to-tr" | "to-tl";
  
  /** Enable animation */
  animated?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Overlay effect */
  overlay?: "dark" | "light" | "none";
}

/**
 * Gradient Background Component
 * 
 * Provides consistent gradient backgrounds with configurable
 * variants and effects throughout the application.
 */
export function GradientBackground({ 
  children, 
  variant = "purple-pink", 
  direction = "to-br",
  animated = false,
  className,
  overlay = "none"
}: GradientBackgroundProps) {
  const gradientConfig = {
    "purple-pink": "from-purple-500 to-pink-500",
    "blue-cyan": "from-blue-500 to-cyan-500",
    "yellow-orange": "from-yellow-500 to-orange-500",
    "green-emerald": "from-green-500 to-emerald-500",
    "red-rose": "from-red-500 to-rose-500"
  };
  
  const overlayClasses = {
    dark: "bg-black/20",
    light: "bg-white/10",
    none: ""
  };
  
  const baseClasses = cn(
    `bg-linear-to-${direction}`,
    gradientConfig[variant],
    animated && "animate-pulse",
    className
  );
  
  if (!children) {
    return <div className={baseClasses} />;
  }
  
  return (
    <div className={cn("relative", baseClasses)}>
      {overlay !== "none" && (
        <div className={cn("absolute inset-0", overlayClasses[overlay])} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
