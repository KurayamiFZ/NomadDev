/**
 * NewCourse Component - GameDev Academy Platform
 * 
 * Refactored course creation component with separated concerns
 * for better maintainability and reusability.
 * 
 * Features:
 * - Separated form logic
 * - Reusable video management
 * - Consistent validation
 * - Modular architecture
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isActive] - Component active state
 * @returns {JSX.Element} New course component
 */

"use client";

import { useState } from "react";
import { CourseForm } from "../ui/CourseForm";
import { VideoManager } from "../ui/VideoManager";
import { BaseCard } from "../ui/BaseCard";
import { Heading } from "../ui/Heading";

interface NewCourseProps {
  isActive?: boolean;
}

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  videos: any[];
  achievements: any[];
}

/**
 * New Course Component
 * 
 * Main orchestrator for course creation with separated concerns:
 * - Form data management (handled by CourseForm)
 * - Video management (handled by VideoManager)
 * - Layout and structure
 * - Data flow coordination
 */
export default function NewCourse({ isActive = false }: NewCourseProps) {
  // Course data state
  const [courseData, setCourseData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: '',
    videos: [],
    achievements: []
  });
  
  // Form submission handler
  const handleSubmit = async (data: CourseFormData) => {
    console.log('Creating course:', data);
    // API call to create course
  };
  
  // Preview handler
  const handlePreview = (data: CourseFormData) => {
    console.log('Preview course:', data);
    // Preview logic
  };
  
  // Videos change handler
  const handleVideosChange = (videos: any[]) => {
    setCourseData(prev => ({ ...prev, videos }));
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Course Form */}
      <CourseForm
        onSubmit={handleSubmit}
        onPreview={handlePreview}
        isActive={isActive}
        initialData={courseData}
      />
      
      {/* Video Management */}
      <BaseCard variant="bordered" className="p-6">
        <VideoManager
          videos={courseData.videos}
          onVideosChange={handleVideosChange}
        />
      </BaseCard>
    </div>
  );
}