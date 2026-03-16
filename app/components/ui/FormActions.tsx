/**
 * FormActions Component - GameDev Academy Platform
 * 
 * A reusable form actions component for consistent
 * form buttons and action layouts.
 * 
 * Features:
 * - Multiple action buttons
 * - Loading states
 * - Disabled states
 * - Icon support
 * - Consistent styling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.actions - Array of action buttons
 * @param {string} [props.layout] - Button layout
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Form actions component
 */

"use client";

import { ReactNode } from "react";
import { Button } from "../button";
import { cn } from "@/lib/utils";

interface FormAction {
  /** Button text */
  text: string;
  
  /** Button type */
  type?: "primary" | "secondary" | "danger";
  
  /** Button icon */
  icon?: ReactNode;
  
  /** Click handler */
  onClick: () => void;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Button variant */
  variant?: "default" | "outline" | "ghost";
}

interface FormActionsProps {
  /** Array of action buttons */
  actions: FormAction[];
  
  /** Button layout */
  layout?: "horizontal" | "vertical" | "stacked";
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Form Actions Component
 * 
 * Provides consistent form action buttons with standardized
 * styling and state management throughout the application.
 */
export function FormActions({ 
  actions, 
  layout = "horizontal", 
  className 
}: FormActionsProps) {
  const layoutClasses = {
    horizontal: "flex gap-4",
    vertical: "flex flex-col gap-4",
    stacked: "grid grid-cols-1 gap-4"
  };
  
  const getButtonVariant = (type: string) => {
    switch (type) {
      case "primary":
        return "default";
      case "secondary":
        return "outline";
      case "danger":
        return "destructive";
      default:
        return "default";
    }
  };
  
  const getButtonStyle = (type: string) => {
    switch (type) {
      case "primary":
        return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700";
      case "secondary":
        return "bg-gray-700 hover:bg-gray-600";
      case "danger":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "";
    }
  };
  
  return (
    <div className={cn(layoutClasses[layout], className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || getButtonVariant(action.type || "default")}
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3 font-medium transition",
            action.type === "primary" && getButtonStyle("primary"),
            action.type === "secondary" && getButtonStyle("secondary"),
            action.type === "danger" && getButtonStyle("danger"),
            action.disabled && "disabled:cursor-not-allowed"
          )}
        >
          {action.icon}
          {action.loading ? "Loading..." : action.text}
        </Button>
      ))}
    </div>
  );
}
