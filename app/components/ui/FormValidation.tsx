/**
 * FormValidation Component - GameDev Academy Platform
 * 
 * A reusable form validation component for consistent
 * validation warnings and error messages.
 * 
 * Features:
 * - Multiple validation types (required, custom)
 * - Consistent warning styling
 * - Icon integration
 * - Multiple validation messages
 * - Accessible error handling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.show - Show validation warning
 * @param {string[]} props.messages - Validation messages
 * @param {string} [props.type] - Validation type
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Form validation component
 */

"use client";

import { ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormValidationProps {
  /** Show validation warning */
  show: boolean;
  
  /** Validation messages */
  messages: string[];
  
  /** Validation type */
  type?: "warning" | "error" | "success";
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom icon */
  icon?: ReactNode;
}

/**
 * Form Validation Component
 * 
 * Provides consistent validation warnings with standardized
 * styling and iconography throughout the application.
 */
export function FormValidation({ 
  show, 
  messages, 
  type = "warning", 
  className,
  icon
}: FormValidationProps) {
  if (!show || messages.length === 0) {
    return null;
  }
  
  const typeClasses = {
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400", 
    success: "bg-green-500/10 border-green-500/30 text-green-400"
  };
  
  const defaultIcons = {
    warning: <AlertCircle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />
  };
  
  return (
    <div className={cn(
      "mt-4 p-4 border rounded-lg flex items-center gap-3",
      typeClasses[type],
      className
    )}>
      {icon || defaultIcons[type]}
      <div className="text-sm">
        {messages.map((message, index) => (
          <span key={index}>{message}</span>
        ))}
      </div>
    </div>
  );
}
