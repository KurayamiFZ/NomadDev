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
import { createCourse } from "@/app/actions/courses";
import { cn } from "@/lib/utils";

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
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form submission handler
  const handleSubmit = async (data: CourseFormData) => {
    // Clear previous messages
    setSubmitMessage(null);
    
    // Check if we have at least one video with a file
    if (data.videos.length === 0 || !data.videos[0].videoFile) {
      setSubmitMessage({ type: 'error', text: 'Please upload a video file before creating the course.' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for server action
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('video', data.videos[0].videoFile);

      // Call server action
      const result = await createCourse(formData);

      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'Course created successfully!' });
        // Reset form
        setCourseData({
          title: '',
          description: '',
          category: '',
          videos: [],
          achievements: []
        });
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to create course.' });
      }
    } catch (error) {
      console.error('Course creation failed:', error);
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
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
      
      {/* Success/Error Messages */}
      {submitMessage && (
        <div className={cn(
          "p-4 rounded-lg border",
          submitMessage.type === 'success' 
            ? "bg-green-500/10 border-green-500/30 text-green-400" 
            : "bg-red-500/10 border-red-500/30 text-red-400"
        )}>
          {submitMessage.text}
        </div>
      )}
      
      {/* Course Form */}
      <CourseForm
        onSubmit={handleSubmit}
        onPreview={handlePreview}
        isActive={isActive}
        initialData={courseData}
        isSubmitting={isSubmitting}
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