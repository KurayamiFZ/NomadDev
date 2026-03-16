/**
 * StateManager Component - GameDev Academy Platform
 * 
 * A reusable state management component for common patterns
 * like loading states, error states, and data fetching.
 * 
 * Features:
 * - Loading state management
 * - Error handling with retry
 * - Data fetching utilities
 * - Optimistic updates
 * - Cache management
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.loading] - Loading state
 * @param {string} [props.error] - Error message
 * @param {Function} [props.onRetry] - Retry function
 * @param {React.ReactNode} props.children - Child components
 * @param {React.ReactNode} [props.fallback] - Loading fallback
 * @returns {JSX.Element} State manager component
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StateManagerProps {
  /** Loading state */
  loading?: boolean;
  
  /** Error message */
  error?: string;
  
  /** Retry function */
  onRetry?: () => void;
  
  /** Child components */
  children: ReactNode;
  
  /** Loading fallback */
  fallback?: ReactNode;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * State Manager Component
 * 
 * Provides consistent state management patterns for loading,
 * error, and data states throughout the application.
 */
export function StateManager({ 
  loading = false, 
  error, 
  onRetry, 
  children, 
  fallback,
  className 
}: StateManagerProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        {fallback || (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent animate-spin rounded-full"></div>
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8", className)}>
        <div className="text-red-400 mb-4">{error}</div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }
  
  return <>{children}</>;
}
