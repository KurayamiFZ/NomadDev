"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, Lock, Search } from "lucide-react";
import { AchievementCard } from "../../components/AchievementCard";
import { supabase } from "@/lib/supabaseclient";
import Icon from "@/app/components/icons";

const rarityConfig = {
  common: {
    label: "Common",
    bgFrom: "from-blue-500/20",
    bgTo: "to-cyan-500/20",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400",
  },
  uncommon: {
    label: "Uncommon",
    bgFrom: "from-purple-500/20",
    bgTo: "to-pink-500/20",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-400",
  },
  rare: {
    label: "Rare",
    bgFrom: "from-yellow-500/20",
    bgTo: "to-orange-500/20",
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-400",
  },
  epic: {
    label: "Epic",
    bgFrom: "from-red-500/20",
    bgTo: "to-rose-500/20",
    borderColor: "border-red-500/50",
    textColor: "text-red-400",
  },
};

export default function AchievementsEnhanced() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);
  
  // Animation states
  const [statsVisible, setStatsVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  
  // Refs for scroll-triggered animations
  const statsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAchievements() {
      const { data, error } = await supabase.from("achievement").select("*");

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      setAchievements(data || []);
      setLoading(false);
    }

    fetchAchievements();
    
    // Trigger stats animation after a short delay
    setTimeout(() => setStatsVisible(true), 300);
    
    // Setup scroll observers
    const setupScrollObserver = (ref: React.RefObject<HTMLDivElement | null>, setState: (visible: boolean) => void) => {
      if (!ref.current) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState(true);
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref.current);
      return () => observer.disconnect();
    };
    
    const cleanupFilters = setupScrollObserver(filtersRef, setFiltersVisible);
    const cleanupAchievements = setupScrollObserver(achievementsRef, setAchievementsVisible);
    
    return () => {
      cleanupFilters?.();
      cleanupAchievements?.();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-black items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading achievements...</p>
        </div>
      </div>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const totalxp = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + (a.xp || a.xpReward || 0), 0);

  const filteredAchievements = achievements.filter((a) => {
    const matchesSearch = a.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTier = selectedTier === null || a.tier === selectedTier;

    return matchesSearch && matchesTier;
  });

  const achievementsByTier = {
    1: achievements.filter((a) => a.tier === 1),
    2: achievements.filter((a) => a.tier === 2),
    3: achievements.filter((a) => a.tier === 3),
    4: achievements.filter((a) => a.tier === 4),
  };

  const tierLabels = {
    1: "Apprentice",
    2: "Journeyman",
    3: "Expert",
    4: "Master",
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Animated Background - Unique Aurora Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-purple-500/10 rounded-full blur-[180px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.03)_0%,transparent_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex-1">
        {/* Header with Stats */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transform transition-transform duration-300 hover:scale-110" />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 w-64 focus:border-purple-500 focus:outline-none text-sm backdrop-blur-sm transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-purple-500/20"
                />
              </div>
              
              {/* Stats Bar */}
              <div 
                ref={statsRef}
                className={`bg-linear-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-3 ml-4 transform transition-all duration-700 ease-out hover:shadow-lg hover:shadow-purple-500/20 ${
                  statsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm">
                      {unlockedCount}/{totalCount}
                    </span>
                    <div className="w-px h-4 bg-white/20"></div>
                    <div className="flex items-center gap-2">
                      <Icon
                        name="Sparkles"
                        className="w-4 h-4 text-purple-400"
                      />
                      <span className="font-bold text-sm text-purple-400">
                        {totalxp.toLocaleString()} xp
                      </span>
                    </div>
                  </div>
                  <button className="relative p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10 transform hover:scale-110 hover:shadow-lg">
                    <Icon name="Bell" className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-8">
          {/* Featured Achievement */}
          {achievements.find((a) => a.unlocked && a.tier >= 3) && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Featured Achievement
              </h2>
              <div className="bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
                    {achievements.find((a) => a.unlocked && a.tier >= 3)
                      ?.icon || "🏆"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {achievements.find((a) => a.unlocked && a.tier >= 3)
                        ?.title || "Master Achievement"}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      {achievements.find((a) => a.unlocked && a.tier >= 3)
                        ?.description || "You've mastered advanced skills"}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-yellow-400 font-medium">
                        +
                        {achievements.find((a) => a.unlocked && a.tier >= 3)
                          ?.xp || 500}{" "}
                        xp
                      </span>
                      <span className="text-gray-400">
                        Tier{" "}
                        {achievements.find((a) => a.unlocked && a.tier >= 3)
                          ?.tier || 3}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Tier Progress */}
          <section className="mb-12">
            <h3 className="text-xl flex flex-row gap-4 font-black text-white mb-6">
              <Trophy className="size-6 text-purple-400" />
              Achievement Tiers
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((tier) => {
                const tierAchievements =
                  achievementsByTier[tier as keyof typeof achievementsByTier];
                const unlocked = tierAchievements.filter(
                  (a) => a.unlocked,
                ).length;
                const total = tierAchievements.length;
                const progress = total > 0 ? (unlocked / total) * 100 : 0;

                return (
                  <button
                    key={tier}
                    onClick={() =>
                      setSelectedTier(selectedTier === tier ? null : tier)
                    }
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                      selectedTier === tier
                        ? "bg-white/10 border-purple-500 shadow-lg shadow-purple-500/20"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-xl ${
                            selectedTier === tier
                              ? "bg-purple-500/20"
                              : "bg-white/10"
                          }`}
                        >
                          {tier === 1 && (
                            <Icon
                              name="Star"
                              className="size-5 text-blue-400"
                            />
                          )}
                          {tier === 2 && (
                            <Icon name="Zap" className="size-5 text-cyan-400" />
                          )}
                          {tier === 3 && (
                            <Icon
                              name="Shield"
                              className="size-5 text-green-400"
                            />
                          )}
                          {tier === 4 && (
                            <Icon
                              name="Crown"
                              className="size-5 text-yellow-400"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-lg">
                            Tier {tier}:{" "}
                            {tierLabels[tier as keyof typeof tierLabels]}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {unlocked} of {total} achievements unlocked
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black">
                          {Math.round(progress)}%
                        </div>
                        <Icon
                          name="ChevronRight"
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            selectedTier === tier ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 gap-8">
            {selectedTier === null ? (
              // Show all achievements in a masonry-style grid
              <div>
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <Icon name="Award" className="size-6 text-cyan-400" />
                  All Achievements
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={{
                        ...achievement,
                        icon: achievement.icon || "🏆",
                        rarity: achievement.tier,
                        xpReward: achievement.xp || achievement.xpReward || 0,
                      }}
                      onClick={() =>
                        setExpandedAchievement(
                          expandedAchievement === achievement.id
                            ? null
                            : achievement.id,
                        )
                      }
                      expanded={expandedAchievement === achievement.id}
                      onExpand={() =>
                        setExpandedAchievement(
                          expandedAchievement === achievement.id
                            ? null
                            : achievement.id,
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Show selected tier with detailed view
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">
                    {tierLabels[selectedTier as keyof typeof tierLabels]} Tier
                  </h3>
                  <button
                    onClick={() => setSelectedTier(null)}
                    className="text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-2"
                  >
                    View All
                    <Icon name="ChevronRight" className="size-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {achievementsByTier[
                    selectedTier as keyof typeof achievementsByTier
                  ].map((achievement) => {
                    const config =
                      rarityConfig[
                        achievement.rarity as keyof typeof rarityConfig
                      ] || rarityConfig.common;
                    const progress = achievement.progress / achievement.total;
                    const isExpanded = expandedAchievement === achievement.id;

                    return (
                      <div
                        key={achievement.id}
                        onClick={() =>
                          setExpandedAchievement(
                            isExpanded ? null : achievement.id,
                          )
                        }
                        className={`relative group rounded-2xl border-2 overflow-hidden transition-all cursor-pointer ${
                          achievement.unlocked
                            ? `bg-linear-to-br ${config.bgFrom} ${config.bgTo} ${config.borderColor}`
                            : "bg-white/5 border-white/10"
                        } ${isExpanded ? "ring-2 ring-purple-500" : ""}`}
                      >
                        <div
                          className={`p-6 transition-all ${isExpanded ? "" : ""}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="text-6xl">{achievement.icon}</div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                                achievement.unlocked
                                  ? "bg-white/20 text-white"
                                  : "bg-white/10 text-gray-400"
                              }`}
                            >
                              {achievement.unlocked ? (
                                <>
                                  <Icon name="Star" className="size-3" />
                                  {achievement.xp} xp
                                </>
                              ) : (
                                <>
                                  <Icon name="Lock" className="size-3" />
                                  Locked
                                </>
                              )}
                            </div>
                          </div>

                          <h3 className="text-xl font-black mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-4">
                            {achievement.description}
                          </p>

                          {/* Progress Bar */}
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Progress</span>
                              <span className="font-bold">
                                {achievement.progress}/{achievement.total}
                              </span>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  achievement.unlocked
                                    ? "bg-linear-to-r from-yellow-500 to-orange-500"
                                    : "bg-purple-500"
                                }`}
                                style={{
                                  width: `${Math.min(progress * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in fade-in">
                              <div className="text-xs">
                                <span className="text-gray-400">Rarity:</span>
                                <span
                                  className={`ml-2 font-bold ${config.textColor}`}
                                >
                                  {config.label}
                                </span>
                              </div>
                              {achievement.unlocked &&
                                achievement.unlockedDate && (
                                  <div className="text-xs">
                                    <span className="text-gray-400">
                                      Unlocked:
                                    </span>
                                    <span className="ml-2 font-bold">
                                      {achievement.unlockedDate}
                                    </span>
                                  </div>
                                )}
                              <div className="text-xs">
                                <span className="text-gray-400">Tier:</span>
                                <span className="ml-2 font-bold">
                                  Tier {achievement.tier}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
