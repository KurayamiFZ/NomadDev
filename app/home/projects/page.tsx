// Client-side component for displaying course lessons - Enhanced Version
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/app/components/icons";
import {
  getLevelFromXP,
  getRankTitle,
  getLevelProgress,
} from "../../../lib/level-system";
import { getUserStats } from "../../../lib/xp";
import { supabase } from "../../../lib/supabaseclient";
import { useAuth } from "../../components/AuthProvider";
import { QuickActions } from "../../components/QuickActions";

// Main component for the lessons page
export default function LessonsEnhanced() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState("main");

  const [userStats, setUserStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    totalxp: 0,
    currentLevel: 1,
    nextLevelxp: 100,
    currentStreak: 0,
    rank: "Эхлэгч",
    percentile: 0,
  });
  const [leaderboard, setLeaderboard] = useState<{ xp: number; level: number; user_id: string }[]>([]);

  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [pathsVisible, setPathsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [userStatsVisible, setStatsVisible] = useState(false);

  // Refs for scroll-triggered animations
  const headerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const userStatsRef = useRef<HTMLDivElement>(null);

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

    const cleanupHeader = setupScrollObserver(headerRef, setHeaderVisible);
    const cleanupPaths = setupScrollObserver(pathsRef, setPathsVisible);
    const cleanupProjects = setupScrollObserver(
      projectsRef,
      setProjectsVisible,
    );
    const cleanupStats = setupScrollObserver(userStatsRef, setStatsVisible);

    return () => {
      cleanupHeader?.();
      cleanupPaths?.();
      cleanupProjects?.();
      cleanupStats?.();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        // Fetch XP/level/streak from user_stats
        const stats = await getUserStats(user!.id);
        if (stats) {
          const lp = getLevelProgress(stats.xp);
          setUserStats((prev) => ({
            ...prev,
            totalxp: stats.xp,
            currentLevel: stats.level,
            nextLevelxp: lp.nextLevelXP,
            currentStreak: stats.streak_count,
            rank: getRankTitle(stats.level),
          }));
        }

        // Fetch courses + merge progress for this user
        const [lessonsRes, { data: progressRows }] = await Promise.all([
          fetch("/api/lessons").then((r) => r.json()),
          supabase
            .from("user_course_progress")
            .select("course_id, status")
            .eq("user_id", user!.id),
        ]);

        if (lessonsRes.success) {
          const raw: any[] = lessonsRes.data;
          const progressMap: Record<string, string> = {};
          for (const row of progressRows ?? []) progressMap[row.course_id] = row.status;
          const completed = raw.filter((l) => progressMap[l.id] === "completed").length;
          setUserStats((prev) => ({
            ...prev,
            totalLessons: raw.length,
            completedLessons: completed,
          }));
          setCurrentWeekLessons(
            raw.map((l) => ({
              ...l,
              completed: progressMap[l.id] === "completed",
              current: progressMap[l.id] === "in-progress",
              locked: !progressMap[l.id] && false,
              thumbnail: "bg-linear-to-br from-purple-900/60 to-pink-900/60",
              xp: 50,
              skillPoints: 10,
              difficulty: "Дунд",
              completionRate: 0,
              isBoss: false,
            }))
          );
        }

        // Leaderboard — top 5 users by XP (requires SELECT policy on user_stats for all)
        const { data: top } = await supabase
          .from("user_stats")
          .select("user_id, xp, level")
          .order("xp", { ascending: false })
          .limit(5);
        if (top) setLeaderboard(top);
      } catch (err) {
        console.error("[projects]", err);
      }
    }

    load();
  }, [user]);

  const [currentWeekLessons, setCurrentWeekLessons] = useState<any[]>([]);
  const learningPaths: any[] = [];
  const activePowerUps: any[] = [];
  const skillTree: any[] = [];

  const filters = ["all", "in-progress", "completed", "locked"];
  const progressPercentage =
    userStats.totalLessons > 0
      ? Math.round((userStats.completedLessons / userStats.totalLessons) * 100)
      : 0;
  const levelProgress = Math.round(
    getLevelProgress(userStats.totalxp).progressPercentage,
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className={`top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 transform transition-all duration-1000 ease-out ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Icon
                name="Search"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transform transition-transform duration-300 hover:scale-110"
              />
              <input
                type="text"
                placeholder="Хичээл, ур чадвар, амжилт хайх..."
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
                    <Icon name="Crown" className="w-5 h-5 text-yellow-400" />
                    <span className="font-black text-lg bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      Түвшин {userStats.currentLevel}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <Icon name="Sparkles" className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-purple-400">
                      {userStats.totalxp.toLocaleString()} xp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Hero Section - Completely Redesigned */}
        <div className="relative mb-8">
          {/* Main Progress Card */}
          <div className="bg-stone-800/60 border border-stone-700 rounded-3xl p-1 shadow-2xl shadow-purple-500/20">
            <div className="bg-black/50 backdrop-blur-xl rounded-[22px] p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl">
                      <Icon name="Rocket" className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-black bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Unity Эзэмшилтийн Аялал
                      </h1>
                      <p className="text-purple-300 text-lg">
                        {userStats.rank} — Түвшин {userStats.currentLevel}
                      </p>
                    </div>
                  </div>

                  {/* Multi-Progress Bars */}
                  <div className="space-y-3 mt-6 max-w-2xl">
                    {/* Course Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Курсын явц</span>
                        <span className="font-bold text-purple-300">
                          {userStats.completedLessons}/{userStats.totalLessons}{" "}
                          Хичээл
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 relative"
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20"></div>
                        </div>
                      </div>
                    </div>

                    {/* Level Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">
                          Түвшин {userStats.currentLevel} →{" "}
                          {userStats.currentLevel + 1}
                        </span>
                        <span className="font-bold text-yellow-300">
                          {userStats.totalxp.toLocaleString()}/
                          {userStats.nextLevelxp.toLocaleString()} xp
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="h-full bg-linear-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000 relative"
                          style={{ width: `${levelProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20"></div>
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
                      <div className="text-sm text-gray-400">Дуусгасан</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                    <Icon name="Trophy" className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold">
                      Шилдэг {userStats.percentile}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Power-Ups */}
          <div className="flex gap-3 mt-4">
            {activePowerUps.length === 0 ? (
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-gray-400 text-sm">Идэвхтэй хүчлэгдэгч алга</div>
              </div>
            ) : (
              activePowerUps.map((powerUp, i) => (
                <div
                  key={i}
                  className="flex-1 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 bg-${powerUp.color}-500/20 rounded-xl border border-${powerUp.color}-500/30`}
                    >
                      {powerUp.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{powerUp.name}</div>
                      <div className="text-xs text-gray-400">
                        {powerUp.timeLeft}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Learning Path Selector - New Feature */}
        <div
          ref={pathsRef}
          className={`mb-8 transform transition-all duration-700 ease-out ${
            pathsVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-xl font-black mb-4 flex items-center gap-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Icon name="Layers" className="w-6 h-6 text-purple-400" />
            Замаа сонго
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {learningPaths.length === 0 ? (
              <div className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-gray-400">Суралцах зам одоохондоо байхгүй</div>
              </div>
            ) : (
              learningPaths.map((path, index) => (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path.id)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                    selectedPath === path.id
                      ? "bg-linear-to-br from-purple-500/20 to-pink-500/20 border-purple-500 shadow-lg shadow-purple-500/30"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10"
                  } ${
                    pathsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {path.icon}
                    <div className="text-left">
                      <div className="font-black text-lg group-hover:text-white transition-colors duration-300">
                        {path.name}
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {path.id === "main" && "Үндсэн хөтөлбөр"}
                        {path.id === "advanced" && "Өөрийгээ сорь"}
                        {path.id === "projects" && "Практик дадлага"}
                      </div>
                    </div>
                  </div>
                  {selectedPath === path.id && (
                    <div className="absolute top-2 right-2">
                      <Icon
                        name="CheckCircle"
                        className="w-5 h-5 text-purple-400"
                      />
                    </div>
                  )}
                </button>
              ))
            )}
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
              {filter === "all" && "Бүх хичээлүүд"}
              {filter === "in-progress" && "Явагдаж байна"}
              {filter === "completed" && "Дууссан"}
              {filter === "locked" && "Дараачийн"}
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
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-purple-400 font-black text-sm uppercase tracking-wider">
                          Даалгавраа үргэлжүүл
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
                          <Icon
                            name="Clock"
                            className="w-4 h-4 text-blue-400"
                          />
                          <span className="text-sm">
                            {
                              currentWeekLessons.find((l) => l.current)
                                ?.duration
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                          <Icon
                            name="Sparkles"
                            className="w-4 h-4 text-yellow-400"
                          />
                          <span className="text-sm">
                            +{currentWeekLessons.find((l) => l.current)?.xp} xp
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                          <Icon
                            name="Gem"
                            className="w-4 h-4 text-purple-400"
                          />
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
                          <Icon
                            name="Target"
                            className="w-4 h-4 text-purple-400"
                          />
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
                      <Icon
                        name="Play"
                        className="w-6 h-6 group-hover:scale-110 transition"
                      />
                      ХИЧЭЭЛ ЭХЛЭХ
                      <Icon
                        name="ChevronRight"
                        className="w-5 h-5 group-hover:translate-x-1 transition"
                      />
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Lessons Grid - Card Style */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Энэ долоо хоногийн хичээлүүд</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon name="BarChart3" className="w-4 h-4" />
                  <span>
                    {currentWeekLessons.filter((l) => l.completed).length}/
                    {currentWeekLessons.length} Дууссан
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentWeekLessons.length === 0 ? (
                  <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                    <Icon name="BookOpen" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-400 text-lg mb-2">Хичээл одоохондоо байхгүй</div>
                    <div className="text-gray-500 text-sm">Шинэ агуулгыг дараа шалгаарай</div>
                  </div>
                ) : (
                  currentWeekLessons.map((lesson) => (
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
                              <Icon name="CheckCircle" className="w-4 h-4" />
                              <span className="text-xs font-bold">Дууссан</span>
                            </div>
                          ) : lesson.current ? (
                            <div className="flex items-center gap-2 bg-purple-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                              <Icon name="Play" className="w-4 h-4" />
                              <span className="text-xs font-bold">
                                Явагдаж байна
                              </span>
                            </div>
                          ) : lesson.locked ? (
                            <div className="flex items-center gap-2 bg-gray-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                              <Icon name="Lock" className="w-4 h-4" />
                              <span className="text-xs font-bold">Түгжигдсэн</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-blue-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                              <Icon name="Target" className="w-4 h-4" />
                              <span className="text-xs font-bold">Боломжтой</span>
                            </div>
                          )}
                        </div>

                        {/* Boss Battle Badge */}
                        {lesson.isBoss && (
                          <div className="absolute top-3 right-3">
                            <div className="flex items-center gap-1 bg-red-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                              <Icon name="Flame" className="w-4 h-4" />
                              <span className="text-xs font-bold">BOSS</span>
                            </div>
                          </div>
                        )}

                        {/* Completion Rate */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm text-xs">
                          <Icon name="Users" className="w-3 h-3" />
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
                              <Icon name="Clock" className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400">
                              {lesson.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                              <Icon name="Sparkles" className="w-3 h-3" />+
                              {lesson.xp}
                            </div>
                            <div className="flex items-center gap-1 text-purple-400 font-bold">
                              <Icon name="Gem" className="w-3 h-3" />+
                              {lesson.skillPoints}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Daily Challenges */}
            {/* <div className="bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Icon name="Flame" className="w-6 h-6 text-orange-400" />
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
                {dailyChallenges.length === 0 ? (
                  <div className="bg-black/30 rounded-xl border border-white/10 p-6 text-center">
                    <Icon name="Flame" className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <div className="text-gray-400">No daily challenges available</div>
                    <div className="text-gray-500 text-sm mt-1">Check back tomorrow</div>
                  </div>
                ) : (
                  dailyChallenges.map((challenge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/10"
                    >
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        {challenge.icon}
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
                  ))
                )}
              </div>
            </div> */}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Skill Tree */}
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Icon name="Cpu" className="w-5 h-5 text-cyan-400" />
                  Ур чадварын модон
                </h3>
                <div className="space-y-4">
                  {skillTree.length === 0 ? (
                    <div className="bg-black/30 rounded-xl border border-white/10 p-6 text-center">
                      <Icon name="Cpu" className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <div className="text-gray-400">Ур чадвар одоохондоо байхгүй</div>
                      <div className="text-gray-500 text-sm mt-1">Ур чадвар нээхийн тулд хичээл дуусгаарай</div>
                    </div>
                  ) : (
                    skillTree.map((skill, i) => (
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
                    ))
                  )}
                </div>
                <button className="w-full mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 py-3 rounded-xl font-bold transition">
                  Ур чадвар нээх
                </button>
              </div>

              {/* Leaderboard Preview */}
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Icon name="Trophy" className="w-5 h-5 text-yellow-400" />
                  Тэргүүний жагсаалт
                </h3>
                {leaderboard.length === 0 ? (
                  <div className="bg-black/30 rounded-xl border border-white/10 p-6 text-center">
                    <Icon name="Trophy" className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <div className="text-gray-400">Мэдээлэл байхгүй</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.map((entry, i) => (
                      <div key={entry.user_id} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
                        entry.user_id === user?.id ? "bg-purple-500/20 border border-purple-500/30" : "bg-black/20"
                      }`}>
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-black ${
                          i === 0 ? "bg-yellow-500 text-black" :
                          i === 1 ? "bg-gray-400 text-black" :
                          i === 2 ? "bg-orange-600 text-white" : "bg-white/10 text-gray-400"
                        }`}>{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-400 truncate">
                            {entry.user_id === user?.id ? "Та" : `Lv.${entry.level}`}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-300">{entry.xp.toLocaleString()} xp</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Study Streak */}
              <div className="bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6">
                {userStats.currentStreak > 0 ? (
                  <div className="text-center">
                    <Icon name="Flame" className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                    <div className="text-4xl font-black text-orange-400 mb-1">{userStats.currentStreak}</div>
                    <div className="text-white font-bold mb-1">Өдрийн цуваал</div>
                    <div className="text-gray-400 text-sm">Маргааш хичээл хийгээрэй!</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Icon name="Flame" className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <div className="text-gray-400">Суралцах цуваал үүсгээгүй байна</div>
                    <div className="text-gray-500 text-sm mt-1">Цуваал байгуулахын тулд өдөр бүр хичээл дуусгаарай</div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <QuickActions variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
