"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  /** Card content */
  children: ReactNode;

  /** Card variant style */
  variant?: "default" | "elevated" | "bordered" | "glass";

  /** Additional CSS classes */
  className?: string;

  /** Click handler for interactive cards */
  onClick?: () => void;

  /** Enable hover effects */
  hoverable?: boolean;

  /** Header section content */
  header?: ReactNode;

  /** Footer section content */
  footer?: ReactNode;
}

/**
 * Base Card Component
 *
 * Provides a consistent card layout with configurable variants and sections.
 * Used to standardize card designs across the application.
 */
export function BaseCard({
  children,
  variant = "default",
  className,
  onClick,
  hoverable = false,
  header,
  footer,
}: BaseCardProps) {
  const baseClasses = "rounded-xl transition-all duration-200";

  const variantClasses = {
    default: "bg-gray-800 border border-gray-700",
    elevated: "bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl",
    bordered: "bg-gray-900 border-2 border-gray-700",
    glass: "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50",
  };

  const hoverClasses = hoverable
    ? "hover:border-purple-500/50 hover:scale-[1.02]"
    : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        clickableClasses,
        className,
      )}
      onClick={onClick}
    >
      {/* Header Section */}
      {header && <div className="border-b border-gray-700 p-4">{header}</div>}

      {/* Main Content */}
      <div className={header || footer ? "p-4" : "p-4"}>{children}</div>

      {/* Footer Section */}
      {footer && <div className="border-t border-gray-700 p-4">{footer}</div>}
    </div>
  );
}
