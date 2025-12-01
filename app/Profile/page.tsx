"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();

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
  };

  type Skill = {
    name: string;
    percent: number;
  };

  type Status = {
    value: string;
    title: string;
    subtitle: string;
  };

  const projectsData: Project[] = [
    {
      name: "Space Shooter 2D",
      description:
        "Classic arcade-style space shooter with power-ups and boss battles",
      tags: ["Unity", "C#", "Pixel Art"],
      likes: 234,
      views: 1205,
      color: "blue-800",
      featured: true,
    },
    {
      name: "Platformer Adventure",
      description:
        "Retro platformer with smooth movement and challenging levels",
      tags: ["Unity", "C#", "2D animation"],
      likes: 189,
      views: 892,
      color: "green-800",
    },
    {
      name: "Puzzle Maze",
      description: "Mind bending puzzle game with 50+ levels",
      tags: ["Unity", "C#", "Level Design"],
      likes: 156,
      views: 673,
      color: "purple-800",
    },
  ];

  const statusData: Status[] = [
    { value: "45", title: "Lessons Completed", subtitle: "30% of Course" },
    { value: "12", title: "Days Streak", subtitle: "Longest: 28 days" },
    { value: "3", title: "Games Built", subtitle: "2 more to go" },
    { value: "156h", title: "Learning Time", subtitle: "Average: 2.5h/day" },
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
      iconColor: "blue-500",
      time: "2 hours ago",
    },
    {
      title: "Published 'Space Shooter'",
      subtitle: "Received 50+ likes",
      iconColor: "green-500",
      time: "1 day ago",
    },
    {
      title: "Earned 'Dedicated Learner' badge",
      subtitle: "100 hours milestone",
      iconColor: "orange-500",
      time: "3 days ago",
    },
    {
      title: "Completed 'Character Animation'",
      subtitle: "Week 3, Lesson 8",
      iconColor: "blue-500",
      time: "5 days ago",
    },
    {
      title: "Helped 5 Students In Discord",
      subtitle: "Answered questions about C#",
      iconColor: "purple-500",
      time: "1 week ago",
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
    <div className="flex flex-col justify-center pl-8 bg-gray-900 w-186 h-1/2 rounded-2xl">
      <div className="flex flex-row justify-between w-11/12 h-25">
        <div className="bg-gray-400 size-25"></div>
        <div className="bg-white size-15"></div>
      </div>
      <span className="text-white text-4xl mb-4 font-black">
        {status.value}
      </span>
      <span className="text-lg text-light text-gray-300 ">{status.title}</span>
      <span className="text-sm text-gray-400">{status.subtitle}</span>
    </div>
  );

  const ProjectCard = ({ project }: { project: Project }) => (
    <button className="flex flex-col items-start mt-4 space-y-4 w-365 h-100 rounded-2xl bg-gray-800 border border-gray-600">
      <div
        className={`flex justify-end w-full h-1/2 rounded-t-2xl bg-${project.color}`}
      >
        {project.featured && (
          <span className="flex justify-center items-center bg-linear-to-r from-yellow-400 to-orange-500 px-2 py-1 m-3 text-black rounded-full text-sm font-bold gap-1 w-11 h-1/6">
            ⭐
          </span>
        )}
      </div>
      <span className="font-bold ml-8 font-[Inter] text-xl text-white">
        {project.name}
      </span>
      <span className="font-light ml-8 font-[Inter] text-sm text-gray-400">
        {project.description}
      </span>
      <div className="flex gap-2 w-full h-7 ml-8 text-gray-300 font-[Inter] font-light">
        {project.tags.map((tag) => (
          <div key={tag} className="h-full rounded-full bg-gray-600 px-2">
            {tag}
          </div>
        ))}
      </div>
      <div className="flex ml-8 gap-4 font-[Inter] text-sm text-gray-400 font-light">
        <span>{project.likes}</span>
        <span>{project.views} views</span>
      </div>
    </button>
  );

  const BadgeCard = ({ badge }: { badge: Badge }) => (
    <div
      className={`flex flex-col mt-4 justify-center items-center space-y-1 w-full pl-8 border-3 ${
        badge.earned ? "border-yellow-500" : "border-gray-700"
      } bg-gray-900 px-2 h-35 rounded-2xl ${!badge.earned && "opacity-50"}`}
    >
      <span className="text-white text-4xl font-black">45</span>
      <span className="text-lg font-extrabold text-white">{badge.title}</span>
      <span className="text-sm font-light text-gray-500">
        {badge.description}
      </span>
      <div
        className={`flex justify-center items-center w-25 rounded-full h-5 text-sm font-bold ${
          badge.earned ? "bg-green-500/20 text-green-400" : "text-gray-500"
        }`}
      >
        {badge.earned ? badge.date : "Locked"}
      </div>
    </div>
  );

  const ActivityItem = ({ activity }: { activity: Activity }) => (
    <div className="flex flex-row items-center justify-between border border-gray-600 mt-4 w-full h-33 bg-gray-800 rounded-2xl">
      <div className="flex w-9/12 h-20">
        <div
          className={`w-20 h-18 rounded-full ml-8 bg-${activity.iconColor}`}
        ></div>
        <div className="w-full h-full flex flex-col justify-center ml-4 font-[Inter]">
          <span className="text-lg font-bold text-white">{activity.title}</span>
          <span className="text-lg font-light text-gray-500">
            {activity.subtitle}
          </span>
        </div>
      </div>
      <div className="flex w-1/12 h-full">
        <span className="text-sm mt-8 text-gray-500 font-light font-[Inter]">
          {activity.time}
        </span>
      </div>
    </div>
  );

  const SkillBar = ({ skill }: { skill: Skill }) => (
    <div className="flex flex-col mt-4 space-y-2 w-full h-1/9">
      <div className="flex flex-row justify-between items-center">
        <span className="text-xl text-white font-bold font-[Inter]">
          {skill.name}
        </span>
        <span className="text-sm text-purple-500 font-bold">
          {skill.percent}%
        </span>
      </div>
      <div className="bg-gray-800 w-full h-5 rounded-full">
        <div
          className="bg-linear-to-r rounded-full from-purple-500 to-pink-500"
          style={{ width: `${skill.percent}%`, height: "100%" }}
        ></div>
      </div>
    </div>
  );

  // ------------------------------
  // UI STATE
  // ------------------------------
  const [activeTab, setActiveTab] = useState("overview");

  // ------------------------------
  // TEMPORARY DUMMY DATA
  // (prevents crashes if data empty)
  // ------------------------------
  const projects: any[] = [];
  const badges: any[] = [];
  const skills: any[] = [];
  const recentActivity: any[] = [];
  const getActivityIcon = () => <span>🎮</span>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-black overflow-hidden">
      {/* -------------------------------------------------------
          HEADER (FIXED POSITION)
      -------------------------------------------------------- */}
      <div className="flex flex-row items-center justify-between w-full py-4 bg-gray-900 border-b border-gray-600 h-20 fixed top-0 left-0 z-50">
        {/* Left Section (Back + Title) */}
        <div>
          <button
            className="h-8 w-30 ml-8 border border-white rounded-full bg-neutral-950/25"
            onClick={() => router.push("/Home")}
          >
            Back
          </button>
          <span className="font-black ml-8 text-white text-2xl">Profile</span>
        </div>

        {/* Right Section (Share + Settings) */}
        <div className="flex justify-end w-1/2 h-full mr-8 space-x-8">
          <div className="flex flex-row justify-center items-center bg-gray-800 rounded-xl w-25 h-9">
            <span className="font-light text-sm text-white">Share</span>
          </div>
          <div className="flex flex-row justify-center items-center bg-gray-800 rounded-xl w-25 h-9">
            <span className="font-light text-sm text-white">Settings</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------
          MAIN CONTENT (SCROLLABLE AREA)
      -------------------------------------------------------- */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col items-center pt-24 pb-16 space-y-6">
        {/* -------------------------------------------------------
            PROFILE HEADER CARD (BANNER + AVATAR + INFO)
        -------------------------------------------------------- */}
        <div className="w-11/12 mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
          {/* Banner */}
          <div className="h-40 bg-linear-[170deg] from-purple-500 via-pink-500 to-purple-500 relative">
            {/* Avatar */}
            <div className="absolute -bottom-12 left-8 w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-black bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl md:text-6xl font-bold">
              K{/* Camera Icon for Avatar */}
              <button className="absolute bottom-0 right-0 w-7 h-7 md:w-9 md:h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white text-sm">
                📷
              </button>
            </div>

            {/* Camera for Banner */}
            <button className="absolute top-3 right-3 w-9 h-9 rounded bg-black/30 flex items-center justify-center text-white text-lg">
              📷
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="pt-16 px-8 pb-6 flex flex-col space-y-3">
            {/* Name + Badge */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-[Inter] font-black text-white">
                Kurayami
              </h2>
              <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                ⭐ Rising Star
              </span>
            </div>

            {/* Username + Location + Join Date */}
            <div className="flex flex-col font-[Inter] gap-4 text-gray-400 text-light md:text-base">
              <span>@kurathedev</span>
              <div className="space-x-2">
                <span>Ulaanbaatar, MN</span>
                <span>Joined January 2022</span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="mt-2 w-360 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg">
              <span className="flex text-white font-bold ml-4">
                Edit Profile
              </span>
            </button>

            {/* Bio */}
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              Passionate game developer learning to build amazing experiences.
              Currently mastering Unity and Unreal Engine. Always excited to
              collaborate on indie game projects!
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-3">
              <a href="#" className="text-purple-400 hover:underline">
                kurayami.dev
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                🐙
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                💼
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                🐦
              </a>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------
            STATISTIC CARDS (LESSONS, STREAKS, ETC.)
        -------------------------------------------------------- */}
        <div className="flex flex-row justify-between w-11/12 h-120 font-[Inter] flex-wrap gap-5">
          {statusData.map((status) => (
            <StatusCard key={status.title} status={status} />
          ))}
        </div>

        {/* -------------------------------------------------------
            TABS SECTION (Overview, Projects, Badges, Activity, Skills)
        -------------------------------------------------------- */}
        <div className="bg-gray-900 mt-8 rounded-xl w-11/12 overflow-x-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-800 overflow-x-auto">
            {["overview", "projects", "badges", "activity", "skills"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-bold transition whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab
                      ? "text-purple-400 border-b-3 border-purple-400 bg-purple-300/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          {/* -------------------------------------------------------
              TAB CONTENT
          -------------------------------------------------------- */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="flex flex-col mb-6">
                <div className="flex justify-between items-center w-full h-20">
                  <span className="text-2xl text-white font-black font-[Inter]">
                    Featured Projects
                  </span>
                  <button className="text-purple-400">View All</button>
                </div>
                <div>
                  {projectsData.slice(0, 2).map((p) => (
                    <ProjectCard key={p.name} project={p} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  {badgesData.slice(0, 4).map((b) => (
                    <BadgeCard key={b.title} badge={b} />
                  ))}
                </div>
              </div>
            )}
            {activeTab === "projects" &&
              projectsData.map((p) => <ProjectCard key={p.name} project={p} />)}
            {activeTab === "badges" &&
              badgesData.map((b) => <BadgeCard key={b.title} badge={b} />)}
            {activeTab === "activity" &&
              activitiesData.map((a, i) => (
                <ActivityItem key={i} activity={a} />
              ))}
            {activeTab === "skills" &&
              skillsData.map((s) => <SkillBar key={s.name} skill={s} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
