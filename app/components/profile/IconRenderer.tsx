/**
 * Icon Renderer Component - GameDev Academy Platform
 * 
 * Centralized icon mapping and rendering utility.
 * Converts string-based icon names to Lucide React components.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.iconName - Name of the icon to render
 * @param {string} props.className - CSS classes for the icon
 * @returns {JSX.Element} Rendered icon component or null
 */

"use client";

import { memo } from "react";
import {
  BookOpen,
  Flame,
  Gamepad2,
  Clock,
  Camera,
  Trophy,
  Code,
  Users,
} from "lucide-react";

interface IconRendererProps {
  iconName: string;
  className?: string;
}

/**
 * Icon mapping for string-based icon names from profile data
 */
const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Flame,
  Gamepad2,
  Clock,
  Camera,
  Trophy,
  Code,
  Users,
};

/**
 * Icon Renderer Component
 * 
 * Renders the appropriate icon component based on the icon name.
 * Returns null if the icon is not found in the mapping.
 */
export const IconRenderer = memo(function IconRenderer({ iconName, className = "" }: IconRendererProps) {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
});
