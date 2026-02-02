"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Clock,
  Users,
  Calendar,
  Play,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function LiveClassesPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const liveClasses = [
    {
      id: 1,
      title: "2D Platformer Physics Deep Dive",
      instructor: "Alex Chen",
      avatar: "AC",
      time: "Today, 6:00 PM EST",
      duration: "90 min",
      attendees: 847,
      status: "live",
      thumbnail: "bg-blue-600",
      description:
        "Learn advanced physics techniques for creating smooth platformer movement and responsive controls",
      category: "Physics",
    },
    {
      id: 2,
      title: "Character Animation Workshop",
      instructor: "Sarah Martinez",
      avatar: "SM",
      time: "Tomorrow, 6:00 PM EST",
      duration: "60 min",
      attendees: 623,
      status: "upcoming",
      thumbnail: "bg-purple-600",
      description:
        "Master character animation, blend trees, and animation controllers in Unity",
      category: "Animation",
    },
    {
      id: 3,
      title: "Q&A Session: Week 2 Review",
      instructor: "Alex Chen",
      avatar: "AC",
      time: "Wed, 7:00 PM EST",
      duration: "45 min",
      attendees: 512,
      status: "upcoming",
      thumbnail: "bg-green-600",
      description: "Ask questions and get help with Week 2 challenges",
      category: "Q&A",
    },
    {
      id: 4,
      title: "UI/UX Design for Games",
      instructor: "Maya Johnson",
      avatar: "MJ",
      time: "Thu, 5:00 PM EST",
      duration: "75 min",
      attendees: 389,
      status: "upcoming",
      thumbnail: "bg-pink-600",
      description:
        "Design intuitive and beautiful game interfaces that enhance player experience",
      category: "Design",
    },
    {
      id: 5,
      title: "Advanced C# Patterns",
      instructor: "David Kim",
      avatar: "DK",
      time: "Fri, 6:30 PM EST",
      duration: "90 min",
      attendees: 445,
      status: "upcoming",
      thumbnail: "bg-orange-600",
      description:
        "Learn design patterns and best practices for clean, maintainable game code",
      category: "Programming",
    },
  ];

  const pastClasses = [
    {
      id: 101,
      title: "Week 2 Review Session",
      instructor: "Alex Chen",
      avatar: "AC",
      time: "45:30",
      duration: "45 min",
      attendees: 0,
      status: "past",
      thumbnail: "bg-gray-700",
      description: "Complete review of Week 2 concepts and projects",
      category: "Review",
      date: "2 days ago",
      views: 1234,
    },
    {
      id: 102,
      title: "Building Your First 3D Game",
      instructor: "Sarah Martinez",
      avatar: "SM",
      time: "78:15",
      duration: "78 min",
      attendees: 0,
      status: "past",
      thumbnail: "bg-gray-700",
      description: "Step-by-step guide to creating a complete 3D game",
      category: "3D Development",
      date: "5 days ago",
      views: 2156,
    },
    {
      id: 103,
      title: "Multiplayer Networking Basics",
      instructor: "David Kim",
      avatar: "DK",
      time: "92:45",
      duration: "92 min",
      attendees: 0,
      status: "past",
      thumbnail: "bg-gray-700",
      description: "Introduction to multiplayer game development",
      category: "Networking",
      date: "1 week ago",
      views: 1876,
    },
    {
      id: 104,
      title: "Game Audio Implementation",
      instructor: "Maya Johnson",
      avatar: "MJ",
      time: "56:20",
      duration: "56 min",
      attendees: 0,
      status: "past",
      thumbnail: "bg-gray-700",
      description: "Adding sound effects and music to your games",
      category: "Audio",
      date: "1 week ago",
      views: 945,
    },
    {
      id: 105,
      title: "Performance Optimization",
      instructor: "Alex Chen",
      avatar: "AC",
      time: "85:10",
      duration: "85 min",
      attendees: 0,
      status: "past",
      thumbnail: "bg-gray-700",
      description: "Optimize your games for better performance",
      category: "Optimization",
      date: "2 weeks ago",
      views: 1543,
    },
    {
      id: 106,
      title: "AI and Pathfinding",
      instructor: "David Kim",
      avatar: "DK",
      time: "72:35",
      duration: "72 min",
      attendees: 0,
      status: "past",
      thumbnail: "bg-gray-700",
      description: "Create intelligent NPCs with advanced AI",
      category: "AI",
      date: "2 weeks ago",
      views: 1687,
    },
  ];

  const instructors = [
    { name: "Alex Chen", avatar: "AC", title: "Unity Expert", students: 12500 },
    {
      name: "Sarah Martinez",
      avatar: "SM",
      title: "Animation Specialist",
      students: 8900,
    },
    {
      name: "David Kim",
      avatar: "DK",
      title: "Programming Guru",
      students: 10200,
    },
    {
      name: "Maya Johnson",
      avatar: "MJ",
      title: "UI/UX Designer",
      students: 7600,
    },
  ];

  const filters = ["all", "live", "upcoming", "past"];
  const currentLiveClass = liveClasses.find((c) => c.status === "live");
  const upcomingClasses = liveClasses.filter((c) => c.status === "upcoming");

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
          {/* Filter Tabs */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto">
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
                {filter === "all" && "All Classes"}
                {filter === "live" && "Live Now"}
                {filter === "upcoming" && "Upcoming"}
                {filter === "past" && "Recordings"}
              </button>
            ))}
          </div>
          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Live Now Banner */}
              {currentLiveClass &&
                (selectedFilter === "all" || selectedFilter === "live") && (
                  <div className="bg-red-600 rounded-2xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white font-black text-lg">
                          LIVE NOW
                        </span>
                        <span className="text-white opacity-90">
                          • {currentLiveClass.attendees} students watching
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <h2 className="text-4xl font-black mb-3">
                            {currentLiveClass.title}
                          </h2>
                          <div className="flex items-center gap-4 text-white opacity-90">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold backdrop-blur-sm">
                                {currentLiveClass.avatar}
                              </div>
                              <span className="font-medium">
                                {currentLiveClass.instructor}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {currentLiveClass.duration}
                            </div>
                          </div>
                        </div>
                        <button className="bg-white text-red-600 px-10 py-5 rounded-xl font-black text-xl hover:bg-gray-100 transition shadow-2xl">
                          JOIN NOW
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              {/* Upcoming Classes */}
              {(selectedFilter === "all" || selectedFilter === "upcoming") && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black">Upcoming Classes</h2>
                    <span className="text-sm text-gray-400">
                      {upcomingClasses.length} classes
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {upcomingClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500 transition group cursor-pointer"
                      >
                        <div
                          className={`h-48 ${cls.thumbnail} flex items-center justify-center relative`}
                        >
                          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition"></div>
                          <Video className="w-20 h-20 text-white opacity-40 group-hover:scale-110 transition" />
                          <div className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {cls.duration}
                          </div>
                          <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1.5 rounded-full text-xs font-bold">
                            {cls.category}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                              {cls.avatar}
                            </div>
                            <div>
                              <div className="font-bold text-sm">
                                {cls.instructor}
                              </div>
                              <div className="text-xs text-gray-400">
                                Instructor
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition">
                            {cls.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {cls.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <div className="text-purple-400 font-bold mb-1">
                                {cls.time}
                              </div>
                              <div className="text-gray-500 text-xs flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {cls.attendees} registered
                              </div>
                            </div>
                            <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-lg font-bold text-sm transition flex items-center gap-2">
                              <Bell className="w-4 h-4" /> Register
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Recordings */}
              {(selectedFilter === "all" || selectedFilter === "past") && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black">Past Recordings</h2>
                    <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {pastClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500 transition cursor-pointer group"
                      >
                        <div className="h-36 bg-gray-800 flex items-center justify-center relative">
                          <Play className="w-14 h-14 text-white opacity-30 group-hover:opacity-60 group-hover:scale-110 transition relative z-10" />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                            {cls.time}
                          </div>
                          <div className="absolute top-2 left-2 bg-gray-700 bg-opacity-80 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                            {cls.category}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 group-hover:text-purple-400 transition line-clamp-2">
                            {cls.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xs">
                              {cls.avatar}
                            </div>
                            <span className="text-xs text-gray-400">
                              {cls.instructor}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{cls.date}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {cls.views?.toLocaleString()} views
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Right Sidebar */}
            <div className="lg:col-span-1 self-start">
              <div className="sticky top-24 space-y-6">
                {/* This Week's Schedule */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    This Week's Schedule
                  </h3>
                  <div className="space-y-4">
                    {liveClasses.slice(0, 4).map((cls) => (
                      <div
                        key={cls.id}
                        className="border-l-4 border-purple-500 pl-4 py-2"
                      >
                        <div className="text-sm font-bold mb-1">
                          {cls.title}
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                          {cls.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xs">
                            {cls.avatar}
                          </div>
                          <span className="text-xs text-gray-400">
                            {cls.instructor}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold text-sm mt-4 transition">
                    View Full Calendar
                  </button>
                </div>
                {/* Featured Instructors */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                  <h3 className="font-black text-lg mb-4">
                    Featured Instructors
                  </h3>
                  <div className="space-y-4">
                    {instructors.map((instructor, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold">
                          {instructor.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm">
                            {instructor.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {instructor.title}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-purple-400">
                            {(instructor.students / 1000).toFixed(1)}k
                          </div>
                          <div className="text-xs text-gray-500">students</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Community Stats */}{" "}
                <div className="bg-purple-600 rounded-xl p-6 relative overflow-hidden">
                  {" "}
                  <div className="absolute inset-0 bg-black opacity-20"></div>{" "}
                  <div className="relative z-10">
                    {" "}
                    <h3 className="font-black text-lg mb-2">Join Live</h3>{" "}
                    <p className="text-sm text-white opacity-90 mb-4">
                      {" "}
                      Connect with 15k+ developers in real-time classes{" "}
                    </p>{" "}
                    <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                      {" "}
                      Browse All Classes{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
