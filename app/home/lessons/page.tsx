// Client-side component for displaying course lessons
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// Import icons from lucide-react library
import Icon from "@/app/components/icons";

// Main component for the lessons page
export default function Lessons() {
  const router = useRouter();
  // State for managing selected filter (all, completed, in-progress, locked)
  const [selectedFilter, setSelectedFilter] = useState("all");
  // State for managing search query input
  const [searchQuery, setSearchQuery] = useState("");

  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentLessonVisible, setCurrentLessonVisible] = useState(false);
  const [lessonsVisible, setLessonsVisible] = useState(false);
  const [upcomingVisible, setUpcomingVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [achievementCardVisible, setAchievementCardVisible] = useState(false);

  // Refs for scroll-triggered animations
  const bannerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const achievementCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger initial animations
    setTimeout(() => setIsVisible(true), 100);

    // Setup scroll observers
    const setupScrollObserver = (
      ref: React.RefObject<HTMLDivElement | null>,
      setState: (visible: boolean) => void,
    ) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState(true);
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    };

    const cleanupBanner = setupScrollObserver(bannerRef, setBannerVisible);
    const cleanupFilters = setupScrollObserver(filtersRef, setFiltersVisible);
    const cleanupCurrentLesson = setupScrollObserver(
      currentLessonRef,
      setCurrentLessonVisible,
    );
    const cleanupLessons = setupScrollObserver(lessonsRef, setLessonsVisible);
    const cleanupUpcoming = setupScrollObserver(
      upcomingRef,
      setUpcomingVisible,
    );
    const cleanupProgress = setupScrollObserver(
      progressRef,
      setProgressVisible,
    );
    const cleanupRoadmap = setupScrollObserver(roadmapRef, setRoadmapVisible);
    const cleanupAchievementCard = setupScrollObserver(
      achievementCardRef,
      setAchievementCardVisible,
    );

    return () => {
      cleanupBanner?.();
      cleanupFilters?.();
      cleanupCurrentLesson?.();
      cleanupLessons?.();
      cleanupUpcoming?.();
      cleanupProgress?.();
      cleanupRoadmap?.();
      cleanupAchievementCard?.();
    };
  }, []);

  const [currentWeekLessons, setCurrentWeekLessons] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalLessons: 0, completedLessons: 0 });
  const [weeklyMilestones, setWeeklyMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const filters = ["all", "in-progress", "completed", "locked"];

  // Fetch lessons from R2 storage
  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true);
        console.log('Lessons page: Fetching lessons from R2...');
        
        const response = await fetch('/api/lessons');
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('Lessons page: Fetched lessons:', result.data.length);
          setCurrentWeekLessons(result.data);
          
          // Calculate stats from fetched lessons
          const totalLessons = result.data.length;
          const completedLessons = result.data.filter((lesson: any) => lesson.completed).length;
          
          setStats({
            totalLessons,
            completedLessons,
            totalDuration: result.data.reduce((total: number, lesson: any) => {
              const duration = parseInt(lesson.duration) || 0;
              return total + duration;
            }, 0),
            weekProgress: Math.floor((completedLessons / totalLessons) * 8) || 0,
            totalWeeks: 8,
          });
          
          // Create weekly milestones from lessons
          const lessonsPerWeek = Math.ceil(totalLessons / 4);
          const milestones = [];
          
          for (let week = 1; week <= 4; week++) {
            const startIdx = (week - 1) * lessonsPerWeek;
            const endIdx = Math.min(startIdx + lessonsPerWeek, totalLessons);
            const weekLessons = result.data.slice(startIdx, endIdx);
            const completedInWeek = weekLessons.filter((lesson: any) => lesson.completed).length;
            
            milestones.push({
              week,
              title: `Week ${week}`,
              status: weekLessons.some((lesson: any) => lesson.current) ? 'in-progress' : 
                     completedInWeek === weekLessons.length ? 'completed' : 'locked',
              lessons: weekLessons.length,
              completedLessons: completedInWeek,
            });
          }
          
          setWeeklyMilestones(milestones);
        } else {
          console.error('Lessons page: API returned error:', result.error);
        }
      } catch (error) {
        console.error('Lessons page: Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  const progressPercentage = stats.totalLessons > 0 
    ? Math.round((stats.completedLessons / stats.totalLessons) * 100)
    : 0;

  // Main container for the page
  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Header Section */}
      <div className="top-0 z-50 bg-black border-b border-gray-800">
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="relative">
              {/* Search Icon */}
              <Icon
                name="Search"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              {/* Search Input Field */}
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:border-purple-900 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Course Progress Banner */}
        <div
          ref={bannerRef}
          className={`border border-stone-700 bg-black/60   rounded-2xl p-8 mb-8 relative overflow-hidden transform transition-all duration-1000 ease-out ${
            bannerVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          {/* Overlay for depth effect */}
          <div
            className="pointer-events-none absolute inset-0 bg-black opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          {/* Content wrapper with z-index to appear above overlay */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black mb-3 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Unity Game Development
                </h1>
                <p className="text-white opacity-90 mb-4">
                  Week {stats.weekProgress} of {stats.totalWeeks} •{" "}
                  {stats.completedLessons} of {stats.totalLessons} lessons
                  completed
                </p>
                {/* Progress Bar */}
                <div className="w-96 bg-white bg-opacity-20 rounded-full h-3 backdrop-blur-sm overflow-hidden">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: bannerVisible ? `${progressPercentage}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black mb-2 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {progressPercentage}%
                </div>
                <div className="text-white opacity-90">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          ref={filtersRef}
          className="flex items-center gap-3 mb-8 overflow-x-auto"
        >
          {/* Map through filter options and create buttons */}
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                selectedFilter === filter
                  ? "bg-purple-700 text-white shadow-lg shadow-purple-600/40"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              } ${
                filtersVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Display filter label based on filter type */}
              {filter === "all" && "All Lessons"}
              {filter === "in-progress" && "In Progress"}
              {filter === "completed" && "Completed"}
              {filter === "locked" && "Upcoming"}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Loading lessons from cloud storage...</p>
          </div>
        )}

        {/* Main Grid Layout */}
        {!loading && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Lessons Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Lesson Highlight */}
              {currentWeekLessons.find((l) => l.current) && (
              <div
                ref={currentLessonRef}
                className={`bg-linear-to-r from-purple-950/60 to-pink-950/60 rounded-xl p-6 border border-purple-600/40 mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/15 group ${
                  currentLessonVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="p=2">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-purple-500 text-sm font-medium mb-1">
                        LESSON 4 • WEEK 2
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        {currentWeekLessons.find((l) => l.current)?.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {currentWeekLessons.find((l) => l.current)?.description}
                      </p>
                    </div>
                    <div className="shrink-0 ml-4">
                      <div className="w-16 h-16 bg-linear-to-br from-purple-500/60 to-pink-500/60 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Icon name="Play" className="size-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-110">
                      <Icon name="Clock" className="size-4" />
                      {currentWeekLessons.find((l) => l.current)?.duration}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-purple-700 rounded-full text-white text-xs font-bold transform transition-transform duration-300 hover:scale-110">
                      {currentWeekLessons.find((l) => l.current)?.category}
                    </div>
                  </div>
                  <button className="flex items-center justify-center p-4 w-full bg-linear-to-r from-purple-600/40 to-pink-600/40 text-white rounded-lg font-bold mt-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
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
                  <h2 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    This Week's Lessons
                  </h2>
                  <span className="text-sm text-gray-400">
                    {currentWeekLessons.filter((l) => l.completed).length} of{" "}
                    {currentWeekLessons.length} completed
                  </span>
                </div>

                {/* Lessons List */}
                <div ref={lessonsRef} className="space-y-4">
                  {currentWeekLessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-6 rounded-xl transition-all duration-500 border transform hover:scale-[1.02] ${
                        lesson.current
                          ? "bg-purple-950/40 border-2 border-purple-600 shadow-lg shadow-purple-600/15"
                          : lesson.completed
                            ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                            : "bg-gray-800 border border-gray-700 hover:border-gray-600 cursor-pointer hover:shadow-lg"
                      } ${
                        lessonsVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status Icon */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transform transition-all duration-300 ${
                            lesson.completed
                              ? "bg-green-800 hover:scale-110"
                              : lesson.current
                                ? "bg-purple-700 hover:scale-110"
                                : "bg-gray-700 hover:scale-110"
                          }`}
                        >
                          {lesson.completed ? (
                            <Icon
                              name="CheckCircle"
                              className="w-6 h-6 text-white"
                            />
                          ) : lesson.locked ? (
                            <Icon
                              name="Lock"
                              className="w-5 h-5 text-gray-400"
                            />
                          ) : (
                            <Icon name="Play" className="w-5 h-5 text-white" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3
                              className={`font-bold text-lg transition-colors duration-300 ${
                                lesson.completed
                                  ? "text-gray-400"
                                  : "text-white hover:text-purple-400"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <span className="px-2 py-1 bg-gray-700 rounded text-xs font-medium transform transition-transform duration-300 hover:scale-110">
                              {lesson.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1 transform transition-transform duration-300 hover:scale-110">
                              <Icon name="Clock" className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                            <span>•</span>
                            <span>{lesson.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {lesson.current && (
                        <div className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold">
                          IN PROGRESS
                        </div>
                      )}
                      {lesson.completed && (
                        <button className="text-purple-500 hover:text-purple-400 text-sm font-medium transition-colors duration-300 hover:scale-110 transform">
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
                  <h2 className="text-2xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Upcoming Lessons
                  </h2>
                  <button className="text-purple-500 hover:text-purple-400 flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:scale-105 transform">
                    View All <Icon name="ChevronRight" className="w-4 h-4" />
                  </button>
                </div>

                {/* <div ref={upcomingRef} className="grid md:grid-cols-2 gap-4">
                  {upcomingLessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`bg-gray-900 rounded-xl border border-gray-800 p-5 opacity-60 transform transition-all duration-700 ease-out hover:opacity-80 hover:scale-105 hover:border-gray-700 ${
                        upcomingVisible
                          ? "translate-y-0 opacity-60"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shrink-0 transform transition-transform duration-300 hover:scale-110">
                          <Icon name="Lock" className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-2 text-gray-300 hover:text-white transition-colors duration-300">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1 transform transition-transform duration-300 hover:scale-110">
                              <Icon name="Clock" className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                            <span>•</span>
                            <span>{lesson.category}</span>
                          </div>
                          <div className="text-xs text-purple-500 font-medium transform transition-transform duration-300 hover:scale-110">
                            {lesson.unlockDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            )}
          </div>

          {/* Right Sidebar - Progress and Info */}
          <div className="lg:col-span-1 self-start">
            <div className="sticky top-24 space-y-6">
              {/* Learning Stats */}
              <div
                ref={progressRef}
                className={`bg-gray-900 rounded-xl border border-gray-800 p-6 transform transition-all duration-700 ease-out hover:shadow-lg hover:shadow-purple-500/20 ${
                  progressVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                <h3 className="font-black text-lg mb-4 flex items-center gap-2 bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  <Icon name="TrendingUp" className="w-5 h-5 text-purple-500" />
                  Your Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Completed</span>
                      <span className="font-bold text-purple-500">
                        {stats.completedLessons}/{stats.totalLessons}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-purple-700 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: progressVisible
                            ? `${progressPercentage}%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                    <div className="transform transition-transform duration-300 hover:scale-110">
                      <div className="text-2xl font-black text-purple-400">
                        {stats.totalDuration}
                      </div>
                      <div className="text-xs text-gray-500">Total Time</div>
                    </div>
                    <div className="transform transition-transform duration-300 hover:scale-110">
                      <div className="text-2xl font-black text-purple-400">
                        {stats.weekProgress}/{stats.totalWeeks}
                      </div>
                      <div className="text-xs text-gray-500">Weeks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Milestones */}
              <div
                ref={roadmapRef}
                className={`bg-gray-900 rounded-xl border border-gray-800 p-6 transform transition-all duration-700 ease-out hover:shadow-lg hover:shadow-blue-500/20 ${
                  roadmapVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                <h3 className="font-black text-lg mb-4 flex items-center gap-2 bg-linear-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  <Icon name="Calendar" className="w-5 h-5 text-purple-500" />
                  Course Roadmap
                </h3>
                <div className="space-y-4">
                  {weeklyMilestones.map((milestone, index) => (
                    <div
                      key={milestone.week}
                      className={`border-l-4 pl-4 py-2 transform transition-all duration-500 hover:scale-105 ${
                        milestone.status === "completed"
                          ? "border-green-500"
                          : milestone.status === "in-progress"
                            ? "border-purple-500"
                            : "border-gray-700"
                      } ${
                        roadmapVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-bold">
                          Week {milestone.week}
                        </div>
                        {milestone.status === "completed" && (
                          <Icon
                            name="CheckCircle"
                            className="w-4 h-4 text-green-500 transform transition-transform duration-300 hover:scale-110"
                          />
                        )}
                        {milestone.status === "locked" && (
                          <Icon name="Lock" className="w-4 h-4 text-gray-600" />
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
              <div
                ref={achievementCardRef}
                className={`bg-linear-to-br from-purple-600/50 to-blue-600/50 rounded-xl p-6 relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 ${
                  achievementCardVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Award" className="w-8 h-8 text-yellow-300" />
                    <h3 className="font-black text-lg">Keep it going!</h3>
                  </div>
                  <p className="text-sm text-white opacity-90 mb-4">
                    You&apos;re {progressPercentage}% through the course.
                    Complete 3 more lessons to unlock a badge!
                  </p>
                  <div className="flex items-center gap-2 text-sm transform transition-transform duration-300 hover:scale-110">
                    <Icon name="Target" className="w-4 h-4" />
                    <span className="font-bold">Next: Physics Master</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
