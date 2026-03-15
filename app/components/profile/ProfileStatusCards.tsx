/**
 * Profile Status Cards Component - GameDev Academy Platform
 * 
 * Displays user statistics in card format.
 * Shows lessons completed, streak, games built, and learning time.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['stats']} props.stats - User statistics array
 * @returns {JSX.Element} Grid of status cards
 */

"use client";

import { Award } from "lucide-react";
import { UserProfile } from "@/lib/types";
import { IconRenderer } from "./IconRenderer";

interface ProfileStatusCardsProps {
  stats?: UserProfile['stats'];
}

/**
 * Profile Status Cards Component
 * 
 * Renders a responsive grid of status cards showing user statistics.
 * Each card displays an icon, value, title, and subtitle.
 */
export function ProfileStatusCards({ stats }: ProfileStatusCardsProps) {
  // Handle undefined or null stats
  if (!stats || !Array.isArray(stats)) {
    return (
      <div className="flex flex-wrap justify-between w-11/12 max-w-6xl gap-5">
        <div className="text-gray-400 text-center py-8 w-full">
          No statistics available
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between w-11/12 max-w-6xl gap-5">
      {stats.map((status) => (
        <StatusCard key={status.title} status={status} />
      ))}
    </div>
  );
}

/**
 * Individual Status Card Component
 * 
 * Displays a single statistic with icon and details.
 */
function StatusCard({ status }: { status: UserProfile['stats'][0] }) {
  return (
    <div className="flex flex-col justify-center px-6 py-6 bg-gray-900 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all">
      <div className="flex flex-row justify-between items-start mb-4">
        <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
          <IconRenderer iconName={status.icon} className="w-6 h-6" />
        </div>
        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
          <Award className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <span className="text-white text-4xl mb-2 font-black">{status.value}</span>
      <span className="text-base text-gray-300 font-semibold">
        {status.title}
      </span>
      <span className="text-sm text-gray-500 mt-1">{status.subtitle}</span>
    </div>
  );
}
