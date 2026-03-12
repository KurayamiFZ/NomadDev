"use client";

import { supabase } from "@/app/supabaseclient";
import { useState, useEffect } from "react";
import { Trophy, Star, Award, Zap } from "lucide-react";
import { AchievementCard } from "@/app/components/AchievementCard";

type Achievement = {
  id: number;
  icon: string;
  title: string;
  description: string;
  rarity: string;
  unlocked: boolean;
  unlockedDate?: string;
  tier: number;
  XP: number;
  progress?: number;
  total?: number;
  requiredFor?: number;
  requiredBy?: number;
};

type NewAchievementProps = {
  isActive?: boolean;
};

export default function NewAchievement({ isActive = false }: NewAchievementProps) {
  const [id, setId] = useState("");
  const [tier, setTier] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);

  // Fetch achievements from Supabase when component is active
  useEffect(() => {
    if (!isActive) return; // Only fetch when tab is active
    
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
      }
    }

    fetchAchievements();
  }, [isActive]);

  // Fetch the next available ID when component mounts
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const { data, error } = await supabase
          .from("achievement")
          .select("id")
          .order("id", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching next ID:", error);
          setError(error.message || "Failed to fetch next ID");
          return;
        }

        // If there are existing achievements, use the highest ID + 1
        if (data && data.length > 0) {
          setNextId(data[0].id + 1);
        } else {
          // If no achievements exist, start with ID 1
          setNextId(1);
        }
      } catch (err) {
        console.error("Failed to fetch next ID:", err);
        setNextId(1); // Fallback to ID 1
      }
    };

    fetchNextId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const achievementData = {
        id: nextId, // Use auto-generated ID
        tier: parseInt(tier),
        title,
        description,
        XP: parseInt(xpReward),
        unlocked,
      };

      const { data, error } = await supabase.from("achievement").insert([achievementData]);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Increment the next ID for future entries
        setNextId(nextId + 1);
        
        // Reset form
        setId("");
        setTier("");
        setTitle("");
        setDescription("");
        setXpReward("");
        setUnlocked(false);
      }
    } catch (err) {
      setError("Failed to create achievement");
    } finally {
      setLoading(false);
    }
  };

  const tierOptions = [
    { value: 1, label: "Bronze", color: "text-orange-400", icon: Trophy },
    { value: 2, label: "Silver", color: "text-gray-400", icon: Star },
    { value: 3, label: "Gold", color: "text-yellow-400", icon: Award },
    { value: 4, label: "Platinum", color: "text-purple-400", icon: Zap },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Create New Achievement</h1>
        </div>

        {/* Auto-generated ID Display */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-400 mb-1">Next Available ID</h3>
              <p className="text-2xl font-bold text-white">{nextId}</p>
            </div>
            <div className="text-xs text-blue-300">
              <p>• Auto-generated from database</p>
              <p>• Incremented after each creation</p>
              <p>• Prevents duplicate IDs</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-400 font-medium">✅ Achievement created successfully with ID: {nextId - 1}!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 font-medium">❌ {error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Achievement ID - Auto-generated display */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Achievement ID (Auto-generated)
            </label>
            <input
              type="number"
              value={nextId}
              readOnly
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed"
              placeholder="ID will be auto-generated"
            />
            <p className="text-xs text-gray-500 mt-1">
              The next available ID is automatically fetched from the database
            </p>
          </div>

          {/* Tier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Achievement Tier
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tierOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTier(option.value.toString())}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    tier === option.value.toString()
                      ? `border-${option.color.split('-')[1]}-500 bg-${option.color.split('-')[1]}-500/20`
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }`}
                >
                  <option.icon className={`w-6 h-6 ${option.color} mx-auto mb-2`} />
                  <span className="text-white font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Achievement Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter achievement title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              placeholder="Describe how to earn this achievement"
              required
            />
          </div>

          {/* XP Reward */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              XP Reward
            </label>
            <input
              type="number"
              value={xpReward}
              onChange={(e) => setXpReward(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter XP reward amount"
              required
            />
          </div>

          {/* Unlocked Status */}
          <div>
            <label className="flex items-center gap-3 text-sm font-medium text-gray-300">
              <input
                type="checkbox"
                checked={unlocked}
                onChange={(e) => setUnlocked(e.target.checked)}
                className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-purple-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              Unlocked by default
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Achievement...
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5" />
                Create Achievement (ID: {nextId})
              </>
            )}
          </button>
          
          {/* Achievement Data Display - Only show when tab is active */}
          {isActive && (
            <div className="mb-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Achievement Database</h2>
              
              {achievements.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No achievements found in database</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={{
                        ...achievement,
                        icon: achievement.icon || "🏆",
                        rarity: achievement.rarity || "common",
                        xpReward: achievement.XP || achievement.xpReward || 0,
                      }}
                      onClick={() =>
                        setExpandedAchievement(
                          expandedAchievement === achievement.id ? null : achievement.id,
                        )
                      }
                      expanded={expandedAchievement === achievement.id}
                      onExpand={() =>
                        setExpandedAchievement(
                          expandedAchievement === achievement.id ? null : achievement.id,
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
