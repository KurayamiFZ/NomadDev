"use client";

// Import all page sections as modular components
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { DemoSection } from "./components/DemoSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { TransformationSection } from "./components/TransformationSection";
import { StatsSection } from "./components/StatsSection";
import { GuaranteeSection } from "./components/GuaranteeSection";
import Footer from "./components/footer";

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

      {/* Footer Section - Site footer with branding and copyright */}
      <Footer />
    </div>
  );
}
