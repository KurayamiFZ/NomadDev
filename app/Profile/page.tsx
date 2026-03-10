/**
 * Current User Profile Page - GameDev Academy
 * 
 * This is the current user's own profile page.
 * It uses the reusable ProfileComponent with the user's own profile data.
 * 
 * @page
 * @returns {JSX.Element} Current user's profile page
 */

"use client";

import { ProfileComponent } from "../components/ProfileComponent";
import { getUserProfile } from "../../lib/profile-data";

/**
 * Current User Profile Page
 * 
 * Fetches and displays the current user's profile.
 * Uses the reusable ProfileComponent for consistency.
 * 
 * @returns {JSX.Element} Profile page for current user
 */
export default function ProfilePage() {
  // Get current user's profile data
  // In production, this would come from authentication context
  const currentUserProfile = getUserProfile("kurayami");

  // Fallback if profile not found
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
