/**
 * Main Landing Page - GameDev Academy
 * 
 * This is the primary landing page for the GameDev Academy platform.
 * It showcases the course offerings, interactive demo, and enrollment options.
 * 
 * Architecture: Modular component-based design for maintainability
 * - Each section is a separate, reusable component
 * - Data is centralized in lib/constants.ts
 * - Responsive design with mobile-first approach
 * 
 * @component
 * @returns {JSX.Element} The complete landing page
 */

"use client";

// Import all page sections as modular components
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { DemoSection } from "./components/DemoSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { TransformationSection } from "./components/TransformationSection";
import { StatsSection } from "./components/StatsSection";
import { GuaranteeSection } from "./components/GuaranteeSection";
import { CTASection } from "./components/CTASection";
import Footer from "./components/footer";

/**
 * Main Home Page Component
 * 
 * Renders the complete landing page with all sections in order.
 * Uses a gradient background and responsive layout.
 * 
 * @returns {JSX.Element} The assembled landing page
 */
export default function Home() {
  return (
    // Main container with gradient background effect
    <div className="flex min-h-screen w-full flex-col items-center bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,180,0.3),transparent)] bg-fixed">
      
      {/* Navigation Header - Sticky navigation with branding and menu */}
      <Navigation />
      
      {/* Hero Section - Main headline and value proposition */}
      <HeroSection />
      
      {/* Interactive Demo Section - Sample lesson preview with code editor */}
      <DemoSection />
      
      {/* Roadmap Section - 12-week course progression visualization */}
      <RoadmapSection />
      
      {/* Transformation Section - Before/after learning journey visualization */}
      <TransformationSection />
      
      {/* Stats Section - Course statistics and achievements */}
      <StatsSection />
      
      {/* Guarantee Section - Risk-free promises and benefits */}
      <GuaranteeSection />
      
      {/* Call-to-Action Section - Final enrollment prompt */}
      <CTASection />
      
      {/* Footer Section - Site footer with branding and copyright */}
      <Footer />
    </div>
  );
}
