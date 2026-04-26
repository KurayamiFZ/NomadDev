/**
 * Profile Tabs Component - GameDev Academy Platform
 * 
 * Handles tab navigation and content display for user profiles.
 * Supports overview, projects, badges, activity, and skills tabs.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile} props.profile - User profile data
 * @param {Function} props.onNavigate - Navigation callback
 * @returns {JSX.Element} Tabbed interface with content
 */

"use client";

import { useState, memo } from "react";
import { UserProfile } from "@/lib/types";
import { OverviewTab } from "./tabs/OverviewTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { BadgesTab } from "./tabs/BadgesTab";
import { ActivityTab } from "./tabs/ActivityTab";
import { SkillsTab } from "./tabs/SkillsTab";

interface ProfileTabsProps {
  profile: UserProfile;
  onNavigate: (destination: string) => void;
}

/**
 * Profile Tabs Component
 * 
 * Manages tab state and renders appropriate content based on active tab.
 * Provides responsive tab navigation with visual indicators.
 */
export const ProfileTabs = memo(function ProfileTabs({ profile, onNavigate }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "badges", label: "Badges" },
    { id: "activity", label: "Activity" },
    { id: "skills", label: "Skills" },
  ];

  // Memoized tab content to prevent unnecessary re-renders
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab profile={profile} onNavigate={onNavigate} />;
      case "projects":
        return <ProjectsTab projects={profile.projects} />;
      case "badges":
        return <BadgesTab badges={profile.badges} username={profile.username} />;
      case "activity":
        return <ActivityTab activities={profile.activities} />;
      case "skills":
        return <SkillsTab skills={profile.skills} />;
      default:
        return <OverviewTab profile={profile} onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl w-11/12 max-w-6xl mt-8 overflow-hidden border border-gray-800">
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Tab Content - Only render active tab */}
      <div className="p-4 sm:p-6">
        {renderTabContent()}
      </div>
    </div>
  );
});

/**
 * Tab Navigation Component
 * 
 * Renders the tab buttons with active state styling.
 */
const TabNavigation = memo(function TabNavigation({ 
  tabs, 
  activeTab, 
  onTabChange 
}: { 
  tabs: Array<{ id: string; label: string }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="flex border-b border-gray-800 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 sm:px-6 py-3 sm:py-4 font-bold transition whitespace-nowrap text-xs sm:text-sm ${
            activeTab === tab.id
              ? "text-purple-400 border-b-2 border-purple-400 bg-purple-500/10"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});
