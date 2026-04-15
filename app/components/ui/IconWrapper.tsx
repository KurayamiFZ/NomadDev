"use client";
import { cn } from "@/lib/utils";

interface IconWrapperProps {
  /** Icon component to render */
  icon: React.ComponentType<{ className?: string }>;

  /** Container size */
  size?: "sm" | "md" | "lg" | "xl";

  /** Background variant */
  variant?: "solid" | "gradient" | "transparent" | "bordered";

  /** Color theme — orange added */
  color?:
    | "purple"
    | "green"
    | "red"
    | "blue"
    | "gray"
    | "yellow"
    | "pink"
    | "orange";

  /** Additional CSS classes */
  className?: string;
}

export function IconWrapper({
  icon: Icon,
  size = "md",
  variant = "solid",
  color = "purple",
  className,
}: IconWrapperProps) {
  const baseClasses =
    "flex items-center justify-center rounded-full flex-shrink-0";

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  const variantClasses = {
    solid: {
      purple: "bg-purple-800",
      green: "bg-green-800",
      red: "bg-red-800",
      blue: "bg-blue-800",
      gray: "bg-gray-800",
      yellow: "bg-yellow-800",
      pink: "bg-pink-800",
      orange: "bg-orange-800", // ← added
    },
    gradient: {
      purple: "bg-gradient-to-br from-purple-500 to-pink-500",
      green: "bg-gradient-to-br from-green-500 to-emerald-500",
      red: "bg-gradient-to-br from-red-500 to-pink-500",
      blue: "bg-gradient-to-br from-blue-500 to-cyan-500",
      gray: "bg-gradient-to-br from-gray-700 to-gray-800",
      yellow: "bg-gradient-to-br from-yellow-500 to-orange-500",
      pink: "bg-gradient-to-br from-pink-500 to-rose-500",
      orange: "bg-gradient-to-br from-orange-500 to-yellow-500", // ← added
    },
    transparent: {
      purple: "bg-purple-500/20",
      green: "bg-green-500/20",
      red: "bg-red-500/20",
      blue: "bg-blue-500/20",
      gray: "bg-gray-700/20",
      yellow: "bg-yellow-500/20",
      pink: "bg-pink-500/20",
      orange: "bg-orange-500/20", // ← added
    },
    bordered: {
      purple: "bg-purple-500/10 border border-purple-500/30",
      green: "bg-green-500/10 border border-green-500/30",
      red: "bg-red-500/10 border border-red-500/30",
      blue: "bg-blue-500/10 border border-blue-500/30",
      gray: "bg-gray-700/10 border border-gray-600",
      yellow: "bg-yellow-500/10 border border-yellow-500/30",
      pink: "bg-pink-500/10 border border-pink-500/30",
      orange: "bg-orange-500/10 border border-orange-500/30", // ← added
    },
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  return (
    <div
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant][color],
        className,
      )}
    >
      <Icon className={cn("text-white", iconSizeClasses[size])} />
    </div>
  );
}
