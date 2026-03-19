"use client";

import { useState, useEffect, useRef } from "react";
import { BookOpen, Code, MessageCircle, Award, Rocket, Clock, Calendar, Trophy, Users, ChevronRight } from "lucide-react";
import Icon from "../../components/icons";
import { WelcomeBanner } from "../../components/WelcomeBanner";
import { StatsCard } from "../../components/StatsCard";
import { LessonCard } from "../../components/LessonCard";
import { LiveClassCard } from "../../components/LiveClassCard";
import { AchievementOver } from "../../components/AchievementOver";
import { CommunityActivityItem } from "../../components/CommunityActivityItem";
import { 
  UPCOMING_CLASSES, 
  CURRENT_WEEK_LESSONS, 
  ACHIEVEMENTS, 
  COMMUNITY_ACTIVITY 
} from "../../../lib/home-data";
import { useRouter } from "next/navigation";

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
  
  const [statsVisible, setStatsVisible] = useState(false);
  const [learningVisible, setLearningVisible] = useState(false);
  const [liveClassesVisible, setLiveClassesVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [communityVisible, setCommunityVisible] = useState(false);
  const [quickLinksVisible, setQuickLinksVisible] = useState(false);

  useEffect(() => {
    // Trigger initial animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    // Setup scroll observers for section animations
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
    
    const cleanupStats = setupScrollObserver(statsRef, setStatsVisible);
    const cleanupLearning = setupScrollObserver(learningRef, setLearningVisible);
    const cleanupLiveClasses = setupScrollObserver(liveClassesRef, setLiveClassesVisible);
    const cleanupAchievements = setupScrollObserver(achievementsRef, setAchievementsVisible);
    const cleanupCommunity = setupScrollObserver(communityRef, setCommunityVisible);
    const cleanupQuickLinks = setupScrollObserver(quickLinksRef, setQuickLinksVisible);
    
    return () => {
      cleanupStats?.();
      cleanupLearning?.();
      cleanupLiveClasses?.();
      cleanupAchievements?.();
      cleanupCommunity?.();
      cleanupQuickLinks?.();
    };
  }, []);

  return (
    <div className="flex w-full bg-black">
      {/* Content Area */}
      <div className="p-6 min-h-screen overflow-scroll">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <WelcomeBanner />
        </div>

        {/* Stats Grid */}
        <div 
          ref={statsRef}
          className="grid md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { icon: BookOpen, value: "12/150", label: "Lessons Completed", color: "text-blue-400", progress: { current: 12, total: 150 } },
            { icon: Code, value: "7 Days", label: "Current Streak", color: "text-orange-400", subtitle: "🔥 Keep it going!" },
            { icon: Award, value: "3/5", label: "Games Built", color: "text-green-400", subtitle: "✓ 2D Platformer complete" },
            { icon: MessageCircle, value: "69%", label: "Completion Rate", color: "text-purple-400", subtitle: "Above average!" }
          ].map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                statsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <StatsCard 
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                progress={stat.progress}
                subtitle={stat.subtitle}
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
                learningVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <Icon name="Rocket" className="size-6 text-purple-400 animate-pulse" />
                  Continue Learning
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-linear-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/50 mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-purple-400 text-sm font-medium mb-1">
                        LESSON 4 • WEEK 2
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                        Introduction to Physics
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        Learn how Unity's physics engine works and apply forces
                        to objects
                      </p>
                    </div>
                    <div className="shrink-0 ml-4">
                      <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Icon name="Play" className="size-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-110">
                      <Icon name="Clock" className="size-4" />
                      <span>20 min</span>
                    </div>
                    <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-110">
                      <Icon name="Code" className="size-4" />
                      <span>Coding Exercise</span>
                    </div>
                  </div>
                  <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold mt-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                    Continue Lesson
                  </button>
                </div>

                {/* Week Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">
                      Week 2: Foundation Phase
                    </h3>
                    <span className="text-sm text-gray-400">
                      3 of 6 completed
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: learningVisible ? "50%" : "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-3">
                  {CURRENT_WEEK_LESSONS.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`transform transition-all duration-700 ease-out ${
                        learningVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
            <div 
              ref={liveClassesRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                liveClassesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  <Icon name="Calendar" className="size-6 text-pink-400 animate-pulse" />
                  Upcoming Live Classes
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {UPCOMING_CLASSES.map((cls, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-700 ease-out ${
                      liveClassesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <LiveClassCard class={cls} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Community & Achievements */}
          <div className="space-y-6">
            {/* Achievements */}
            <div 
              ref={achievementsRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                achievementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  <Icon name="Trophy" className="size-5 text-yellow-400 animate-pulse" />
                  Achievements
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {ACHIEVEMENTS.slice(0, 5).map((achievement, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 ease-out ${
                        achievementsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <AchievementOver overachievement={achievement} />
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  View All Achievements
                </button>
              </div>
            </div>

            {/* Community Activity */}
            <div 
              ref={communityRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden transform transition-all duration-700 ease-out ${
                communityVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  <Icon name="Users" className="size-5 text-green-400 animate-pulse" />
                  Community Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {COMMUNITY_ACTIVITY.map((activity, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 ease-out ${
                        communityVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-bold mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                >
                  <Icon name="MessageCircle" className="size-4" />
                  Join Discord Community
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div 
              ref={quickLinksRef}
              className={`bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-6 transform transition-all duration-700 ease-out ${
                quickLinksVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Quick Links</h2>
              <div className="space-y-2">
                {[
                  {
                    icon: BookOpen,
                    label: "Course Curriculum",
                    color: "text-blue-400",
                  },
                  {
                    icon: Code,
                    label: "Code Challenges",
                    color: "text-green-400",
                  },
                  {
                    icon: MessageCircle,
                    label: "Ask a Question",
                    color: "text-purple-400",
                  },
                  {
                    icon: Award,
                    label: "Certificates",
                    color: "text-yellow-400",
                  },
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (link.label === "Ask a Question") {
                        router.push("/feedback");
                      }
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg ${
                      quickLinksVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <link.icon className={`w-5 h-5 ${link.color} transform transition-transform duration-300 hover:scale-110`} />
                    <span className="font-medium">{link.label}</span>
                    <Icon
                      name="ChevronRight"
                      className="w-4 h-4 ml-auto text-gray-400 transform transition-transform duration-300 hover:translate-x-1"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
