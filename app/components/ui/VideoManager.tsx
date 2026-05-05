"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Plus, X, Video, Edit3, Trash2 } from "lucide-react";
import { BaseCard } from "./BaseCard";
import { Button } from "../button";
import { IconWrapper } from "./IconWrapper";
import { StatusBadge } from "./StatusBadge";
import { FlexRow } from "./FlexRow";
import { Heading } from "./Heading";
import { cn } from "@/lib/utils";

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

interface VideoManagerProps {
  /** Array of videos */
  videos: VideoContent[];
  
  /** Videos change handler */
  onVideosChange: (videos: VideoContent[]) => void;
  
  /** Additional CSS classes */
  className?: string;
}

export function VideoManager({ 
  videos, 
  onVideosChange, 
  className 
}: VideoManagerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  // Add new video
  const addNewVideo = useCallback(() => {
    const newVideo: VideoContent = {
      id: Date.now().toString(),
      title: '',
      description: '',
      difficulty: 'beginner',
      videoFile: null,
      videoUrl: '',
      duration: '',
      thumbnail: ''
    };
    
    onVideosChange([...videos, newVideo]);
    setEditingVideo(newVideo.id);
  }, [videos, onVideosChange]);
  
  // Update video
  const updateVideo = useCallback((videoId: string, updates: Partial<VideoContent>) => {
    onVideosChange(videos.map(video => 
      video.id === videoId ? { ...video, ...updates } : video
    ));
  }, [videos, onVideosChange]);
  
  // Delete video
  const deleteVideo = useCallback((videoId: string) => {
    onVideosChange(videos.filter(video => video.id !== videoId));
  }, [videos, onVideosChange]);
  
  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  }, []);

  // Handle file selection from both drag-drop and file input
  const handleFileSelection = useCallback((files: File[]) => {
    // Filter for video files only
    const videoFiles = files.filter(file => 
      file.type.startsWith('video/') || 
      file.name.toLowerCase().endsWith('.mp4') ||
      file.name.toLowerCase().endsWith('.webm') ||
      file.name.toLowerCase().endsWith('.mov') ||
      file.name.toLowerCase().endsWith('.avi')
    );

    if (videoFiles.length === 0) {
      alert('Please select valid video files (MP4, WebM, MOV, AVI)');
      return;
    }

    // Create new video objects for each file
    const newVideos = videoFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      description: '',
      difficulty: 'beginner' as const,
      videoFile: file,
      videoUrl: '',
      duration: '',
      thumbnail: ''
    }));

    onVideosChange([...videos, ...newVideos]);
  }, [videos, onVideosChange]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileSelection(files);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFileSelection]);

  // Trigger file input click
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  return (
    <div className={cn("space-y-4", className)}>
      <Heading size="lg">Course Videos</Heading>
      
      {/* Add Video Button */}
      <Button
        onClick={addNewVideo}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Video
      </Button>
      
      {/* Video List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <BaseCard 
            key={video.id}
            variant="bordered" 
            className={cn(
              "p-4 transition-all",
              editingVideo === video.id && "ring-2 ring-purple-500"
            )}
          >
            <FlexRow justify="between" align="start" gap="md">
              <div className="flex-1 space-y-3">
                <FlexRow align="center" gap="sm">
                  <IconWrapper icon={Video} size="sm" variant="solid" color="purple" />
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => updateVideo(video.id, { title: e.target.value })}
                    className="flex-1 bg-transparent border-none text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
                    placeholder="Video title"
                  />
                </FlexRow>
                
                <textarea
                  value={video.description}
                  onChange={(e) => updateVideo(video.id, { description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none px-3 py-2 resize-none h-20"
                  placeholder="Video description"
                />
                
                <FlexRow align="center" gap="md">
                  <StatusBadge 
                    variant={video.difficulty === 'beginner' ? 'success' : video.difficulty === 'intermediate' ? 'warning' : 'error'}
                    size="sm"
                  >
                    {difficultyLevels.find(level => level.value === video.difficulty)?.label}
                  </StatusBadge>
                  
                  <select
                    value={video.difficulty}
                    onChange={(e) => updateVideo(video.id, { difficulty: e.target.value as any })}
                    className="bg-gray-800 border border-gray-700 rounded-lg text-white text-sm px-3 py-1 focus:border-purple-500 focus:outline-none"
                  >
                    {difficultyLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </FlexRow>
              </div>
              
              <FlexRow gap="sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingVideo(editingVideo === video.id ? null : video.id)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteVideo(video.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </FlexRow>
            </FlexRow>
          </BaseCard>
        ))}
      </div>
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,.mp4,.webm,.mov,.avi"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drag and Drop Area */}
      <div
        className={cn(
          "transition-all cursor-pointer",
          dragActive ? "ring-2 ring-purple-500" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <BaseCard 
          variant="bordered" 
          className={cn(
            "p-8 border-2 border-dashed hover:border-purple-500 transition-colors",
            dragActive ? "border-purple-500 bg-purple-500/5" : "border-gray-700"
          )}
        >
          <div className="text-center">
            <IconWrapper 
              icon={Upload} 
              size="lg" 
              variant="transparent" 
              color="gray"
              className="mx-auto mb-4"
            />
            <div className="text-gray-400">
              <p className="font-medium">Drag and drop videos here</p>
              <p className="text-sm mt-1">or click to browse files</p>
              <p className="text-xs mt-2 text-gray-500">Supported: MP4, WebM, MOV, AVI (max 3GB)</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
}
