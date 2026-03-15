/**
 * Skill Bar Component - GameDev Academy Platform
 * 
 * Displays individual skill with progress bar.
 * Shows skill name, percentage, and visual progress.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['skills'][0]} props.skill - Skill data
 * @returns {JSX.Element} Skill bar component
 */

"use client";

import { UserProfile } from "@/lib/types";

interface SkillBarProps {
  skill: UserProfile['skills'][0];
}

/**
 * Skill Bar Component
 * 
 * Renders a skill with name, percentage, and animated progress bar.
 * Uses gradient styling for visual appeal.
 */
export function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="flex flex-col mt-4 space-y-2 w-full">
      {/* Skill Name and Percentage */}
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg text-white font-semibold">{skill.name}</span>
        <span className="text-sm text-purple-400 font-bold">
          {skill.percent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 w-full h-3 rounded-full overflow-hidden">
        <div
          className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${skill.percent}%` }}
        />
      </div>
    </div>
  );
}
