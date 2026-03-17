/**
 * Profile Data - GameDev Academy Platform
 *
 * This file contains sample user profile data for demonstration purposes.
 * In a real application, this data would come from a database or API.
 *
 * @fileoverview Sample user profiles for the profile system
 */

import {
  UserProfile,
  ProfileProject,
  ProfileBadge,
  ProfileActivity,
  ProfileSkill,
  ProfileStatus,
} from "./types";

/**
 * Sample user profiles for demonstration
 * In production, these would come from your database/API
 */
export const sampleProfiles: Record<string, UserProfile> = {
  user: {
    username: "kurayami",
    displayName: "Kurayami",
    email: "kurayami@example.com",
    bio: "Passionate game developer learning to build amazing experiences. Currently mastering Unity and Unreal Engine. Always excited to collaborate on indie game projects!",
    avatarInitial: "K",
    rank: "Rising Star",
    location: "Ulaanbaatar, MN",
    joinDate: "January 2022",
    website: "kurayami.dev",
    github: "kurayami",
    linkedin: "kurayami",
    twitter: "kurayami",
    isOwnProfile: true,
    stats: [
      {
        value: "45",
        title: "Lessons Completed",
        subtitle: "30% of Course",
        icon: "BookOpen",
      },
      {
        value: "12",
        title: "Days Streak",
        subtitle: "Longest: 28 days",
        icon: "Flame",
      },
      {
        value: "3",
        title: "Games Built",
        subtitle: "2 more to go",
        icon: "Gamepad2",
      },
      {
        value: "156h",
        title: "Learning Time",
        subtitle: "Average: 2.5h/day",
        icon: "Clock",
      },
    ],
    projects: [
      {
        name: "Space Shooter 2D",
        description:
          "Classic arcade-style space shooter with power-ups and boss battles",
        tags: ["Unity", "C#", "Pixel Art"],
        likes: 234,
        views: 1205,
        color: "from-blue-600 to-blue-800",
        featured: true,
      },
      {
        name: "Platformer Adventure",
        description:
          "Retro platformer with smooth movement and challenging levels",
        tags: ["Unity", "C#", "2D animation"],
        likes: 189,
        views: 892,
        color: "from-green-600 to-green-800",
      },
      {
        name: "Puzzle Maze",
        description: "Mind bending puzzle game with 50+ levels",
        tags: ["Unity", "C#", "Level Design"],
        likes: 156,
        views: 673,
        color: "from-purple-600 to-purple-800",
      },
    ],
    badges: [
      {
        title: "Quick Start",
        description: "Completed first lesson",
        date: "Jan 15, 2024",
        earned: true,
      },
      {
        title: "Hot Streak",
        description: "7 day learning streak",
        date: "Jan 22, 2024",
        earned: true,
      },
      {
        title: "First Game",
        description: "Built and published first game",
        date: "Feb 5, 2024",
        earned: true,
      },
      {
        title: "Dedicated Learner",
        description: "100+ hours of learning",
        date: "Feb 20, 2024",
        earned: true,
      },
      {
        title: "Week Champion",
        description: "Top learner of the week",
        date: "",
        earned: false,
      },
    ],
    activities: [
      {
        title: "Completed 'Advanced Physics'",
        subtitle: "Week 4, Lesson 12",
        iconColor: "bg-blue-500",
        time: "2 hours ago",
        icon: "BookOpen",
      },
      {
        title: "Published 'Space Shooter'",
        subtitle: "Received 50+ likes",
        iconColor: "bg-green-500",
        time: "1 day ago",
        icon: "Gamepad2",
      },
      {
        title: "Earned 'Dedicated Learner' badge",
        subtitle: "100 hours milestone",
        iconColor: "bg-orange-500",
        time: "3 days ago",
        icon: "Trophy",
      },
      {
        title: "Completed 'Character Animation'",
        subtitle: "Week 3, Lesson 8",
        iconColor: "bg-blue-500",
        time: "5 days ago",
        icon: "Code",
      },
      {
        title: "Helped 5 Students In Discord",
        subtitle: "Answered questions about C#",
        iconColor: "bg-purple-500",
        time: "1 week ago",
        icon: "Users",
      },
    ],
    skills: [
      { name: "Unity", percent: 75 },
      { name: "C#", percent: 65 },
      { name: "2D Game Dev", percent: 80 },
      { name: "3D Game Dev", percent: 45 },
      { name: "Game Design", percent: 70 },
      { name: "Physics System", percent: 60 },
    ],
  },

  alexchen: {
    username: "alexchen",
    displayName: "Alex Chen",
    email: "alexchen@example.com",
    bio: "Unity developer with 5 years of experience. Specializing in 2D platformers and mobile games. Love teaching and helping others learn game development!",
    avatarInitial: "A",
    rank: "Expert Developer",
    location: "San Francisco, CA",
    joinDate: "March 2021",
    website: "alexchen.games",
    github: "alexchen",
    linkedin: "alexchen-dev",
    twitter: "alexchen",
    isOwnProfile: false,
    stats: [
      {
        value: "120",
        title: "Lessons Completed",
        subtitle: "80% of Course",
        icon: "BookOpen",
      },
      {
        value: "45",
        title: "Days Streak",
        subtitle: "Longest: 90 days",
        icon: "Flame",
      },
      {
        value: "12",
        title: "Games Built",
        subtitle: "Industry ready",
        icon: "Gamepad2",
      },
      {
        value: "320h",
        title: "Learning Time",
        subtitle: "Average: 4h/day",
        icon: "Clock",
      },
    ],
    projects: [
      {
        name: "Cyber Runner",
        description: "Neon-lit endless runner with cyberpunk aesthetics",
        tags: ["Unity", "C#", "Mobile"],
        likes: 456,
        views: 2340,
        color: "from-cyan-600 to-blue-800",
        featured: true,
      },
      {
        name: "Tower Defense Pro",
        description: "Strategic tower defense with 50+ enemy types",
        tags: ["Unity", "C#", "Strategy"],
        likes: 312,
        views: 1567,
        color: "from-red-600 to-orange-800",
      },
    ],
    badges: [
      {
        title: "Quick Start",
        description: "Completed first lesson",
        date: "Mar 10, 2021",
        earned: true,
      },
      {
        title: "Hot Streak",
        description: "7 day learning streak",
        date: "Mar 17, 2021",
        earned: true,
      },
      {
        title: "First Game",
        description: "Built and published first game",
        date: "Apr 2, 2021",
        earned: true,
      },
      {
        title: "Dedicated Learner",
        description: "100+ hours of learning",
        date: "May 15, 2021",
        earned: true,
      },
      {
        title: "Week Champion",
        description: "Top learner of the week",
        date: "Jun 20, 2021",
        earned: true,
      },
      {
        title: "Master Developer",
        description: "Completed all advanced courses",
        date: "Aug 10, 2021",
        earned: true,
      },
    ],
    activities: [
      {
        title: "Completed 'Advanced AI Systems'",
        subtitle: "Week 8, Lesson 24",
        iconColor: "bg-blue-500",
        time: "1 hour ago",
        icon: "BookOpen",
      },
      {
        title: "Published 'Cyber Runner'",
        subtitle: "Featured on App Store",
        iconColor: "bg-green-500",
        time: "3 days ago",
        icon: "Gamepad2",
      },
      {
        title: "Earned 'Master Developer' badge",
        subtitle: "Completed all courses",
        iconColor: "bg-orange-500",
        time: "1 week ago",
        icon: "Trophy",
      },
    ],
    skills: [
      { name: "Unity", percent: 95 },
      { name: "C#", percent: 90 },
      { name: "2D Game Dev", percent: 95 },
      { name: "3D Game Dev", percent: 85 },
      { name: "Game Design", percent: 90 },
      { name: "Physics System", percent: 85 },
      { name: "AI Programming", percent: 80 },
      { name: "Mobile Dev", percent: 88 },
    ],
  },

  sarahmartinez: {
    username: "sarahmartinez",
    displayName: "Sarah Martinez",
    email: "sarahmartinez@example.com",
    bio: "Indie game artist and developer. Creating beautiful pixel art games with compelling stories. Currently working on my first commercial title!",
    avatarInitial: "S",
    rank: "Creative Developer",
    location: "Austin, TX",
    joinDate: "June 2022",
    website: "sarahmakes.games",
    github: "sarahmartinez",
    twitter: "sarahart",
    isOwnProfile: false,
    stats: [
      {
        value: "78",
        title: "Lessons Completed",
        subtitle: "52% of Course",
        icon: "BookOpen",
      },
      {
        value: "23",
        title: "Days Streak",
        subtitle: "Longest: 45 days",
        icon: "Flame",
      },
      {
        value: "5",
        title: "Games Built",
        subtitle: "1 commercial ready",
        icon: "Gamepad2",
      },
      {
        value: "189h",
        title: "Learning Time",
        subtitle: "Average: 3.2h/day",
        icon: "Clock",
      },
    ],
    projects: [
      {
        name: "Pixel Quest",
        description: "Retro RPG with hand-drawn pixel art and epic story",
        tags: ["Unity", "C#", "Pixel Art", "RPG"],
        likes: 523,
        views: 2890,
        color: "from-pink-600 to-purple-800",
        featured: true,
      },
      {
        name: "Garden Paradise",
        description: "Relaxing farming simulation with cute characters",
        tags: ["Unity", "C#", "Art", "Simulation"],
        likes: 267,
        views: 1234,
        color: "from-green-600 to-teal-800",
      },
    ],
    badges: [
      {
        title: "Quick Start",
        description: "Completed first lesson",
        date: "Jun 15, 2022",
        earned: true,
      },
      {
        title: "Hot Streak",
        description: "7 day learning streak",
        date: "Jun 22, 2022",
        earned: true,
      },
      {
        title: "First Game",
        description: "Built and published first game",
        date: "Jul 10, 2022",
        earned: true,
      },
      {
        title: "Artist Badge",
        description: "Created 10+ custom assets",
        date: "Sep 5, 2022",
        earned: true,
      },
    ],
    activities: [
      {
        title: "Completed 'Advanced Character Design'",
        subtitle: "Week 6, Lesson 18",
        iconColor: "bg-blue-500",
        time: "4 hours ago",
        icon: "BookOpen",
      },
      {
        title: "Shared 'Pixel Quest' artwork",
        subtitle: "Community loved it!",
        iconColor: "bg-pink-500",
        time: "2 days ago",
        icon: "Camera",
      },
      {
        title: "Earned 'Artist Badge'",
        subtitle: "Custom assets milestone",
        iconColor: "bg-orange-500",
        time: "5 days ago",
        icon: "Trophy",
      },
    ],
    skills: [
      { name: "Unity", percent: 70 },
      { name: "C#", percent: 60 },
      { name: "2D Game Dev", percent: 85 },
      { name: "Pixel Art", percent: 95 },
      { name: "Character Design", percent: 90 },
      { name: "Game Design", percent: 75 },
      { name: "Animation", percent: 88 },
    ],
  },
};

