"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Flame,
  Gamepad2,
  Clock,
  Camera,
  Share2,
  Settings,
  ArrowLeft,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Heart,
  Eye,
  Trophy,
  Lock,
  Code,
  Award,
  Users,
} from "lucide-react";

// ---------------------- Type Definitions ----------------------

type Project = {
  name: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
  color: string;
  featured?: boolean;
};

type Badge = {
  title: string;
  description: string;
  date: string;
  earned: boolean;
  icon?: string;
};

type Activity = {
  title: string;
  subtitle: string;
  iconColor: string;
  time: string;
  icon: React.ReactNode;
};

type Skill = {
  name: string;
  percent: number;
};

type Status = {
  value: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

// ---------------------- Data ----------------------

const projectsData: Project[] = [
  {
    name: "Space Shooter 2D",
    description:
      "Classic arcade-style space shooter with power-ups and boss battles",
    tags: ["Unity", "C#", "Pixel Art"],
    likes: 234,
    views: 1205,
    color: "from-blue-600 to-blue-800",
    featured: true,
  },
  {
    name: "Platformer Adventure",
    description: "Retro platformer with smooth movement and challenging levels",
    tags: ["Unity", "C#", "2D animation"],
    likes: 189,
    views: 892,
    color: "from-green-600 to-green-800",
  },
  {
    name: "Puzzle Maze",
    description: "Mind bending puzzle game with 50+ levels",
    tags: ["Unity", "C#", "Level Design"],
    likes: 156,
    views: 673,
    color: "from-purple-600 to-purple-800",
  },
];

const statusData: Status[] = [
  {
    value: "45",
    title: "Lessons Completed",
    subtitle: "30% of Course",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    value: "12",
    title: "Days Streak",
    subtitle: "Longest: 28 days",
    icon: <Flame className="w-6 h-6" />,
  },
  {
    value: "3",
    title: "Games Built",
    subtitle: "2 more to go",
    icon: <Gamepad2 className="w-6 h-6" />,
  },
  {
    value: "156h",
    title: "Learning Time",
    subtitle: "Average: 2.5h/day",
    icon: <Clock className="w-6 h-6" />,
  },
];

const badgesData: Badge[] = [
  {
    title: "Quick Start",
    description: "Completed first lesson",
    date: "Jan 15, 2024",
    earned: true,
  },
  {
    title: "Hot Streak",
    description: "7 day learning streak",
    date: "Jan 22, 2024",
    earned: true,
  },
  {
    title: "First Game",
    description: "Built and published first game",
    date: "Feb 5, 2024",
    earned: true,
  },
  {
    title: "Dedicated Learner",
    description: "100+ hours of learning",
    date: "Feb 20, 2024",
    earned: true,
  },
  {
    title: "Week Champion",
    description: "Top learner of the week",
    date: "",
    earned: false,
  },
];

const activitiesData: Activity[] = [
  {
    title: "Completed 'Advanced Physics'",
    subtitle: "Week 4, Lesson 12",
    iconColor: "bg-blue-500",
    time: "2 hours ago",
    icon: <BookOpen className="w-5 h-5 text-white" />,
  },
  {
    title: "Published 'Space Shooter'",
    subtitle: "Received 50+ likes",
    iconColor: "bg-green-500",
    time: "1 day ago",
    icon: <Gamepad2 className="w-5 h-5 text-white" />,
  },
  {
    title: "Earned 'Dedicated Learner' badge",
    subtitle: "100 hours milestone",
    iconColor: "bg-orange-500",
    time: "3 days ago",
    icon: <Trophy className="w-5 h-5 text-white" />,
  },
  {
    title: "Completed 'Character Animation'",
    subtitle: "Week 3, Lesson 8",
    iconColor: "bg-blue-500",
    time: "5 days ago",
    icon: <Code className="w-5 h-5 text-white" />,
  },
  {
    title: "Helped 5 Students In Discord",
    subtitle: "Answered questions about C#",
    iconColor: "bg-purple-500",
    time: "1 week ago",
    icon: <Users className="w-5 h-5 text-white" />,
  },
];

const skillsData: Skill[] = [
  { name: "Unity", percent: 75 },
  { name: "C#", percent: 65 },
  { name: "2D Game Dev", percent: 80 },
  { name: "3D Game Dev", percent: 45 },
  { name: "Game Design", percent: 70 },
  { name: "Physics System", percent: 60 },
];

// ---------------------- Reusable Components ----------------------

const StatusCard = ({ status }: { status: Status }) => (
  <div className="flex flex-col justify-center px-6 py-6 bg-gray-900 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all">
    <div className="flex flex-row justify-between items-start mb-4">
      <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
        {status.icon}
      </div>
      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
        <Award className="w-4 h-4 text-gray-400" />
      </div>
    </div>
    <span className="text-white text-4xl mb-2 font-black">{status.value}</span>
    <span className="text-base text-gray-300 font-semibold">
      {status.title}
    </span>
    <span className="text-sm text-gray-500 mt-1">{status.subtitle}</span>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <button className="flex flex-col items-start mt-4 space-y-3 w-full rounded-2xl bg-gray-800 border border-gray-700 hover:border-purple-500/50 transition-all overflow-hidden group">
    <div
      className={`flex justify-end items-start w-full h-48 bg-linear-to-br ${project.color} relative`}
    >
      {project.featured && (
        <span className="flex justify-center items-center bg-linear-to-r from-yellow-400 to-orange-500 px-3 py-1.5 m-3 text-black rounded-full text-xs font-bold">
          ⭐ Featured
        </span>
      )}
    </div>
    <div className="px-6 pb-6 w-full space-y-3">
      <h3 className="font-bold text-xl text-white group-hover:text-purple-400 transition-colors">
        {project.name}
      </h3>
      <p className="font-light text-sm text-gray-400 leading-relaxed">
        {project.description}
      </p>
      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-red-400" /> {project.likes}
        </span>
        <span className="flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-blue-400" /> {project.views}
        </span>
      </div>
    </div>
  </button>
);

const BadgeCard = ({ badge }: { badge: Badge }) => (
  <div
    className={`flex flex-col mt-4 justify-center items-center space-y-2 w-full border-2 ${
      badge.earned
        ? "border-yellow-500 bg-linear-to-br from-yellow-500/10 to-orange-500/10"
        : "border-gray-800 bg-gray-900"
    } p-6 rounded-2xl ${!badge.earned && "opacity-50"} transition-all hover:scale-105`}
  >
    <div
      className={`p-3 rounded-full ${badge.earned ? "bg-yellow-500/20" : "bg-gray-800"}`}
    >
      {badge.earned ? (
        <Trophy className="w-8 h-8 text-yellow-500" />
      ) : (
        <Lock className="w-8 h-8 text-gray-500" />
      )}
    </div>
    <h3 className="text-lg font-bold text-white text-center">{badge.title}</h3>
    <p className="text-sm font-light text-gray-400 text-center">
      {badge.description}
    </p>
    <div
      className={`flex justify-center items-center px-3 py-1 rounded-full text-xs font-semibold ${
        badge.earned
          ? "bg-green-500/20 text-green-400"
          : "bg-gray-800 text-gray-500"
      }`}
    >
      {badge.earned ? badge.date : "Locked"}
    </div>
  </div>
);

const ActivityItem = ({ activity }: { activity: Activity }) => (
  <div className="flex flex-row items-center justify-between border border-gray-700 mt-4 w-full bg-gray-800 rounded-2xl p-4 hover:border-purple-500/50 transition-all">
    <div className="flex items-center gap-4 flex-1">
      <div
        className={`w-12 h-12 rounded-full ${activity.iconColor} shrink-0 flex items-center justify-center`}
      >
        {activity.icon}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-base font-semibold text-white truncate">
          {activity.title}
        </span>
        <span className="text-sm font-light text-gray-500 truncate">
          {activity.subtitle}
        </span>
      </div>
    </div>
    <span className="text-xs text-gray-500 font-light whitespace-nowrap ml-4">
      {activity.time}
    </span>
  </div>
);

const SkillBar = ({ skill }: { skill: Skill }) => (
  <div className="flex flex-col mt-4 space-y-2 w-full">
    <div className="flex flex-row justify-between items-center">
      <span className="text-lg text-white font-semibold">{skill.name}</span>
      <span className="text-sm text-purple-400 font-bold">
        {skill.percent}%
      </span>
    </div>
    <div className="bg-gray-800 w-full h-3 rounded-full overflow-hidden">
      <div
        className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
        style={{ width: `${skill.percent}%` }}
      ></div>
    </div>
  </div>
);

// ---------------------- Main Component ----------------------

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {/* -------------------------------------------------------
          HEADER (FIXED POSITION)
      -------------------------------------------------------- */}
      <header className="flex flex-row items-center justify-between w-full px-6 py-4 bg-gray-900 border-b border-gray-800 h-20 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 border border-gray-700 rounded-full bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => router.push("/home")}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-black text-white text-2xl">Profile</h1>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------
          MAIN CONTENT (SCROLLABLE AREA)
      -------------------------------------------------------- */}
      <main className="flex-1 w-full overflow-y-auto flex flex-col items-center pt-24 pb-16 space-y-6">
        {/* -------------------------------------------------------
            PROFILE HEADER CARD
        -------------------------------------------------------- */}
        <div className="w-11/12 max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Banner */}
          <div className="h-48 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 relative">
            {/* Avatar */}
            <div className="absolute -bottom-16 left-8 w-32 h-32 rounded-2xl border-4 border-black bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl font-black shadow-xl">
              K
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors border-2 border-black">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Edit Button */}
            <button className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="pt-20 px-8 pb-8 flex flex-col space-y-4">
            {/* Name + Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-black text-white">Kurayami</h2>
              <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                ⭐ Rising Star
              </span>
            </div>

            {/* Username + Location + Join Date */}
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span className="font-medium">@kurathedev</span>
              <div className="flex gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Ulaanbaatar, MN
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Joined January 2022
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="w-full sm:w-auto py-3 px-6 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-500 hover:to-pink-500 transition-all">
              Edit Profile
            </button>

            {/* Bio */}
            <p className="text-gray-300 text-base leading-relaxed">
              Passionate game developer learning to build amazing experiences.
              Currently mastering Unity and Unreal Engine. Always excited to
              collaborate on indie game projects!
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-4 h-4" /> kurayami.dev
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------
            STATISTIC CARDS
        -------------------------------------------------------- */}
        <div className="flex flex-wrap justify-between w-11/12 max-w-6xl gap-5">
          {statusData.map((status) => (
            <StatusCard key={status.title} status={status} />
          ))}
        </div>

        {/* -------------------------------------------------------
            TABS SECTION
        -------------------------------------------------------- */}
        <div className="bg-gray-900 rounded-2xl w-11/12 max-w-6xl overflow-hidden border border-gray-800">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-800 overflow-x-auto">
            {["overview", "projects", "badges", "activity", "skills"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-bold transition whitespace-nowrap ${
                    activeTab === tab
                      ? "text-purple-400 border-b-2 border-purple-400 bg-purple-500/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ),
            )}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Featured Projects */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl text-white font-black">
                      Featured Projects
                    </h3>
                    <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                      View All →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {projectsData.slice(0, 2).map((p) => (
                      <ProjectCard key={p.name} project={p} />
                    ))}
                  </div>
                </div>

                {/* Recent Badges */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl text-white font-black">
                      Recent Badges
                    </h3>
                    <button
                      className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                      onClick={() => router.push("/home/achievements")}
                    >
                      View All →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {badgesData.slice(0, 4).map((b) => (
                      <BadgeCard key={b.title} badge={b} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projectsData.map((p) => (
                  <ProjectCard key={p.name} project={p} />
                ))}
              </div>
            )}

            {activeTab === "badges" && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {badgesData.map((b) => (
                  <BadgeCard key={b.title} badge={b} />
                ))}
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-2">
                {activitiesData.map((a, i) => (
                  <ActivityItem key={i} activity={a} />
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-2">
                {skillsData.map((s) => (
                  <SkillBar key={s.name} skill={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
