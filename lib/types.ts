/**
 * Type Definitions for GameDev Academy Platform
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the application to ensure type safety and consistency.
 * 
 * @fileoverview Central type definitions for the entire platform
 */

/**
 * Lesson interface represents a single course lesson
 * Used across overview, lessons, and progress tracking
 */
export interface Lesson {
  /** Unique identifier for the lesson */
  id: number;
  
  /** Display title of the lesson */
  title: string;
  
  /** Estimated completion time (e.g., "12 min") */
  duration: string;
  
  /** Whether the user has completed this lesson */
  completed: boolean;
  
  /** Whether the lesson is locked (prerequisites not met) */
  locked: boolean;
  
  /** Whether this is the currently active lesson */
  current?: boolean;
  
  /** Detailed description of lesson content */
  description?: string;
  
  /** Learning category (e.g., "Physics", "Animation") */
  category?: string;
  
  /** Difficulty level (e.g., "Beginner", "Intermediate") */
  difficulty?: string;
  
  /** When the lesson unlocks if locked */
  unlockDate?: string;
}

/**
 * Achievement interface for gamification elements
 * Represents unlockable achievements with XP rewards
 */
export interface Achievement {
  /** Unique achievement identifier */
  id: number;
  
  /** Emoji or icon representing the achievement */
  icon: string;
  
  /** Display name of the achievement */
  title: string;
  
  /** Detailed description of requirements */
  description: string;
  
  /** Rarity tier affecting visual styling */
  rarity: "common" | "uncommon" | "rare" | "epic";
  
  /** Whether user has unlocked this achievement */
  unlocked: boolean;
  
  /** Date when achievement was unlocked */
  unlockedDate?: string;
  
  /** Tier level (1-5) for progression */
  tier: number;
  
  /** Experience points awarded for completion */
  xpReward: number;
  
  /** Current progress toward completion */
  progress: number;
  
  /** Total required for completion */
  total: number;
  
  /** ID of achievement that unlocks this one */
  requiredFor?: number;
  
  /** ID of achievement this one unlocks */
  requiredBy?: number;
}

/**
 * Live class information for upcoming sessions
 */
export interface UpcomingClass {
  /** Class title or topic */
  title: string;
  
  /** Scheduled time (e.g., "Today, 6:00 PM") */
  time: string;
  
  /** Instructor name */
  instructor: string;
  
  /** Whether class is currently live */
  live: boolean;
}

/**
 * Community activity feed item
 */
export interface CommunityActivity {
  /** Username of person who performed action */
  user: string;
  
  /** Action performed (e.g., "completed", "shared") */
  action: string;
  
  /** Object the action was performed on */
  item: string;
  
  /** Relative time (e.g., "2m ago") */
  time: string;
}

/**
 * Weekly milestone for course progression
 */
export interface WeeklyMilestone {
  /** Week number in the course */
  week: number;
  
  /** Theme or title for the week */
  title: string;
  
  /** Current status of this milestone */
  status: "completed" | "in-progress" | "locked";
  
  /** Total number of lessons in this week */
  lessons: number;
  
  /** Number of lessons user has completed */
  completedLessons: number;
}

/**
 * Overall course statistics
 */
export interface CourseStats {
  /** Total lessons in the entire course */
  totalLessons: number;
  
  /** Lessons user has completed */
  completedLessons: number;
  
  /** Total time spent learning */
  totalDuration: string;
  
  /** Current week in progression */
  weekProgress: number;
  
  /** Total weeks in course */
  totalWeeks: number;
}

/**
 * Profile project data structure
 */
export interface ProfileProject {
  /** Project display name */
  name: string;
  /** Project description */
  description: string;
  /** Technology tags */
  tags: string[];
  /** Number of likes received */
  likes: number;
  /** Number of views */
  views: number;
  /** Gradient color scheme */
  color: string;
  /** Whether project is featured */
  featured?: boolean;
}

/**
 * Profile achievement/badge data
 */
export interface ProfileBadge {
  /** Badge title */
  title: string;
  /** Badge requirements description */
  description: string;
  /** Date earned (empty if locked) */
  date: string;
  /** Whether badge is unlocked */
  earned: boolean;
  /** Optional icon representation */
  icon?: string;
}

/**
 * Profile activity feed item
 */
export interface ProfileActivity {
  /** Activity title */
  title: string;
  /** Activity subtitle/details */
  subtitle: string;
  /** Icon background color */
  iconColor: string;
  /** Relative timestamp */
  time: string;
  /** Activity icon name (string) */
  icon: string;
}

/**
 * Profile skill with progress
 */
export interface ProfileSkill {
  /** Skill name */
  name: string;
  /** Proficiency percentage */
  percent: number;
}

/**
 * Profile status/metric card
 */
export interface ProfileStatus {
  /** Display value */
  value: string;
  /** Status title */
  title: string;
  /** Additional subtitle info */
  subtitle: string;
  /** Status icon name (string) */
  icon: string;
}

/**
 * Complete user profile data
 */
export interface UserProfile {
  /** Unique username */
  username: string;
  /** Display name */
  displayName: string;
  /** User bio/description */
  bio: string;
  /** Avatar initial */
  avatarInitial: string;
  /** User rank/title */
  rank: string;
  /** Location */
  location: string;
  /** Join date */
  joinDate: string;
  /** Personal website */
  website?: string;
  /** GitHub username */
  github?: string;
  /** LinkedIn profile */
  linkedin?: string;
  /** Twitter handle */
  twitter?: string;
  /** User statistics */
  stats: ProfileStatus[];
  /** User projects */
  projects: ProfileProject[];
  /** User badges/achievements */
  badges: ProfileBadge[];
  /** Recent activities */
  activities: ProfileActivity[];
  /** Skills with progress */
  skills: ProfileSkill[];
  /** Whether this is the current user's profile */
  isOwnProfile: boolean;
}
