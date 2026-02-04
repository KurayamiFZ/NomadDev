// Client-side component for displaying course lessons
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Import icons from lucide-react library
import {
  CheckCircle,
  Lock,
  Play,
  Clock,
  Calendar,
  TrendingUp,
  ChevronRight,
  Search,
  BookOpen,
  Award,
  Target,
} from "lucide-react";

// Main component for the lessons page
export default function Lessons() {
  const router = useRouter();
  // State for managing selected filter (all, completed, in-progress, locked)
  const [selectedFilter, setSelectedFilter] = useState("all");
  // State for managing search query input
  const [searchQuery, setSearchQuery] = useState("");

  // Array of current week lessons with their details
  const currentWeekLessons = [
    {
      id: 1,
      title: "Understanding Unity Components",
      duration: "12 min",
      completed: true,
      locked: false,
      description:
        "Learn the fundamentals of Unity components and how they work together to create game objects",
      category: "Fundamentals",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Creating Your First GameObject",
      duration: "15 min",
      completed: true,
      locked: false,
      description:
        "Step-by-step guide to creating and manipulating game objects in Unity",
      category: "Fundamentals",
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Working with Transforms",
      duration: "18 min",
      completed: true,
      locked: false,
      description:
        "Master position, rotation, and scale transformations for game objects",
      category: "Fundamentals",
      difficulty: "Beginner",
    },
    {
      id: 4,
      title: "Introduction to Physics",
      duration: "20 min",
      completed: false,
      locked: false,
      current: true,
      description:
        "Understand Unity's physics system including rigidbodies and colliders",
      category: "Physics",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Collision Detection",
      duration: "16 min",
      completed: false,
      locked: false,
      description:
        "Learn how to detect and respond to collisions between game objects",
      category: "Physics",
      difficulty: "Intermediate",
    },
    {
      id: 6,
      title: "Building Your Platformer",
      duration: "25 min",
      completed: false,
      locked: false,
      description:
        "Put everything together to build a complete 2D platformer game",
      category: "Project",
      difficulty: "Intermediate",
    },
  ];

  // Array of upcoming lessons
  const upcomingLessons = [
    {
      id: 7,
      title: "Advanced Animation Techniques",
      duration: "22 min",
      completed: false,
      locked: true,
      unlockDate: "Unlocks in 2 days",
      category: "Animation",
      difficulty: "Advanced",
    },
    {
      id: 8,
      title: "Particle Systems Mastery",
      duration: "19 min",
      completed: false,
      locked: true,
      unlockDate: "Unlocks in 4 days",
      category: "Effects",
      difficulty: "Advanced",
    },
    {
      id: 9,
      title: "Audio Integration",
      duration: "17 min",
      completed: false,
      locked: true,
      unlockDate: "Unlocks in 5 days",
      category: "Audio",
      difficulty: "Intermediate",
    },
  ];

  // Course statistics
  const stats = {
    totalLessons: 24,
    completedLessons: 3,
    totalDuration: "8h 45m",
    weekProgress: 2,
    totalWeeks: 8,
  };

  // Weekly milestones
  const weeklyMilestones = [
    {
      week: 1,
      title: "Unity Basics",
      status: "completed",
      lessons: 6,
      completedLessons: 6,
    },
    {
      week: 2,
      title: "Physics & Movement",
      status: "in-progress",
      lessons: 6,
      completedLessons: 3,
    },
    {
      week: 3,
      title: "Animation & Effects",
      status: "locked",
      lessons: 6,
      completedLessons: 0,
    },
    {
      week: 4,
      title: "Game Mechanics",
      status: "locked",
      lessons: 6,
      completedLessons: 0,
    },
  ];

  // Filter options for lessons
  const filters = ["all", "in-progress", "completed", "locked"];

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (stats.completedLessons / stats.totalLessons) * 100,
  );

  // Main container for the page
  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="relative">
              {/* Search Icon */}
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              {/* Search Input Field */}
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Course Progress Banner */}
        <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 relative overflow-hidden">
          {/* Overlay for depth effect */}
          <div className="absolute inset-0 bg-black opacity-20"></div>
          {/* Content wrapper with z-index to appear above overlay */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black mb-3">
                  Unity Game Development
                </h1>
                <p className="text-white opacity-90 mb-4">
                  Week {stats.weekProgress} of {stats.totalWeeks} •{" "}
                  {stats.completedLessons} of {stats.totalLessons} lessons
                  completed
                </p>
                {/* Progress Bar */}
                <div className="w-96 bg-white bg-opacity-20 rounded-full h-3 backdrop-blur-sm">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black mb-2">
                  {progressPercentage}%
                </div>
                <div className="text-white opacity-90">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto">
          {/* Map through filter options and create buttons */}
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {/* Display filter label based on filter type */}
              {filter === "all" && "All Lessons"}
              {filter === "in-progress" && "In Progress"}
              {filter === "completed" && "Completed"}
              {filter === "locked" && "Upcoming"}
            </button>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Lessons Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Current Lesson Highlight */}
            {currentWeekLessons.find((l) => l.current) && (
              <div className="bg-purple-900/30 border-2 border-purple-500 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 font-black text-lg">
                    CONTINUE LEARNING
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-black mb-3">
                      {currentWeekLessons.find((l) => l.current)?.title}
                    </h2>
                    <p className="text-gray-400 mb-4 max-w-xl">
                      {currentWeekLessons.find((l) => l.current)?.description}
                    </p>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {currentWeekLessons.find((l) => l.current)?.duration}
                      </div>
                      <div className="px-3 py-1 bg-purple-600 rounded-full text-white text-xs font-bold">
                        {currentWeekLessons.find((l) => l.current)?.category}
                      </div>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-xl font-black text-xl transition shadow-2xl flex items-center gap-3">
                    <Play className="w-6 h-6" />
                    CONTINUE
                  </button>
                </div>
              </div>
            )}

            {/* This Week's Lessons Section */}
            {(selectedFilter === "all" ||
              selectedFilter === "in-progress" ||
              selectedFilter === "completed") && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">This Week's Lessons</h2>
                  <span className="text-sm text-gray-400">
                    {currentWeekLessons.filter((l) => l.completed).length} of{" "}
                    {currentWeekLessons.length} completed
                  </span>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                  {currentWeekLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-6 rounded-xl transition border ${
                        lesson.current
                          ? "bg-purple-900/30 border-2 border-purple-500"
                          : lesson.completed
                            ? "bg-gray-800/50 border border-gray-700"
                            : "bg-gray-800 border border-gray-700 hover:border-gray-600 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status Icon */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                            lesson.completed
                              ? "bg-green-500"
                              : lesson.current
                                ? "bg-purple-500"
                                : "bg-gray-700"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : lesson.locked ? (
                            <Lock className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Play className="w-5 h-5 text-white" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3
                              className={`font-bold text-lg ${
                                lesson.completed
                                  ? "text-gray-400"
                                  : "text-white"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <span className="px-2 py-1 bg-gray-700 rounded text-xs font-medium">
                              {lesson.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                            <span>•</span>
                            <span>{lesson.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {lesson.current && (
                        <div className="bg-purple-500 text-white text-xs px-4 py-2 rounded-full font-bold">
                          IN PROGRESS
                        </div>
                      )}
                      {lesson.completed && (
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                          Review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Lessons Section */}
            {(selectedFilter === "all" || selectedFilter === "locked") && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">Upcoming Lessons</h2>
                  <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {upcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-gray-900 rounded-xl border border-gray-800 p-5 opacity-60"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-2 text-gray-300">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                            <span>•</span>
                            <span>{lesson.category}</span>
                          </div>
                          <div className="text-xs text-purple-400 font-medium">
                            🔒 {lesson.unlockDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Progress and Info */}
          <div className="lg:col-span-1 self-start">
            <div className="sticky top-24 space-y-6">
              {/* Learning Stats */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Your Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Completed</span>
                      <span className="font-bold text-purple-400">
                        {stats.completedLessons}/{stats.totalLessons}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                    <div>
                      <div className="text-2xl font-black text-purple-400">
                        {stats.totalDuration}
                      </div>
                      <div className="text-xs text-gray-500">Total Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-purple-400">
                        {stats.weekProgress}/{stats.totalWeeks}
                      </div>
                      <div className="text-xs text-gray-500">Weeks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Milestones */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Course Roadmap
                </h3>
                <div className="space-y-4">
                  {weeklyMilestones.map((milestone) => (
                    <div
                      key={milestone.week}
                      className={`border-l-4 pl-4 py-2 ${
                        milestone.status === "completed"
                          ? "border-green-500"
                          : milestone.status === "in-progress"
                            ? "border-purple-500"
                            : "border-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-bold">
                          Week {milestone.week}
                        </div>
                        {milestone.status === "completed" && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {milestone.status === "locked" && (
                          <Lock className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        {milestone.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {milestone.completedLessons}/{milestone.lessons} lessons
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Card */}
              <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-8 h-8 text-yellow-300" />
                    <h3 className="font-black text-lg">Keep Going!</h3>
                  </div>
                  <p className="text-sm text-white opacity-90 mb-4">
                    You're {progressPercentage}% through the course. Complete 3
                    more lessons to unlock a badge!
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4" />
                    <span className="font-bold">Next: Physics Master</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
