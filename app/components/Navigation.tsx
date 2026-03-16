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

import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

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
  // Next.js router for programmatic navigation
  const router = useRouter();

  /**
   * Handle navigation click with menu cleanup
   * Closes mobile menu and triggers optional callback
   * 
   * @param {string} section - The section to navigate to
   */
  const handleNavClick = (section: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <>
      {/* Main navigation bar - Sticky positioning with backdrop blur */}
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-xl lg:px-12">
        {/* Logo and branding section */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-pink-500">
            <Gamepad2 className="h-5 w-5 text-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            GameDev Academy
          </span>
        </div>

        {/* Desktop navigation links - Hidden on mobile */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#demo"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => handleNavClick("demo")}
          >
            Demo
          </a>
          <a
            href="#roadmap"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => handleNavClick("roadmap")}
          >
            Roadmap
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => handleNavClick("pricing")}
          >
            Pricing
          </a>
          {/* Primary call-to-action button */}
          <Button
            className="bg-linear-to-r from-purple-500 to-pink-500 text-foreground hover:opacity-90"
            onClick={() => router.push("/login")}
          >
            Start Learning
          </Button>
        </div>

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
            <a
              href="#demo"
              className="px-4 py-3 text-foreground rounded-lg hover:bg-accent transition-colors"
              onClick={() => handleNavClick("demo")}
            >
              Demo
            </a>
            <a
              href="#roadmap"
              className="px-4 py-3 text-foreground rounded-lg hover:bg-accent transition-colors"
              onClick={() => handleNavClick("roadmap")}
            >
              Roadmap
            </a>
            <a
              href="#pricing"
              className="px-4 py-3 text-foreground rounded-lg hover:bg-accent transition-colors"
              onClick={() => handleNavClick("pricing")}
            >
              Pricing
            </a>
            {/* Mobile call-to-action button */}
            <Button 
              className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-foreground hover:opacity-90 transition-opacity"
              onClick={() => router.push("/login")}
            >
              Start Learning
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Navigation Component Documentation
 * 
 * The Navigation component is a sticky navigation header with branding, menu items, and mobile responsiveness.
 * It handles navigation between different sections and external pages.
 * 
 * ### Features
 * 
 * - Responsive design with mobile hamburger menu
 * - Smooth scroll navigation to page sections
 * - Integration with Next.js router
 * - Gradient branding with game controller icon
 * 
 * ### Props
 * 
 * - `onNavigate`: Optional callback function triggered on navigation
 * 
 * ### Returns
 * 
 * - `JSX.Element`: Sticky navigation header
 * 
 * ### Usage
 * 
 * ```tsx
 * import { Navigation } from './Navigation';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Navigation onNavigate={(section) => console.log(section)} />
 *     </div>
 *   );
 * }
 * ```
 */
