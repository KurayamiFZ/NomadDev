"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  /** Badge text content */
  children: ReactNode;

  /**
   * Badge style variant.
   * Semantic: "success" | "warning" | "error" | "info" | "default" | "live"
   * Color names (matching IconWrapper): "purple" | "green" | "red" | "blue" | "gray" | "yellow" | "pink" | "orange"
   */
  variant?:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "default"
    | "live"
    | "purple"
    | "green"    // ← added
    | "red"      // ← added
    | "blue"     // ← added
    | "gray"     // ← added
    | "yellow"   // ← added
    | "pink"     // ← added
    | "orange";  // ← added

  /** Badge size */
  size?: "sm" | "md" | "lg";

  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;

  /** Enable animation for live indicators */
  animated?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export function StatusBadge({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  animated = false,
  className,
}: StatusBadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-full font-bold transition-all";

  const variantClasses: Record<NonNullable<StatusBadgeProps["variant"]>, string> = {
    // Semantic variants
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    error:   "bg-red-500/20 text-red-400 border border-red-500/30",
    info:    "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    default: "bg-gray-700 text-gray-300 border border-gray-600",
    live:    "bg-red-500 text-white",
    // Color-name variants — mirrors IconWrapper's color prop
    purple:  "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    green:   "bg-green-500/20 text-green-400 border border-green-500/30",
    red:     "bg-red-500/20 text-red-400 border border-red-500/30",
    blue:    "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    gray:    "bg-gray-700/20 text-gray-400 border border-gray-600",
    yellow:  "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    pink:    "bg-pink-500/20 text-pink-400 border border-pink-500/30",
    orange:  "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const animationClasses = "";

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