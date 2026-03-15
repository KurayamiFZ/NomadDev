/**
 * Activity Tab Component - GameDev Academy Platform
 * 
 * Displays user's recent activities and achievements.
 * Shows timeline of learning progress and interactions.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['activities']} props.activities - Array of activities
 * @returns {JSX.Element} Activity tab content
 */

"use client";

import { UserProfile } from "@/lib/types";
import { ActivityItem } from "../ActivityItem";

interface ActivityTabProps {
  activities: UserProfile['activities'];
}

/**
 * Activity Tab Component
 * 
 * Renders a timeline of user's recent activities.
 * Each activity shows icon, title, subtitle, and timestamp.
 */
export function ActivityTab({ activities }: ActivityTabProps) {
  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <ActivityItem key={index} activity={activity} />
      ))}
    </div>
  );
}
