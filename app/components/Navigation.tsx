/**
 * Navigation Component - GameDev Academy
 * 
 * Sticky navigation header with branding, menu items, and mobile responsiveness.
 * Handles navigation between different sections and external pages.
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Smooth scroll navigation to page sections
 * - Integration with Next.js router
 * - Gradient branding with game controller icon
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Optional callback for navigation events
 * @returns {JSX.Element} Sticky navigation header
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavigationLink } from "./ui/NavigationLink";
import { GradientBackground } from "./ui/GradientBackground";
import { IconWrapper } from "./ui/IconWrapper";
import { FlexRow } from "./ui/FlexRow";
import { Button } from "./button";
import { Gamepad2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface NavigationProps {
  /** Optional callback function triggered on navigation */
  onNavigate?: (section: string) => void;
}

/**
 * Main Navigation Component
 * 
 * Renders the complete navigation header with desktop and mobile layouts.
 * Manages mobile menu state and handles navigation interactions.
 * 
 * @param {NavigationProps} props - Component props
 * @returns {JSX.Element} The navigation header
 */
export function Navigation({ onNavigate }: NavigationProps) {
  // State management for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Main navigation bar - Sticky positioning with backdrop blur */}
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-xl lg:px-12">
        {/* Logo and branding section */}
        <FlexRow align="center" gap="sm">
          <GradientBackground 
            variant="purple-pink" 
            className="flex h-10 w-10 items-center justify-center rounded-xl"
          >
            <IconWrapper icon={Gamepad2} size="md" variant="transparent" />
          </GradientBackground>
          <span className="text-xl font-bold text-foreground">
            GameDev Academy
          </span>
        </FlexRow>

        {/* Desktop navigation links - Hidden on mobile */}
        <FlexRow align="center" gap="lg" className="hidden md:flex">
          <NavigationLink href="#demo" onNavigate={onNavigate}>
            Demo
          </NavigationLink>
          <NavigationLink href="#roadmap" onNavigate={onNavigate}>
            Roadmap
          </NavigationLink>
          <NavigationLink href="#pricing" onNavigate={onNavigate}>
            Pricing
          </NavigationLink>
          {/* Conditional rendering based on auth status */}
          {user ? (
            <>
              <NavigationLink to="/home/overview" variant="button" className="flex justify-center items-center rounded-xl px-2 py-0.5">
                Dashboard
              </NavigationLink>
              <button
                onClick={signOut}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <NavigationLink to="/login" variant="button" className="flex justify-center items-center rounded-xl px-2 py-0.5">
              Start Learning
            </NavigationLink>
          )}
        </FlexRow>

        {/* Mobile menu toggle button - Hamburger/Close icon */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile navigation dropdown - Conditional rendering */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-xl p-4 md:hidden">
          <div className="mx-auto max-w-md flex flex-col gap-3">
            {/* Mobile navigation links with click handlers */}
            <NavigationLink 
              href="#demo" 
              onNavigate={onNavigate}
              variant="mobile"
            >
              Demo
            </NavigationLink>
            <NavigationLink 
              href="#roadmap" 
              onNavigate={onNavigate}
              variant="mobile"
            >
              Roadmap
            </NavigationLink>
            <NavigationLink 
              href="#pricing" 
              onNavigate={onNavigate}
              variant="mobile"
            >
              Pricing
            </NavigationLink>
            {/* Conditional mobile call-to-action buttons */}
            {user ? (
              <>
                <NavigationLink 
                  to="/home/overview" 
                  variant="button"
                  className="w-full"
                >
                  Dashboard
                </NavigationLink>
                <button
                  onClick={signOut}
                  className="w-full text-sm text-gray-300 hover:text-white transition-colors text-center py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <NavigationLink 
                to="/login" 
                variant="button"
                className="w-full"
              >
                Start Learning
              </NavigationLink>
            )}
          </div>
        </div>
      )}
    </>
  );
}
