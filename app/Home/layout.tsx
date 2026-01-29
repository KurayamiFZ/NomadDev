"use client";

import { useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname.split("/")[2] ?? "overview";

  const tabs = [
    "overview",
    "lessons",
    "projects",
    "community",
    "classes",
    "achievements",
  ];

  return (
    // 🚫 Prevent body/page scrolling
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      {/* SIDEBAR (NON-SCROLLING) */}
      <aside className="flex flex-col p-4 w-1/7 h-full border-r border-gray-600 bg-gray-900 shrink-0">
        <button
          className="flex items-center gap-3 h-15"
          onClick={() => router.push("/home/overview")}
        >
          <div className="size-15 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl" />
          <span className="text-2xl font-black">Nomad Dev</span>
        </button>

        <nav className="mt-8 flex flex-col">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => router.push(`/home/${tab}`)}
              className={`px-6 py-4 font-bold transition flex items-center ${
                activeTab === tab
                  ? "text-white bg-purple-600/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* HEADER (NON-SCROLLING) */}
        <header className="h-25 shrink-0 bg-gray-900 border-b border-gray-700 px-8 flex items-center justify-between">
          <div className="flex items-center h-10 w-70 bg-black border border-gray-700 rounded-xl">
            <textarea
              placeholder="Search"
              className="ml-4 w-full h-full outline-none text-lg text-white resize-none bg-transparent"
            />
          </div>

          <button
            className="w-25 h-15 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-700 text-white font-semibold text-xl"
            onClick={() => router.push("/profile")}
          >
            Kura
          </button>
        </header>

        {/* ✅ ONLY SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
