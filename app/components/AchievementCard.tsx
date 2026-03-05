import Icon from "./icons";
import { Achievement } from "@/lib/types";

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const rarityColors = {
    common: "from-blue-500/20 to-cyan-500/20 border-blue-500/50",
    uncommon: "from-purple-500/20 to-pink-500/20 border-purple-500/50",
    rare: "from-yellow-500/20 to-orange-500/20 border-yellow-500/50",
    epic: "from-red-500/20 to-rose-500/20 border-red-500/50",
  };

  return (
    <div
      className={`aspect-square rounded-xl flex flex-col items-center justify-center p-3 cursor-pointer transition-all hover:scale-105 ${
        achievement.unlocked
          ? `bg-linear-to-br ${rarityColors[achievement.rarity]}`
          : "bg-gray-800 border border-gray-700 opacity-40"
      }`}
      onClick={onClick}
    >
      <div className="text-3xl mb-2">{achievement.icon}</div>
      <div className="text-xs text-center font-medium">
        {achievement.title}
      </div>
      {achievement.unlocked && (
        <div className="text-xs font-bold text-yellow-400 mt-1">
          +{achievement.xpReward} XP
        </div>
      )}
    </div>
  );
}
