/**
 * Activity Item Component - GameDev Academy Platform
 * 
 * Displays individual activity in the user's timeline.
 * Shows icon, title, subtitle, and timestamp.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['activities'][0]} props.activity - Activity data
 * @returns {JSX.Element} Activity item component
 */

"use client";

import { UserProfile } from "@/lib/types";
import { IconRenderer } from "./IconRenderer";

interface ActivityItemProps {
  activity: UserProfile['activities'][0];
}

/**
 * Activity Item Component
 * 
 * Renders a single activity with icon, title, subtitle,
 * and relative timestamp in a card format.
 */
export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex flex-row items-center justify-between border border-gray-700 mt-4 w-full bg-gray-800 rounded-2xl p-4 hover:border-purple-500/50 transition-all">
      {/* Activity Icon and Content */}
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-12 h-12 rounded-full ${activity.iconColor} shrink-0 flex items-center justify-center`}
        >
          <IconRenderer iconName={activity.icon} className="w-5 h-5 text-white" />
        </div>
        
        {/* Activity Details */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-base font-semibold text-white truncate">
            {activity.title}
          </span>
          <span className="text-sm font-light text-gray-500 truncate">
            {activity.subtitle}
          </span>
        </div>
      </div>

      {/* Timestamp */}
      <span className="text-xs text-gray-500 font-light whitespace-nowrap ml-4">
        {activity.time}
      </span>
    </div>
  );
}
