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
    <div
      className={`flex flex-col mt-4 justify-center items-center space-y-2 w-full border-2 p-6 rounded-2xl transition-all hover:scale-105 ${
        badge.earned
          ? "border-yellow-500 bg-linear-to-br from-yellow-500/10 to-orange-500/10"
          : "border-gray-800 bg-gray-900 opacity-50"
      }`}
    >
      {/* Badge Icon */}
      <div
        className={`p-3 rounded-full ${
          badge.earned ? "bg-yellow-500/20" : "bg-gray-800"
        }`}
      >
        {badge.earned ? (
          <Trophy className="w-8 h-8 text-yellow-500" />
        ) : (
          <Lock className="w-8 h-8 text-gray-500" />
        )}
      </div>

      {/* Badge Title */}
      <h3 className="text-lg font-bold text-white text-center">{badge.title}</h3>

      {/* Badge Description */}
      <p className="text-sm font-light text-gray-400 text-center">
        {badge.description}
      </p>

      {/* Badge Status */}
      <div
        className={`flex justify-center items-center px-3 py-1 rounded-full text-xs font-semibold ${
          badge.earned
            ? "bg-green-500/20 text-green-400"
            : "bg-gray-800 text-gray-500"
        }`}
      >
        {badge.earned ? badge.date : "Locked"}
      </div>
    </div>
  );
}
