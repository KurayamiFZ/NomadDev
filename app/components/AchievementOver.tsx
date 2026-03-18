import { BaseCard } from "./ui/BaseCard";
import { StatusBadge } from "./ui/StatusBadge";
import { IconWrapper } from "./ui/IconWrapper";
import { ProgressBar } from "./ui/ProgressBar";
import { GradientBackground } from "./ui/GradientBackground";
import { FlexRow } from "./ui/FlexRow";
import { Trophy, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  overachievement: {
    id: number;
    icon: string;
    title: string;
    rarity: string;
    unlocked: boolean;
    unlockedDate?: string;
    tier: number;
  };
  onClick?: () => void;
  expanded?: boolean;
  onExpand?: () => void;
}

export function AchievementOver({
  overachievement,
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
    rarityConfig[overachievement.rarity as keyof typeof rarityConfig] ||
    rarityConfig.common;

  return (
    <BaseCard
      variant="bordered"
      className={cn(
        "relative flex justify-center items-center overflow-hidden transition-all hover:scale-105 cursor-pointer",
        overachievement.unlocked && config.iconColor === "blue" && "border-blue-500/50",
        overachievement.unlocked && config.iconColor === "purple" && "border-purple-500/50",
        overachievement.unlocked && config.iconColor === "yellow" && "border-yellow-500/50",
        overachievement.unlocked && config.iconColor === "red" && "border-red-500/50",
        !overachievement.unlocked && "border-gray-700 opacity-60"
      )}
      onClick={onClick}
    >
      {/* Achievement Header */}
      <div className="p-4">
        <FlexRow justify="between" align="start" className="mb-3">
          {/* Icon */}
          {overachievement.unlocked ? (
            <GradientBackground
              variant={config.gradientVariant}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            >
              {overachievement.icon}
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
        </FlexRow>

        {/* Title */}
        <h3
          className={`font-bold text-white mb-1 ${!overachievement.unlocked && "text-gray-400"}`}
        >
          {overachievement.title}
        </h3>

        {/* xp Reward and Expand Button */}
        <FlexRow justify="between" align="center">

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
      {overachievement.unlocked && overachievement.unlockedDate && (
        <div className={cn(
          "px-4 py-2 bg-black/20 border-t",
          config.iconColor === "blue" && "border-blue-500/50",
          config.iconColor === "purple" && "border-purple-500/50",
          config.iconColor === "yellow" && "border-yellow-500/50",
          config.iconColor === "red" && "border-red-500/50"
        )}>
          <div className="text-xs text-gray-400">
            Unlocked on{" "}
            {new Date(overachievement.unlockedDate).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Locked Overlay */}
      {!overachievement.unlocked && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
          <Lock className="w-8 h-8 text-gray-600" />
        </div>
      )}
    </BaseCard>
  );
}
