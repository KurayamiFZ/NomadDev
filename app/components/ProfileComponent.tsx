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

export const ProfileComponent = memo(function ProfileComponent({
  profile,
  onNavigate,
}: ProfileComponentProps) {
  const router = useRouter();

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
