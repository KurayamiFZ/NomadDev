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
 * Will be populated from database
 */
export const CURRENT_WEEK_LESSONS: Lesson[] = [];

/**
 * Upcoming lessons that are locked until prerequisites are met
 * Will be populated from database
 */
export const UPCOMING_LESSONS: Lesson[] = [];

/**
 * Live class schedule for upcoming sessions
 * Will be populated from database
 */
export const UPCOMING_CLASSES: UpcomingClass[] = [];

/**
 * Achievement data for gamification system
 * Will be populated from database
 */
export const ACHIEVEMENTS: Achievement[] = [];

/**
 * Community activity feed for social proof and engagement
 * Will be populated from database
 */
export const COMMUNITY_ACTIVITY: CommunityActivity[] = [];

/**
 * Weekly milestones for course progression tracking
 * Will be populated from database
 */
export const WEEKLY_MILESTONES: WeeklyMilestone[] = [];

/**
 * Overall course statistics for dashboard display
 * Will be calculated from database
 */
export const COURSE_STATS: CourseStats = {
  totalLessons: 0,
  completedLessons: 0,
  totalDuration: "0h 0m",
  weekProgress: 0,
  totalWeeks: 0,
};
