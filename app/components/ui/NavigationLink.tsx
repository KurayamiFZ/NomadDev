/**
 * NavigationLink Component - GameDev Academy Platform
 * 
 * A reusable navigation link component that handles both
 * anchor navigation and router navigation with consistent styling.
 * 
 * Features:
 * - Dual mode: anchor links or router navigation
 * - Consistent hover and transition effects
 * - Mobile and desktop variants
 * - Optional callback for navigation events
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.children - Link text content
 * @param {string} [props.href] - Anchor href for same-page navigation
 * @param {string} [props.to] - Route for router navigation
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.variant] - Visual variant
 * @param {boolean} [props.mobileVariant] - Mobile-specific styling
 * @returns {JSX.Element} Navigation link component
 */

"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  /** Link text content */
  children: ReactNode;
  
  /** Anchor href for same-page navigation */
  href?: string;
  
  /** Route for router navigation */
  to?: string;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Visual variant */
  variant?: "default" | "button" | "mobile";
  
  /** Mobile-specific styling */
  mobileVariant?: boolean;
  
  /** Optional callback for navigation events */
  onNavigate?: (section: string) => void;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Navigation Link Component
 * 
 * Provides consistent navigation behavior with unified styling
 * for both anchor links and router navigation.
 */
export function NavigationLink({ 
  children, 
  href, 
  to, 
  onClick,
  variant = "default",
  mobileVariant = false,
  onNavigate,
  className
}: NavigationLinkProps) {
  const router = useRouter();
  
  const handleClick = () => {
    if (to) {
      router.push(to);
    }
    
    if (onNavigate && href) {
      const section = href.replace('#', '');
      onNavigate(section);
    }
    
    if (onClick) {
      onClick();
    }
  };
  
  const baseClasses = "transition-colors";
  
  const variantClasses = {
    default: mobileVariant 
      ? "px-4 py-3 text-foreground rounded-lg hover:bg-accent"
      : "text-sm text-muted-foreground hover:text-foreground",
    button: "bg-linear-to-r from-purple-500 to-pink-500 text-foreground hover:opacity-90 transition-opacity",
    mobile: "px-4 py-3 text-foreground rounded-lg hover:bg-accent"
  };
  
  const Component = href ? "a" : "button";
  
  return (
    <Component
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
}
