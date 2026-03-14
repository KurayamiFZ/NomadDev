import Icon from "./icons";
import { Trophy, Lock, Star } from "lucide-react";

interface AchievementCardProps {
  achievement: {
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
  };
  onClick?: () => void;
  expanded?: boolean;
  onExpand?: () => void;
}

export function AchievementCard({
  achievement,
  onClick,
  expanded,
  onExpand,
}: AchievementCardProps) {
  const rarityConfig = {
    common: {
      label: "Common",
      bgFrom: "from-blue-500/20",
      bgTo: "to-cyan-500/20",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-400",
      iconColor: "text-blue-500",
    },
    uncommon: {
      label: "Uncommon",
      bgFrom: "from-purple-500/20",
      bgTo: "to-pink-500/20",
      borderColor: "border-purple-500/50",
      textColor: "text-purple-400",
      iconColor: "text-purple-500",
    },
    rare: {
      label: "Rare",
      bgFrom: "from-yellow-500/20",
      bgTo: "to-orange-500/20",
      borderColor: "border-yellow-500/50",
      textColor: "text-yellow-400",
      iconColor: "text-yellow-500",
    },
    epic: {
      label: "Epic",
      bgFrom: "from-red-500/20",
      bgTo: "to-rose-500/20",
      borderColor: "border-red-500/50",
      textColor: "text-red-400",
      iconColor: "text-red-500",
    },
  };

  const config =
    rarityConfig[achievement.rarity as keyof typeof rarityConfig] ||
    rarityConfig.common;

  return (
    <div
      className={`relative bg-gray-900 rounded-xl border-2 overflow-hidden transition-all hover:scale-105 cursor-pointer ${
        achievement.unlocked
          ? `bg-linear-to-br ${config.bgFrom} ${config.bgTo} ${config.borderColor}`
          : "bg-gray-800 border-gray-700 opacity-60"
      }`}
      onClick={onClick}
    >
      {/* Achievement Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
              achievement.unlocked
                ? `bg-linear-to-br ${config.bgFrom} ${config.bgTo}`
                : "bg-gray-700"
            }`}
          >
            {achievement.unlocked ? (
              achievement.icon
            ) : (
              <Lock className="w-6 h-6 text-gray-500" />
            )}
          </div>

          {/* Rarity Badge */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${config.textColor} ${config.bgFrom}`}
          >
            {config.label}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-white mb-1 ${!achievement.unlocked && "text-gray-400"}`}
        >
          {achievement.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm mb-3 ${!achievement.unlocked ? "text-gray-500" : "text-gray-300"}`}
        >
          {achievement.description}
        </p>

        {/* Progress Bar (if not completed) */}
        {achievement.progress !== undefined &&
          achievement.total !== undefined &&
          !achievement.unlocked && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${(achievement.progress / achievement.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

        {/* XP Reward */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              achievement.unlocked ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            <Star className="w-4 h-4" />+{achievement.xpReward} XP
          </div>

          {/* Expand Button */}
          {onExpand && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Trophy
                className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Unlocked Date */}
      {achievement.unlocked && achievement.unlockedDate && (
        <div className={`px-4 py-2 bg-black/20 border-t ${config.borderColor}`}>
          <div className="text-xs text-gray-400">
            Unlocked on{" "}
            {new Date(achievement.unlockedDate).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Locked Overlay */}
      {!achievement.unlocked && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
          <Lock className="w-8 h-8 text-gray-600" />
        </div>
      )}
    </div>
  );
}
