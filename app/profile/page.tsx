"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileComponent } from "../components/profile";
import { UserProfile } from "@/lib/types";

/**
 * Current User Profile Page
 * 
 * Fetches and displays the current user's profile from the database.
 * Uses the reusable ProfileComponent for consistency.
 * 
 * @returns {JSX.Element} Profile page for current user
 */
export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the current authenticated user
        const response = await fetch('/api/auth/user');
        
        if (!response.ok) {
          if (response.status === 401) {
            // User not authenticated, redirect to login
            router.push('/');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const { user } = await response.json();
        
        if (!user) {
          setError('No authenticated user found');
          return;
        }

        // Fetch the user's profile data using their ID or username
        const profileResponse = await fetch(`/api/profile/${user.id}`);
        
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);

      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-black items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen w-full bg-black items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Profile Error</h1>
          <p className="text-gray-400 mb-8">
            {error || "We couldn't load your profile data."}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/home")}
              className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <ProfileComponent profile={profile} />;
}
