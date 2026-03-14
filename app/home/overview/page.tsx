"use client";

import { BookOpen, Code, MessageCircle, Award, Rocket, Clock, Calendar, Trophy, Users, ChevronRight } from "lucide-react";
import Icon from "../../components/icons";
import { WelcomeBanner } from "../../components/WelcomeBanner";
import { StatsCard } from "../../components/StatsCard";
import { LessonCard } from "../../components/LessonCard";
import { LiveClassCard } from "../../components/LiveClassCard";
import { AchievementCard } from "../../components/AchievementCard";
import { CommunityActivityItem } from "../../components/CommunityActivityItem";
import { 
  UPCOMING_CLASSES, 
  CURRENT_WEEK_LESSONS, 
  ACHIEVEMENTS, 
  COMMUNITY_ACTIVITY 
} from "../../../lib/home-data";

export default function Overview() {
  return (
    <div className="flex w-full bg-black">
      {/* Content Area */}
      <div className="p-6 min-h-screen overflow-scroll">
        <WelcomeBanner />

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            icon={BookOpen}
            value="12/150"
            label="Lessons Completed"
            color="text-blue-400"
            progress={{ current: 12, total: 150 }}
          />
          <StatsCard 
            icon={Code}
            value="7 Days"
            label="Current Streak"
            color="text-orange-400"
            subtitle="🔥 Keep it going!"
          />
          <StatsCard 
            icon={Award}
            value="3/5"
            label="Games Built"
            color="text-green-400"
            subtitle="✓ 2D Platformer complete"
          />
          <StatsCard 
            icon={MessageCircle}
            value="69%"
            label="Completion Rate"
            color="text-purple-400"
            subtitle="Above average!"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Where You Left Off */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Rocket" className="size-6 text-purple-400" />
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
                        <Icon name="Play" className="size-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="size-4" />
                      <span>20 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Code" className="size-4" />
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
                  {CURRENT_WEEK_LESSONS.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </div>
            </div>

            {/* Live Classes */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Calendar" className="size-6 text-pink-400" />
                  Upcoming Live Classes
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {UPCOMING_CLASSES.map((cls, i) => (
                  <LiveClassCard key={i} class={cls} />
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
                  <Icon name="Trophy" className="size-5 text-yellow-400" />
                  Achievements
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {ACHIEVEMENTS.slice(0, 5).map((achievement, i) => (
                    <AchievementCard key={i} achievement={achievement} />
                  ))}
                </div>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium mt-4 transition">
                  View All Achievements
                </button>
              </div>
            </div>

            {/* Community Activity */}
            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Icon name="Users" className="size-5 text-green-400" />
                  Community Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {COMMUNITY_ACTIVITY.map((activity, i) => (
                    <CommunityActivityItem key={i} activity={activity} />
                  ))}
                </div>
                <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-bold mt-4 transition flex items-center justify-center gap-2">
                  <Icon name="MessageCircle" className="size-4" />
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
                    <Icon
                      name="ChevronRight"
                      className="w-4 h-4 ml-auto text-gray-400"
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
