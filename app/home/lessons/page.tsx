"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/app/components/icons";
import { supabase } from "@/lib/supabaseclient";

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  video_url: string | null;
  thumbnail_url: string | null;
  progressPercent: number;
  completed: boolean;
  updatedAt: string | null;
}

const FILTERS = ["all", "in-progress", "completed", "locked"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_LABELS: Record<Filter, string> = {
  all: "Бүх хичээлүүд",
  "in-progress": "Явагдаж байна",
  completed: "Дууссан",
  locked: "Эхлээгүй",
};

export default function Lessons() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  // Animation states — sidebar ones forced true after data loads
  const [bannerVisible, setBannerVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [lessonsVisible, setLessonsVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [achievementCardVisible, setAchievementCardVisible] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const achievementCardRef = useRef<HTMLDivElement>(null);

  // Scroll observers for always-visible elements
  useEffect(() => {
    const observe = (
      ref: React.RefObject<HTMLDivElement | null>,
      set: (v: boolean) => void,
    ) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) set(true); },
        { threshold: 0.1 },
      );
      obs.observe(ref.current);
      return () => obs.disconnect();
    };
    const cleanups = [
      observe(bannerRef, setBannerVisible),
      observe(filtersRef, setFiltersVisible),
    ];
    return () => cleanups.forEach((c) => c?.());
  }, []);

  // Fetch lessons + merge real user progress
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [lessonsRes, { data: { user } }] = await Promise.all([
          fetch("/api/lessons").then((r) => r.json()),
          supabase.auth.getUser(),
        ]);

        if (!lessonsRes.success) throw new Error(lessonsRes.error);
        const raw: any[] = lessonsRes.data;

        let progressMap: Record<string, any> = {};
        if (user) {
          const { data: rows } = await supabase
            .from("user_course_progress")
            .select("course_id, progress_percent, status, updated_at")
            .eq("user_id", user.id);
          for (const row of rows ?? []) progressMap[row.course_id] = row;
        }

        const merged: Lesson[] = raw.map((l) => {
          const p = progressMap[l.id];
          return {
            id: l.id,
            title: l.title,
            description: l.description ?? "",
            category: l.category ?? "",
            video_url: l.video_url ?? null,
            thumbnail_url: l.thumbnail_url ?? null,
            progressPercent: p?.progress_percent ?? 0,
            completed: p?.status === "completed",
            updatedAt: p?.updated_at ?? null,
          };
        });

        setLessons(merged);
        // Force-show: sidebar refs are null while loading due to {!loading &&}
        setLessonsVisible(true);
        setProgressVisible(true);
        setRoadmapVisible(true);
        setAchievementCardVisible(true);
      } catch (err) {
        console.error("[lessons]", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Most recently watched in-progress lesson → hero card
  const currentLesson = useMemo(
    () =>
      lessons
        .filter((l) => l.progressPercent > 0 && !l.completed)
        .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))[0] ??
      null,
    [lessons],
  );

  // Derived stats
  const completedCount = useMemo(
    () => lessons.filter((l) => l.completed).length,
    [lessons],
  );
  const totalCount = lessons.length;
  const overallPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtered + searched list
  const filteredLessons = useMemo(() => {
    let list = lessons;
    if (selectedFilter === "completed") list = list.filter((l) => l.completed);
    else if (selectedFilter === "in-progress")
      list = list.filter((l) => l.progressPercent > 0 && !l.completed);
    else if (selectedFilter === "locked")
      list = list.filter((l) => l.progressPercent === 0 && !l.completed);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [lessons, selectedFilter, searchQuery]);

  // Weekly milestones split into 4 groups
  const weeklyMilestones = useMemo(() => {
    if (!lessons.length) return [];
    const perWeek = Math.ceil(lessons.length / 4);
    return Array.from({ length: 4 }, (_, i) => {
      const week = lessons.slice(i * perWeek, (i + 1) * perWeek);
      if (!week.length) return null;
      const done = week.filter((l) => l.completed).length;
      const hasProgress = week.some((l) => l.progressPercent > 0 && !l.completed);
      return {
        week: i + 1,
        lessons: week.length,
        completedLessons: done,
        status:
          done === week.length
            ? "completed"
            : hasProgress
              ? "in-progress"
              : "locked",
      };
    }).filter(Boolean) as { week: number; lessons: number; completedLessons: number; status: string }[];
  }, [lessons]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Search bar */}
      <div className="top-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="relative">
            <Icon
              name="Search"
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Хичээл хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:border-purple-900 focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Progress Banner */}
        <div
          ref={bannerRef}
          className={`border border-stone-700 bg-black/60 rounded-2xl p-8 mb-8 relative overflow-hidden transform transition-all duration-1000 ease-out ${
            bannerVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-black opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black mb-3 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Хичээлийн явц
                </h1>
                <p className="text-white opacity-90 mb-4">
                  {completedCount} / {totalCount} хичээл дууссан
                </p>
                <div className="w-96 bg-white bg-opacity-20 rounded-full h-3 backdrop-blur-sm overflow-hidden">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: bannerVisible ? `${overallPercent}%` : "0%" }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black mb-2 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {overallPercent}%
                </div>
                <div className="text-white opacity-90">Дуусгасан</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          ref={filtersRef}
          className="flex items-center gap-3 mb-8 overflow-x-auto"
        >
          {FILTERS.map((filter, index) => (
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
              {FILTER_LABELS[filter]}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4" />
            <p className="text-gray-400">Хичээлүүдийг татаж байна...</p>
          </div>
        )}

        {!loading && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current lesson hero — most recently watched in-progress */}
              {currentLesson && (
                <div
                  onClick={() => router.push(`/home/lessons/${currentLesson.id}`)}
                  className="bg-linear-to-r from-purple-950/60 to-pink-950/60 rounded-xl p-6 border border-purple-600/40 mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/15 group cursor-pointer"
                >
                  <div className="flex items-end justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      {currentLesson.category && (
                        <div className="text-purple-500 text-sm font-medium mb-1 uppercase tracking-wide">
                          {currentLesson.category}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                        {currentLesson.title}
                      </h3>
                      {currentLesson.description && (
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                          {currentLesson.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 ml-4">
                      <div className="w-16 h-16 bg-linear-to-br from-purple-500/60 to-pink-500/60 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Icon name="Play" className="size-8 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Mini progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Явц</span>
                      <span className="font-bold text-purple-300">{currentLesson.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-700"
                        style={{ width: `${currentLesson.progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <button className="flex items-center justify-center p-4 w-full bg-linear-to-r from-purple-600/40 to-pink-600/40 text-white rounded-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                    ҮРГЭЛЖҮҮЛЭХ
                  </button>
                </div>
              )}

              {/* Lessons list */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Хичээлүүд
                  </h2>
                  <span className="text-sm text-gray-400">
                    {completedCount} / {totalCount} дууссан
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredLessons.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
                        <Icon name="BookOpen" className="w-7 h-7 text-gray-500" />
                      </div>
                      <p className="text-gray-400 font-medium">
                        {searchQuery
                          ? "Хайлтад тохирох хичээл олдсонгүй"
                          : "Одоохондоо хичээл байхгүй байна"}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="mt-3 text-purple-400 text-sm hover:text-purple-300"
                        >
                          Хайлтыг арилгах
                        </button>
                      )}
                    </div>
                  )}

                  {filteredLessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      onClick={() => router.push(`/home/lessons/${lesson.id}`)}
                      className={`flex items-center justify-between p-6 rounded-xl transition-all duration-500 border transform hover:scale-[1.02] cursor-pointer ${
                        lesson.id === currentLesson?.id
                          ? "bg-purple-950/40 border-2 border-purple-600 shadow-lg shadow-purple-600/15"
                          : lesson.completed
                            ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                            : "bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-lg"
                      } ${lessonsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Status icon */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 ${
                            lesson.completed
                              ? "bg-green-800"
                              : lesson.id === currentLesson?.id
                                ? "bg-purple-700"
                                : "bg-gray-700"
                          }`}
                        >
                          {lesson.completed ? (
                            <Icon name="CheckCircle" className="w-6 h-6 text-white" />
                          ) : (
                            <Icon name="Play" className="w-5 h-5 text-white" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3
                              className={`font-bold text-lg truncate transition-colors duration-300 ${
                                lesson.completed ? "text-gray-400" : "text-white hover:text-purple-400"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            {lesson.category && (
                              <span className="px-2 py-0.5 bg-gray-700 rounded text-xs font-medium shrink-0">
                                {lesson.category}
                              </span>
                            )}
                          </div>
                          {lesson.description && (
                            <p className="text-sm text-gray-400 line-clamp-1 mb-2">
                              {lesson.description}
                            </p>
                          )}
                          {/* Per-lesson progress bar */}
                          {lesson.progressPercent > 0 && !lesson.completed && (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                                  style={{ width: `${lesson.progressPercent}%` }}
                                />
                              </div>
                              <span className="text-xs text-purple-400 font-medium shrink-0">
                                {lesson.progressPercent}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right badge */}
                      {lesson.id === currentLesson?.id && (
                        <div className="ml-4 bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold shrink-0">
                          ЯВАГДАЖ БАЙНА
                        </div>
                      )}
                      {lesson.completed && (
                        <span className="ml-4 text-purple-500 text-sm font-medium shrink-0">
                          Давтах
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 self-start">
              <div className="sticky top-24 space-y-6">
                {/* Stats */}
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
                    Таны явц
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Дууссан</span>
                        <span className="font-bold text-purple-500">
                          {completedCount}/{totalCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-purple-700 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: progressVisible ? `${overallPercent}%` : "0%" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                      <div className="hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl font-black text-purple-400">
                          {lessons.filter((l) => l.progressPercent > 0 && !l.completed).length}
                        </div>
                        <div className="text-xs text-gray-500">Явагдаж байна</div>
                      </div>
                      <div className="hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl font-black text-purple-400">
                          {overallPercent}%
                        </div>
                        <div className="text-xs text-gray-500">Нийт явц</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
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
                    Хичээлийн замын зураг
                  </h3>
                  {weeklyMilestones.length === 0 ? (
                    <p className="text-gray-600 text-sm">Хичээл байхгүй байна</p>
                  ) : (
                    <div className="space-y-4">
                      {weeklyMilestones.map((m, i) => (
                        <div
                          key={m.week}
                          className={`border-l-4 pl-4 py-2 transform transition-all duration-500 hover:scale-105 ${
                            m.status === "completed"
                              ? "border-green-500"
                              : m.status === "in-progress"
                                ? "border-purple-500"
                                : "border-gray-700"
                          } ${roadmapVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                          style={{ transitionDelay: `${i * 100}ms` }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-bold">Үе {m.week}</div>
                            {m.status === "completed" && (
                              <Icon name="CheckCircle" className="w-4 h-4 text-green-500" />
                            )}
                            {m.status === "locked" && (
                              <Icon name="Lock" className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {m.completedLessons}/{m.lessons} хичээл
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Achievement nudge */}
                <div
                  ref={achievementCardRef}
                  className={`bg-linear-to-br from-purple-600/50 to-blue-600/50 rounded-xl p-6 relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 ${
                    achievementCardVisible
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                >
                  <div className="absolute inset-0 bg-black opacity-20" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Award" className="w-8 h-8 text-yellow-300" />
                      <h3 className="font-black text-lg">Үргэлжүүлээрэй!</h3>
                    </div>
                    <p className="text-sm text-white opacity-90 mb-4">
                      {completedCount === 0
                        ? "Эхний хичээлээ эхлүүлж амжилтынхаа аялалыг эхлүүлээрэй!"
                        : `Та ${overallPercent}% дуусгасан байна. Гайхалтай явж байна!`}
                    </p>
                    <div
                      className="flex items-center gap-2 text-sm hover:scale-110 transition-transform duration-300 cursor-pointer"
                      onClick={() => router.push("/home/achievements")}
                    >
                      <Icon name="Target" className="w-4 h-4" />
                      <span className="font-bold">Амжилтуудыг харах →</span>
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
