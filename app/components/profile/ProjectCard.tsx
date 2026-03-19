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
      className="flex-col items-start mt-4 space-y-3 w-full rounded-2xl bg-gray-800 border-gray-700 hover:border-purple-500/50 overflow-hidden group p-0 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20"
      hoverable
    >
      {/* Project Preview with Gradient Background */}
      <div
        className={`flex justify-end items-start w-full h-48 bg-gradient-to-br ${project.color} relative overflow-hidden group`}
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle floating animation for featured badge */}
        {project.featured && (
          <StatusBadge variant="warning" size="sm" className="m-3 animate-pulse">
            ⭐ Featured
          </StatusBadge>
        )}
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Project Information */}
      <div className="px-6 pb-6 w-full space-y-3 relative">
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Project Title */}
        <h3 className="font-bold text-xl text-white group-hover:text-purple-400 transition-colors duration-300 relative z-10 transform group-hover:scale-105 transition-transform duration-300">
          {project.name}
        </h3>

        {/* Project Description */}
        <p className="font-light text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 relative z-10">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="flex gap-2 flex-wrap relative z-10">
          {project.tags.map((tag, index) => (
            <div
              key={tag}
              className="transform transition-all duration-300 hover:scale-110"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <StatusBadge 
                variant="default"
                size="sm"
                className="px-3 py-1 hover:bg-purple-500/20 hover:border-purple-500/50"
              >
                {tag}
              </StatusBadge>
            </div>
          ))}
        </div>

        {/* Engagement Metrics */}
        <div className="flex gap-4 text-sm text-gray-500 relative z-10">
          <span className="flex items-center gap-1.5 transform transition-transform duration-300 hover:scale-110">
            <Heart className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors duration-300" /> {project.likes}
          </span>
          <span className="flex items-center gap-1.5 transform transition-transform duration-300 hover:scale-110">
            <Eye className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" /> {project.views}
          </span>
        </div>
      </div>
    </BaseCard>
  );
}
