/**
 * StatsGrid Component - GameDev Academy Platform
 * 
 * A reusable stats grid component for displaying
 * statistical data in a consistent format.
 * 
 * Features:
 * - Multiple stat items
 * - Consistent styling
 * - Configurable colors
 * - Responsive layout
 * - Icon support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.stats - Array of stat items
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Stats grid component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatItem {
  /** Stat value */
  value: string | number;
  
  /** Stat label */
  label: string;
  
  /** Stat color */
  color?: string;
  
  /** Stat icon */
  icon?: ReactNode;
}

interface StatsGridProps {
  /** Array of stat items */
  stats: StatItem[];
  
  /** Grid columns */
  columns?: number;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Stats Grid Component
 * 
 * Provides consistent statistical data display with
 * standardized formatting and responsive layout.
 */
export function StatsGrid({ 
  stats, 
  columns = 3, 
  className 
}: StatsGridProps) {
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };
  
  return (
    <div className={cn(
      "grid gap-4",
      gridClasses[columns as keyof typeof gridClasses] || "grid-cols-3",
      className
    )}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={cn(
            "text-2xl font-bold",
            stat.color || "text-white"
          )}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
