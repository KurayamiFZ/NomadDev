"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Footer from "../components/footer";
import Icon, { type IconName } from "../components/icons";
import { supabase } from "@/lib/supabaseclient";
import { useAuth } from "../components/AuthProvider";

const TAB_ICONS: Record<string, IconName> = {
  overview: "LayoutDashboard",
  lessons: "BookOpen",
  projects: "FolderKanban",
  classes: "GraduationCap",
  achievements: "Trophy",
  community: "Users",
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname.split("/")[2] ?? "overview";
  const { signOut } = useAuth();
  const tabs = [
    "overview",
    "lessons",
    "projects",
    "classes",
    "achievements",
    "community",
  ];
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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
  }, []);

  const totalxp = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + (a.xp || a.xpReward || 0), 0);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080810] text-white">
      {/* ── SIDEBAR ───────────────────────────────────────────────── */}
      <aside className="relative flex flex-col w-64 h-full shrink-0 border-r border-white/5 overflow-hidden">
        {/* ambient glow behind sidebar */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-700/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-pink-700/8 blur-2xl" />

        {/* subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo */}
        <button
          className="relative flex items-center gap-3 px-5 py-6 group"
          onClick={() => router.push("/home")}
        >
          <div className="relative size-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/40 flex items-center justify-center shrink-0">
            {/* inner shine */}
            <div className="absolute inset-0 rounded-xl bg-white/10" />
            <span className="relative text-white font-black text-sm">ND</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-black text-lg leading-none tracking-tight text-white group-hover:text-purple-400 transition-colors">
              Nomad Dev
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-purple-500/60 uppercase mt-0.5">
              Academy
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-2" />

        {/* Nav label */}
        <p className="px-5 pt-3 pb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          Navigate
        </p>

        {/* Nav items */}
        <nav className="relative flex flex-col gap-0.5 px-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => router.push(`/home/${tab}`)}
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold
                  transition-all duration-200 group
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                  }
                `}
              >
                {/* active pill background */}
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-700/30 to-pink-700/15 border border-purple-600/25" />
                )}
                {/* active left accent bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-linear-to-b from-purple-400 to-pink-400" />
                )}

                <Icon
                  name={TAB_ICONS[tab]}
                  className={`relative size-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-gray-600 group-hover:text-gray-400"
                  }`}
                />
                <span className="relative">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>

                {/* active dot */}
                {isActive && (
                  <span className="relative ml-auto size-1.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom user hint */}
        <div className="relative mt-auto mx-3 mb-4 space-y-3 p-3 rounded-xl bg-white/3 border border-white/5">
          
          <p className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase mb-1">
            Current xp
          </p>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-white">Level 4</span>
            <span className="text-[10px] text-purple-500 font-bold">
              {totalxp} / 5,000
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500"
              style={{ width: `${(totalxp / 5000) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* HEADER */}
        <header className="relative h-16 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#080810]/80 backdrop-blur-sm">
          {/* breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 font-medium">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-gray-200 font-semibold capitalize">
              {activeTab}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* streak badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
              <Icon name="Flame" className="size-3.5" />7 day streak
            </div>

            {/* notifications */}
            <button className="relative p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <Icon name="Bell" className="size-4 text-gray-400" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-purple-500" />
            </button>

            {/* profile */}
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="size-7 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/30">
                <Icon name="User" className="size-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                Profile
              </span>
            </button>

            <button
            onClick={handleLogout}
            className="flex items-center justify-center p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors group"
          >
            <Icon name="LogOut" className="size-4 text-red-400 group-hover:text-red-300" />
          </button>
          </div>
        </header>

        {/* SCROLLABLE MAIN */}
        <main className="flex-1 overflow-y-auto">
          {/* subtle top fade */}
          <div className="sticky top-0 h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent z-10" />
          <div className="p-8">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
