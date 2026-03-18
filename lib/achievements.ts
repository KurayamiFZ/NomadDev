/**
 * Achievement System Utilities
 * 
 * Client-side utilities for managing achievements and badges
 */

import { supabase } from "./supabaseclient";

export interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  rarity: string;
  unlocked: boolean;
  unlockedDate?: string;
  tier: number;
  xpReward: number;
  progress?: number;
  total?: number;
  requiredFor?: number;
  requiredBy?: number;
}

export interface UserBadge {
  title: string;
  description: string;
  date: string;
  earned: boolean;
  icon?: string;
  achievementId?: number;
  tier?: number;
  xpReward?: number;
  unlockedAt?: string;
}

/**
 * Fetch all available achievements
 */
export async function getAllAchievements(): Promise<Achievement[]> {
  try {
    const response = await fetch('/api/achievements');
    if (!response.ok) {
      throw new Error('Failed to fetch achievements');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

/**
 * Unlock an achievement for the current user
 */
export async function unlockAchievement(achievementId: number): Promise<{
  success: boolean;
  message: string;
  achievement?: Achievement;
}> {
  try {
    const response = await fetch('/api/achievements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ achievementId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to unlock achievement'
      };
    }

    return {
      success: true,
      message: data.message,
      achievement: data.achievement
    };
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return {
      success: false,
      message: 'Network error occurred'
    };
  }
}

/**
 * Get user's badges/achievements
 */
export async function getUserBadges(userId: string): Promise<{
  badges: UserBadge[];
  unlockedCount: number;
  totalCount: number;
}> {
  try {
    const response = await fetch(`/api/users/${userId}/achievements`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`User ${userId} not found`);
        return {
          badges: [],
          unlockedCount: 0,
          totalCount: 0
        };
      }
      throw new Error(`Failed to fetch user badges: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return {
      badges: [],
      unlockedCount: 0,
      totalCount: 0
    };
  }
}

/**
 * Check if user has unlocked a specific achievement
 */
export async function hasAchievement(achievementId: number): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: userAchievement } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", user.id)
      .eq("achievement_id", achievementId)
      .single();

    return !!userAchievement;
  } catch (error) {
    console.error('Error checking achievement:', error);
    return false;
  }
}

/**
 * Achievement unlocking conditions and auto-unlock logic
 */
export class AchievementManager {
  private static instance: AchievementManager;
  private achievements: Achievement[] = [];
  private userBadges: UserBadge[] = [];

  static getInstance(): AchievementManager {
    if (!AchievementManager.instance) {
      AchievementManager.instance = new AchievementManager();
    }
    return AchievementManager.instance;
  }

  /**
   * Initialize the achievement manager
   */
  async initialize(userId?: string) {
    this.achievements = await getAllAchievements();
    if (userId) {
      const result = await getUserBadges(userId);
      this.userBadges = result.badges;
    }
  }

  /**
   * Check and unlock achievements based on user actions
   */
  async checkAchievements(action: string, metadata?: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Achievement unlocking logic based on actions
    switch (action) {
      case 'lesson_completed':
        await this.checkLessonAchievements(metadata);
        break;
      case 'streak_7_days':
        await this.unlockAchievementByTitle('Hot Streak');
        break;
      case 'first_game_published':
        await this.unlockAchievementByTitle('First Game');
        break;
      case '100_hours_learning':
        await this.unlockAchievementByTitle('Dedicated Learner');
        break;
      case 'week_champion':
        await this.unlockAchievementByTitle('Week Champion');
        break;
    }
  }

  private async checkLessonAchievements(metadata: { lessonCount: number }) {
    // First lesson achievement
    if (metadata.lessonCount === 1) {
      await this.unlockAchievementByTitle('Quick Start');
    }
  }

  private async unlockAchievementByTitle(title: string) {
    const achievement = this.achievements.find(a => a.title === title);
    if (!achievement) return;

    const alreadyUnlocked = this.userBadges.some(b => b.title === title);
    if (alreadyUnlocked) return;

    const result = await unlockAchievement(achievement.id);
    if (result.success) {
      // Show achievement unlocked notification
      this.showAchievementUnlocked(result.achievement!);
      // Refresh user badges
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const badgeResult = await getUserBadges(user.id);
        this.userBadges = badgeResult.badges;
      }
    }
  }

  private showAchievementUnlocked(achievement: Achievement) {
    // Create a simple notification (you can replace this with your preferred notification system)
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-yellow-500 text-black px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${achievement.icon || '🏆'}</span>
        <div>
          <div class="font-bold">Achievement Unlocked!</div>
          <div class="text-sm">${achievement.title}</div>
          <div class="text-xs opacity-75">+${achievement.xpReward} xp</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  /**
   * Get user's current badges
   */
  getUserBadges(): UserBadge[] {
    return this.userBadges;
  }

  /**
   * Get all available achievements
   */
  getAllAchievements(): Achievement[] {
    return this.achievements;
  }
}

/**
 * Hook for using achievements in React components
 */
export function useAchievements(userId?: string) {
  const manager = AchievementManager.getInstance();
  
  const unlockAchievement = async (action: string, metadata?: any) => {
    await manager.checkAchievements(action, metadata);
  };

  const getUserBadges = () => manager.getUserBadges();
  const getAllAchievements = () => manager.getAllAchievements();

  return {
    unlockAchievement,
    getUserBadges,
    getAllAchievements,
    initialize: () => manager.initialize(userId)
  };
}
