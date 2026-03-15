/**
 * User Discovery Component - GameDev Academy Platform
 * 
 * Displays a list of users that can be clicked to visit their profiles.
 * Helps users discover and connect with other learners in the community.
 * 
 * @component
 * @returns {JSX.Element} User discovery interface
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Users, Trophy, Star } from "lucide-react";

/**
 * User Discovery Component
 * 
 * Shows a searchable list of all users with their basic info.
 * Clicking on a user navigates to their profile page.
 * 
 * @returns {JSX.Element} User discovery interface
 */
export function UserDiscovery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState<Array<{ username: string; displayName: string; rank: string; email: string }>>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const users = await response.json();
        setAllUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Filter users based on search query
  const filteredUsers = allUsers.filter(user => 
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.rank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Navigate to user's profile
   */
  const handleUserClick = (username: string) => {
    router.push(`/profile/${username}`);
  };

  /**
   * Get rank icon based on rank title
   */
  const getRankIcon = (rank: string) => {
    if (rank.toLowerCase().includes("expert")) return <Trophy className="w-4 h-4 text-yellow-400" />;
    if (rank.toLowerCase().includes("creative")) return <Star className="w-4 h-4 text-purple-400" />;
    return <Trophy className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          Discover Users
        </h2>
        <p className="text-gray-400">
          Find and connect with other game developers in the community
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by name, username, or rank..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {/* User Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-white text-lg font-semibold mb-2">Loading users...</h3>
          <p className="text-gray-400">
            Fetching community members from database
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <button
              key={user.username}
              onClick={() => handleUserClick(user.username)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all text-left group"
            >
              {/* User Avatar and Name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {user.displayName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors truncate">
                    {user.displayName}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">{user.email || 'no-email'}</p>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="flex items-center gap-2">
                {getRankIcon(user.rank)}
                <span className="text-sm text-gray-300">{user.rank}</span>
              </div>

              {/* View Profile Indicator */}
              <div className="mt-3 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view profile →
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No users found</h3>
          <p className="text-gray-400">
            Try adjusting your search terms to find more users
          </p>
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Showing {filteredUsers.length} of {allUsers.length} users</span>
            <span>Click any user to view their profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
