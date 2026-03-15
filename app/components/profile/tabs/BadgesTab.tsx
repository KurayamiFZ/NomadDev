/**
 * Badges Tab Component - GameDev Academy Platform
 * 
 * Displays all badges/achievements for a user in a grid layout.
 * Shows earned and locked achievements.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['badges']} props.badges - Array of badges
 * @returns {JSX.Element} Badges tab content
 */

"use client";

import { UserProfile } from "@/lib/types";
import { BadgeCard } from "../BadgeCard";

interface BadgesTabProps {
  badges: UserProfile['badges'];
}

/**
 * Badges Tab Component
 * 
 * Renders all user badges in a responsive grid layout.
 * Shows both earned and locked achievements.
 */
export function BadgesTab({ badges }: BadgesTabProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <BadgeCard key={badge.title} badge={badge} />
      ))}
    </div>
  );
}
