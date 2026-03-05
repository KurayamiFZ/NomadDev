/**
 * Home Page Data - GameDev Academy Platform
 * 
 * This file contains all static data used across home page components.
 * Centralizing data makes it easy to update content without touching component logic.
 * 
 * @fileoverview Centralized data store for home page content
 */

import { Lesson, Achievement, UpcomingClass, CommunityActivity, WeeklyMilestone, CourseStats } from "./types";

/**
 * Current week lessons for the overview page
 * Represents lessons the user is currently working through
 * Mix of completed, in-progress, and upcoming lessons
 */
export const CURRENT_WEEK_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Understanding Unity Components",
    duration: "12 min",
    completed: true,
    locked: false,
    description: "Learn fundamentals of Unity components and how they work together to create game objects",
    category: "Fundamentals",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Creating Your First GameObject",
    duration: "15 min",
    completed: true,
    locked: false,
    description: "Step-by-step guide to creating and manipulating game objects in Unity",
    category: "Fundamentals",
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Working with Transforms",
    duration: "18 min",
    completed: true,
    locked: false,
    description: "Master position, rotation, and scale transformations for game objects",
    category: "Fundamentals",
    difficulty: "Beginner",
  },
  {
    id: 4,
    title: "Introduction to Physics",
    duration: "20 min",
    completed: false,
    locked: false,
    current: true,
    description: "Understand Unity's physics system including rigidbodies and colliders",
    category: "Physics",
    difficulty: "Intermediate",
  },
  {
    id: 5,
    title: "Collision Detection",
    duration: "16 min",
    completed: false,
    locked: false,
    description: "Learn how to detect and respond to collisions between game objects",
    category: "Physics",
    difficulty: "Intermediate",
  },
  {
    id: 6,
    title: "Building Your Platformer",
    duration: "25 min",
    completed: false,
    locked: false,
    description: "Put everything together to build a complete 2D platformer game",
    category: "Project",
    difficulty: "Intermediate",
  },
];

/**
 * Upcoming lessons that are locked until prerequisites are met
 * Shows future content to motivate continued learning
 */
export const UPCOMING_LESSONS: Lesson[] = [
  {
    id: 7,
    title: "Advanced Animation Techniques",
    duration: "22 min",
    completed: false,
    locked: true,
    unlockDate: "Unlocks in 2 days",
    category: "Animation",
    difficulty: "Advanced",
  },
  {
    id: 8,
    title: "Particle Systems Mastery",
    duration: "19 min",
    completed: false,
    locked: true,
    unlockDate: "Unlocks in 4 days",
    category: "Effects",
    difficulty: "Advanced",
  },
  {
    id: 9,
    title: "Audio Integration",
    duration: "17 min",
    completed: false,
    locked: true,
    unlockDate: "Unlocks in 5 days",
    category: "Audio",
    difficulty: "Intermediate",
  },
];

/**
 * Live class schedule for upcoming sessions
 * Includes both live and scheduled classes with instructor information
 */
export const UPCOMING_CLASSES: UpcomingClass[] = [
  {
    title: "2D Platformer Physics",
    time: "Today, 6:00 PM",
    instructor: "Alex Chen",
    live: true,
  },
  {
    title: "Character Animation Basics",
    time: "Tomorrow, 6:00 PM",
    instructor: "Sarah Martinez",
    live: false,
  },
  {
    title: "Code Review Session",
    time: "Wed, 7:00 PM",
    instructor: "Alex Chen",
    live: false,
  },
];

/**
 * Achievement data for gamification system
 * Mix of unlocked and locked achievements with different rarity tiers
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    icon: "🎯",
    title: "First Lesson",
    description: "Complete your first lesson",
    rarity: "common",
    unlocked: true,
    unlockedDate: "2026-01-15",
    tier: 1,
    xpReward: 100,
    progress: 1,
    total: 1,
  },
  {
    id: 2,
    icon: "🔥",
    title: "7 Day Streak",
    description: "Maintain a 7-day learning streak",
    rarity: "common",
    unlocked: true,
    unlockedDate: "2026-02-01",
    tier: 1,
    xpReward: 350,
    progress: 7,
    total: 7,
  },
  {
    id: 3,
    icon: "🎮",
    title: "First Game",
    description: "Build your first playable game",
    rarity: "uncommon",
    unlocked: true,
    unlockedDate: "2026-01-25",
    tier: 3,
    xpReward: 500,
    progress: 1,
    total: 1,
  },
  {
    id: 4,
    icon: "💪",
    title: "Speed Learner",
    description: "Complete a lesson in under 5 minutes",
    rarity: "common",
    unlocked: false,
    tier: 2,
    xpReward: 150,
    progress: 0,
    total: 1,
  },
  {
    id: 5,
    icon: "🏆",
    title: "Week Champion",
    description: "Top rank for an entire week",
    rarity: "rare",
    unlocked: false,
    tier: 4,
    xpReward: 800,
    progress: 0,
    total: 1,
  },
];

/**
 * Community activity feed for social proof and engagement
 * Shows recent actions from other learners to build community feeling
 */
export const COMMUNITY_ACTIVITY: CommunityActivity[] = [
  {
    user: "Marcus J.",
    action: "completed",
    item: "3D FPS Module",
    time: "2m ago",
  },
  {
    user: "Lisa K.",
    action: "shared",
    item: "their first game!",
    time: "15m ago",
  },
  {
    user: "David R.",
    action: "asked a question in",
    item: "C# Basics",
    time: "23m ago",
  },
];

/**
 * Weekly milestones for course progression tracking
 * Shows the structured learning path through the course
 */
export const WEEKLY_MILESTONES: WeeklyMilestone[] = [
  {
    week: 1,
    title: "Unity Basics",
    status: "completed",
    lessons: 6,
    completedLessons: 6,
  },
  {
    week: 2,
    title: "Physics & Movement",
    status: "in-progress",
    lessons: 6,
    completedLessons: 3,
  },
  {
    week: 3,
    title: "Animation & Effects",
    status: "locked",
    lessons: 6,
    completedLessons: 0,
  },
  {
    week: 4,
    title: "Game Mechanics",
    status: "locked",
    lessons: 6,
    completedLessons: 0,
  },
];

/**
 * Overall course statistics for dashboard display
 * Provides high-level metrics about user progress
 */
export const COURSE_STATS: CourseStats = {
  totalLessons: 24,
  completedLessons: 3,
  totalDuration: "8h 45m",
  weekProgress: 2,
  totalWeeks: 8,
};
