"use client";

import { useRouter } from "next/navigation";

import {
  Play,
  Star,
  Users,
  Award,
  Trophy,
  BookOpen,
  Code,
  Gamepad2,
  CheckCircle,
  Sparkles,
  Clock,
  Target,
  Lock,
  ChevronRight,
  MessageCircle,
  Zap,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Menu,
  X,
  Rocket,
} from "lucide-react";

const upcomingClasses = [
  {
    title: "2D Platformer Physics",
    time: "Today, 6:00 PM",
    instructor: "Alex Chen",
    live: true,
  },
  {
    title: "Character Animation Basics",
    time: "Tomorrow, 6:00 PM",
    instructor: "Sarah Martinez",
    live: false,
  },
  {
    title: "Code Review Session",
    time: "Wed, 7:00 PM",
    instructor: "Alex Chen",
    live: false,
  },
];

const currentWeekLessons = [
  {
    id: 1,
    title: "Understanding Unity Components",
    duration: "12 min",
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: "Creating Your First GameObject",
    duration: "15 min",
    completed: true,
    locked: false,
  },
  {
    id: 3,
    title: "Working with Transforms",
    duration: "18 min",
    completed: true,
    locked: false,
  },
  {
    id: 4,
    title: "Introduction to Physics",
    duration: "20 min",
    completed: false,
    locked: false,
    current: true,
  },
  {
    id: 5,
    title: "Collision Detection",
    duration: "16 min",
    completed: false,
    locked: false,
  },
  {
    id: 6,
    title: "Building Your Platformer",
    duration: "25 min",
    completed: false,
    locked: false,
  },
];

const achievements = [
  { icon: "🎯", title: "First Lesson", unlocked: true },
  { icon: "🔥", title: "7 Day Streak", unlocked: true },
  { icon: "🎮", title: "First Game", unlocked: true },
  { icon: "💪", title: "Speed Learner", unlocked: false },
  { icon: "🏆", title: "Week Champion", unlocked: false },
];

const communityActivity = [
  {
    user: "Marcus J.",
    action: "completed",
    item: "3D FPS Module",
    time: "2m ago",
  },
  {
    user: "Lisa K.",
    action: "shared",
    item: "their first game!",
    time: "15m ago",
  },
  {
    user: "David R.",
    action: "asked a question in",
    item: "C# Basics",
    time: "23m ago",
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-full bg-black">
      {/* Content Area */}
      <div className="p-6">
        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Welcome back, Kura! 🎮</h1>
            <p className="text-purple-100 text-lg">
              You're in Week First week of your journey. Keep up the momentum!
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 right-20 w-48 h-48 bg-white/5 rounded-full -mb-24"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-linear-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div className="text-2xl font-black">12/150</div>
            </div>
            <div className="text-gray-400 text-sm mb-2">Lessons Completed</div>
            <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-400 h-full rounded-full"
                style={{ width: `${(12 / 150) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-orange-400" />
              <div className="text-2xl font-black">7 Days</div>
            </div>
            <div className="text-gray-400 text-sm">Current Streak</div>
            <div className="text-orange-400 text-xs mt-2 font-medium">
              🔥 Keep it going!
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Gamepad2 className="w-8 h-8 text-green-400" />
              <div className="text-2xl font-black">3/5</div>
            </div>
            <div className="text-gray-400 text-sm">Games Built</div>
            <div className="text-green-400 text-xs mt-2 font-medium">
              ✓ 2D Platformer complete
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div className="text-2xl font-black">69%</div>
            </div>
            <div className="text-gray-400 text-sm">Completion Rate</div>
            <div className="text-purple-400 text-xs mt-2 font-medium">
              Above average!
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Where You Left Off */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-purple-400" />
                  Continue Learning
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-linear-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/50 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-purple-400 text-sm font-medium mb-1">
                        LESSON 4 • WEEK 2
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Introduction to Physics
                      </h3>
                      <p className="text-gray-400">
                        Learn how Unity's physics engine works and apply forces
                        to objects
                      </p>
                    </div>
                    <div className="shrink-0 ml-4">
                      <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>20 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>Coding Exercise</span>
                    </div>
                  </div>
                  <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold mt-6 hover:scale-105 transition">
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
                  <div className="bg-gray-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-3">
                  {currentWeekLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition ${
                        lesson.current
                          ? "bg-purple-900/30 border-2 border-purple-500"
                          : lesson.completed
                            ? "bg-gray-800/50 border border-gray-700"
                            : "bg-gray-800 border border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                        <div>
                          <div
                            className={`font-bold ${
                              lesson.completed ? "text-gray-400" : "text-white"
                            }`}
                          >
                            {lesson.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                      {lesson.current && (
                        <div className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                          IN PROGRESS
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Classes */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-pink-400" />
                  Upcoming Live Classes
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingClasses.map((cls, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{cls.title}</h3>
                          {cls.live && (
                            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 animate-pulse">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                              LIVE TODAY
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          with {cls.instructor}
                        </div>
                      </div>
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-medium">
                        {cls.time}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                          cls.live
                            ? "bg-linear-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {cls.live ? "Join Now" : "Set Reminder"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Community & Achievements */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Achievements
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center p-3 ${
                        achievement.unlocked
                          ? "bg-linear-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500"
                          : "bg-gray-800 border border-gray-700 opacity-40"
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="text-xs text-center font-medium">
                        {achievement.title}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium mt-4 transition"
                  onClick={() => router.push("/home/achievements")}
                >
                  View All Achievements
                </button>
              </div>
            </div>

            {/* Community Activity */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  Community Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {communityActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-bold text-white">
                            {activity.user}
                          </span>
                          <span className="text-gray-400">
                            {" "}
                            {activity.action}{" "}
                          </span>
                          <span className="text-purple-400">
                            {activity.item}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-bold mt-4 transition flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Join Discord Community
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
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
                ].map((link, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-left"
                  >
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
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
