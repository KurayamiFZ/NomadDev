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

import { UserDiscovery } from "../../components/UserDiscovery";

/**
 * Community Page Content
 * 
 * This is the content that will be wrapped by the home layout.
 * It contains the user discovery interface.
 * 
 * @returns {JSX.Element} Community page content
 */
export default function CommunityPageContent() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-green-400 text-white mb-4">
          Community
        </h1>
        <p className="text-gray-400 text-lg">
          Connect with fellow game developers, share your progress, and get inspired by the community
        </p>
      </div>

      {/* User Discovery Component */}
      <UserDiscovery />
    </div>
  );
}
