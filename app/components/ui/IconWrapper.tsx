/**
 * IconWrapper Component - GameDev Academy Platform
 * 
 * A reusable wrapper component for icons with consistent styling
 * and background treatments. Replaces repetitive icon container patterns.
 * 
 * Features:
 * - Multiple size options
 * - Background variants (solid, gradient, transparent)
 * - Color themes
 * - Consistent spacing and alignment
 * - Support for any icon component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon component to render
 * @param {string} [props.size] - Container size
 * @param {string} [props.variant] - Background variant
 * @param {string} [props.color] - Color theme
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Styled icon wrapper
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconWrapperProps {
  /** Icon component to render */
  icon: React.ComponentType<{ className?: string }>;
  
  /** Container size */
  size?: "sm" | "md" | "lg" | "xl";
  
  /** Background variant */
  variant?: "solid" | "gradient" | "transparent" | "bordered";
  
  /** Color theme */
  color?: "purple" | "green" | "red" | "blue" | "gray" | "yellow" | "pink";
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Icon Wrapper Component
 * 
 * Provides consistent styling for icon containers throughout the application.
 * Standardizes icon backgrounds, sizes, and colors.
 */
export function IconWrapper({ 
  icon: Icon, 
  size = "md", 
  variant = "solid", 
  color = "purple",
  className 
}: IconWrapperProps) {
  const baseClasses = "flex items-center justify-center rounded-full flex-shrink-0";
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12"
  };
  
  const variantClasses = {
    solid: {
      purple: "bg-purple-500",
      green: "bg-green-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
      gray: "bg-gray-700",
      yellow: "bg-yellow-500",
      pink: "bg-pink-500"
    },
    gradient: {
      purple: "bg-gradient-to-br from-purple-500 to-pink-500",
      green: "bg-gradient-to-br from-green-500 to-emerald-500",
      red: "bg-gradient-to-br from-red-500 to-pink-500",
      blue: "bg-gradient-to-br from-blue-500 to-cyan-500",
      gray: "bg-gradient-to-br from-gray-700 to-gray-800",
      yellow: "bg-gradient-to-br from-yellow-500 to-orange-500",
      pink: "bg-gradient-to-br from-pink-500 to-rose-500"
    },
    transparent: {
      purple: "bg-purple-500/20",
      green: "bg-green-500/20",
      red: "bg-red-500/20",
      blue: "bg-blue-500/20",
      gray: "bg-gray-700/20",
      yellow: "bg-yellow-500/20",
      pink: "bg-pink-500/20"
    },
    bordered: {
      purple: "bg-purple-500/10 border border-purple-500/30",
      green: "bg-green-500/10 border border-green-500/30",
      red: "bg-red-500/10 border border-red-500/30",
      blue: "bg-blue-500/10 border border-blue-500/30",
      gray: "bg-gray-700/10 border border-gray-600",
      yellow: "bg-yellow-500/10 border border-yellow-500/30",
      pink: "bg-pink-500/10 border border-pink-500/30"
    }
  };
  
  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  };
  
  return (
    <div
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant][color],
        className
      )}
    >
      <Icon className={cn("text-white", iconSizeClasses[size])} />
    </div>
  );
}
