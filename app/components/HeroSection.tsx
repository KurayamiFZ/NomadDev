

import { useState, useEffect } from "react";
import { Heading } from "./ui/Heading";
import { StatusBadge } from "./ui/StatusBadge";
import { FlexRow } from "./ui/FlexRow";
import { supabase } from "@/lib/supabaseclient";

export function HeroSection() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTotalUsers() {
      try {
        setLoading(true);
        console.log('HeroSection: Fetching total users...');
        
        // Try multiple approaches to get user count
        let userCount = 0;
        
        // Method 1: Try user_profiles table first (most likely to exist)
        try {
          const { count: profileCount, error: profileError } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
          
          console.log('HeroSection: user_profiles result:', { count: profileCount, error: profileError });
          
          if (!profileError && profileCount !== null) {
            userCount = profileCount;
            console.log('HeroSection: Using user_profiles count:', userCount);
          }
        } catch (err) {
          console.log('HeroSection: user_profiles query failed:', err);
        }
        
        // Method 2: Try auth schema if user_profiles didn't work
        if (userCount === 0) {
          try {
            const { count: authCount, error: authError } = await supabase
              .from('users')
              .select('*', { count: 'exact', head: true });
            
            console.log('HeroSection: users result:', { count: authCount, error: authError });
            
            if (!authError && authCount !== null) {
              userCount = authCount;
              console.log('HeroSection: Using users count:', userCount);
            }
          } catch (err) {
            console.log('HeroSection: users query failed:', err);
          }
        }
        
        // Method 3: Try any table that might contain users
        if (userCount === 0) {
          try {
            const { data: profiles, error: listError } = await supabase
              .from('user_profiles')
              .select('id')
              .limit(1);
            
            console.log('HeroSection: fallback query result:', { data: profiles, error: listError });
            
            if (!listError && profiles) {
              // If we can access the table, try to get full count
              const { count: fallbackCount, error: fallbackError } = await supabase
                .from('user_profiles')
                .select('*', { count: 'exact', head: true });
              
              if (!fallbackError && fallbackCount !== null) {
                userCount = fallbackCount;
                console.log('HeroSection: Using fallback count:', userCount);
              }
            }
          } catch (err) {
            console.log('HeroSection: fallback query failed:', err);
          }
        }
        
        // Set the final count
        setTotalUsers(userCount);
        console.log('HeroSection: Final user count set to:', userCount);
        
      } catch (error) {
        console.error('HeroSection: Error in fetchTotalUsers:', error);
        setTotalUsers(0);
      } finally {
        setLoading(false);
      }
    }

    fetchTotalUsers();
  }, []);

  const getLiveStatusText = () => {
    if (loading) return "Loading...";
    if (totalUsers === 0) return "Join our learning community";
    if (totalUsers === 1) return "1 student learning now";
    return `${totalUsers.toLocaleString()} students learning now`;
  };
  return (
    <>
      {/* Live status badge - Shows current active learners */}
      <FlexRow className="mt-6 gap-2 rounded-full bg-linear-to-r from-purple-500/30 to-pink-500/30 px-3 py-1.5 sm:mt-8 sm:px-4 sm:py-2">
        <div className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400'}`} />
        <span className="text-xs font-medium text-foreground sm:text-sm">
          {getLiveStatusText()}
        </span>
      </FlexRow>

      {/* Main headline section - Core value proposition */}
      <section className="flex w-full max-w-5xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-16 lg:py-20">
        <Heading size="3xl" className="sm:text-4xl md:text-5xl lg:text-6xl">
          Start Your Learning Journey
        </Heading>
        <Heading
          size="2xl"
          gradient
          animationDelay={300}
          className="mt-2 sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Build Your Future
        </Heading>
        <p className="mt-4 max-w-2xl px-2 text-base text-muted-foreground sm:mt-6 sm:text-lg">
          Begin your educational journey with interactive lessons. No registration
          required.
        </p>
      </section>
    </>
  );
}
