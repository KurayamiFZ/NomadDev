"use client";

const achievements = [
  { icon: "🎯", title: "First Lesson", unlocked: true },
  { icon: "🔥", title: "7 Day Streak", unlocked: true },
  { icon: "🎮", title: "First Game", unlocked: true },
  { icon: "💪", title: "Speed Learner", unlocked: false },
  { icon: "🏆", title: "Week Champion", unlocked: false },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white p-6">
      {/* RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          <div
            key={i}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center p-4 text-center ${
              achievement.unlocked
                ? "bg-linear-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500"
                : "bg-gray-800 border border-gray-700 opacity-40"
            }`}
          >
            <div className="text-4xl mb-2">{achievement.icon}</div>
            <div className="font-medium text-sm">{achievement.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
