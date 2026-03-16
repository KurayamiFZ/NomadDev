"use client";

import { useState } from "react";
import { 
  Upload, 
  Plus, 
  X, 
  Video, 
  FileText, 
  BarChart3, 
  Trash2,
  Save,
  Eye,
  AlertCircle,
  Edit3
} from "lucide-react";

interface VideoContent {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoFile: File | null;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}

interface CourseAchievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirementType: 'video_completion' | 'course_completion' | 'quiz_score' | 'time_spent';
  requirementValue: number;
  unlocked: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

type NewCourseProps = {
  isActive?: boolean;
};

export default function NewCourse({ isActive = false }: NewCourseProps) {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Course Achievements State
  const [achievements, setAchievements] = useState<CourseAchievement[]>([]);
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [achievementXP, setAchievementXP] = useState('');
  const [achievementTier, setAchievementTier] = useState<'bronze' | 'silver' | 'gold' | 'platinum'>('bronze');
  const [achievementRequirement, setAchievementRequirement] = useState<'video_completion' | 'course_completion' | 'quiz_score' | 'time_spent'>('video_completion');
  const [achievementValue, setAchievementValue] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState<CourseAchievement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nextAchievementId, setNextAchievementId] = useState(1);

  const categories = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'cloud-computing', label: 'Cloud Computing' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'devops', label: 'DevOps' },
    { value: 'design', label: 'Design' }
  ];

  const difficultyLevels = [
    { 
      value: 'beginner', 
      label: 'Beginner', 
      color: 'text-green-400 bg-green-400/10 border-green-400/30',
      description: 'No prior experience required'
    },
    { 
      value: 'intermediate', 
      label: 'Intermediate', 
      color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
      description: 'Some experience recommended'
    },
    { 
      value: 'advanced', 
      label: 'Advanced', 
      color: 'text-red-400 bg-red-400/10 border-red-400/30',
      description: 'Extensive experience required'
    }
  ];

  const addNewVideo = () => {
    const newVideo: VideoContent = {
      id: Date.now().toString(),
      title: '',
      description: '',
      difficulty: 'beginner',
      videoFile: null,
      videoUrl: '',
      duration: '0:00',
      thumbnail: ''
    };
    setVideos([...videos, newVideo]);
  };

  const updateVideo = (id: string, field: keyof VideoContent, value: any) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, [field]: value } : video
    ));
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, videoId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0], videoId);
    }
  };

  const handleVideoFile = (file: File, videoId: string) => {
    if (file.type.startsWith('video/')) {
      updateVideo(videoId, 'videoFile', file);
      updateVideo(videoId, 'videoUrl', URL.createObjectURL(file));
      
      // Create thumbnail (simplified - in real app would use video frame extraction)
      const thumbnailUrl = `/api/video-thumbnail?file=${file.name}`;
      updateVideo(videoId, 'thumbnail', thumbnailUrl);
      
      // Get video duration (simplified)
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        updateVideo(videoId, 'duration', `${minutes}:${seconds.toString().padStart(2, '0')}`);
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!courseTitle || !courseDescription || videos.length === 0) {
      alert('Please fill in all course details and add at least one video');
      return;
    }

    const isValid = videos.every(video => 
      video.title && video.description && video.videoFile
    );

    if (!isValid) {
      alert('Please fill in all video details and upload video files');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual Supabase integration later
      console.log('Creating course:', {
        title: courseTitle,
        description: courseDescription,
        category: courseCategory,
        videos: videos.map(v => ({
          title: v.title,
          description: v.description,
          difficulty: v.difficulty,
          duration: v.duration
        })),
        achievements: achievements
      });

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Course created successfully!');
      
      // Reset form
      setCourseTitle('');
      setCourseDescription('');
      setCourseCategory('');
      setVideos([]);
      setAchievements([]);
      
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Achievement Management Functions
  const addAchievement = () => {
    if (!achievementTitle || !achievementDescription || !achievementXP || !achievementValue) {
      alert('Please fill in all achievement fields');
      return;
    }

    const newAchievement: CourseAchievement = {
      id: nextAchievementId,
      title: achievementTitle,
      description: achievementDescription,
      icon: '🏆',
      xpReward: parseInt(achievementXP),
      requirementType: achievementRequirement,
      requirementValue: parseInt(achievementValue),
      unlocked: false,
      tier: achievementTier
    };

    setAchievements([...achievements, newAchievement]);
    setNextAchievementId(nextAchievementId + 1);
    
    // Reset achievement form
    setAchievementTitle('');
    setAchievementDescription('');
    setAchievementXP('');
    setAchievementTier('bronze');
    setAchievementRequirement('video_completion');
    setAchievementValue('');
  };

  const selectAchievement = (achievement: CourseAchievement) => {
    setSelectedAchievement(achievement);
    setIsEditMode(true);
    
    // Load achievement data into form
    setAchievementTitle(achievement.title);
    setAchievementDescription(achievement.description);
    setAchievementXP(achievement.xpReward.toString());
    setAchievementTier(achievement.tier);
    setAchievementRequirement(achievement.requirementType);
    setAchievementValue(achievement.requirementValue.toString());
  };

  const updateAchievement = () => {
    if (!selectedAchievement || !achievementTitle || !achievementDescription || !achievementXP || !achievementValue) {
      alert('Please fill in all achievement fields');
      return;
    }

    const updatedAchievement: CourseAchievement = {
      ...selectedAchievement,
      title: achievementTitle,
      description: achievementDescription,
      xpReward: parseInt(achievementXP),
      requirementType: achievementRequirement,
      requirementValue: parseInt(achievementValue),
      tier: achievementTier
    };

    setAchievements(achievements.map(a => 
      a.id === selectedAchievement.id ? updatedAchievement : a
    ));
    
    // Reset form
    setAchievementTitle('');
    setAchievementDescription('');
    setAchievementXP('');
    setAchievementTier('bronze');
    setAchievementRequirement('video_completion');
    setAchievementValue('');
    setSelectedAchievement(null);
    setIsEditMode(false);
  };

  const deleteAchievement = (achievementId: number) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;
    
    setAchievements(achievements.filter(a => a.id !== achievementId));
    
    // Reset form if deleted achievement was selected
    if (selectedAchievement?.id === achievementId) {
      setAchievementTitle('');
      setAchievementDescription('');
      setAchievementXP('');
      setAchievementTier('bronze');
      setAchievementRequirement('video_completion');
      setAchievementValue('');
      setSelectedAchievement(null);
      setIsEditMode(false);
    }
  };

  const resetAchievementForm = () => {
    setAchievementTitle('');
    setAchievementDescription('');
    setAchievementXP('');
    setAchievementTier('bronze');
    setAchievementRequirement('video_completion');
    setAchievementValue('');
    setSelectedAchievement(null);
    setIsEditMode(false);
  };

  const achievementTiers = [
    { value: 'bronze', label: 'Bronze', color: 'text-orange-400' },
    { value: 'silver', label: 'Silver', color: 'text-gray-400' },
    { value: 'gold', label: 'Gold', color: 'text-yellow-400' },
    { value: 'platinum', label: 'Platinum', color: 'text-purple-400' }
  ];

  const requirementTypes = [
    { value: 'video_completion', label: 'Video Completion', description: 'Complete specific number of videos' },
    { value: 'course_completion', label: 'Course Completion', description: 'Complete the entire course' },
    { value: 'quiz_score', label: 'Quiz Score', description: 'Achieve specific quiz score' },
    { value: 'time_spent', label: 'Time Spent', description: 'Spend specific time in course' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
          <p className="text-gray-400">Upload and organize your course content</p>
        </div>

        {/* Course Information */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Course Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter course title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Description *
            </label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
              rows={4}
              placeholder="Describe what students will learn in this course"
            />
          </div>
        </div>

        {/* Video Content */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-400" />
              Video Content
            </h2>
            <button
              onClick={addNewVideo}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
            >
              <Plus className="w-4 h-4" />
              Add Video
            </button>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
              <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No videos added yet</h3>
              <p className="text-gray-500 mb-4">Add your first video to get started</p>
              <button
                onClick={addNewVideo}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
              >
                Add First Video
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {videos.map((video, index) => (
                <div key={video.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      Video {index + 1}
                    </h3>
                    <button
                      onClick={() => removeVideo(video.id)}
                      className="p-2 hover:bg-gray-600 rounded-lg transition text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Video Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Video File *
                      </label>
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
                          dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-500 hover:border-gray-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => handleDrop(e, video.id)}
                      >
                        {video.videoFile ? (
                          <div className="space-y-4">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                              <Video className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{video.videoFile.name}</p>
                              <p className="text-gray-400 text-sm">Duration: {video.duration}</p>
                            </div>
                            <button
                              onClick={() => {
                                updateVideo(video.id, 'videoFile', null);
                                updateVideo(video.id, 'videoUrl', '');
                                updateVideo(video.id, 'duration', '0:00');
                              }}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove video
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-white">Drag and drop video here</p>
                              <p className="text-gray-400 text-sm">or click to browse</p>
                            </div>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleVideoFile(e.target.files[0], video.id);
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Video Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Video Title *
                        </label>
                        <input
                          type="text"
                          value={video.title}
                          onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                          placeholder="Enter video title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={video.description}
                          onChange={(e) => updateVideo(video.id, 'description', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                          rows={3}
                          placeholder="Describe what this video covers"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Difficulty Level *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {difficultyLevels.map(level => (
                            <button
                              key={level.value}
                              onClick={() => updateVideo(video.id, 'difficulty', level.value)}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                                video.difficulty === level.value
                                  ? level.color
                                  : 'bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500'
                              }`}
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {difficultyLevels.find(l => l.value === video.difficulty)?.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Video Preview */}
                  {video.videoUrl && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preview
                      </label>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <video
                          src={video.videoUrl}
                          className="w-full rounded-lg"
                          controls
                          preload="metadata"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Course Achievements */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Course Achievements
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{achievements.length} achievements</span>
            </div>
          </div>

          {/* Achievement Form */}
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">
                {isEditMode ? `Edit Achievement #${selectedAchievement?.id}` : 'Create New Achievement'}
              </h3>
              {isEditMode && (
                <button
                  onClick={resetAchievementForm}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  value={achievementTitle}
                  onChange={(e) => setAchievementTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="Enter achievement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  XP Reward *
                </label>
                <input
                  type="number"
                  value={achievementXP}
                  onChange={(e) => setAchievementXP(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="XP amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Achievement Tier
                </label>
                <select
                  value={achievementTier}
                  onChange={(e) => setAchievementTier(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {achievementTiers.map(tier => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={achievementDescription}
                  onChange={(e) => setAchievementDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                  rows={2}
                  placeholder="Describe how to earn this achievement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Requirement Type
                </label>
                <select
                  value={achievementRequirement}
                  onChange={(e) => setAchievementRequirement(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {requirementTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Requirement Value *
                </label>
                <input
                  type="number"
                  value={achievementValue}
                  onChange={(e) => setAchievementValue(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="Value"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={isEditMode ? updateAchievement : addAchievement}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
                >
                  {isEditMode ? 'Update Achievement' : 'Add Achievement'}
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-400">
              {requirementTypes.find(t => t.value === achievementRequirement)?.description}
            </div>
          </div>

          {/* Achievements List */}
          {achievements.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
              <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No achievements yet</h3>
              <p className="text-gray-500 mb-4">Create achievements to motivate students</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const tierColor = achievementTiers.find(t => t.value === achievement.tier)?.color || 'text-gray-400';
                const isSelected = selectedAchievement?.id === achievement.id;
                
                return (
                  <div 
                    key={achievement.id} 
                    className={`bg-gray-700 rounded-lg p-4 border-2 cursor-pointer transition ${
                      isSelected ? 'border-purple-500' : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => selectAchievement(achievement)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-medium text-white">{achievement.title}</h4>
                          <span className={`text-xs font-medium ${tierColor}`}>
                            {achievement.tier.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectAchievement(achievement);
                          }}
                          className="p-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition"
                          title="Edit"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAchievement(achievement.id);
                          }}
                          className="p-1 bg-red-600 hover:bg-red-500 text-white rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{achievement.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-medium">+{achievement.xpReward} XP</span>
                      <span className="text-gray-400">
                        {requirementTypes.find(t => t.value === achievement.requirementType)?.label}: {achievement.requirementValue}
                      </span>
                    </div>
                    
                    {isSelected && (
                      <div className="mt-2 text-xs text-purple-400 font-medium">
                        ✓ Selected for editing
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Course Statistics */}
        {videos.length > 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Course Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{videos.length}</div>
                <div className="text-sm text-gray-400">Total Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {videos.filter(v => v.difficulty === 'beginner').length}
                </div>
                <div className="text-sm text-gray-400">Beginner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {videos.filter(v => v.difficulty === 'intermediate').length}
                </div>
                <div className="text-sm text-gray-400">Intermediate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {videos.filter(v => v.difficulty === 'advanced').length}
                </div>
                <div className="text-sm text-gray-400">Advanced</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={!courseTitle || !courseDescription || videos.length === 0 || isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg font-medium transition disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Creating Course...' : 'Create Course'}
          </button>
          
          <button
            onClick={() => {
              // Preview functionality
              console.log('Preview course:', { courseTitle, courseDescription, videos });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
          >
            <Eye className="w-5 h-5" />
            Preview
          </button>
        </div>

        {/* Validation Warning */}
        {(!courseTitle || !courseDescription || videos.length === 0) && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <div className="text-sm text-yellow-400">
              {!courseTitle && 'Course title is required. '}
              {!courseDescription && 'Course description is required. '}
              {videos.length === 0 && 'At least one video is required.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}