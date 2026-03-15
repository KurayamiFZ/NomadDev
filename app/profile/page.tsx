"use client";

import { ProfileComponent } from "../components/profile";
import { sampleProfiles } from "../../lib/profile-data";

/**
 * Current User Profile Page
 * 
 * Fetches and displays the current user's profile.
 * Uses the reusable ProfileComponent for consistency.
 * 
 * @returns {JSX.Element} Profile page for current user
 */
export default function ProfilePage() {
  // Use sample data directly for current user profile
  const currentUserProfile = sampleProfiles.kurayami;

  if (!currentUserProfile) {
    return (
      <div className="flex min-h-screen w-full bg-black items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Available</h1>
          <p className="text-gray-400">Unable to load your profile data.</p>
        </div>
      </div>
    );
  }

  return <ProfileComponent profile={currentUserProfile} />;
}
