import { BaseCard } from "./ui/BaseCard";
import { StatusBadge } from "./ui/StatusBadge";
import { IconWrapper } from "./ui/IconWrapper";
import { ProgressBar } from "./ui/ProgressBar";
import { GradientBackground } from "./ui/GradientBackground";
import { FlexRow } from "./ui/FlexRow";
import { Trophy, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
      label: "Bronze",
      variant: "info" as const,
      gradientVariant: "blue-cyan" as const,
      iconColor: "blue" as const,
    },
    uncommon: {
      label: "Silver",
      variant: "purple" as const,
      gradientVariant: "purple-pink" as const,
      iconColor: "purple" as const,
    },
    rare: {
      label: "Gold",
      variant: "warning" as const,
      gradientVariant: "yellow-orange" as const,
      iconColor: "yellow" as const,
    },
    epic: {
      label: "Platinum",
      variant: "error" as const,
      gradientVariant: "red-rose" as const,
      iconColor: "red" as const,
    },
  };

  const config =
    rarityConfig[achievement.rarity as keyof typeof rarityConfig] ||
    rarityConfig.common;

  return (
    <BaseCard
      variant="bordered"
      className={cn(
        "relative overflow-hidden transition-all hover:scale-105 cursor-pointer",
        achievement.unlocked && config.iconColor === "blue" && "border-blue-500/50",
        achievement.unlocked && config.iconColor === "purple" && "border-purple-500/50",
        achievement.unlocked && config.iconColor === "yellow" && "border-yellow-500/50",
        achievement.unlocked && config.iconColor === "red" && "border-red-500/50",
        !achievement.unlocked && "border-gray-700 opacity-60"
      )}
      onClick={onClick}
    >
      {/* Achievement Header */}
      <div className="p-4">
        <FlexRow justify="between" align="start" className="mb-3">
          {/* Icon */}
          {achievement.unlocked ? (
            <GradientBackground
              variant={config.gradientVariant}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            >
              {achievement.icon}
            </GradientBackground>
          ) : (
            <IconWrapper
              icon={Lock}
              size="xl"
              variant="solid"
              color="gray"
              className="rounded-lg"
            />
          )}

          {/* Rarity Badge */}
          <StatusBadge variant={config.variant} size="sm">
            {config.label}
          </StatusBadge>
        </FlexRow>

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
            <ProgressBar
              current={achievement.progress}
              total={achievement.total}
              size="sm"
              variant="gradient"
              showLabel
              className="mb-3"
            />
          )}

        {/* XP Reward and Expand Button */}
        <FlexRow justify="between" align="center">
          <StatusBadge 
            variant={achievement.unlocked ? "warning" : "default"}
            size="sm"
            icon={Star}
          >
            +{achievement.xpReward} XP
          </StatusBadge>

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
        </FlexRow>
      </div>

      {/* Unlocked Date */}
      {achievement.unlocked && achievement.unlockedDate && (
        <div className={cn(
          "px-4 py-2 bg-black/20 border-t",
          config.iconColor === "blue" && "border-blue-500/50",
          config.iconColor === "purple" && "border-purple-500/50",
          config.iconColor === "yellow" && "border-yellow-500/50",
          config.iconColor === "red" && "border-red-500/50"
        )}>
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
    </BaseCard>
  );
}
