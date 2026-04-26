/**
 * Hero Section Component - GameDev Academy
 *
 * Displays main headline, value proposition, and live status badge.
 * This is the first major section users see on the landing page.
 *
 * Features:
 * - Animated live learner count badge
 * - Responsive typography with gradient text
 * - Clear value proposition messaging
 *
 * @component
 * @returns {JSX.Element} Hero section with headline and status
 */

import { Heading } from "./ui/Heading";
import { StatusBadge } from "./ui/StatusBadge";
import { FlexRow } from "./ui/FlexRow";

export function HeroSection() {
  return (
    <>
      {/* Live status badge - Shows current active learners */}
      <FlexRow className="mt-6 gap-2 rounded-full bg-linear-to-r from-purple-500/30 to-pink-500/30 px-3 py-1.5 sm:mt-8 sm:px-4 sm:py-2">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 sm:h-2 sm:w-2" />
        <span className="text-xs font-medium text-foreground sm:text-sm">
          2,847 students learning right now
        </span>
      </FlexRow>

      {/* Main headline section - Core value proposition */}
      <section className="flex w-full max-w-5xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-16 lg:py-20">
        <Heading size="3xl" className="sm:text-4xl md:text-5xl lg:text-6xl">
          Your 3-Month Journey
        </Heading>
        <Heading
          size="2xl"
          gradient
          animationDelay={300}
          className="mt-2 sm:text-3xl md:text-4xl lg:text-5xl"
        >
          From Zero to Game Developer
        </Heading>
        <p className="mt-4 max-w-2xl px-2 text-base text-muted-foreground sm:mt-6 sm:text-lg">
          Try our proven curriculum with an interactive demo. No registration
          required.
        </p>
      </section>
    </>
  );
}
