"use client";

import { memo } from "react";
import { UserDiscovery } from "../../components/UserDiscovery";
import { Users, Sparkles } from "lucide-react";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { useRouter } from "next/navigation";

const CommunityPageContent = memo(function CommunityPageContent() {
  const {
    ref: headerRef,
    isVisible,
    getAnimationClass,
  } = useOptimizedAnimation({ delay: 100 });
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <div
        ref={headerRef}
        className={getAnimationClass("border-b border-gray-800")}
      >
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.refresh()}
              className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <Users className="w-8 h-8 text-white" />
            </button>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Нийгэмлэг
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <p className="text-gray-400">
                  Дэлхий даяраа 15,000+ тоглоом хөгжүүлэгчтэй холбогдоорой
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Discovery Component */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <UserDiscovery isVisible={isVisible} />
      </div>
    </div>
  );
});

CommunityPageContent.displayName = "CommunityPageContent";

export default CommunityPageContent;
