"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  type Lessons = {};
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="flex min-h-screen w-screen bg-black">
      <div className="flex flex-col items-center p-4 w-1/7 h-screen border-r border-gray-600 bg-gray-900">
        {/* SIDEBAR */}
        <div className="flex flex-row justify-center items-center w-full h-15">
          <div className="size-15 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl"></div>
          <span className="text-2xl font-black">Nomad Dev</span>
          <div className="bg-gray-900 mt-8 rounded-xl w-11/12 overflow-x-hidden">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-800 overflow-x-auto">
              {[
                "Overview",
                "My lessons",
                "Projects",
                "Community",
                "Live Classes",
                "Achievements",
              ].map((tab) => (
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
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-6/7 h-screen">
          {/* HEADER */}
          <div className="flex flex-row justify-between items-center p-8 w-full h-25 bg-gray-900">
            {/* SEARCH BAR */}
            <div className="flex justify-center items-center h-10 w-70 bg-black border border-gray-700 rounded-xl">
              <textarea
                placeholder={"Search"}
                className="ml-8 w-full h-full outline-none text-lg text-white resize-none "
              ></textarea>
            </div>
            {/* PROFILE */}
            <div>
              <button
                className="w-25 h-15 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-700 text-white font-semibold text-xl"
                onClick={() => router.push("/profile")}
              >
                Kura
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center p-8  overflow-auto w-full h-203">
            <div className="flex flex-col justify-center w-full h-50 bg-linear-to-r from-purple-800 via-rose-800 to-purple-800 p-8 rounded-2xl ">
              <span className="text-white font-[Inter] text-4xl font-black">
                Welcome back, Kura!
              </span>
              <span className="text-white text-2xl font-[Inter] font-light">
                You're in Week 2 of your journey. Keep up the momentum!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
