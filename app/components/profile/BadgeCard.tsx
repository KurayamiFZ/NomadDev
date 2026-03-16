/**
 * Badge Card Component - GameDev Academy Platform
 * 
 * Displays achievement/badge information with earned status,
 * icon, and completion details.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['badges'][0]} props.badge - Badge data
 * @returns {JSX.Element} Badge card component
 */

"use client";

import { Trophy, Lock } from "lucide-react";
import { UserProfile } from "@/lib/types";
import { BaseCard } from "../ui/BaseCard";
import { StatusBadge } from "../ui/StatusBadge";
import { IconWrapper } from "../ui/IconWrapper";

interface BadgeCardProps {
  badge: UserProfile['badges'][0];
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
      className={`flex-col items-center justify-center mt-4 space-y-2 w-full p-6 rounded-2xl transition-all hover:scale-105 ${
        badge.earned
          ? "border-yellow-500 bg-linear-to-br from-yellow-500/10 to-orange-500/10"
          : "border-gray-800 bg-gray-900 opacity-50"
      }`}
    >
      {/* Badge Icon */}
      <IconWrapper 
        icon={badge.earned ? Trophy : Lock}
        size="xl"
        variant={badge.earned ? "transparent" : "solid"}
        color={badge.earned ? "yellow" : "gray"}
        className={badge.earned ? "bg-yellow-500/20" : ""}
      />

      {/* Badge Title */}
      <h3 className="text-lg font-bold text-white text-center">{badge.title}</h3>

      {/* Badge Description */}
      <p className="text-sm font-light text-gray-400 text-center">
        {badge.description}
      </p>

      {/* Badge Status */}
      <StatusBadge 
        variant={badge.earned ? "success" : "default"}
        size="sm"
      >
        {badge.earned ? badge.date : "Locked"}
      </StatusBadge>
    </BaseCard>
  );
}
