/**
 * Admin Add Page - GameDev Academy Platform
 *
 * Administrative page for adding new content to the system.
 * Uses SelectTabWidget for tab navigation and content management.
 *
 * @page
 * @returns {JSX.Element} Admin add page
 */

"use client";

import { useState, useEffect } from "react";
import SelectTabWidget from "@/app/components/admin_ui/Add_data";
import { AchievementCard } from "@/app/components/AchievementCard";
import { supabase } from "@/app/supabaseclient";

export default function Add() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(
    null,
  );

  // Fetch achievements from Supabase
  useEffect(() => {
    async function fetchAchievements() {
      try {
        const { data, error } = await supabase.from("achievement").select("*");

        if (error) {
          console.error("Error fetching achievements:", error);
        } else {
          setAchievements(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Main Content */}
      <main className="p-8">
        {/* SelectTabWidget for adding new content */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Add New Content
          </h2>
          <SelectTabWidget />
        </div>
      </main>
    </div>
  );
}
