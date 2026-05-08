"use client";

import { useEffect, useState, use, memo } from "react";
import { useRouter } from "next/navigation";
import { ProfileComponent } from "../../components/profile";
import { getUserProfile } from "../../../lib/profile-data";
import { UserProfile } from "../../../lib/types";

interface DynamicProfilePageProps {
  /** Username parameter from URL (Promise in Next.js 15+) */
  params: Promise<{
    username: string;
  }>;
}

/**
 * Dynamic Profile Page Component
 *
 * Extracts username from URL parameters and fetches the corresponding
 * user profile data. Handles loading states and 404 errors.
 *
 * @param {DynamicProfilePageProps} props - Component props
 * @returns {JSX.Element} Profile page or error state
 */
const DynamicProfilePage = memo(function DynamicProfilePage({
  params,
}: DynamicProfilePageProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract username from URL params (Next.js 15+ requires unwrapping Promise)
  const resolvedParams = use(params);
  const username = resolvedParams.username;

  useEffect(() => {
    /**
     * Fetch user profile data with error handling
     */
    const fetchProfile = async () => {
      if (!username) return;

      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching profile for username: ${username}`);

        // Get profile data from database (with caching)
        const userProfile = await getUserProfile(username);
        console.log("Profile data received:", userProfile);

        if (!userProfile) {
          console.log(`User "${username}" not found`);
          setError(`User "${username}" not found`);
          return;
        }

        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  /**
   * Handle navigation events
   */
  const handleNavigate = (destination: string) => {
    router.push(destination);
  };

  /**
   * Loading state with skeleton
   */
  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-black items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Профайл уншиж байна...</p>
        </div>
      </div>
    );
  }

  /**
   * Error state (user not found)
   */
  if (error || !profile) {
    return (
      <div className="flex min-h-screen w-full bg-black items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl"></span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Профайл олдсонгүй
          </h1>
          <p className="text-gray-400 mb-8">
            {error || "Хайсан профайлыг олж чадсангүй."}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => router.push("/home")}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
            >
              Нүүр хуудас руу
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Миний профайл харах
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Success state - render profile
   */
  return <ProfileComponent profile={profile} onNavigate={handleNavigate} />;
});

export default DynamicProfilePage;
