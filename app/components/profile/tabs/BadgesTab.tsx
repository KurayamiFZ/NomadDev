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

import { useState, useEffect } from "react";
import { UserProfile } from "@/lib/types";
import { BadgeCard } from "../BadgeCard";
import { getUserBadges, UserBadge } from "@/lib/achievements";

interface BadgesTabProps {
  badges: UserBadge[];
  username: string;
}

/**
 * Badges Tab Component
 * 
 * Renders all user badges in a responsive grid layout.
 * Shows both earned and locked achievements.
 * Fetches real-time achievement data from the database.
 */
export function BadgesTab({ badges, username }: BadgesTabProps) {
  const [userBadges, setUserBadges] = useState<UserBadge[]>(badges);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      fetchUserBadges();
    }
  }, [username]);

  const fetchUserBadges = async () => {
    if (!username) return;
    
    setLoading(true);
    try {
      const result = await getUserBadges(username);
      setUserBadges(result.badges);
    } catch (error) {
      console.error('Error fetching user badges:', error);
      // If user doesn't exist, we'll just show empty state
      setUserBadges([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Achievement Stats */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Achievement Progress</h3>
            <p className="text-sm text-gray-400">
              {userBadges.filter(b => b.earned).length} of {userBadges.length} badges unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round((userBadges.filter(b => b.earned).length / userBadges.length) * 100) || 0}%
            </div>
            <div className="text-xs text-gray-400">Complete</div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-3 bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(userBadges.filter(b => b.earned).length / userBadges.length) * 100 || 0}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {userBadges.map((badge) => (
          <BadgeCard key={badge.achievementId || badge.title} badge={badge} />
        ))}
      </div>

      {userBadges.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No achievements available yet</div>
          <div className="text-sm text-gray-500">Start learning to unlock your first badge!</div>
        </div>
      )}
    </div>
  );
}