// Simple in-memory cache for profile data
const profileCache = new Map<string, { data: UserProfile; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get user profile by username from database with caching
 * In production, this fetches from the database via API
 */
export async function getUserProfile(
  username: string,
): Promise<UserProfile | null> {
  try {
    // Check cache first
    const cached = profileCache.get(username);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Returning cached profile for: ${username}`);
      return cached.data;
    }

    console.log(`getUserProfile called with username: ${username}`);
    const response = await fetch(`/api/profile/${username}`, {
      cache: 'no-store', // Prevent Next.js caching since we handle our own
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.log("User not found (404)");
        return null; // User not found
      }
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const profile = await response.json();
    console.log("Profile data from API:", profile);
    
    // Cache the result
    profileCache.set(username, { data: profile, timestamp: Date.now() });
    
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

/**
 * Clear profile cache (useful for updates)
 */
export function clearProfileCache(username?: string) {
  if (username) {
    profileCache.delete(username);
  } else {
    profileCache.clear();
  }
}

/**
 * Get list of all users for discovery
 * In production, this would come from your user database
 */
export function getAllUsers(): Array<{
  username: string;
  displayName: string;
  rank: string;
  email: string;
}> {
  return Object.values(sampleProfiles).map((profile) => ({
    username: profile.username,
    displayName: profile.displayName,
    rank: profile.rank,
    email: profile.email,
  }));
}
