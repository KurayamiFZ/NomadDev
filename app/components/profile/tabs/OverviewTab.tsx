/**
 * Overview Tab Component - GameDev Academy Platform
 * 
 * Displays overview content for user profiles including featured projects
 * and recent badges. Provides quick access to detailed views.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile} props.profile - User profile data
 * @param {Function} props.onNavigate - Navigation callback
 * @returns {JSX.Element} Overview tab content
 */

"use client";

import { UserProfile } from "@/lib/types";
import { ProjectCard } from "../ProjectCard";
import { BadgeCard } from "../BadgeCard";
import { useState, useEffect } from "react";
import { getUserBadges } from "@/lib/achievements";

interface OverviewTabProps {
  profile: UserProfile;
  onNavigate: (destination: string) => void;
}

/**
 * Overview Tab Component
 * 
 * Shows a summary of the user's profile with featured projects
 * and recent badges. Includes navigation to full views.
 */
export function OverviewTab({ profile, onNavigate }: OverviewTabProps) {
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile.id) {
      fetchUserBadges();
    }
  }, [profile.id]);

  const fetchUserBadges = async () => {
    if (!profile.id) return;
    
    setLoading(true);
    try {
      const result = await getUserBadges(profile.id);
      setUserBadges(result.badges);
    } catch (error) {
      console.error('Error fetching user badges:', error);
      setUserBadges([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Featured Projects Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl text-white font-black">
            Featured Projects
          </h3>
          <button 
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            onClick={() => onNavigate(`/profile/${profile.username}?tab=projects`)}
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {profile.projects && profile.projects.length > 0 ? (
            profile.projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))
          ) : (
            <div className="col-span-full text-gray-400 text-center py-8">
              No projects available
            </div>
          )}
        </div>
      </section>

      {/* Recent Badges Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl text-white font-black">
            Recent Badges
          </h3>
          <button 
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            onClick={() => onNavigate("/home/achievements")}
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <div className="text-gray-400">Loading badges...</div>
            </div>
          ) : userBadges.length > 0 ? (
            userBadges.slice(0, 4).map((badge) => (
              <BadgeCard key={badge.achievementId || badge.title} badge={badge} />
            ))
          ) : (
            <div className="col-span-full text-gray-400 text-center py-8">
              <div className="text-gray-400 mb-2">No badges earned yet</div>
              <div className="text-sm text-gray-500">Start learning to unlock your first badge!</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
