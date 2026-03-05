export interface Lesson {
  title: string;
  subtitle: string;
  level: string;
  levelColor: string;
}

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

export const LESSONS: Lesson[] = [
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

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    weeks: "Weeks 1-3",
    title: "Foundation",
    subtitle: "Master the fundamentals",
    gradient: "from-blue-500 to-cyan-400",
    items: [
      "C# Basics & Syntax",
      "Unity Interface Mastery",
      "2D Game Mechanics",
      "Ship Your First Playable Game",
    ],
  },
  {
    weeks: "Weeks 4-6",
    title: "Building",
    subtitle: "Start real projects",
    gradient: "from-purple-500 to-pink-500",
    items: [
      "3D Environments & Lighting",
      "Character Controllers",
      "Physics & Collision Systems",
      "Complete Mobile Game",
    ],
  },
  {
    weeks: "Weeks 7-9",
    title: "Advanced",
    subtitle: "Professional techniques",
    gradient: "from-orange-500 to-red-500",
    items: [
      "Multiplayer Networking",
      "AI & Pathfinding",
      "Performance Optimization",
      "Advanced RPG Systems",
    ],
  },
  {
    weeks: "Weeks 10-12",
    title: "Launch",
    subtitle: "Ship your commercial game",
    gradient: "from-emerald-500 to-green-600",
    items: [
      "Monetization Strategies",
      "Marketing & ASO",
      "Store Submission Process",
      "Professional Portfolio",
    ],
  },
];

export const STATS: Stat[] = [
  { value: "150+", label: "Video Lessons", sub: "HD Content" },
  { value: "50+", label: "Code Exercises", sub: "Hands-on Practice" },
  { value: "5", label: "Complete Games", sub: "Portfolio Ready" },
  { value: "15K+", label: "Active Learners", sub: "Growing Community" },
];

export const GUARANTEES: Guarantee[] = [
  {
    title: "30-Day Money Back Guarantee",
    desc: "Not satisfied? Get a full refund, no questions asked.",
  },
  {
    title: "Job Placement Support",
    desc: "No offer in 6 months? Get a refund + 6 more months free mentorship.",
  },
  {
    title: "Lifetime Access",
    desc: "All lessons, updates, and future content included forever.",
  },
];
