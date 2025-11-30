'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();

  // ------------------------------
  // UI STATE
  // ------------------------------
  const [activeTab, setActiveTab] = useState('overview'); 

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
            <button className="h-8 w-30 ml-8 border border-white rounded-full bg-neutral-950/25">Back</button>
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
            <div className="absolute -bottom-12 left-8 w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-black bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl md:text-6xl font-bold">
              K
              {/* Camera Icon for Avatar */}
              <button className="absolute bottom-0 right-0 w-7 h-7 md:w-9 md:h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white text-sm">📷</button>
            </div>

            {/* Camera for Banner */}
            <button className="absolute top-3 right-3 w-9 h-9 rounded bg-black/30 flex items-center justify-center text-white text-lg">📷</button>
          </div>

          {/* Profile Info Section */}
          <div className="pt-16 px-8 pb-6 flex flex-col space-y-3">

            {/* Name + Badge */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-[Inter] font-black text-white">Kurayami</h2>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
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
            <button className="mt-2 w-360 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <span className="flex text-white font-bold ml-4">Edit Profile</span>
            </button>

            {/* Bio */}
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              Passionate game developer learning to build amazing experiences. Currently mastering Unity and Unreal Engine. Always excited to collaborate on indie game projects!
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-3">
              <a href="#" className="text-purple-400 hover:underline">kurayami.dev</a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">🐙</a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">💼</a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">🐦</a>
            </div>
          </div>
        </div>


        {/* -------------------------------------------------------
            STATISTIC CARDS (LESSONS, STREAKS, ETC.)
        -------------------------------------------------------- */}

        {/* First Row */}
        <div className="flex flex-row justify-between w-11/12 h-80 font-[Inter]">
          {/* Card 1 */}
          <div className="flex flex-col justify-center pl-8 bg-gray-900 w-186 h-full rounded-2xl">
            <div className="flex flex-row justify-between w-11/12 h-25">
              <div className="bg-gray-400 size-25"></div>
              <div className="bg-white size-15"></div>
            </div>
            <span className="text-white text-4xl mb-4 font-black">45</span>
            <span className="text-lg text-light text-gray-300 ">Lesson complete</span>
            <span className="text-sm text-gray-400">30% of course</span>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-center pl-8 bg-gray-900 w-186 h-full rounded-2xl">
            <div className="flex flex-row justify-between w-11/12 h-25">
              <div className="bg-gray-400 size-25"></div>
              <div className="bg-white size-15"></div>
            </div>
            <span className="text-white text-4xl mb-4 font-black">12</span>
            <span className="text-lg text-light text-gray-300 ">Days streak</span>
            <span className="text-sm text-gray-400">Longest: 28 days</span>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-row justify-between w-11/12 h-80 font-[Inter]">
          {/* Card 3 */}
          <div className="flex flex-col justify-center pl-8 bg-gray-900 w-186 h-full rounded-2xl">
            <div className="flex flex-row justify-between w-11/12 h-25">
              <div className="bg-gray-400 size-25"></div>
              <div className="bg-white size-15"></div>
            </div>
            <span className="text-white text-4xl mb-4 font-black">3</span>
            <span className="text-lg text-light text-gray-300 ">Games built</span>
            <span className="text-sm text-gray-400">2 more to go</span>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col justify-center pl-8 bg-gray-900 w-186 h-full rounded-2xl">
            <div className="flex flex-row justify-between w-11/12 h-25">
              <div className="bg-gray-400 size-25"></div>
              <div className="bg-white size-15"></div>
            </div>
            <span className="text-white text-4xl mb-4 font-black">156h</span>
            <span className="text-lg text-light text-gray-300 ">Learning time</span>
            <span className="text-sm text-gray-400">Average: 2.5h/day</span>
          </div>
        </div>


        {/* -------------------------------------------------------
            TABS SECTION (Overview, Projects, Badges, Activity, Skills)
        -------------------------------------------------------- */}
        <div className="bg-gray-900 rounded-xl w-11/12 overflow-x-hidden">

          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-800 overflow-x-auto">
            {['overview', 'projects', 'badges', 'activity', 'skills'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold transition whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab
                    ? 'text-purple-400 border-b-3 border-purple-400 bg-purple-300/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>


          {/* -------------------------------------------------------
              TAB CONTENT
          -------------------------------------------------------- */}
          <div className="p-6">

            {/* -------------------------------------------------------
                OVERVIEW TAB
            -------------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div>
                {/* PROJECTS SHOWCASE */}
                <div className="flex flex-row justify-between w-full h-15">
                  <span className="text-3xl text-white font-black font-[Inter] ml-2">Featured Projects</span>
                  <button className="text-purple-400">View All →</button>
                </div>

                {/* Project Card 1 */}
                <button className="flex flex-col items-start space-y-4 w-365 h-100 rounded-2xl bg-gray-800 border border-gray-600">
                  <div className="flex justify-end bg-blue-800 w-full h-1/2 rounded-t-2xl">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 m-3 text-black rounded-full text-sm font-bold flex items-center gap-1 w-1/12 h-1/6">
                      ⭐ FEATURED
                    </span>
                  </div>
                  <span className="font-bold ml-8 font-[Inter] text-xl text-white">Space Shooter 2D</span>
                  <span className="font-light ml-8 font-[Inter] text-sm text-gray-400">Classic arcade-style space shooter with power-ups and boss battles</span>
                  <div className="flex gap-2 w-full h-7 ml-8 text-gray-300 font-[Inter] font-light">
                    <div className="h-full w-15 rounded-full bg-gray-600">Unity</div>
                    <div className="h-full w-10 rounded-full bg-gray-600">C#</div>
                    <div className="h-full w-20 rounded-full bg-gray-600">Pixel Art</div>
                  </div>
                  <div className="flex ml-8 gap-4 font-[Inter] text-sm text-gray-400 font-light">
                    <span>234</span>
                    <span>1205 views</span>
                  </div>
                </button>

                {/* Project Card 2 */}
                <button className="flex mt-8 flex-col items-start space-y-4 w-365 h-100 rounded-2xl bg-gray-800 border border-gray-600">
                  <div className="flex justify-end bg-green-800 w-full h-1/2 rounded-t-2xl"></div>
                  <span className="font-bold ml-8 font-[Inter] text-xl text-white">Platformer Adventure</span>
                  <span className="font-light ml-8 font-[Inter] text-sm text-gray-400">Retro platformer with smooth movement and challenging levels</span>
                  <div className="flex gap-2 w-full h-7 ml-8 text-gray-300 font-[Inter] font-light">
                    <div className="h-full w-15 rounded-full bg-gray-600">Unity</div>
                    <div className="h-full w-10 rounded-full bg-gray-600">C#</div>
                    <div className="h-full w-28 rounded-full bg-gray-600">2D animation</div>
                  </div>
                  <div className="flex ml-8 gap-4 font-[Inter] text-sm text-gray-400 font-light">
                    <span>189</span>
                    <span>892 views</span>
                  </div>
                </button>

                {/* Achievements Section Title */}
                <div className="flex mt-8 flex-row justify-between w-full h-15">
                  <span className="text-3xl text-white font-black font-[Inter] ml-2">Recent Achievements</span>
                  <button className="text-purple-400">View All →</button>
                </div>

                {/* Achievements First Row */}
                <div className="flex flex-row justify-between w-full h-40 font-[Inter]">
                  <div className="flex flex-col justify-center items-center pl-8 border-3 border-yellow-500 bg-gray-900 w-180 h-full rounded-2xl">
                    <span className="text-white text-4xl mb-4 font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Quick Start</span>
                    <span className="text-sm font-bold text-green-400">Jan 15, 2024</span>
                  </div>
                  <div className="flex flex-col justify-center items-center pl-8 border-3 border-yellow-500 bg-gray-900 w-180 h-full rounded-2xl">
                    <span className="text-white text-4xl mb-4 font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Hot Streak</span>
                    <span className="text-sm font-bold text-green-400">Jan 22, 2024</span>
                  </div>
                </div>

                {/* Achievements Second Row */}
                <div className="flex mt-4 flex-row justify-between w-full h-40 font-[Inter]">
                  <div className="flex flex-col justify-center items-center pl-8 border-3 border-yellow-500 bg-gray-900 w-180 h-full rounded-2xl">
                    <span className="text-white text-4xl mb-4 font-black">45</span>
                    <span className="text-lg font-extrabold text-white">First Game</span>
                    <span className="text-sm font-bold text-green-400">Feb 5, 2024</span>
                  </div>
                  <div className="flex flex-col justify-center items-center pl-8 border-3 border-yellow-500 bg-gray-900 w-180 h-full rounded-2xl">
                    <span className="text-white text-4xl mb-4 font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Dedicated Learner</span>
                    <span className="text-sm font-bold text-green-400">Feb 20, 2024</span>
                  </div>
                </div>
              </div>
            )}


            {/* -------------------------------------------------------
                PROJECTS TAB
            -------------------------------------------------------- */}
            {activeTab === 'projects' && (
              <div>
                {/* Header */}
                <div className="flex flex-row justify-between items-center w-full h-15">
                  <span className="text-3xl text-white font-black font-[Inter] ml-2">All Projects (3)</span>
                  <button className="w-35 h-11 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-sm font-bold text-white"> + New Project </button>
                </div>

                {/* Project Cards */}
                {/* Card 1 */}
                <button className="flex flex-col items-start mt-4 space-y-4 w-365 h-100 rounded-2xl bg-gray-800 border border-gray-600">
                  <div className="flex justify-end bg-blue-800 w-full h-1/2 rounded-t-2xl">
                    <span className="flex justify-center bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 m-3 text-black rounded-full text-sm font-bold flex items-center gap-1 w-11 h-1/6">
                      ⭐ 
                    </span>
                  </div>
                  <span className="font-bold ml-8 font-[Inter] text-xl text-white">Space Shooter 2D</span>
                  <span className="font-light ml-8 font-[Inter] text-sm text-gray-400">Classic arcade-style space shooter with power-ups and boss battles</span>
                  <div className="flex gap-2 w-full h-7 ml-8 text-gray-300 font-[Inter] font-light">
                    <div className="h-full w-15 rounded-full bg-gray-600">Unity</div>
                    <div className="h-full w-10 rounded-full bg-gray-600">C#</div>
                    <div className="h-full w-20 rounded-full bg-gray-600">Pixel Art</div>
                  </div>
                  <div className="flex ml-8 gap-4 font-[Inter] text-sm text-gray-400 font-light">
                    <span>234</span>
                    <span>1205 views</span>
                  </div>
                </button>

                {/* Card 2 */}
                <button className="flex mt-4 flex-col items-start space-y-4 w-365 h-100 rounded-2xl bg-gray-800 border border-gray-600">
                  <div className="flex justify-end bg-green-800 w-full h-1/2 rounded-t-2xl"></div>
                  <span className="font-bold ml-8 font-[Inter] text-xl text-white">Platformer Adventure</span>
                  <span className="font-light ml-8 font-[Inter] text-sm text-gray-400">Retro platformer with smooth movement and challenging levels</span>
                  <div className="flex gap-2 w-full h-7 ml-8 text-gray-300 font-[Inter] font-light">
                    <div className="h-full w-15 rounded-full bg-gray-600">Unity</div>
                    <div className="h-full w-10 rounded-full bg-gray-600">C#</div>
                    <div className="h-full w-28 rounded-full bg-gray-600">2D animation</div>
                  </div>
                  <div className="flex ml-8 gap-4 font-[Inter] text-sm text-gray-400 font-light">
                    <span>189</span>
                    <span>892 views</span>
                  </div>
                </button>

                {/* Card 3 */}
                <button className="flex mt-8 flex-col items-start space-y-4 w-365 h-100 rounded-2xl bg-gray-800 border border-gray-600">
                  <div className="flex justify-end bg-purple-800 w-full h-1/2 rounded-t-2xl"></div>
                  <span className="font-bold ml-8 font-[Inter] text-xl text-white">Puzzle Maze</span>
                  <span className="font-light ml-8 font-[Inter] text-sm text-gray-400">Mind bending puzzle game with 50+ levels</span>
                  <div className="flex gap-2 w-full h-7 ml-8 text-gray-300 font-[Inter] font-light">
                    <div className="h-full w-15 rounded-full bg-gray-600">Unity</div>
                    <div className="h-full w-10 rounded-full bg-gray-600">C#</div>
                    <div className="h-full w-28 rounded-full bg-gray-600">Level Design</div>
                  </div>
                  <div className="flex ml-8 gap-4 font-[Inter] text-sm text-gray-400 font-light">
                    <span>156</span>
                    <span>673 views</span>
                  </div>
                </button>

              </div>
            )}


            {/* -------------------------------------------------------
                BADGES TAB
            -------------------------------------------------------- */}
            {activeTab === 'badges' && (
              <div className="flex flex-col w-full font-[Inter]">

                {/* Header */}
                <div className="flex flex-row justify-between items-center w-full h-15">
                  <span className="text-3xl text-white font-black ml-2">Achievement Badges</span>
                  <span className="text-m text-gray-500 font-light ml-2">4 of 8 earned</span>
                </div>

                {/* Earned Badge Cards */}
                <div className="flex flex-col mt-4 w-full">

                  {/* Badge 1 */}
                  <div className="flex flex-col justify-center items-center space-y-1 pl-8 border-3 border-yellow-500 bg-gray-900 w-full h-35 rounded-2xl">
                    <span className="text-white text-4xl font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Quick Start</span>
                    <span className="text-sm font-light text-gray-500">Completed first lesson</span>
                    <div className="flex justify-center items-center w-25 rounded-full bg-green-500/20 h-5 text-sm font-bold text-green-400">Jan 15, 2024</div>
                  </div>

                  {/* Badge 2 */}
                  <div className="flex flex-col mt-4 justify-center items-center space-y-1 pl-8 border-3 border-yellow-500 bg-gray-900 w-full h-35 rounded-2xl">
                    <span className="text-white text-4xl font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Hot Streak</span>
                    <span className="text-sm font-light text-gray-500">7 day learning streak</span>
                    <div className="flex justify-center items-center w-25 rounded-full bg-green-500/20 h-5 text-sm font-bold text-green-400">Jan 22, 2024</div>
                  </div>

                  {/* Badge 3 */}
                  <div className="flex flex-col mt-4 justify-center items-center space-y-1 pl-8 border-3 border-yellow-500 bg-gray-900 w-full h-35 rounded-2xl">
                    <span className="text-white text-4xl font-black">45</span>
                    <span className="text-lg font-extrabold text-white">First Game</span>
                    <span className="text-sm font-light text-gray-500">Built and published first game</span>
                    <div className="flex justify-center items-center w-25 rounded-full bg-green-500/20 h-5 text-sm font-bold text-green-400">Feb 5, 2024</div>
                  </div>

                  {/* Badge 4 */}
                  <div className="flex flex-col mt-4 justify-center items-center space-y-1 pl-8 border-3 border-yellow-500 bg-gray-900 w-full h-35 rounded-2xl">
                    <span className="text-white text-4xl font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Dedicated Learner</span>
                    <span className="text-sm font-light text-gray-500">100+ hours of learning</span>
                    <div className="flex justify-center items-center w-25 rounded-full bg-green-500/20 h-5 text-sm font-bold text-green-400">Feb 20, 2024</div>
                  </div>

                  {/* Locked Badges */}
                  <div className="flex flex-col mt-4 justify-center items-center space-y-1 opacity-50 pl-8 border-3 border-gray-700 bg-gray-900 w-full h-35 rounded-2xl">
                    <span className="text-white text-4xl font-black">45</span>
                    <span className="text-lg font-extrabold text-white">Week Champion</span>
                    <span className="text-sm font-light text-gray-500">Top learner of the week</span>
                    <div className="flex justify-center items-center w-25 rounded-full h-5 text-sm font-bold text-gray-500">Locked</div>
                  </div>

                  {/* (More locked badges continue...) */}

                </div>
              </div>
            )}

            {/* You can add comments exactly the same way for "activity" and "skills" tabs once they are complete. */}

          </div>
        </div>
      </div>
    </div>
  );
}
