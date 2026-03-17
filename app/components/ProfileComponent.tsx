/**
 * Profile Component - GameDev Academy Platform
 * 
 * Clean, modular profile display component that uses smaller,
 * focused components for better maintainability and readability.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile} props.profile - User profile data to display
 * @param {Function} [props.onNavigate] - Optional navigation callback
 * @returns {JSX.Element} Complete profile page component
 */

"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/lib/types";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileStatusCards } from "./profile/ProfileStatusCards";
import { ProfileTabs } from "./profile/ProfileTabs";

interface ProfileComponentProps {
  /** User profile data to display */
  profile: UserProfile;
  /** Optional callback for navigation events */
  onNavigate?: (destination: string) => void;
}

/**
 * Profile Component
 * 
 * Clean implementation that delegates to specialized components:
 * - ProfileHeader: Navigation and user info
 * - ProfileStatusCards: Statistics display
 * - ProfileTabs: Tabbed content management
 * 
 * This approach follows the Single Responsibility Principle and makes
 * the codebase more maintainable and testable.
 */
export const ProfileComponent = memo(function ProfileComponent({ profile, onNavigate }: ProfileComponentProps) {
  const router = useRouter();

  /**
   * Handle navigation with optional callback
   * Provides consistent navigation behavior across the component
   */
  const handleNavigate = (destination: string) => {
    if (onNavigate) {
      onNavigate(destination);
    } else {
      router.push(destination);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {/* Fixed Header with Navigation and User Info */}
      <ProfileHeader profile={profile} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-y-auto flex flex-col items-center pt-24 pb-16 space-y-6">
        {/* User Statistics Cards */}
        <ProfileStatusCards stats={profile.stats} />

        {/* Tabbed Content Section */}
        <ProfileTabs profile={profile} onNavigate={handleNavigate} />
      </main>
    </div>
  );
});
