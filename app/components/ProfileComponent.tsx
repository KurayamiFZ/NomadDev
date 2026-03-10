/**
 * Profile Component - GameDev Academy Platform
 * 
 * Reusable profile display component that can show any user's profile.
 * Supports both own profile and other users' profiles with different features.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile} props.profile - User profile data to display
 * @param {Function} [props.onNavigate] - Optional navigation callback
 * @returns {JSX.Element} Complete profile page component
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Pen,
  Users,
} from "lucide-react";
import { UserProfile } from "@/lib/types";

interface ProfileComponentProps {
  /** User profile data to display */
  profile: UserProfile;
  /** Optional callback for navigation events */
  onNavigate?: (destination: string) => void;
}

/**
 * Icon mapping for string-based icon names from profile data
 */
const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Flame,
  Gamepad2,
  Clock,
  Camera,
  Trophy,
  Code,
  Users,
};

/**
 * Reusable Profile Component
 * 
 * Renders a complete profile page with all sections including:
 * - Profile header with avatar and info
 * - Statistics cards
 * - Tabbed content (overview, projects, badges, activity, skills)
 * - Responsive design with mobile support
 * 
 * @param {ProfileComponentProps} props - Component props
 * @returns {JSX.Element} The complete profile component
 */
export function ProfileComponent({ profile, onNavigate }: ProfileComponentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  /**
   * Handle navigation with optional callback
   */
  const handleNavigate = (destination: string) => {
    if (onNavigate) {
      onNavigate(destination);
    } else {
      router.push(destination);
    }
  };

  /**
   * Render icon component from string name
   */
  const renderIcon = (iconName: string, className: string = "") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {/* -------------------------------------------------------
          HEADER (FIXED POSITION)
      -------------------------------------------------------- */}
      <header className="flex flex-row items-center justify-between w-full px-6 py-4 bg-gray-900 border-b border-gray-800 h-20 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 border border-gray-700 rounded-full bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => handleNavigate("/home")}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-black text-white text-2xl">
            {profile.isOwnProfile ? "My Profile" : `${profile.displayName}'s Profile`}
          </h1>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          {profile.isOwnProfile && (
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </button>
          )}
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
              {profile.avatarInitial}
              {profile.isOwnProfile && (
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors border-2 border-black">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Banner Edit Button (own profile only) */}
            {profile.isOwnProfile && (
              <button className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Profile Info Section */}
          <div className="pt-20 px-8 pb-8 flex flex-col space-y-4">
            {/* Name + Badge + Edit */}
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-black text-white">{profile.displayName}</h2>
              <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                ⭐ {profile.rank}
              </span>
              {profile.isOwnProfile && (
                <button className="flex justify-center items-center size-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-500 hover:to-pink-500 transition-all">
                  <Pen className="size-4" />
                </button>
              )}
            </div>

            {/* Username + Location + Join Date */}
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span className="font-medium">@{profile.username}</span>
              <div className="flex gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Joined {profile.joinDate}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-lg font-black">Bio</p>
              <p className="text-gray-300 text-base leading-relaxed">{profile.bio}</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              {profile.website && (
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4" /> {profile.website}
                </a>
              )}
              {profile.github && (
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-300" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-300" />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={`https://twitter.com/${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-300" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------
            STATISTIC CARDS
        -------------------------------------------------------- */}
        <div className="flex flex-wrap justify-between w-11/12 max-w-6xl gap-5">
          {profile.stats.map((status) => (
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
              <OverviewTab profile={profile} onNavigate={handleNavigate} />
            )}
            {activeTab === "projects" && (
              <ProjectsTab projects={profile.projects} />
            )}
            {activeTab === "badges" && (
              <BadgesTab badges={profile.badges} />
            )}
            {activeTab === "activity" && (
              <ActivityTab activities={profile.activities} />
            )}
            {activeTab === "skills" && (
              <SkillsTab skills={profile.skills} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Status Card Component
 */
function StatusCard({ status }: { status: UserProfile['stats'][0] }) {
  return (
    <div className="flex flex-col justify-center px-6 py-6 bg-gray-900 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all">
      <div className="flex flex-row justify-between items-start mb-4">
        <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
          {renderIcon(status.icon, "w-6 h-6")}
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
}

/**
 * Overview Tab Component
 */
function OverviewTab({ profile, onNavigate }: { profile: UserProfile; onNavigate: (dest: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Featured Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl text-white font-black">
            Featured Projects
          </h3>
          <button 
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            onClick={() => onNavigate(`/profile/${profile.username}?tab=projects`)}
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {profile.projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.name} project={project} />
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
            onClick={() => onNavigate(`/home/achievements`)}
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.badges.slice(0, 4).map((badge) => (
            <BadgeCard key={badge.title} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Projects Tab Component
 */
function ProjectsTab({ projects }: { projects: UserProfile['projects'] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}

/**
 * Badges Tab Component
 */
function BadgesTab({ badges }: { badges: UserProfile['badges'] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <BadgeCard key={badge.title} badge={badge} />
      ))}
    </div>
  );
}

/**
 * Activity Tab Component
 */
function ActivityTab({ activities }: { activities: UserProfile['activities'] }) {
  return (
    <div className="space-y-2">
      {activities.map((activity, i) => (
        <ActivityItem key={i} activity={activity} />
      ))}
    </div>
  );
}

/**
 * Skills Tab Component
 */
function SkillsTab({ skills }: { skills: UserProfile['skills'] }) {
  return (
    <div className="space-y-2">
      {skills.map((skill) => (
        <SkillBar key={skill.name} skill={skill} />
      ))}
    </div>
  );
}

/**
 * Project Card Component
 */
function ProjectCard({ project }: { project: UserProfile['projects'][0] }) {
  return (
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
}

/**
 * Badge Card Component
 */
function BadgeCard({ badge }: { badge: UserProfile['badges'][0] }) {
  return (
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
}

/**
 * Activity Item Component
 */
function ActivityItem({ activity }: { activity: UserProfile['activities'][0] }) {
  return (
    <div className="flex flex-row items-center justify-between border border-gray-700 mt-4 w-full bg-gray-800 rounded-2xl p-4 hover:border-purple-500/50 transition-all">
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-12 h-12 rounded-full ${activity.iconColor} shrink-0 flex items-center justify-center`}
        >
          {renderIcon(activity.icon, "w-5 h-5 text-white")}
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
}

/**
 * Skill Bar Component
 */
function SkillBar({ skill }: { skill: UserProfile['skills'][0] }) {
  return (
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
}

/**
 * Helper function to render icons
 */
function renderIcon(iconName: string, className: string = "") {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
}
