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

import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Users, Trophy, Star } from "lucide-react";
import { debounce, usePerformanceMonitor } from "../../utils/performance";

interface UserDiscoveryProps {
  isVisible?: boolean;
}

/**
 * User Discovery Component
 * 
 * Shows a searchable list of all users with their basic info.
 * Clicking on a user navigates to their profile page.
 * 
 * @returns {JSX.Element} User discovery interface
 */
const UserDiscovery = memo(function UserDiscovery({ isVisible = true }: UserDiscoveryProps) {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<Array<{ username: string; displayName: string; rank: string; email: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { measure, measureAsync } = usePerformanceMonitor();

  // Search state and handler
  const [searchQuery, setSearchQuery] = useState("");
  
  // Debounced search handler for performance
  const debouncedSearch = useMemo(() => debounce((query: string) => {
    // Search logic will be handled by useMemo below
  }, 300), []);

  // Fetch users from API on component mount with caching and error handling
  useEffect(() => {
    let isMounted = true;
    let fetchTimeout: NodeJS.Timeout;
    
    const fetchUsers = async () => {
      // Prevent multiple fetches
      if (!loading || allUsers.length > 0) return;
      
      setLoading(true);
      
      try {
        // Add timeout to prevent hanging
        fetchTimeout = setTimeout(() => {
          if (isMounted) {
            console.warn('User fetch timeout - using empty array');
            setAllUsers([]);
            setLoading(false);
          }
        }, 5000);
        
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'force-cache', // Add caching
        });
        
        clearTimeout(fetchTimeout);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const users = await response.json();
        
        // Only update if component is still mounted
        if (isMounted) {
          setAllUsers(Array.isArray(users) ? users : []);
        }
      } catch (error) {
        clearTimeout(fetchTimeout);
        if (isMounted) {
          console.error('Failed to fetch users:', error);
          setAllUsers([]); // Set empty array on error to prevent undefined issues
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchUsers();
    
    return () => {
      isMounted = false;
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
      }
    };
  }, []); // Remove dependencies to prevent re-fetching

  // Trigger content animation when parent is visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setContentVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Memoized filtered users - optimized for performance
  const filteredUsers = useMemo(() => {
    return measure('filter-users', () => {
      const query = searchQuery.toLowerCase();
      if (!query) return allUsers;
      
      return allUsers.filter(user => 
        user.displayName.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.rank.toLowerCase().includes(query)
      );
    });
  }, [allUsers, searchQuery, measure]);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  /**
   * Navigate to user's profile
   */
  const handleUserClick = useCallback((username: string) => {
    measure('navigate-to-profile', () => {
      router.push(`/profile/${username}`);
    });
  }, [router, measure]);

  /**
   * Get rank icon based on rank title - memoized for performance
   */
  const getRankIcon = useCallback((rank: string) => {
    const rankLower = rank.toLowerCase();
    if (rankLower.includes("expert")) return <Trophy className="w-4 h-4 text-yellow-400" />;
    if (rankLower.includes("creative")) return <Star className="w-4 h-4 text-purple-400" />;
    return <Trophy className="w-4 h-4 text-blue-400" />;
  }, []);

  // Memoized user card component for performance
  const UserCard = memo(function UserCard({ user, index }: { user: any; index: number }) {
    const handleClick = useCallback(() => {
      handleUserClick(user.username);
    }, [user.username, handleUserClick]);

    return (
      <button
        onClick={handleClick}
        className={`bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 ${
          contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }} // Cap delay to prevent long waits
      >
        {/* User Avatar and Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            {user.displayName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors duration-300 truncate">
              {user.displayName}
            </h3>
            <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors duration-300">
              {user.email || 'no-email'}
            </p>
          </div>
        </div>

        {/* Rank Badge */}
        <div className="flex items-center gap-2">
          {getRankIcon(user.rank)}
          <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            {user.rank}
          </span>
        </div>

        {/* View Profile Indicator */}
        <div className="mt-3 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0">
          Click to view profile →
        </div>
      </button>
    );
  });

  UserCard.displayName = 'UserCard';

  // Memoized stats to prevent re-calculation
  const stats = useMemo(() => ({
    filtered: filteredUsers.length,
    total: allUsers.length
  }), [filteredUsers.length, allUsers.length]);

  return (
    <div 
      ref={contentRef}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className={`mb-8 transform transition-all duration-700 ease-out ${
        contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          <Users className="w-6 h-6 text-purple-400 animate-pulse" />
          Discover Users
        </h2>
        <p className="text-gray-400">
          Find and connect with other game developers in the community
        </p>
      </div>

      {/* Search Bar */}
      <div className={`relative mb-6 transform transition-all duration-700 ease-out ${
        contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '100ms' }}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transform transition-transform duration-300 hover:scale-110" />
        <input
          type="text"
          placeholder="Search users by name, username, or rank..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:border-gray-600"
        />
      </div>

      {/* User Grid */}
      {loading && allUsers.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-white text-lg font-semibold mb-2">Loading users...</h3>
          <p className="text-gray-400">
            Fetching community members from database
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user, index) => (
            <UserCard key={user.username} user={user} index={index} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && stats.filtered === 0 && (
        <div className={`text-center py-12 transform transition-all duration-700 ease-out ${
          contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No users found</h3>
          <p className="text-gray-400">
            Try adjusting your search terms to find more users
          </p>
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <div className={`mt-8 pt-6 border-t border-gray-800 transform transition-all duration-700 ease-out ${
          contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Showing {stats.filtered} of {stats.total} users</span>
            <span>Click any user to view their profile</span>
          </div>
        </div>
      )}
    </div>
  );
});

UserDiscovery.displayName = 'UserDiscovery';

export { UserDiscovery };
