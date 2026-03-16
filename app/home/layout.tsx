"use client";

import { useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "../components/footer";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname.split("/")[2] ?? "overview";

  const tabs = ["overview", "lessons", "projects", "classes", "achievements", "community"];

  return (
    // Prevent body/page scrolling
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      {/* SIDEBAR (NON-SCROLLING) */}
      <aside className="flex flex-col p-2 sm:p-4 w-16 sm:w-48 lg:w-64 h-full border-r border-gray-600 bg-gray-900 shrink-0">
        <button
          className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 h-12 sm:h-15"
          onClick={() => router.push("/home")}
        >
          <div className="size-8 sm:size-15 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl" />
          <span className="hidden sm:block text-lg sm:text-2xl font-black">Nomad Dev</span>
        </button>

        <nav className="mt-4 sm:mt-8 flex flex-col">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => router.push(`/home/${tab}`)}
              className={`px-2 sm:px-6 py-3 sm:py-4 font-bold transition flex items-center justify-center sm:justify-start text-xs sm:text-sm ${
                activeTab === tab
                  ? "text-white bg-purple-600/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              title={tab.charAt(0).toUpperCase() + tab.slice(1)}
            >
              <span className="hidden sm:inline">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              <span className="sm:hidden text-lg">{tab.charAt(0).toUpperCase()}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* HEADER (NON-SCROLLING) */}
        <header className="h-16 sm:h-25 shrink-0 bg-gray-900 border-b border-gray-700 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center h-8 sm:h-10 w-32 sm:w-70 bg-black border border-gray-700 rounded-lg sm:rounded-xl">
            <textarea
              placeholder="Search"
              className="ml-2 sm:ml-4 w-full h-full outline-none text-sm sm:text-lg text-white resize-none bg-transparent"
            />
          </div>

          <button
            className="w-12 h-8 sm:w-25 sm:h-15 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gray-700 text-white font-semibold text-xs sm:text-xl"
            onClick={() => router.push("/profile")}
          >
            <span className="hidden sm:inline">Kura</span>
            <span className="sm:hidden">K</span>
          </button>
        </header>

        {/* ✅ ONLY SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
