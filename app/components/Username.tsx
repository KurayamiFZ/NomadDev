"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function Username() {
  const [profile, setProfile] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if(!user) return;

      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <h1 className="text-3xl font-black mb-2">Welcome back, {profile?.name}! 🎮</h1>
  );
}