/**
 * Stats Card Component - GameDev Academy
 * 
 * Reusable card component for displaying statistics and metrics.
 * Used across overview, lessons, and achievement pages.
 * 
 * Features:
 * - Configurable icon using Lucide React components
 * - Optional progress bar with percentage calculation
 * - Responsive design with gradient backgrounds
 * - Flexible subtitle display
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ComponentType<LucideProps>} props.icon - Lucide icon component to display
 * @param {string} props.value - Primary value to display (e.g., "12/150")
 * @param {string} props.label - Descriptive label for the stat
 * @param {string} props.color - Tailwind color class for accent styling
 * @param {string} [props.subtitle] - Optional additional text below the label
 * @param {Object} [props.progress] - Optional progress data for bar visualization
 * @param {number} props.progress.current - Current progress value
 * @param {number} props.progress.total - Total possible value
 * @returns {JSX.Element} Styled statistics card
 */

import { BaseCard } from "./ui/BaseCard";
import { StatusBadge } from "./ui/StatusBadge";
import { IconWrapper } from "./ui/IconWrapper";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  /** Lucide icon component to display in the card */
  icon: React.ComponentType<LucideProps>;
  
  /** Primary value to display (e.g., "12/150", "7 Days") */
  value: string;
  
  /** Descriptive label for the statistic */
  label: string;
  
  /** Tailwind color class for accent styling */
  color: string;
  
  /** Optional additional text displayed below the label */
  subtitle?: string;
  
  /** Optional progress data for rendering a progress bar */
  progress?: {
    /** Current progress value */
    current: number;
    /** Total possible value */
    total: number;
  };
}

/**
 * Stats Card Component Implementation
 * 
 * Renders a styled card with an icon, value, label, and optional elements.
 * Calculates progress bar width and applies consistent styling.
 * 
 * @param {StatsCardProps} props - Component props as defined above
 * @returns {JSX.Element} The complete statistics card
 */
export function StatsCard({ icon: IconComponent, value, label, color, subtitle, progress }: StatsCardProps) {
  // Convert color prop to IconWrapper color format
  const iconColor = color.replace('text-', '') as any;
  
  return (
    <BaseCard variant="default" className="bg-linear-to-br from-gray-900 to-black border-gray-800">
      {/* Header section with icon and primary value */}
      <div className="flex items-center justify-between mb-4">
        <IconWrapper 
          icon={IconComponent} 
          size="lg" 
          variant="transparent" 
          color={iconColor}
          className={color}
        />
        <div className="text-2xl font-black">{value}</div>
      </div>
      
      {/* Main label */}
      <div className="text-gray-400 text-sm mb-2">{label}</div>
      
      {/* Optional progress bar */}
      {progress && (
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full",
              color.includes('purple') && "bg-purple-500",
              color.includes('green') && "bg-green-500", 
              color.includes('blue') && "bg-blue-500",
              color.includes('yellow') && "bg-yellow-500",
              color.includes('red') && "bg-red-500",
              color.includes('pink') && "bg-pink-500"
            )}
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          ></div>
        </div>
      )}
      
      {/* Optional subtitle */}
      {subtitle && (
        <StatusBadge 
          variant={iconColor}
          size="sm"
          className="mt-2"
        >
          {subtitle}
        </StatusBadge>
      )}
    </BaseCard>
  );
}
