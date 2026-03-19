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
import { useState, useEffect, useRef } from "react";
import { getUserBadges, UserBadge } from "@/lib/achievements";

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
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for scroll animations
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const badgesSectionRef = useRef<HTMLDivElement>(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [badgesVisible, setBadgesVisible] = useState(false);

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

  useEffect(() => {
    if (profile.id) {
      fetchUserBadges();
    }
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    // Setup scroll observers
    const setupScrollObserver = (ref: React.RefObject<HTMLDivElement | null>, setState: (visible: boolean) => void) => {
      if (!ref.current) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState(true);
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref.current);
      return () => observer.disconnect();
    };
    
    const cleanupProjects = setupScrollObserver(projectsSectionRef, setProjectsVisible);
    const cleanupBadges = setupScrollObserver(badgesSectionRef, setBadgesVisible);
    
    return () => {
      cleanupProjects?.();
      cleanupBadges?.();
    };
  }, [profile.id, fetchUserBadges]);

  return (
    <div className="space-y-8">
      {/* Featured Projects Section */}
      <section 
        ref={projectsSectionRef}
        className={`transform transition-all duration-700 ease-out ${
          isVisible || projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl text-white font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h3>
          <button 
            className="text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            onClick={() => onNavigate(`/profile/${profile.username}?tab=projects`)}
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {profile.projects && profile.projects.length > 0 ? (
            profile.projects.slice(0, 2).map((project, index) => (
              <div
                key={project.name}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible || projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-gray-400 text-center py-8">
              No projects available
            </div>
          )}
        </div>
      </section>

      {/* Recent Badges Section */}
      <section 
        ref={badgesSectionRef}
        className={`transform transition-all duration-700 ease-out ${
          isVisible || badgesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl text-white font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Recent Badges
          </h3>
          <button 
            className="text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
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
            userBadges.slice(0, 4).map((badge, index) => (
              <div
                key={badge.achievementId || badge.title}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible || badgesVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${450 + index * 100}ms` }}
              >
                <BadgeCard badge={badge} />
              </div>
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
