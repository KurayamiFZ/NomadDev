"use client";

import { useState, useEffect, useRef } from "react";
import { BookOpen, Code, MessageCircle, Award } from "lucide-react";
import Icon from "../../components/icons";
import { WelcomeBanner } from "../../components/WelcomeBanner";
import { StatsCard } from "../../components/StatsCard";
import { LessonCard } from "../../components/LessonCard";
import { LiveClassCard } from "../../components/LiveClassCard";
import { AchievementOver } from "../../components/AchievementOver";
import { CommunityActivityItem } from "../../components/CommunityActivityItem";
import { QuickActions } from "../../components/QuickActions";
import {
  UPCOMING_CLASSES,
  CURRENT_WEEK_LESSONS,
  ACHIEVEMENTS,
  COMMUNITY_ACTIVITY,
} from "../../../lib/home-data";
import { useRouter } from "next/navigation";
import { fetchMostRecentInProgress, InProgressCourse } from "@/lib/progress";
import { getUserStats, UserStats } from "@/lib/xp";
import { getLevelProgress, getRankTitle } from "@/lib/level-system";
import { supabase } from "@/lib/supabaseclient";

export default function Overview() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Refs for scroll-triggered animations
  const statsRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);
  const liveClassesRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);

  const [achievements, setAchievements] = useState<any[]>([]);
  const [continueLesson, setContinueLesson] = useState<InProgressCourse | null>(
    null,
  );
  const [userStats, setUserStats] = useState<UserStats>({
    xp: 0,
    level: 1,
    streak_count: 0,
    last_active_date: null,
  });
  const [courseStats, setCourseStats] = useState({ completed: 0, total: 0 });
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(
    null,
  );
  const [statsVisible, setStatsVisible] = useState(false);
  const [learningVisible, setLearningVisible] = useState(false);
  const [liveClassesVisible, setLiveClassesVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [communityVisible, setCommunityVisible] = useState(false);
  const [quickLinksVisible, setQuickLinksVisible] = useState(false);

  useEffect(() => {
    async function fetchAchievements() {
      const { data, error } = await supabase.from("achievement").select("*");

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      console.log("All achievements:", data);
      console.log("Achievement sample:", data?.[0]);

      // Try different ways to filter unlocked achievements
      let unlockedAchievements = [];

      // Method 1: Check if unlocked is boolean true
      unlockedAchievements = data?.filter((a) => a.unlocked === true) || [];
      console.log("Method 1 (unlocked === true):", unlockedAchievements.length);

      if (unlockedAchievements.length === 0) {
        // Method 2: Check if unlocked is truthy
        unlockedAchievements = data?.filter((a) => a.unlocked) || [];
        console.log("Method 2 (truthy unlocked):", unlockedAchievements.length);
      }

      if (unlockedAchievements.length === 0) {
        // Method 3: Check if unlocked is number 1
        unlockedAchievements = data?.filter((a) => a.unlocked === 1) || [];
        console.log("Method 3 (unlocked === 1):", unlockedAchievements.length);
      }

      if (unlockedAchievements.length === 0) {
        // Method 4: Check if unlocked is string "true"
        unlockedAchievements = data?.filter((a) => a.unlocked === "true") || [];
        console.log(
          "Method 4 (unlocked === 'true'):",
          unlockedAchievements.length,
        );
      }

      // Sort by most recent (try different date fields)
      const sortedAchievements = unlockedAchievements.sort((a, b) => {
        // Try created_at first
        if (a.created_at && b.created_at) {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
        // Try updated_at
        if (a.updated_at && b.updated_at) {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
        // Fallback to ID (assuming higher IDs are more recent)
        return (b.id || 0) - (a.id || 0);
      });

      const recentAchievements = sortedAchievements.slice(0, 5);
      console.log("Final recent unlocked achievements:", recentAchievements);

      setAchievements(recentAchievements);
    }

    fetchAchievements();
    fetchMostRecentInProgress().then(setContinueLesson);
    getUserStats().then((s) => {
      if (s) setUserStats(s);
    });

    // Fetch course completion stats
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: rows } = await supabase
        .from("user_course_progress")
        .select("status")
        .eq("user_id", user.id);
      const { count: totalCount } = await supabase
        .from("videos")
        .select("*", { count: "exact", head: true });
      const completed =
        rows?.filter((r) => r.status === "completed").length ?? 0;
      const total = totalCount ?? 0;
      setCourseStats({ completed, total });
    })();

    // Trigger stats animation after a short delay
    setTimeout(() => setStatsVisible(true), 300);

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

    const cleanupAchievements = setupScrollObserver(
      achievementsRef,
      setAchievementsVisible,
    );

    return () => {
      cleanupAchievements?.();
    };
  }, []);

  useEffect(() => {
    // Trigger initial animations after component mounts
    setTimeout(() => setIsVisible(true), 100);

    // Setup scroll observers for section animations
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

    const cleanupStats = setupScrollObserver(statsRef, setStatsVisible);
    const cleanupLearning = setupScrollObserver(
      learningRef,
      setLearningVisible,
    );
    const cleanupLiveClasses = setupScrollObserver(
      liveClassesRef,
      setLiveClassesVisible,
    );
    const cleanupAchievements = setupScrollObserver(
      achievementsRef,
      setAchievementsVisible,
    );
    const cleanupCommunity = setupScrollObserver(
      communityRef,
      setCommunityVisible,
    );
    const cleanupQuickLinks = setupScrollObserver(
      quickLinksRef,
      setQuickLinksVisible,
    );

    return () => {
      cleanupStats?.();
      cleanupLearning?.();
      cleanupLiveClasses?.();
      cleanupAchievements?.();
      cleanupCommunity?.();
      cleanupQuickLinks?.();
    };
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const totalxp = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + (a.xp || a.xpReward || 0), 0);

  return (
    <div className="flex w-full bg-black">
      {/* Content Area */}
      <div className="p-6 min-h-screen overflow-scroll">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <WelcomeBanner />
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: BookOpen,
              value: `${courseStats.completed}/${courseStats.total}`,
              label: "Дууссан хичээлүүд",
              color: "text-purple-400",
              progress: {
                current: courseStats.completed,
                total: Math.max(courseStats.total, 1),
              },
            },
            {
              icon: Code,
              value: `${userStats.streak_count} Өдөр`,
              label: "Тасралтгүй суралцсан хоног",
              color: "text-orange-400",
              progress: {
                current: Math.min(userStats.streak_count, 7),
                total: 7,
              },
            },
            {
              icon: Award,
              value: `Lv.${userStats.level}`,
              label: getRankTitle(userStats.level),
              color: "text-yellow-400",
              progress: {
                current: getLevelProgress(userStats.xp).progressXP,
                total: Math.max(
                  getLevelProgress(userStats.xp).xpToNextLevel,
                  1,
                ),
              },
            },
            {
              icon: MessageCircle,
              value: `${userStats.xp} XP`,
              label: "Нийт туршлагын оноо",
              color: "text-purple-400",
              progress: {
                current: courseStats.completed,
                total: Math.max(courseStats.total, 1),
              },
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                statsVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <StatsCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                progress={stat.progress}
              />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Where You Left Off */}
            <div
              ref={learningRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                learningVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  <Icon name="Rocket" className="size-6 text-purple-500" />
                  Үргэлжүүлэх
                </h2>
              </div>
              <div className="p-6">
                {continueLesson?.videos ? (
                  /* ── Continue Watching card ── */
                  <div
                    onClick={() =>
                      router.push(`/home/lessons/${continueLesson.videos!.id}`)
                    }
                    className="bg-linear-to-r from-purple-950/60 to-pink-950/60 rounded-xl p-6 border border-purple-600/40 mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/15 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        {continueLesson.videos.category && (
                          <div className="text-purple-500 text-sm font-medium mb-1 uppercase tracking-wide">
                            {continueLesson.videos.category}
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                          {continueLesson.videos.title}
                        </h3>
                        {continueLesson.videos.description && (
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                            {continueLesson.videos.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 ml-4">
                        <div className="w-16 h-16 bg-linear-to-br from-purple-500/60 to-pink-500/60 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                          <Icon name="Play" className="size-8 text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Явц</span>
                        <span className="font-bold text-purple-300">
                          {continueLesson.progress_percent}%
                        </span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: learningVisible
                              ? `${continueLesson.progress_percent}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                    <button className="w-full bg-linear-to-r from-purple-600/40 to-pink-600/40 text-white py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                      Хичээлийг үргэлжүүл
                    </button>
                  </div>
                ) : (
                  /* ── Start Learning card (no in-progress course) ── */
                  <div
                    onClick={() => router.push("/home/lessons")}
                    className="bg-linear-to-r from-purple-950/60 to-pink-950/60 rounded-xl p-6 border border-purple-600/40 mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/15 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-purple-500 text-sm font-medium mb-1">
                          ЭХЛЭХ ЦАГ БОЛСОН
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                          Суралцаж эхлэх
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                          Байгаа хичээлүүдэс өөрт тохирох хичээлээ сонгоорой
                        </p>
                      </div>
                      <div className="shrink-0 ml-4">
                        <div className="w-16 h-16 bg-linear-to-br from-purple-500/60 to-pink-500/60 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                          <Icon name="Play" className="size-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-linear-to-r from-purple-600/40 to-pink-600/40 text-white py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                      Үргэлжүүлэх
                    </button>
                  </div>
                )}

                {/* Lessons List */}
                <div className="space-y-3">
                  {CURRENT_WEEK_LESSONS.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`transform transition-all duration-700 ease-out ${
                        learningVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <LessonCard lesson={lesson} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Classes */}
            {/* <div
              ref={liveClassesRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                liveClassesVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2 bg-linear-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  <Icon name="Calendar" className="size-6 text-pink-500" />
                  Upcoming Live Classes
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {UPCOMING_CLASSES.map((cls, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-700 ease-out ${
                      liveClassesVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <LiveClassCard class={cls} />
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right Column - Community & Achievements */}
          <div className="space-y-6">
            {/* Achievements */}
            <div
              ref={achievementsRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                achievementsVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  <Icon name="Trophy" className="size-5 text-yellow-400" />
                  Амжилтууд
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {achievements
                    .filter((achievement) => achievement.unlocked)
                    .slice(0, 5)
                    .map((achievement) => (
                      <AchievementOver
                        key={achievement.id}
                        overachievement={{
                          ...achievement,
                          icon: achievement.icon || <Icon name="Trophy" />,
                          rarity: achievement.tier,
                          xpReward: achievement.xp || achievement.xpReward || 0,
                        }}
                        onClick={() =>
                          setExpandedAchievement(
                            expandedAchievement === achievement.id
                              ? null
                              : achievement.id,
                          )
                        }
                        expanded={expandedAchievement === achievement.id}
                        onExpand={() =>
                          setExpandedAchievement(
                            expandedAchievement === achievement.id
                              ? null
                              : achievement.id,
                          )
                        }
                      />
                    ))}
                </div>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Бүх амжилтыг харах
                </button>
              </div>
            </div>

            {/* Community Activity */}
            <div
              ref={communityRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                communityVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <Icon name="Users" className="size-5 text-purple-400" />
                  Community
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {COMMUNITY_ACTIVITY.map((activity, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 ease-out ${
                        communityVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <CommunityActivityItem activity={activity} />
                    </div>
                  ))}
                </div>
                <a
                  href="https://discord.gg/wrRfkUydxQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-linear-to-r from-purple-900 to-pink-900 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-bold mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                >
                  <Icon name="MessageCircle" className="size-4" />
                  Discord-д нэгдэх
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              ref={quickLinksRef}
              className={`transform transition-all duration-700 ease-out ${
                quickLinksVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
