"use client";

import { useState } from "react";
import Icon from "../icons";
import NewAchievement from "./NewAchievement";
import NewCourse from "./NewCourse";

const selectTabWidget = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const tabs = [
    {
      id: "courses",
      label: "Courses",
      content: <NewCourse isActive={activeTab === "courses"} />,
    },
    {
      id: "achievement",
      label: "Achievements",
      content: <NewAchievement isActive={activeTab === "achievement"} />,
    },
    {
      id: "live",
      label: "Live Lessons",
      content: <div></div>,
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);
  return (
    <div>
      <h1 className="text-4xl font-black mb-8">Select Tab Widget Example</h1>

      {/* The Select Dropdown */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-3 text-gray-400">
          CHOOSE A SECTION
        </label>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full bg-gray-900 border-2 border-gray-800 rounded-xl px-6 py-4 text-lg font-bold focus:border-purple-500 focus:outline-none cursor-pointer hover:border-gray-700 transition"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content Area - Shows the active tab's content */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
        {currentTab && (
          <div>
            {/* Tab Header with Icon */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-800">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center"></div>
              <div>
                <div className="text-sm text-gray-400 font-medium">
                  CURRENT SECTION
                </div>
                <div className="text-xl font-black">{currentTab.label}</div>
              </div>
            </div>

            {/* Tab Content */}
            {currentTab.content}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-purple-500/30 bg-opacity-10 border border-purple-500 rounded-xl p-6">
        <h3 className="font-bold text-purple-400 mb-2">How it works:</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Select a section from dropdown above</li>
          <li>• The content updates automatically based on your selection</li>
          <li>• Each option in dropdown represents a different tab</li>
          <li>• You can add as many tabs as you need with different content</li>
        </ul>
      </div>
    </div>
  );
};

export default selectTabWidget;
