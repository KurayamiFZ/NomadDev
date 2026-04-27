import { BaseCard } from "./ui/BaseCard";
import { StatusBadge } from "./ui/StatusBadge";
import { IconWrapper } from "./ui/IconWrapper";
import { LucideProps } from "lucide-react";

interface StatsCardProps {
  icon: React.ComponentType<LucideProps>;
  value: string;
  label: string;
  /**
   * Tailwind text color class.
   * Supported: "text-purple-400" | "text-green-400" | "text-blue-400" |
   *            "text-yellow-400" | "text-red-400"  | "text-pink-400"  |
   *            "text-orange-400" | "text-gray-400"
   */
  color: string;
  subtitle?: string;
  progress?: {
    current: number;
    total: number;
  };
}

// Shared color token type — must stay in sync with IconWrapper and StatusBadge
type ColorToken = "purple" | "pink";

const COLOR_MAP: Record<string, { iconColor: ColorToken; barColor: string }> = {
  "text-purple-400": { iconColor: "purple", barColor: "bg-purple-500" },
  "text-pink-400":   { iconColor: "pink",   barColor: "bg-pink-500"   },
};

const FALLBACK: { iconColor: ColorToken; barColor: string } = {
  iconColor: "gray",
  barColor: "bg-gray-500",
};

export function StatsCard({
  icon: IconComponent,
  value,
  label,
  color,
  subtitle,
  progress,
}: StatsCardProps) {
  const { iconColor, barColor } = COLOR_MAP[color] ?? FALLBACK;

  const progressPercent = progress
    ? Math.min(100, Math.max(0, (progress.current / progress.total) * 100))
    : 0;

  return (
    <BaseCard
      variant="default"
      className="bg-linear-to-br from-gray-900 to-black border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <IconWrapper
          icon={IconComponent}
          size="lg"
          variant="transparent"
          color={iconColor}
        />
        <div className="text-2xl font-black">{value}</div>
      </div>

      <div className="text-gray-400 text-sm mb-2">{label}</div>

      {progress && (
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {subtitle && (
        <StatusBadge variant={iconColor} size="sm" className="mt-2">
          {subtitle}
        </StatusBadge>
      )}
    </BaseCard>
  );
}