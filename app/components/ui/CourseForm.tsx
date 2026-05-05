/**
 * CourseForm Component - GameDev Academy Platform
 * 
 * A specialized course creation form component with
 * separated concerns for better maintainability.
 * 
 * Features:
 * - Course metadata input
 * - Video management
 * - Achievement system
 * - Form validation
 * - Action buttons
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.onPreview - Preview handler
 * @param {boolean} [props.isActive] - Form active state
 * @returns {JSX.Element} Course form component
 */

"use client";

import { useState, useCallback } from "react";
import { Save, Eye, AlertCircle } from "lucide-react";
import { BaseCard } from "./BaseCard";
import { FormValidation } from "./FormValidation";
import { FormActions } from "./FormActions";
import { StatsGrid } from "./StatsGrid";
import { Heading } from "./Heading";
import { Spacing } from "./Spacing";
import { cn } from "@/lib/utils";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  videos: any[];
  achievements: any[];
}

interface CourseFormProps {
  /** Form submission handler */
  onSubmit: (data: CourseFormData) => Promise<void>;
  
  /** Preview handler */
  onPreview: (data: CourseFormData) => void;
  
  /** Form active state */
  isActive?: boolean;
  
  /** Initial data */
  initialData?: Partial<CourseFormData>;
  
  /** External submitting state */
  isSubmitting?: boolean;
}

/**
 * Course Form Component
 * 
 * Separated course creation form with clear concerns:
 * - Form data management
 * - Validation logic
 * - UI rendering
 * - Action handling
 */
export function CourseForm({ 
  onSubmit, 
  onPreview, 
  isActive = false,
  initialData,
  isSubmitting: externalIsSubmitting = false
}: CourseFormProps) {
  // Form state
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    videos: initialData?.videos || [],
    achievements: initialData?.achievements || []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update form data
  const updateFormData = useCallback((updates: Partial<CourseFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Validation
  const getValidationMessages = useCallback(() => {
    const messages = [];
    if (!formData.title) messages.push('Course title is required. ');
    if (!formData.description) messages.push('Course description is required. ');
    if (formData.videos.length === 0) messages.push('At least one video is required.');
    return messages;
  }, [formData]);
  
  const isValid = formData.title && formData.description && formData.videos.length > 0;
  
  // Form submission
  const handleSubmit = useCallback(async () => {
    if (!isValid) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isValid, onSubmit]);
  
  // Stats calculation
  const stats = [
    { value: formData.videos.length, label: "Total Videos", color: "text-blue-400" },
    { value: formData.videos.filter(v => v.difficulty === 'beginner').length, label: "Beginner", color: "text-green-400" },
    { value: formData.videos.filter(v => v.difficulty === 'intermediate').length, label: "Intermediate", color: "text-yellow-400" },
    { value: formData.videos.filter(v => v.difficulty === 'advanced').length, label: "Advanced", color: "text-red-400" }
  ];
  
  const actions = [
    {
      text: (isSubmitting || externalIsSubmitting) ? 'Creating Course...' : 'Create Course',
      type: "primary" as const,
      icon: <Save className="w-5 h-5" />,
      onClick: handleSubmit,
      disabled: !isValid || isSubmitting || externalIsSubmitting,
      loading: isSubmitting || externalIsSubmitting
    },
    {
      text: 'Preview',
      type: "secondary" as const,
      icon: <Eye className="w-5 h-5" />,
      onClick: () => onPreview(formData)
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Heading size="2xl">Create New Course</Heading>
      
      {/* Course Metadata */}
      <BaseCard variant="bordered" className="p-6">
        <Heading size="lg" className="mb-4">Course Information</Heading>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              placeholder="Enter course title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none h-32 resize-none"
              placeholder="Enter course description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData({ category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="data-science">Data Science</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="cloud-computing">Cloud Computing</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="devops">DevOps</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>
      </BaseCard>
      
      {/* Course Statistics */}
      {formData.videos.length > 0 && (
        <BaseCard variant="bordered" className="p-6">
          <Heading size="lg" className="mb-4">Course Statistics</Heading>
          <StatsGrid stats={stats} columns={4} />
        </BaseCard>
      )}
      
      {/* Form Actions */}
      <FormActions actions={actions} layout="horizontal" />
      
      {/* Validation Warning */}
      <FormValidation 
        show={!isValid}
        messages={getValidationMessages()}
        type="warning"
        icon={<AlertCircle className="w-5 h-5" />}
      />
    </div>
  );
}
