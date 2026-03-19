/**
 * Community Page - GameDev Academy Platform
 * 
 * Central hub for users to discover and connect with other learners.
 * Features user search, discovery, and profile navigation.
 * Uses the home layout for consistent navigation.
 * 
 * @page
 * @returns {JSX.Element} Community discovery page
 */

"use client";

import { memo } from "react";
import { UserDiscovery } from "../../components/UserDiscovery";
import { Users, Sparkles } from "lucide-react";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

/**
 * Community Page Content
 * 
 * This is the content that will be wrapped by the home layout.
 * It contains the user discovery interface.
 * 
 * @returns {JSX.Element} Community page content
 */
const CommunityPageContent = memo(function CommunityPageContent() {
  const { ref: headerRef, isVisible, getAnimationClass } = useOptimizedAnimation({ delay: 100 });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <div ref={headerRef} className={getAnimationClass("border-b border-gray-800")}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Community
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <p className="text-gray-400 transform transition-transform duration-300 hover:scale-105">
                  Connect with 15,000+ game developers worldwide
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

CommunityPageContent.displayName = 'CommunityPageContent';

export default CommunityPageContent;