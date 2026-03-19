// Client-side component for displaying course lessons - Enhanced Version
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  Zap,
  Trophy,
  Users,
  MessageCircle,
  Code,
  Rocket,
  Gamepad2,
  Sparkles,
  Bell,
  Star,
  Flame,
  Brain,
  Shield,
  Sword,
  Crown,
  Gem,
  Download,
  Share2,
  BookMarked,
  Layers,
  Fingerprint,
  Cpu,
  Heart,
  Eye,
  BarChart3,
  Timer,
  Gift,
} from "lucide-react";

// Main component for the lessons page
export default function LessonsEnhanced() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState("main");
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [pathsVisible, setPathsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  
  // Refs for scroll-triggered animations
  const headerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger initial animations
    setTimeout(() => setIsVisible(true), 100);
    
    // Setup scroll observers
    const setupScrollObserver = (ref: React.RefObject<HTMLDivElement | null>, setState: (visible: boolean) => void) => {
      if (!ref.current) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState(true);
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref.current);
      return () => observer.disconnect();
    };
    
    const cleanupHeader = setupScrollObserver(headerRef, setHeaderVisible);
    const cleanupPaths = setupScrollObserver(pathsRef, setPathsVisible);
    const cleanupProjects = setupScrollObserver(projectsRef, setProjectsVisible);
    const cleanupStats = setupScrollObserver(statsRef, setStatsVisible);
    
    return () => {
      cleanupHeader?.();
      cleanupPaths?.();
      cleanupProjects?.();
      cleanupStats?.();
    };
  }, []);

  // Learning paths - New feature
  const learningPaths = [
    { id: "main", name: "Main Quest", icon: Sword, color: "purple" },
    { id: "advanced", name: "Expert Path", icon: Crown, color: "yellow" },
    { id: "projects", name: "Build Track", icon: Gamepad2, color: "green" },
  ];

  // Enhanced lessons with xp and skill points
  const currentWeekLessons = [
    {
      id: 1,
      title: "Understanding Unity Components",
      duration: "12 min",
      completed: true,
      locked: false,
      description: "Master the core building blocks of Unity game development",
      category: "Fundamentals",
      difficulty: "Beginner",
      xp: 150,
      skillPoints: 2,
      completionRate: 98,
      thumbnail: "bg-blue-500",
    },
    {
      id: 2,
      title: "Creating Your First GameObject",
      duration: "15 min",
      completed: true,
      locked: false,
      description: "Bring objects to life in your Unity scene",
      category: "Fundamentals",
      difficulty: "Beginner",
      xp: 200,
      skillPoints: 2,
      completionRate: 95,
      thumbnail: "bg-cyan-500",
    },
    {
      id: 3,
      title: "Working with Transforms",
      duration: "18 min",
      completed: true,
      locked: false,
      description: "Control position, rotation, and scale like a pro",
      category: "Fundamentals",
      difficulty: "Beginner",
      xp: 250,
      skillPoints: 3,
      completionRate: 92,
      thumbnail: "bg-teal-500",
    },
    {
      id: 4,
      title: "Introduction to Physics",
      duration: "20 min",
      completed: false,
      locked: false,
      current: true,
      description: "Harness gravity, forces, and realistic movement",
      category: "Physics",
      difficulty: "Intermediate",
      xp: 350,
      skillPoints: 5,
      completionRate: 87,
      thumbnail: "bg-purple-500",
    },
    {
      id: 5,
      title: "Collision Detection",
      duration: "16 min",
      completed: false,
      locked: false,
      description: "Detect and respond to object interactions",
      category: "Physics",
      difficulty: "Intermediate",
      xp: 300,
      skillPoints: 4,
      completionRate: 89,
      thumbnail: "bg-pink-500",
    },
    {
      id: 6,
      title: "Building Your Platformer",
      duration: "25 min",
      completed: false,
      locked: false,
      description: "Create your first complete game from scratch",
      category: "Project",
      difficulty: "Intermediate",
      xp: 500,
      skillPoints: 8,
      completionRate: 85,
      thumbnail: "bg-rose-500",
      isBoss: true,
    },
  ];

  // Power-ups and boosts
  const activePowerUps = [
    { name: "2x xp Boost", icon: Zap, color: "yellow", timeLeft: "2h 15m" },
    { name: "Focus Mode", icon: Brain, color: "blue", timeLeft: "45m" },
    { name: "Streak Shield", icon: Shield, color: "green", timeLeft: "1 day" },
  ];

  // Skill tree nodes
  const skillTree = [
    { name: "Unity Basics", level: 3, maxLevel: 3, unlocked: true },
    { name: "Physics Master", level: 1, maxLevel: 5, unlocked: true },
    { name: "Animation Pro", level: 0, maxLevel: 5, unlocked: false },
    { name: "AI Developer", level: 0, maxLevel: 5, unlocked: false },
  ];

  // Daily challenges
  const dailyChallenges = [
    {
      title: "Complete 3 Lessons",
      progress: 2,
      total: 3,
      reward: "250 xp",
      icon: BookOpen,
    },
    {
      title: "Perfect Score",
      progress: 1,
      total: 1,
      reward: "500 xp",
      icon: Star,
    },
    {
      title: "Help 2 Students",
      progress: 0,
      total: 2,
      reward: "150 xp",
      icon: Users,
    },
  ];

  // Course statistics
  const stats = {
    totalLessons: 24,
    completedLessons: 3,
    totalxp: 12750,
    currentLevel: 8,
    nextLevelxp: 15000,
    totalDuration: "8h 45m",
    weekProgress: 2,
    totalWeeks: 8,
    currentStreak: 7,
    longestStreak: 14,
    skillPoints: 18,
    rank: "Advanced Learner",
    percentile: 87,
  };

  const filters = ["all", "in-progress", "completed", "locked"];
  const progressPercentage = Math.round((stats.completedLessons / stats.totalLessons) * 100);
  console.log(`You&apos;re ${progressPercentage}% through the course. Complete ${stats.completedLessons} / ${stats.totalLessons} Lessons`);
  const levelProgress = Math.round((stats.totalxp / stats.nextLevelxp) * 100);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Header */}
      <div 
        ref={headerRef}
        className={`top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 transform transition-all duration-1000 ease-out ${
          headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transform transition-transform duration-300 hover:scale-110" />
              <input
                type="text"
                placeholder="Search lessons, skills, achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 w-full focus:border-purple-500 focus:outline-none text-sm backdrop-blur-sm transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-purple-500/20"
              />
            </div>

            {/* Level & xp Badge */}
            <div className="flex items-center gap-4">
              <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl px-4 py-2 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <span className="font-black text-lg bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      Level {stats.currentLevel}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                    <span className="font-bold text-purple-400">
                      {stats.totalxp.toLocaleString()} xp
                    </span>
                  </div>
                </div>
              </div>
              <button className="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 transform hover:scale-110 hover:shadow-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Hero Section - Completely Redesigned */}
        <div className="relative mb-8">
          {/* Main Progress Card */}
          <div className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-1 shadow-2xl shadow-purple-500/20">
            <div className="bg-black/50 backdrop-blur-xl rounded-[22px] p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-black bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Unity Mastery Journey
                      </h1>
                      <p className="text-purple-300 text-lg">
                        Week {stats.weekProgress} - Physics & Movement
                      </p>
                    </div>
                  </div>

                  {/* Multi-Progress Bars */}
                  <div className="space-y-3 mt-6 max-w-2xl">
                    {/* Course Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Course Progress</span>
                        <span className="font-bold text-purple-300">
                          {stats.completedLessons}/{stats.totalLessons} Lessons
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 relative"
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Level Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">
                          Level {stats.currentLevel} → {stats.currentLevel + 1}
                        </span>
                        <span className="font-bold text-yellow-300">
                          {stats.totalxp.toLocaleString()}/
                          {stats.nextLevelxp.toLocaleString()} xp
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="h-full bg-linear-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000 relative"
                          style={{ width: `${levelProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Circle */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-white/10"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${progressPercentage * 4.4} 440`}
                        className="transition-all duration-1000"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {progressPercentage}%
                      </div>
                      <div className="text-sm text-gray-400">Complete</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold">
                      Top {stats.percentile}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Power-Ups */}
          <div className="flex gap-3 mt-4">
            {activePowerUps.map((powerUp, i) => (
              <div
                key={i}
                className="flex-1 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 bg-${powerUp.color}-500/20 rounded-xl border border-${powerUp.color}-500/30`}
                  >
                    <powerUp.icon
                      className={`w-5 h-5 text-${powerUp.color}-400`}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{powerUp.name}</div>
                    <div className="text-xs text-gray-400">
                      {powerUp.timeLeft}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Selector - New Feature */}
        <div 
          ref={pathsRef}
          className={`mb-8 transform transition-all duration-700 ease-out ${
            pathsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-xl font-black mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Layers className="w-6 h-6 text-purple-400 animate-pulse" />
            Choose Your Path
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {learningPaths.map((path, index) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                  selectedPath === path.id
                    ? "bg-linear-to-br from-purple-500/20 to-pink-500/20 border-purple-500 shadow-lg shadow-purple-500/30"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10"
                } ${
                  pathsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <path.icon
                    className={`w-8 h-8 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                      selectedPath === path.id
                        ? "text-purple-400 animate-pulse"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <div className="text-left">
                    <div className="font-black text-lg group-hover:text-white transition-colors duration-300">{path.name}</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {path.id === "main" && "Core curriculum"}
                      {path.id === "advanced" && "Challenge yourself"}
                      {path.id === "projects" && "Hands-on practice"}
                    </div>
                  </div>
                </div>
                {selectedPath === path.id && (
                  <div className="absolute top-2 right-2 animate-pulse">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {filter === "all" && "All Lessons"}
              {filter === "in-progress" && "In Progress"}
              {filter === "completed" && "Completed"}
              {filter === "locked" && "Upcoming"}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Lessons */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Lesson Spotlight */}
            {currentWeekLessons.find((l) => l.current) && (
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative bg-black border border-purple-500/50 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-purple-400 font-black text-sm uppercase tracking-wider">
                          Continue Your Quest
                        </span>
                      </div>
                      <h2 className="text-3xl font-black mb-3 bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        {currentWeekLessons.find((l) => l.current)?.title}
                      </h2>
                      <p className="text-gray-300 mb-6 max-w-xl">
                        {currentWeekLessons.find((l) => l.current)?.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">
                            {
                              currentWeekLessons.find((l) => l.current)
                                ?.duration
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm">
                            +{currentWeekLessons.find((l) => l.current)?.xp} xp
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                          <Gem className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">
                            +
                            {
                              currentWeekLessons.find((l) => l.current)
                                ?.skillPoints
                            }{" "}
                            SP
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                          <Target className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-bold">
                            {
                              currentWeekLessons.find((l) => l.current)
                                ?.difficulty
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full group bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-3">
                      <Play className="w-6 h-6 group-hover:scale-110 transition" />
                      START LESSON
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Lessons Grid - Card Style */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">This Week's Lessons</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>
                    {currentWeekLessons.filter((l) => l.completed).length}/
                    {currentWeekLessons.length} Complete
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentWeekLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                      lesson.completed
                        ? "bg-white/5 border-white/10 hover:border-green-500/50"
                        : lesson.current
                          ? "bg-purple-500/10 border-purple-500/50"
                          : "bg-white/5 border-white/10 hover:border-purple-500/50"
                    }`}
                  >
                    {/* Thumbnail Header */}
                    <div
                      className={`h-32 ${lesson.thumbnail} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        {lesson.completed ? (
                          <div className="flex items-center gap-2 bg-green-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-bold">Completed</span>
                          </div>
                        ) : lesson.current ? (
                          <div className="flex items-center gap-2 bg-purple-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Play className="w-4 h-4" />
                            <span className="text-xs font-bold">
                              In Progress
                            </span>
                          </div>
                        ) : lesson.locked ? (
                          <div className="flex items-center gap-2 bg-gray-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Lock className="w-4 h-4" />
                            <span className="text-xs font-bold">Locked</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-blue-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Target className="w-4 h-4" />
                            <span className="text-xs font-bold">Available</span>
                          </div>
                        )}
                      </div>

                      {/* Boss Battle Badge */}
                      {lesson.isBoss && (
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center gap-1 bg-red-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Flame className="w-4 h-4" />
                            <span className="text-xs font-bold">BOSS</span>
                          </div>
                        </div>
                      )}

                      {/* Completion Rate */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm text-xs">
                        <Users className="w-3 h-3" />
                        {lesson.completionRate}%
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3
                            className={`font-bold text-lg mb-2 ${
                              lesson.completed ? "text-gray-400" : "text-white"
                            } group-hover:text-purple-400 transition`}
                          >
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                            {lesson.description}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400">
                            {lesson.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Sparkles className="w-3 h-3" />+{lesson.xp}
                          </div>
                          <div className="flex items-center gap-1 text-purple-400 font-bold">
                            <Gem className="w-3 h-3" />+{lesson.skillPoints}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Challenges */}
            <div className="bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Daily Challenges</h3>
                  <p className="text-sm text-gray-400">
                    Complete to earn bonus xp
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="text-sm text-gray-400">Resets in</div>
                  <div className="text-lg font-black text-orange-400">
                    4h 23m
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {dailyChallenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/10"
                  >
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <challenge.icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold mb-2">{challenge.title}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full transition-all"
                            style={{
                              width: `${(challenge.progress / challenge.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-orange-400">
                      {challenge.reward}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Skill Tree */}
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  Skill Tree
                </h3>
                <div className="space-y-4">
                  {skillTree.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-bold text-sm ${
                            skill.unlocked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {skill.level}/{skill.maxLevel}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(skill.maxLevel)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 h-2 rounded-full ${
                              idx < skill.level
                                ? "bg-linear-to-r from-cyan-500 to-blue-500"
                                : "bg-white/10"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 py-3 rounded-xl font-bold transition">
                  Unlock Skills ({stats.skillPoints} SP)
                </button>
              </div>

              {/* Leaderboard Preview */}
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Leaderboard
                </h3>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Sarah M.", xp: 18500, avatar: "SM" },
                    { rank: 2, name: "Alex C.", xp: 16200, avatar: "AC" },
                    {
                      rank: 3,
                      name: "You",
                      xp: stats.totalxp,
                      avatar: "ME",
                      highlight: true,
                    },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        user.highlight
                          ? "bg-purple-500/20 border border-purple-500/30"
                          : "bg-white/5"
                      }`}
                    >
                      <div className="text-xl font-black text-gray-500 w-6">
                        #{user.rank}
                      </div>
                      <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{user.name}</div>
                        <div className="text-xs text-gray-400">
                          {user.xp.toLocaleString()} xp
                        </div>
                      </div>
                      {user.rank === 1 && (
                        <Crown className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold transition">
                  View Full Rankings
                </button>
              </div>

              {/* Study Streak */}
              <div className="bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-8 h-8 text-orange-400" />
                  <div>
                    <div className="text-3xl font-black">
                      {stats.currentStreak}
                    </div>
                    <div className="text-sm text-gray-400">Day Streak</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-12 rounded-lg ${
                        i < stats.currentStreak % 7
                          ? "bg-linear-to-t from-orange-500 to-yellow-500"
                          : "bg-white/10"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-gray-400">
                  🏆 Longest: {stats.longestStreak} days
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-black text-lg mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    {
                      icon: Download,
                      label: "Download Resources",
                      color: "blue",
                    },
                    { icon: Share2, label: "Share Progress", color: "green" },
                    {
                      icon: MessageCircle,
                      label: "Ask Question",
                      color: "purple",
                    },
                    { icon: BookMarked, label: "Study Notes", color: "pink" },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition text-left group"
                    >
                      <action.icon
                        className={`w-5 h-5 text-${action.color}-400`}
                      />
                      <span className="font-medium group-hover:text-white transition">
                        {action.label}
                      </span>
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:translate-x-1 transition" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
