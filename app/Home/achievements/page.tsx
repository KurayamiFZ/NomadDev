"use client";

import { useState } from "react";
import Icon from "../../components/icons";

// Achievement data with rarity tiers and unlock chains
const allAchievements = [
  // Common (Blue)
  {
    id: 1,
    icon: "🎯",
    title: "First Lesson",
    description: "Complete your first lesson",
    rarity: "common",
    unlocked: true,
    unlockedDate: "2026-01-15",
    tier: 1,
    xpReward: 100,
    progress: 1,
    total: 1,
  },
  {
    id: 2,
    icon: "📚",
    title: "Knowledge Seeker",
    description: "Complete 5 lessons",
    rarity: "common",
    unlocked: true,
    unlockedDate: "2026-01-20",
    tier: 2,
    xpReward: 250,
    progress: 5,
    total: 5,
    requiredFor: 6,
  },
  {
    id: 3,
    icon: "🔥",
    title: "7 Day Streak",
    description: "Maintain a 7-day learning streak",
    rarity: "common",
    unlocked: true,
    unlockedDate: "2026-02-01",
    tier: 1,
    xpReward: 350,
    progress: 7,
    total: 7,
  },
  {
    id: 4,
    icon: "⚡",
    title: "Quick Learner",
    description: "Complete a lesson in under 5 minutes",
    rarity: "common",
    unlocked: false,
    tier: 2,
    xpReward: 150,
    progress: 0,
    total: 1,
  },

  // Uncommon (Purple)
  {
    id: 5,
    icon: "🎮",
    title: "Game Master",
    description: "Build your first playable game",
    rarity: "uncommon",
    unlocked: true,
    unlockedDate: "2026-01-25",
    tier: 3,
    xpReward: 500,
    progress: 1,
    total: 1,
  },
  {
    id: 6,
    icon: "💪",
    title: "Physics Expert",
    description: "Master all physics modules",
    rarity: "uncommon",
    unlocked: false,
    tier: 3,
    xpReward: 600,
    progress: 2,
    total: 5,
    requiredBy: 2,
  },
  {
    id: 7,
    icon: "🚀",
    title: "Speed Demon",
    description: "Unlock 3 skills in one week",
    rarity: "uncommon",
    unlocked: false,
    tier: 2,
    xpReward: 400,
    progress: 1,
    total: 3,
  },

  // Rare (Gold)
  {
    id: 8,
    icon: "👑",
    title: "Week Champion",
    description: "Top rank for an entire week",
    rarity: "rare",
    unlocked: false,
    tier: 4,
    xpReward: 800,
    progress: 0,
    total: 1,
  },
  {
    id: 9,
    icon: "🌟",
    title: "Perfect Score",
    description: "Get 100% on 5 lessons",
    rarity: "rare",
    unlocked: false,
    tier: 3,
    xpReward: 750,
    progress: 2,
    total: 5,
  },
  {
    id: 10,
    icon: "🎪",
    title: "Mentor",
    description: "Help 10 students",
    rarity: "rare",
    unlocked: false,
    tier: 4,
    xpReward: 900,
    progress: 3,
    total: 10,
  },

  // Epic (Red)
  {
    id: 11,
    icon: "💎",
    title: "Legendary Coder",
    description: "Reach level 20",
    rarity: "epic",
    unlocked: false,
    tier: 5,
    xpReward: 1500,
    progress: 8,
    total: 20,
  },
  {
    id: 12,
    icon: "🏆",
    title: "Unstoppable",
    description: "Maintain 30-day streak",
    rarity: "epic",
    unlocked: false,
    tier: 5,
    xpReward: 1200,
    progress: 7,
    total: 30,
  },
];

const rarityConfig = {
  common: {
    color: "blue",
    label: "Common",
    bgFrom: "from-blue-500/20",
    bgTo: "to-cyan-500/20",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400",
    lightBg: "bg-blue-500/10",
  },
  uncommon: {
    color: "purple",
    label: "Uncommon",
    bgFrom: "from-purple-500/20",
    bgTo: "to-pink-500/20",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-400",
    lightBg: "bg-purple-500/10",
  },
  rare: {
    color: "yellow",
    label: "Rare",
    bgFrom: "from-yellow-500/20",
    bgTo: "to-orange-500/20",
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-400",
    lightBg: "bg-yellow-500/10",
  },
  epic: {
    color: "red",
    label: "Epic",
    bgFrom: "from-red-500/20",
    bgTo: "to-rose-500/20",
    borderColor: "border-red-500/50",
    textColor: "text-red-400",
    lightBg: "bg-red-500/10",
  },
};

