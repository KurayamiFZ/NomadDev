"use client";

import { useState } from "react";
import { Trophy, Lock, Star } from "lucide-react";
import { useAchievements, AchievementManager } from "@/lib/achievements";

/**
 * Achievement Demo Component
 *
 * Demonstrates how to unlock achievements and shows real-time updates
 * This component can be used for testing the achievement system
 */
export function AchievementDemo() {
  const [loading, setLoading] = useState(false);
  const { unlockAchievement, getUserBadges, getAllAchievements, initialize } =
    useAchievements();

  const handleUnlockDemo = async () => {
    setLoading(true);
    try {
      // Initialize achievement manager
      await initialize();

      // Demo: Unlock first lesson achievement
      await unlockAchievement("lesson_completed", { lessonCount: 1 });

      // Refresh badges display
      setTimeout(() => {
        initialize();
      }, 1000);
    } catch (error) {
      console.error("Error in achievement demo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStreakDemo = async () => {
    setLoading(true);
    try {
      await initialize();
      await unlockAchievement("streak_7_days");
      setTimeout(() => {
        initialize();
      }, 1000);
    } catch (error) {
      console.error("Error in streak demo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameDemo = async () => {
    setLoading(true);
    try {
      await initialize();
      await unlockAchievement("first_game_published");
      setTimeout(() => {
        initialize();
      }, 1000);
    } catch (error) {
      console.error("Error in game demo:", error);
    } finally {
      setLoading(false);
    }
  };

  const badges = getUserBadges();
  const allAchievements = getAllAchievements();

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">
          Achievement System Demo
        </h2>
      </div>

      {/* Achievement Stats */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Your Progress</h3>
            <p className="text-sm text-gray-400">
              {badges.filter((b) => b.earned).length} of {badges.length} badges
              unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(
                (badges.filter((b) => b.earned).length / badges.length) * 100,
              ) || 0}
              %
            </div>
            <div className="text-xs text-gray-400">Complete</div>
          </div>
        </div>
        <div className="mt-3 bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(badges.filter((b) => b.earned).length / badges.length) * 100 || 0}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Demo Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Test Achievement Unlocking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleUnlockDemo}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Star className="w-5 h-5" />
            {loading ? "Unlocking..." : "Complete First Lesson"}
          </button>

          <button
            onClick={handleStreakDemo}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            {loading ? "Unlocking..." : "7 Day Streak"}
          </button>

          <button
            onClick={handleGameDemo}
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            {loading ? "Unlocking..." : "Publish First Game"}
          </button>
        </div>
      </div>

      {/* Recent Badges */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.slice(0, 6).map((badge) => (
            <div
              key={badge.title}
              className={`p-4 rounded-lg border transition-all ${
                badge.earned
                  ? "border-yellow-500/50 bg-yellow-500/10"
                  : "border-gray-700 bg-gray-800 opacity-50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    badge.earned ? "bg-yellow-500/20" : "bg-gray-700"
                  }`}
                >
                  {badge.earned ? (
                    badge.icon ? (
                      badge.icon
                    ) : (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    )
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-bold ${badge.earned ? "text-white" : "text-gray-400"}`}
                  >
                    {badge.title}
                  </h4>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {badge.earned ? badge.date : "Locked"}
                {badge.earned && badge.xpReward && (
                  <span className="ml-2 text-yellow-400">
                    +{badge.xpReward} xp
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {badges.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No achievements loaded</div>
          <div className="text-sm text-gray-500">
            Make sure you're logged in and have achievements available
          </div>
        </div>
      )}
    </div>
  );
}
