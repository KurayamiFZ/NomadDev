/**
 * PlanCard Component - GameDev Academy Platform
 * 
 * A reusable pricing plan card component for displaying
 * subscription tiers and their features.
 * 
 * Features:
 * - Multiple plan variants (free, basic, premium)
 * - Feature list with checkmarks
 * - Call-to-action button
 * - Consistent styling and layout
 * - Responsive design
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Plan title
 * @param {string} props.price - Plan price
 * @param {string[]} props.features - List of plan features
 * @param {string} [props.variant] - Plan visual variant
 * @param {boolean} [props.recommended] - Mark as recommended
 * @param {Function} [props.onSelect] - Plan selection handler
 * @returns {JSX.Element} Plan card component
 */

"use client";

import { ReactNode } from "react";
import { Button } from "../button";
import { BaseCard } from "./BaseCard";
import { FlexRow } from "./FlexRow";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  /** Plan title */
  title: string;
  
  /** Plan price */
  price: string;
  
  /** List of plan features */
  features: string[];
  
  /** Plan visual variant */
  variant?: "free" | "basic" | "premium";
  
  /** Mark as recommended plan */
  recommended?: boolean;
  
  /** Plan selection handler */
  onSelect?: () => void;
  
  /** Button text */
  buttonText?: string;
  
  /** Additional content */
  children?: ReactNode;
}

/**
 * Plan Card Component
 * 
 * Provides consistent pricing plan display with features,
 * pricing, and selection actions.
 */
export function PlanCard({ 
  title, 
  price, 
  features, 
  variant = "basic",
  recommended = false,
  onSelect,
  buttonText = "Select Plan",
  children
}: PlanCardProps) {
  const variantStyles = {
    free: "border-gray-600 bg-gray-900/50",
    basic: "border-white bg-black/50", 
    premium: "border-white bg-black/50 rounded-r-4xl"
  };
  
  const titleStyles = {
    free: "text-white",
    basic: "text-white",
    premium: "text-white text-extrabold"
  };
  
  return (
    <BaseCard 
      variant="default" 
      className={cn(
        "flex flex-col justify-center space-y-2 h-full border-2",
        variantStyles[variant]
      )}
    >
      {/* Plan Title */}
      <span className={cn(
        "flex self-center text-3xl mt-4 font-medium font-[Inter]",
        titleStyles[variant]
      )}>
        {title}
      </span>
      
      {/* Plan Features */}
      <div className="flex flex-col justify-center space-y-2">
        {features.map((feature, index) => (
          <span 
            key={index}
            className={cn(
              "font-extrabold font-[Inter] m-4",
              feature.includes("✖") ? "text-gray-400" : "text-white"
            )}
          >
            {feature}
          </span>
        ))}
      </div>
      
      {/* Additional Content */}
      {children}
      
      {/* Call to Action Button */}
      <Button
        className={cn(
          "self-center text-white m-4 w-4/6 h-1/10 font-bold bg-black/50 hover:bg-stone-300 border-2 border-white",
          recommended && "ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900"
        )}
        onClick={onSelect}
      >
        {buttonText}
      </Button>
    </BaseCard>
  );
}