export default function AchievementsEnhanced() {
  const [selectedTier, setSelectedTier] = useState(null as number | null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(
    null,
  );

  const unlockedCount = allAchievements.filter((a) => a.unlocked).length;
  const totalCount = allAchievements.length;
  const totalXP = allAchievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);

  const filteredAchievements = allAchievements.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === null || a.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const achievementsByTier = {
    1: allAchievements.filter((a) => a.tier === 1),
    2: allAchievements.filter((a) => a.tier === 2),
    3: allAchievements.filter((a) => a.tier === 3),
    4: allAchievements.filter((a) => a.tier === 4),
    5: allAchievements.filter((a) => a.tier === 5),
  };

  const tierLabels = {
    1: "Apprentice",
    2: "Journeyman",
    3: "Expert",
    4: "Master",
    5: "Legend",
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

      {/* Header - Minimal Design */}
      <div className="top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Icon
                name="Search"
                className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 w-full focus:border-purple-500 focus:outline-none text-sm backdrop-blur-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Icon name="BookOpen" className="size-5 text-yellow-400" />
                    <span className="font-black text-lg">
                      Collection {unlockedCount}/{totalCount}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <Icon name="Sparkles" className="size-5 text-purple-400" />
                    <span className="font-bold text-purple-400">
                      {totalXP.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </div>
              <button className="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10">
                <Icon name="Bell" className="size-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Featured Achievement Showcase */}
        {allAchievements.find((a) => a.unlocked && a.rarity === "epic") && (
          <div className="mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-red-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-all"></div>
              <div className="relative bg-black border border-red-500/30 rounded-3xl overflow-hidden p-8 backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
                      <Icon name="Sparkles" className="size-4 text-red-400" />
                      <span className="text-xs font-bold text-red-400">
                        Epic Achievement
                      </span>
                    </div>
                    <h2 className="text-4xl font-black mb-2">
                      Champion Status Unlocked
                    </h2>
                    <p className="text-gray-300 mb-6 max-w-md">
                      You've achieved what only the dedicated few can reach.
                      Your dedication to learning has earned you legendary
                      status.
                    </p>
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">
                          XP Reward
                        </div>
                        <div className="text-2xl font-black text-red-400">
                          +2700
                        </div>
                      </div>
                      <div className="w-px h-12 bg-white/10"></div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Rarity</div>
                        <div className="text-lg font-black flex items-center gap-1">
                          <Icon name="Gem" className="size-5 text-red-400" />
                          Epic
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-9xl opacity-20 -rotate-12">🏆</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tier System - Vertical Progress Path */}
        <div className="mb-12">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Icon name="Trophy" className="size-6 text-purple-400" />
            Achievement Tiers
          </h3>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((tier) => {
              const tierAchievements =
                achievementsByTier[tier as keyof typeof achievementsByTier];
              const unlockedInTier = tierAchievements.filter(
                (a) => a.unlocked,
              ).length;
              const totalInTier = tierAchievements.length;
              const tierProgress = (unlockedInTier / totalInTier) * 100;

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
                          <Icon name="Star" className="size-5 text-blue-400" />
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
                        {tier === 5 && (
                          <Icon name="Gem" className="size-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-lg">
                          Tier {tier}:{" "}
                          {tierLabels[tier as keyof typeof tierLabels]}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {unlockedInTier} of {totalInTier} achievements
                          unlocked
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black">
                        {Math.round(tierProgress)}%
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
                      style={{ width: `${tierProgress}%` }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements Grid with Badge Style */}
        <div className="grid grid-cols-1 gap-8">
          {selectedTier === null ? (
            // Show all achievements in a masonry-style grid
            <div>
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Icon name="Award" className="size-6 text-cyan-400" />
                All Achievements
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAchievements.map((achievement) => {
                  const config =
                    rarityConfig[
                      achievement.rarity as keyof typeof rarityConfig
                    ];
                  const progress = achievement.progress / achievement.total;

                  return (
                    <div
                      key={achievement.id}
                      onClick={() => setExpandedAchievement(achievement.id)}
                      className={`relative group rounded-2xl overflow-hidden border-2 transition-all cursor-pointer transform hover:scale-105 ${
                        achievement.unlocked
                          ? `bg-linear-to-br ${config.bgFrom} ${config.bgTo} ${config.borderColor}`
                          : "bg-white/5 border-white/10 hover:border-white/20 opacity-60"
                      }`}
                    >
                      <div className="p-4 text-center relative z-10">
                        <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                          {achievement.icon}
                        </div>
                        <h4 className="text-xs font-black mb-1 line-clamp-2">
                          {achievement.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 mb-3">
                          {config.label}
                        </p>

                        {!achievement.unlocked && (
                          <div className="mb-2">
                            <div className="text-[10px] text-gray-400 mb-1">
                              {achievement.progress}/{achievement.total}
                            </div>
                            <div className="w-full bg-black/50 rounded-full h-1 overflow-hidden">
                              <div
                                className="bg-linear-to-r from-purple-500 to-pink-500 h-full"
                                style={{
                                  width: `${Math.min(progress * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {achievement.unlocked && (
                          <div className="text-xs font-bold text-yellow-400">
                            +{achievement.xpReward} XP
                          </div>
                        )}

                        {!achievement.unlocked && (
                          <Icon
                            name="Lock"
                            className="size-4 text-gray-500 mx-auto mt-2"
                          />
                        )}
                      </div>

                      {achievement.unlocked && (
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  );
                })}
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
                    ];
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
                                {achievement.xpReward} XP
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

        {/* Stats Dashboard - Bottom Section */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">Unlocked</div>
                <div className="text-3xl font-black">
                  {unlockedCount}/{totalCount}
                </div>
              </div>
              <Icon name="Star" className="size-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">Total XP</div>
                <div className="text-3xl font-black text-purple-400">
                  {totalXP}
                </div>
              </div>
              <Icon name="Sparkles" className="size-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">Completion</div>
                <div className="text-3xl font-black text-yellow-400">
                  {Math.round((unlockedCount / totalCount) * 100)}%
                </div>
              </div>
              <Icon name="TrendingUp" className="size-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">Next Unlock</div>
                <div className="text-3xl font-black text-green-400">Soon</div>
              </div>
              <Icon name="Unlock" className="size-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
