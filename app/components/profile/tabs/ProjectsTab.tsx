/**
 * Projects Tab Component - GameDev Academy Platform
 * 
 * Displays all projects for a user in a grid layout.
 * Shows complete project portfolio.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['projects']} props.projects - Array of projects
 * @returns {JSX.Element} Projects tab content
 */

"use client";

import { UserProfile } from "@/lib/types";
import { ProjectCard } from "../ProjectCard";

interface ProjectsTabProps {
  projects: UserProfile['projects'];
}

/**
 * Projects Tab Component
 * 
 * Renders all user projects in a responsive grid layout.
 * Each project is displayed as an interactive card.
 */
export function ProjectsTab({ projects }: ProjectsTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
