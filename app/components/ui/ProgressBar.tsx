/**
 * ProgressBar Component - GameDev Academy Platform
 * 
 * A reusable progress bar component for visualizing progress
 * across lessons, achievements, and other tracked activities.
 * 
 * Features:
 * - Configurable colors and gradients
 * - Percentage calculation
 * - Optional labels and values
 * - Multiple size variants
 * - Smooth transitions
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.current - Current progress value
 * @param {number} props.total - Total possible value
 * @param {string} [props.size] - Progress bar size
 * @param {string} [props.variant] - Progress bar variant
 * @param {boolean} [props.showLabel] - Show progress label
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Progress bar component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** Current progress value */
  current: number;
  
  /** Total possible value */
  total: number;
  
  /** Progress bar size */
  size?: "sm" | "md" | "lg";
  
  /** Progress bar variant */
  variant?: "default" | "gradient" | "success" | "warning";
  
  /** Show progress label */
  showLabel?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom label content */
  label?: ReactNode;
}

/**
 * Progress Bar Component
 * 
 * Provides consistent progress visualization with configurable
 * styling and optional labels throughout the application.
 */
export function ProgressBar({ 
  current, 
  total, 
  size = "md", 
  variant = "gradient",
  showLabel = false,
  className,
  label
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  const baseClasses = "w-full rounded-full overflow-hidden";
  
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };
  
  const backgroundClasses = {
    sm: "bg-gray-700",
    md: "bg-gray-700",
    lg: "bg-gray-700"
  };
  
  const fillClasses = {
    default: "bg-purple-500",
    gradient: "bg-linear-to-r from-purple-500 to-pink-500",
    success: "bg-green-500",
    warning: "bg-yellow-500"
  };
  
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400">
          <span>Progress</span>
          <span>{label || `${current}/${total}`}</span>
        </div>
      )}
      
      <div className={cn(baseClasses, sizeClasses[size], backgroundClasses[size])}>
        <div
          className={cn(
            fillClasses[variant],
            sizeClasses[size],
            "h-full rounded-full transition-all duration-300"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
