/**
 * StatusBadge Component - GameDev Academy Platform
 * 
 * A reusable badge component for status indicators, progress states,
 * and categorical labels. Replaces repetitive badge patterns found
 * throughout the application.
 * 
 * Features:
 * - Multiple variants (success, warning, error, info, default)
 * - Size variations (sm, md, lg)
 * - Icon support
 * - Animated states for live indicators
 * - Consistent styling across all badges
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.children - Badge text content
 * @param {string} [props.variant] - Badge style variant
 * @param {string} [props.size] - Badge size
 * @param {React.ComponentType} [props.icon] - Optional icon component
 * @param {boolean} [props.animated] - Enable animation (for live indicators)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Styled badge component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  /** Badge text content */
  children: ReactNode;
  
  /** Badge style variant */
  variant?: "success" | "warning" | "error" | "info" | "default" | "purple" | "live";
  
  /** Badge size */
  size?: "sm" | "md" | "lg";
  
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
  
  /** Enable animation for live indicators */
  animated?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Status Badge Component
 * 
 * Provides consistent badge styling for status indicators, progress states,
 * and categorical labels throughout the application.
 */
export function StatusBadge({ 
  children, 
  variant = "default", 
  size = "md", 
  icon: Icon,
  animated = false,
  className 
}: StatusBadgeProps) {
  const baseClasses = "inline-flex items-center gap-1.5 rounded-full font-bold transition-all";
  
  const variantClasses = {
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    error: "bg-red-500/20 text-red-400 border border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    default: "bg-gray-700 text-gray-300 border border-gray-600",
    purple: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    live: "bg-red-500 text-white animate-pulse"
  };
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };
  
  const animationClasses = animated && variant === "live" ? "animate-pulse" : "";
  
  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        animationClasses,
        className
      )}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
