// Client-side component for displaying live and recorded classes
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// Import icons from lucide-react library
import Icon from "@/app/components/icons";

// Main component for the classes page
export default function LiveClassesPage() {
  const router = useRouter();
  // State for managing selected filter (all, live, upcoming, past)
  const [selectedFilter, setSelectedFilter] = useState("all");
  // State for managing search query input
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [liveBannerVisible, setLiveBannerVisible] = useState(false);
  const [upcomingVisible, setUpcomingVisible] = useState(false);
  const [recordingsVisible, setRecordingsVisible] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [instructorsVisible, setInstructorsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  
  // Refs for scroll-triggered animations
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const liveBannerRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const recordingsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const instructorsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger initial animations
    setTimeout(() => setIsVisible(true), 100);
    
    // Setup scroll observers with error handling
    const setupScrollObserver = (ref: React.RefObject<HTMLDivElement | null>, setState: (visible: boolean) => void) => {
      if (!ref.current) return null;
      
      try {
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
      } catch (error) {
        console.warn('IntersectionObserver setup failed:', error);
        // Fallback: set visible after delay
        setTimeout(() => setState(true), 500);
        return () => {};
      }
    };
    
    // Only setup observers if refs exist
    const cleanupHeader = headerRef.current ? setupScrollObserver(headerRef, setHeaderVisible) : null;
    const cleanupFilters = filtersRef.current ? setupScrollObserver(filtersRef, setFiltersVisible) : null;
    const cleanupLiveBanner = liveBannerRef.current ? setupScrollObserver(liveBannerRef, setLiveBannerVisible) : null;
    const cleanupUpcoming = upcomingRef.current ? setupScrollObserver(upcomingRef, setUpcomingVisible) : null;
    const cleanupRecordings = recordingsRef.current ? setupScrollObserver(recordingsRef, setRecordingsVisible) : null;
    const cleanupSchedule = scheduleRef.current ? setupScrollObserver(scheduleRef, setScheduleVisible) : null;
    const cleanupInstructors = instructorsRef.current ? setupScrollObserver(instructorsRef, setInstructorsVisible) : null;
    const cleanupCta = ctaRef.current ? setupScrollObserver(ctaRef, setCtaVisible) : null;
    
    return () => {
      cleanupHeader?.();
      cleanupFilters?.();
      cleanupLiveBanner?.();
      cleanupUpcoming?.();
      cleanupRecordings?.();
      cleanupSchedule?.();
      cleanupInstructors?.();
      cleanupCta?.();
    };
  }, [selectedFilter]); // Add selectedFilter dependency to re-setup observers when filter changes

  // Array of live/upcoming classes with their details
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

  // Array of past class recordings
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

  // Array of featured instructors
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

  // Filter options for classes
  const filters = ["all", "live", "upcoming", "past"];
  // Find the currently live class
  const currentLiveClass = liveClasses.find((c) => c.status === "live");
  // Filter for only upcoming classes
  const upcomingClasses = liveClasses.filter((c) => c.status === "upcoming");

  // Main container for the page
  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Header Section */}
      <div 
        ref={headerRef}
        className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10"
      >
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="relative">
              {/* Search Icon */}
              <Icon
                name="Search"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transform transition-transform duration-300 hover:scale-110"
              />
              {/* Search Input Field */}
              <input
                type="text"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:border-purple-500 focus:outline-none text-sm transition-all duration-300 hover:border-gray-600 focus:shadow-lg focus:shadow-purple-500/20"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
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
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Display filter label based on filter type */}
                {filter === "all" && "All Classes"}
                {filter === "live" && "Live Now"}
                {filter === "upcoming" && "Upcoming"}
                {filter === "past" && "Recordings"}
              </button>
            ))}
          </div>
          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Classes Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Live Now Banner - Shows currently live class */}
              {currentLiveClass &&
                (selectedFilter === "all" || selectedFilter === "live") && (
                  <div 
                    ref={liveBannerRef}
                    className="bg-red-600 rounded-2xl p-8 mb-8 relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/30"
                  >
                    {/* Overlay for depth effect */}
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    {/* Content wrapper with z-index to appear above overlay */}
                    <div className="relative z-10">
                      {/* Live indicator with pulsing dot and student count */}
                      <div className="flex items-center gap-3 mb-4">
                        {/* Animated pulse dot to indicate live status */}
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white font-black text-lg bg-linear-to-r from-white to-red-100 bg-clip-text text-transparent">
                          LIVE NOW
                        </span>
                        <span className="text-white opacity-90 transform transition-transform duration-300 hover:scale-110">
                          • {currentLiveClass.attendees} students watching
                        </span>
                      </div>
                      {/* Main class info and CTA button */}
                      <div className="flex items-end justify-between">
                        <div>
                          <h2 className="text-4xl font-black mb-3 bg-linear-to-r from-white to-red-100 bg-clip-text text-transparent">
                            {currentLiveClass.title}
                          </h2>
                          {/* Instructor info and duration */}
                          <div className="flex items-center gap-4 text-white opacity-90">
                            {/* Instructor avatar and name */}
                            <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-110">
                              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold backdrop-blur-sm">
                                {currentLiveClass.avatar}
                              </div>
                              <span className="font-medium">
                                {currentLiveClass.instructor}
                              </span>
                            </div>
                            {/* Class duration */}
                            <span>• {currentLiveClass.duration}</span>
                          </div>
                        </div>
                        {/* Join Live Class Button */}
                        <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/30">
                          Join Live Class
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              {/* Upcoming Classes Section */}
              {(selectedFilter === "all" || selectedFilter === "upcoming") && (
                <div>
                  {/* Section header with count */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <Icon name="Calendar" className="w-6 h-6 text-blue-400" />
                      Upcoming Classes
                    </h2>
                    <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:scale-105 transform">
                      View All <Icon name="ChevronRight" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Grid of upcoming class cards */}
                  <div 
                    ref={upcomingRef}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {upcomingClasses.map((cls, index) => (
                      <div
                        key={cls.id}
                        className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500 transition-all duration-500 group cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        {/* Class header with time and status */}
                        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Upcoming</span>
                            <span className="text-xs text-blue-400 font-medium">{cls.time}</span>
                          </div>
                        </div>
                        
                        {/* Class content */}
                        <div className="p-6">
                          {/* Class title and instructor */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                              {cls.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xs">
                                {cls.avatar}
                              </div>
                              <span className="text-sm">{cls.instructor}</span>
                            </div>
                          </div>
                          
                          {/* Class metadata */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span>{cls.duration}</span>
                            <span>•</span>
                            <span>{cls.category}</span>
                            <span>•</span>
                            <span>{cls.attendees} registered</span>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex gap-3">
                            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105">
                              Register
                            </button>
                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105">
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Recordings Section */}
              {(selectedFilter === "all" || selectedFilter === "past") && (
                <div>
                  {/* Section header with "View All" link */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <Icon name="PlayCircle" className="w-6 h-6 text-green-400" />
                      Past Recordings
                    </h2>
                    <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:scale-105 transform">
                      View All <Icon name="ChevronRight" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Grid of past class recordings */}
                  <div 
                    ref={recordingsRef}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {liveClasses
                      .filter((cls) => cls.status === "past")
                      .slice(0, 4)
                      .map((cls, index) => (
                        <div
                          key={cls.id}
                          className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-green-500 transition-all duration-500 group cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                          style={{ transitionDelay: `${index * 150}ms` }}
                        >
                          {/* Video thumbnail placeholder */}
                          <div className="relative bg-gray-800 h-48 flex items-center justify-center">
                            <div className="absolute inset-0 bg-linear-to-br from-green-500/20 to-blue-500/20"></div>
                            <Icon 
                              name="PlayCircle" 
                              className="w-16 h-16 text-white/80 relative z-10 transform transition-transform duration-300 group-hover:scale-110" 
                            />
                            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                              {cls.duration}
                            </div>
                          </div>
                          
                          {/* Recording Details */}
                          <div className="p-4">
                            {/* Title */}
                            <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                              {cls.title}
                            </h3>
                            {/* Instructor Info */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xs transform transition-transform duration-300 group-hover:scale-110">
                                {cls.avatar}
                              </div>
                              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                {cls.instructor}
                              </span>
                            </div>
                            {/* Metadata - date and views */}
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{cls.time}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1 transform transition-transform duration-300 hover:scale-110">
                                <Icon name="Users" className="size-3" />
                                {cls.attendees} attended
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Fallback for when no content matches the filter */}
              {!currentLiveClass && selectedFilter === "live" && (
                <div className="text-center py-12">
                  <Icon name="VideoOff" className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-semibold mb-2">No Live Classes</h3>
                  <p className="text-gray-400 mb-4">
                    There are no classes streaming right now
                  </p>
                  <button 
                    onClick={() => setSelectedFilter("upcoming")}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                  >
                    View Upcoming Classes →
                  </button>
                </div>
              )}

              {upcomingClasses.length === 0 && selectedFilter === "upcoming" && (
                <div className="text-center py-12">
                  <Icon name="Calendar" className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-semibold mb-2">No Upcoming Classes</h3>
                  <p className="text-gray-400 mb-4">
                    Check back later for new scheduled classes
                  </p>
                  <button 
                    onClick={() => setSelectedFilter("past")}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                  >
                    View Past Recordings →
                  </button>
                </div>
              )}

              {liveClasses.filter((cls) => cls.status === "past").length === 0 && selectedFilter === "past" && (
                <div className="text-center py-12">
                  <Icon name="PlayCircle" className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-semibold mb-2">No Past Recordings</h3>
                  <p className="text-gray-400 mb-4">
                    No recorded classes available yet
                  </p>
                  <button 
                    onClick={() => setSelectedFilter("upcoming")}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                  >
                    View Upcoming Classes →
                  </button>
                </div>
              )}
            </div>
            {/* Right Sidebar - Schedule and Instructors */}
            <div className="lg:col-span-1 self-start">
              {/* Sticky wrapper for sidebar content */}
              <div className="sticky top-24 space-y-6">
                {/* This Week's Schedule Section */}
                <div 
                  ref={scheduleRef}
                  className={`bg-gray-900 rounded-xl border border-gray-800 p-6 transform transition-all duration-700 ease-out hover:shadow-lg hover:shadow-purple-500/20 ${
                    scheduleVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                  }`}
                >
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    <Icon name="Calendar" className="w-5 h-5 text-purple-400 animate-pulse" />
                    This Week&apos;s Schedule
                  </h3>
                  <div className="space-y-4">
                    {/* Display first 4 upcoming classes */}
                    {liveClasses.slice(0, 4).map((cls, index) => (
                      <div
                        key={cls.id}
                        className={`border-l-4 border-purple-500 pl-4 py-2 transform transition-all duration-500 hover:scale-105 ${
                          scheduleVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {/* Class title */}
                        <div className="text-sm font-bold mb-1 hover:text-purple-300 transition-colors duration-300">
                          {cls.title}
                        </div>
                        {/* Class time */}
                        <div className="text-xs text-gray-400 mb-2">
                          {cls.time}
                        </div>
                        {/* Instructor info with avatar */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xs transform transition-transform duration-300 hover:scale-110">
                            {cls.avatar}
                          </div>
                          <span className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300">
                            {cls.instructor}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* View full calendar button */}
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold text-sm mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    View Full Calendar
                  </button>
                </div>
                {/* Featured Instructors Section */}
                <div 
                  ref={instructorsRef}
                  className={`bg-gray-900 rounded-xl border border-gray-800 p-6 transform transition-all duration-700 ease-out hover:shadow-lg hover:shadow-blue-500/20 ${
                    instructorsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                  }`}
                >
                  <h3 className="font-black text-lg mb-4 bg-linear-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Featured Instructors
                  </h3>
                  <div className="space-y-4">
                    {/* Display all featured instructors */}
                    {instructors.map((instructor, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 transform transition-all duration-500 hover:scale-105 ${
                          instructorsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {/* Instructor avatar */}
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
                          {instructor.avatar}
                        </div>
                        {/* Instructor name and title */}
                        <div className="flex-1">
                          <div className="font-bold text-sm hover:text-purple-300 transition-colors duration-300">
                            {instructor.name}
                          </div>
                          <div className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300">
                            {instructor.title}
                          </div>
                        </div>
                        {/* Student count */}
                        <div className="text-right">
                          <div className="text-sm font-bold text-purple-400 transform transition-transform duration-300 hover:scale-110">
                            {(instructor.students / 1000).toFixed(1)}k
                          </div>
                          <div className="text-xs text-gray-500">students</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Call-to-Action Section - Join Live Classes */}
                <div 
                  ref={ctaRef}
                  className={`bg-purple-600 rounded-xl p-6 relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 ${
                    ctaVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                  }`}
                >
                  {/* Overlay for depth effect */}
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  {/* CTA Content */}
                  <div className="relative z-10">
                    <h3 className="font-black text-lg mb-2 bg-linear-to-r from-white to-purple-100 bg-clip-text text-transparent">Join Live</h3>
                    <p className="text-sm text-white opacity-90 mb-4">
                      Connect with 15k+ developers in real-time classes
                    </p>
                    {/* Browse button */}
                    <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      Browse All Classes
                    </button>
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
