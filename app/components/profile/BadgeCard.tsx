"use client";

import { Trophy, Lock } from "lucide-react";
import { UserBadge } from "@/lib/achievements";
import { BaseCard } from "../ui/BaseCard";
import { StatusBadge } from "../ui/StatusBadge";
import { IconWrapper } from "../ui/IconWrapper";

// Format date to show clean, readable format
const formatDate = (dateString: string): string => {
  if (!dateString) return "Earned";

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Earned";
    }

    // Format options for clean date display
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Earned";
  }
};

interface BadgeCardProps {
  badge: UserBadge;
}

/**
 * Badge Card Component
 *
 * Renders a badge with earned/locked state, icon, title,
 * description, and earned date or lock status.
 */
export function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <BaseCard
      variant="bordered"
      className={`flex flex-col items-center justify-center mt-4 space-y-2 w-full p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group ${
        badge.earned
          ? "border-yellow-500 bg-linear-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20"
          : "border-gray-800 bg-gray-900 opacity-50 hover:opacity-70"
      }`}
    >
      {/* Animated background effect for earned badges */}
      {badge.earned && (
        <div className="flex flex-col justify-center items-center absolute inset-0 bg-linear-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Badge Icon */}
      <div className="flex flex-col justify-center items-center">
        <div className="transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
          <IconWrapper
            icon={badge.earned ? Trophy : Lock}
            size="xl"
            variant={badge.earned ? "transparent" : "solid"}
            color={badge.earned ? "yellow" : "gray"}
            className={
              badge.earned
                ? "bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors duration-300"
                : ""
            }
          />
        </div>

        {/* Badge Title */}
        <h3
          className={`text-lg font-bold text-center transition-colors duration-300 relative z-10 ${
            badge.earned
              ? "text-white group-hover:text-yellow-300"
              : "text-gray-400"
          }`}
        >
          {badge.title}
        </h3>

        {/* Badge Description */}
        <p className="text-sm font-light text-center transition-colors duration-300 relative z-10">
          <span
            className={
              badge.earned
                ? "text-gray-400 group-hover:text-gray-300"
                : "text-gray-500"
            }
          >
            {badge.description}
          </span>
        </p>

        {/* Badge Status */}
        <div className="transform transition-all duration-300 group-hover:scale-105 relative z-10">
          <StatusBadge
            variant={badge.earned ? "success" : "default"}
            size="sm"
            className={
              badge.earned
                ? "hover:bg-green-500/20 hover:border-green-500/50 transition-colors duration-300"
                : ""
            }
          >
            {badge.earned
              ? badge.date
                ? formatDate(badge.date)
                : "Earned"
              : "Locked"}
          </StatusBadge>
        </div>

        {/* Subtle sparkle effect for earned badges */}
        {badge.earned && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100" />
          </div>
        )}
      </div>
    </BaseCard>
  );
}
