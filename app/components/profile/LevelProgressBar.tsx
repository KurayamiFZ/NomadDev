/**
 * Level Progress Bar Component - GameDev Academy Platform
 * 
 * Displays a visual progress bar showing user's current level,
 * XP progress towards next level, and related information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.totalXP - User's total XP
 * @returns {JSX.Element} Level progress bar component
 */

"use client";

import { getLevelProgress, getRankTitle, getRankGradient } from "@/lib/level-system";
import { Trophy, Star } from "lucide-react";

interface LevelProgressBarProps {
  totalXP: number;
  showDetails?: boolean;
  compact?: boolean;
}

/**
 * Level Progress Bar Component
 * 
 * Shows current level, progress bar to next level, XP amounts,
 * and rank information with visual styling.
 */
export function LevelProgressBar({ 
  totalXP, 
  showDetails = true, 
  compact = false 
}: LevelProgressBarProps) {
  const levelInfo = getLevelProgress(totalXP);
  const rankTitle = getRankTitle(levelInfo.currentLevel);
  const rankGradient = getRankGradient(levelInfo.currentLevel);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`bg-linear-to-r ${rankGradient} text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}>
          <Trophy className="w-3 h-3" />
          Lv. {levelInfo.currentLevel}
        </div>
        <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`bg-linear-to-r ${rankGradient} h-full transition-all duration-500 ease-out`}
            style={{ width: `${Math.min(levelInfo.progressPercentage, 100)}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">
          {levelInfo.progressXP}/{levelInfo.xpToNextLevel} XP
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {/* Level and Rank Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`bg-linear-to-r ${rankGradient} text-black px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5`}>
            <Trophy className="w-4 h-4" />
            Lv. {levelInfo.currentLevel} {rankTitle}
          </div>
          {levelInfo.currentLevel >= 50 && (
            <Star className="w-5 h-5 text-yellow-400" />
          )}
        </div>
        <div className="text-right">
          <div className="text-white font-semibold">{totalXP.toLocaleString()} Нийт XP</div>
          <div className="text-xs text-gray-400">Түвшин {levelInfo.currentLevel}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{levelInfo.currentLevel + 1}-р түвшин хүртэлх явц</span>
          <span>{Math.round(levelInfo.progressPercentage)}%</span>
        </div>
        <div className="bg-gray-700 rounded-full h-3 overflow-hidden relative">
          <div 
            className={`bg-linear-to-r ${rankGradient} h-full transition-all duration-500 ease-out relative overflow-hidden`}
            style={{ width: `${Math.min(levelInfo.progressPercentage, 100)}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{levelInfo.progressXP.toLocaleString()} XP</span>
          <span>{levelInfo.nextLevelXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Additional Details */}
      {showDetails && (
        <div className="mt-4 pt-3 border-t border-gray-700 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-gray-400">Энэ түвшинийн XP</div>
            <div className="text-white font-semibold">{levelInfo.currentLevelXP.toLocaleString()} XP</div>
          </div>
          <div>
            <div className="text-gray-400">Дараагийн түвшин хүртэлх XP</div>
            <div className="text-white font-semibold">{levelInfo.xpToNextLevel.toLocaleString()} XP</div>
          </div>
        </div>
      )}
    </div>
  );
}
