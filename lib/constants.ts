/**
 * Constants and Data for GameDev Academy Platform
 * 
 * This file contains shared constants, data structures, and configuration
 * used throughout the application for consistency and maintainability.
 * 
 * @fileoverview Central constants and data definitions
 */

export interface RoadmapPhase {
  weeks: string;
  title: string;
  subtitle: string;
  gradient: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
  sub: string;
}

export interface Guarantee {
  title: string;
  desc: string;
}

export interface LandingLesson {
  title: string;
  subtitle: string;
  level: string;
  levelColor: string;
}

// Landing lessons - demo lessons for interactive preview
export const LANDING_LESSONS: LandingLesson[] = [
  {
    title: "Player Movement",
    subtitle: "Learn 2D controls",
    level: "Beginner",
    levelColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "Enemy AI",
    subtitle: "Smart opponents",
    level: "Intermediate",
    levelColor: "bg-amber-500/20 text-amber-400",
  },
  {
    title: "Multiplayer Mode",
    subtitle: "Real networking",
    level: "Advanced",
    levelColor: "bg-rose-500/20 text-rose-400",
  },
];

// Roadmap phases - learning journey phases
export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    weeks: "Weeks 1-3",
    title: "Foundation",
    subtitle: "Master the fundamentals",
    gradient: "from-blue-500 to-cyan-400",
    items: [
      "Basic Programming Concepts",
      "Development Environment Setup", 
      "Core Principles & Best Practices",
      "Build Your First Project",
    ],
  },
  {
    weeks: "Weeks 4-6", 
    title: "Building",
    subtitle: "Start real projects",
    gradient: "from-purple-500 to-pink-500",
    items: [
      "Advanced Techniques",
      "Project Architecture",
      "Problem Solving Skills",
      "Complete Portfolio Project",
    ],
  },
  {
    weeks: "Weeks 7-9",
    title: "Advanced", 
    subtitle: "Professional techniques",
    gradient: "from-orange-500 to-red-500",
    items: [
      "Industry Best Practices",
      "Performance Optimization",
      "Advanced Patterns",
      "Professional Development",
    ],
  },
  {
    weeks: "Weeks 10-12",
    title: "Launch",
    subtitle: "Ship your final project",
    gradient: "from-emerald-500 to-green-600", 
    items: [
      "Final Project Polish",
      "Portfolio Development",
      "Career Preparation",
      "Graduation & Certification",
    ],
  },
];

// Statistics - course statistics
export const STATS: Stat[] = [
  { value: "12+", label: "Video Lessons", sub: "HD Content" },
  { value: "8+", label: "Code Exercises", sub: "Hands-on Practice" },
  { value: "4", label: "Complete Projects", sub: "Portfolio Ready" },
  { value: "1000+", label: "Active Learners", sub: "Growing Community" },
];

// Guarantees - course guarantees and promises
export const GUARANTEES: Guarantee[] = [
  {
    title: "30-Day Money Back Guarantee",
    desc: "Not satisfied? Get a full refund, no questions asked.",
  },
  {
    title: "Lifetime Access",
    desc: "All lessons, updates, and future content included forever.",
  },
  {
    title: "Expert Support",
    desc: "Get help from instructors when you need it most.",
  },
];
