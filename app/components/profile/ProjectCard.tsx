/**
 * Project Card Component - GameDev Academy Platform
 * 
 * Displays individual project information with preview image,
 * tags, and engagement metrics.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile['projects'][0]} props.project - Project data
 * @returns {JSX.Element} Project card component
 */

"use client";

import { Heart, Eye } from "lucide-react";
import { UserProfile } from "@/lib/types";
import { BaseCard } from "../ui/BaseCard";
import { StatusBadge } from "../ui/StatusBadge";

interface ProjectCardProps {
  project: UserProfile['projects'][0];
}

/**
 * Project Card Component
 * 
 * Renders a project preview with gradient background, description,
 * technology tags, and engagement metrics (likes, views).
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <BaseCard 
      variant="default"
      className="flex-col items-start mt-4 space-y-3 w-full rounded-2xl bg-gray-800 border-gray-700 hover:border-purple-500/50 overflow-hidden group p-0"
      hoverable
    >
      {/* Project Preview with Gradient Background */}
      <div
        className={`flex justify-end items-start w-full h-48 bg-linear-to-br ${project.color} relative`}
      >
        {project.featured && (
          <StatusBadge variant="warning" size="sm" className="m-3">
            ⭐ Featured
          </StatusBadge>
        )}
      </div>

      {/* Project Information */}
      <div className="px-6 pb-6 w-full space-y-3">
        {/* Project Title */}
        <h3 className="font-bold text-xl text-white group-hover:text-purple-400 transition-colors">
          {project.name}
        </h3>

        {/* Project Description */}
        <p className="font-light text-sm text-gray-400 leading-relaxed">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <StatusBadge 
              key={tag}
              variant="default"
              size="sm"
              className="px-3 py-1"
            >
              {tag}
            </StatusBadge>
          ))}
        </div>

        {/* Engagement Metrics */}
        <div className="flex gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-400" /> {project.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-blue-400" /> {project.views}
          </span>
        </div>
      </div>
    </BaseCard>
  );
}
