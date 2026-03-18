"use client";

import { supabase } from "@/lib/supabaseclient";
import { useState, useEffect } from "react";
import { Trophy, Star, Award, Zap, Edit, Trash2 } from "lucide-react";
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
  xp: number;
  xpReward?: number; // Add optional xpReward field
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
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Debug state changes
  useEffect(() => {
    console.log('State changed:', {
      isEditMode,
      selectedAchievement: selectedAchievement?.id,
      title,
      tier,
      success,
      error
    });
  }, [isEditMode, selectedAchievement, title, tier, success, error]);

  // Fetch achievements from Supabase when component is active
  useEffect(() => {
    if (!isActive) return; // Only fetch when tab is active
    
    console.log('Fetching achievements - isActive:', isActive);
    
    async function fetchAchievements() {
      try {
        const { data, error } = await supabase.from("achievement").select("*");

        if (error) {
          console.error("Error fetching achievements:", error);
        } else {
          console.log('Achievements fetched:', data?.length, 'items');
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
        id: isEditMode && selectedAchievement ? selectedAchievement.id : nextId,
        tier: parseInt(tier),
        title,
        description,
        xp: parseInt(xpReward),
        unlocked,
      };

      let result;
      if (isEditMode && selectedAchievement) {
        // Update existing achievement
        result = await supabase
          .from("achievement")
          .update(achievementData)
          .eq("id", selectedAchievement.id);
      } else {
        // Create new achievement
        result = await supabase.from("achievement").insert([achievementData]);
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess(true);
        if (!isEditMode) {
          setNextId(nextId + 1);
        }
        
        // Refresh achievements list
        const { data: refreshedData } = await supabase.from("achievement").select("*");
        setAchievements(refreshedData || []);
        
        // Reset form - only reset if not in edit mode
        if (!isEditMode) {
          resetForm();
        } else {
          // In edit mode, just clear success message but keep the achievement selected
          setTimeout(() => setSuccess(false), 2000);
        }
      }
    } catch (err) {
      setError(isEditMode ? "Failed to update achievement" : "Failed to create achievement");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    console.log('Resetting form - clearing edit mode');
    setId("");
    setTier("");
    setTitle("");
    setDescription("");
    setXpReward("");
    setUnlocked(false);
    setSelectedAchievement(null);
    setIsEditMode(false);
    setSuccess(false);
    setError(null);
  };

  const handleSelectAchievement = (achievement: Achievement) => {
    console.log('Selecting achievement:', achievement);
    setSelectedAchievement(achievement);
    setIsEditMode(true);
    
    // Load achievement data into form
    setTier(achievement.tier.toString());
    setTitle(achievement.title);
    setDescription(achievement.description);
    setXpReward(achievement.xp?.toString() || achievement.xpReward?.toString() || "0");
    setUnlocked(achievement.unlocked);
    
    console.log('Edit mode activated:', true);
    
    // Scroll to the form to show the loaded data
    setTimeout(() => {
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDeleteAchievement = async (achievementId: number) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    
    try {
      const { error } = await supabase
        .from("achievement")
        .delete()
        .eq("id", achievementId);
      
      if (error) {
        setError(error.message);
      } else {
        // Refresh achievements list
        const { data: refreshedData } = await supabase.from("achievement").select("*");
        setAchievements(refreshedData || []);
        
        // Reset form if deleted achievement was selected
        if (selectedAchievement?.id === achievementId) {
          resetForm();
        }
      }
    } catch (err) {
      setError("Failed to delete achievement");
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
          <h1 className="text-3xl font-bold text-white">
            {isEditMode ? `Edit Achievement #${selectedAchievement?.id}` : "Create New Achievement"}
          </h1>
        </div>

        {/* Edit Mode Indicator */}
        {isEditMode && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-yellow-400 mb-1">Edit Mode</h3>
                <p className="text-white">Editing Achievement #{selectedAchievement?.id}: {selectedAchievement?.title}</p>
              </div>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors font-medium"
              >
                ✕ Cancel Edit
              </button>
            </div>
          </div>
        )}

        {/* Auto-generated ID Display - Only show in create mode */}
        {!isEditMode && (
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
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-400 font-medium">
              ✅ Achievement {isEditMode ? "updated" : "created"} successfully!
              {isEditMode ? ` (ID: ${selectedAchievement?.id})` : ` (ID: ${nextId - 1})`}
            </p>
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
          {/* Achievement ID - Show in edit mode, auto-generated in create mode */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Achievement ID {isEditMode ? "(Editing)" : "(Auto-generated)"}
            </label>
            <input
              type="number"
              value={isEditMode ? selectedAchievement?.id : nextId}
              readOnly
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed"
              placeholder={isEditMode ? "Achievement ID" : "ID will be auto-generated"}
            />
            <p className="text-xs text-gray-500 mt-1">
              {isEditMode ? "This achievement's ID cannot be changed" : "The next available ID is automatically fetched from the database"}
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

          {/* xp Reward */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              xp reward
            </label>
            <input
              type="number"
              value={xpReward}
              onChange={(e) => setXpReward(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter xp reward amount"
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
          <div className="flex gap-3">
            {isEditMode && (
              <button
                type="button"
                onClick={() => handleDeleteAchievement(selectedAchievement?.id || 0)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                Delete Achievement
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 ${isEditMode ? "bg-blue-600 hover:bg-blue-500" : "bg-purple-600 hover:bg-purple-500"} disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  {isEditMode ? `Update Achievement #${selectedAchievement?.id}` : `Create Achievement (ID: ${nextId})`}
                </>
              )}
            </button>
          </div>
          
          {/* Achievement Data Display - Only show when tab is active */}
          {isActive && (
            <div className="mb-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Achievement Database {isEditMode && `(Editing #${selectedAchievement?.id})`}
              </h2>
              <p className="text-gray-400 mb-4">
                Click on any achievement to edit its details, or use the quick action buttons.
              </p>
              
              {achievements.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No achievements found in database</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => {
                    const isSelected = selectedAchievement?.id === achievement.id;
                    return (
                      <div key={achievement.id} className={`relative ${isSelected ? 'ring-2 ring-blue-500 rounded-xl' : ''}`}>
                        <AchievementCard
                          achievement={{
                            ...achievement,
                            icon: achievement.icon || "🏆",
                            rarity: achievement.rarity || "common",
                            xpReward: achievement.xp || achievement.xpReward || 0,
                          }}
                          onClick={() => handleSelectAchievement(achievement)}
                          expanded={expandedAchievement === achievement.id}
                          onExpand={() =>
                            setExpandedAchievement(
                              expandedAchievement === achievement.id ? null : achievement.id,
                            )
                          }
                        />
                        {/* Quick Action Buttons */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAchievement(achievement);
                            }}
                            className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                            title="Edit Achievement"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAchievement(achievement.id);
                            }}
                            className="p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                            title="Delete Achievement"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            ✓ Selected
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
