/**
 * Skills Tab Component - GameDev Academy Platform
 * 
 * Displays user's skills with progress bars.
 * Shows proficiency levels for each skill.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['skills']} props.skills - Array of skills
 * @returns {JSX.Element} Skills tab content
 */

"use client";

import { UserProfile } from "@/lib/types";
import { SkillBar } from "../SkillBar";

interface SkillsTabProps {
  skills: UserProfile['skills'];
}

/**
 * Skills Tab Component
 * 
 * Renders all user skills with progress bars.
 * Each skill shows name, percentage, and visual progress.
 */
export function SkillsTab({ skills }: SkillsTabProps) {
  return (
    <div className="space-y-2">
      {skills.map((skill) => (
        <SkillBar key={skill.name} skill={skill} />
      ))}
    </div>
  );
}
