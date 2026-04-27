/**
 * Polynomial Level System
 * 
 * This module provides a polynomial-based leveling system for the GameDev Academy platform.
 * Levels are calculated using a polynomial formula that creates increasingly difficult
 * requirements for higher levels, making progression feel rewarding.
 */

/**
 * Calculate XP required for a specific level using polynomial formula
 * Formula: XP = baseXP * (level^exponent) + linearMultiplier * level
 * 
 * @param level - The level to calculate XP for
 * @returns Number of XP required to reach this level
 */
export function getXPForLevel(level: number): number {
  if (level <= 0) return 0;
  
  const baseXP = 100;
  const exponent = 1.8; // Polynomial exponent for curve
  const linearMultiplier = 50; // Linear component for steady progression
  
  return Math.floor(baseXP * Math.pow(level - 1, exponent) + linearMultiplier * (level - 1));
}

/**
 * Calculate current level based on total XP
 * 
 * @param totalXP - User's total XP
 * @returns Current level
 */
export function getLevelFromXP(totalXP: number): number {
  if (totalXP < 0) return 0;
  
  let level = 1;
  while (totalXP >= getXPForLevel(level + 1)) {
    level++;
  }
  
  return level;
}

/**
 * Calculate XP progress towards next level
 * 
 * @param totalXP - User's total XP
 * @returns Object with current level, XP for current level, XP for next level, and progress percentage
 */
export function getLevelProgress(totalXP: number): {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progressXP: number;
  progressPercentage: number;
  xpToNextLevel: number;
} {
  const currentLevel = getLevelFromXP(totalXP);
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  const progressXP = totalXP - currentLevelXP;
  const xpToNextLevel = nextLevelXP - currentLevelXP;
  const progressPercentage = xpToNextLevel > 0 ? (progressXP / xpToNextLevel) * 100 : 100;
  
  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    progressXP,
    progressPercentage,
    xpToNextLevel
  };
}

/**
 * Get rank title based on level
 * 
 * @param level - User's current level
 * @returns Rank title string
 */
export function getRankTitle(level: number): string {
  if (level <= 0) return "Beginner";
  if (level <= 5) return "Rising Star";
  if (level <= 10) return "Apprentice Developer";
  if (level <= 15) return "Junior Developer";
  if (level <= 20) return "Developer";
  if (level <= 25) return "Skilled Developer";
  if (level <= 30) return "Senior Developer";
  if (level <= 35) return "Expert Developer";
  if (level <= 40) return "Master Developer";
  if (level <= 45) return "Elite Developer";
  if (level <= 50) return "Legendary Developer";
  return "Mythic Developer";
}

/**
 * Get rank color gradient based on level
 * 
 * @param level - User's current level
 * @returns CSS gradient string
 */
export function getRankGradient(level: number): string {
  if (level <= 5) return "from-gray-400 to-gray-600";
  if (level <= 10) return "from-green-400 to-green-600";
  if (level <= 15) return "from-blue-400 to-blue-600";
  if (level <= 20) return "from-purple-400 to-purple-600";
  if (level <= 25) return "from-pink-400 to-pink-600";
  if (level <= 30) return "from-orange-400 to-orange-600";
  if (level <= 35) return "from-red-400 to-red-600";
  if (level <= 40) return "from-yellow-400 to-yellow-600";
  if (level <= 45) return "from-indigo-400 to-indigo-600";
  if (level <= 50) return "from-purple-500 to-pink-500";
  return "from-gradient-to-r from-purple-600 via-pink-600 to-orange-600";
}

/**
 * Calculate total XP from user achievements
 * 
 * @param achievements - Array of user achievements/badges
 * @returns Total XP earned
 */
export function calculateTotalXP(achievements: Array<{ xp?: number; earned: boolean }>): number {
  return achievements
    .filter(achievement => achievement.earned && achievement.xp)
    .reduce((total, achievement) => total + (achievement.xp || 0), 0);
}

/**
 * Level system configuration
 */
export const LEVEL_CONFIG = {
  baseXP: 100,
  exponent: 1.8,
  linearMultiplier: 50,
  maxLevel: 100,
} as const;
