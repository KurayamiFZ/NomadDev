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
import { BaseCard } from "../ui/BaseCard";
import { IconWrapper } from "../ui/IconWrapper";
import { FlexRow } from "../ui/FlexRow";

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
    <BaseCard 
      variant="default"
      className="mt-4 w-full bg-gray-800 border-gray-700 hover:border-purple-500/50"
    >
      <FlexRow justify="between" align="center">
        {/* Activity Icon and Content */}
        <FlexRow align="center" gap="md" className="flex-1">
          <IconWrapper 
            icon={() => (
              <IconRenderer iconName={activity.icon} className="w-5 h-5 text-white" />
            )}
            size="xl"
            variant="solid"
            className={activity.iconColor}
          />
          
          {/* Activity Details */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-base font-semibold text-white truncate">
              {activity.title}
            </span>
            <span className="text-sm font-light text-gray-500 truncate">
              {activity.subtitle}
            </span>
          </div>
        </FlexRow>

        {/* Timestamp */}
        <span className="text-xs text-gray-500 font-light whitespace-nowrap ml-4">
          {activity.time}
        </span>
      </FlexRow>
    </BaseCard>
  );
}
