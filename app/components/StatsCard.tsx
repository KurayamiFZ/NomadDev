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

import Icon from "./icons";
import { LucideProps } from "lucide-react";

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
  return (
    <div className="bg-linear-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
      {/* Header section with icon and primary value */}
      <div className="flex items-center justify-between mb-4">
        <IconComponent className={`size-8 ${color}`} />
        <div className="text-2xl font-black">{value}</div>
      </div>
      
      {/* Main label */}
      <div className="text-gray-400 text-sm mb-2">{label}</div>
      
      {/* Optional progress bar */}
      {progress && (
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={`${color.replace('text-', 'bg-')} h-full rounded-full`}
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          ></div>
        </div>
      )}
      
      {/* Optional subtitle */}
      {subtitle && (
        <div className={`${color} text-xs mt-2 font-medium`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
