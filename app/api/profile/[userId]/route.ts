import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Type definitions for database rows
interface UserAchievementRow {
  id: number;
  user_id: string;
  achievement_id: number;
  unlocked_at: string;
  created_at: string;
}

interface AchievementRow {
  id: number;
  icon: string;
  title: string;
  description: string;
  rarity: string;
  tier: number;
  xp: number;
  unlocked: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get user's badges/achievements from database
 */
async function getUserBadges(supabase: any, userId: string) {
  try {
    // Get user's unlocked achievements with achievement details
    const { data: userAchievements, error } = await supabase
      .from("user_achievements")
      .select(`
        *,
        achievement:achievement_id(*)
      `)
      .eq("user_id", userId)
      .order("unlocked_at", { ascending: false });

    if (error) {
      console.error("Error fetching user achievements:", error);
      return [];
    }

    // Get all achievements to determine which ones are locked
    const { data: allAchievements, error: allAchievementsError } = await supabase
      .from("achievement")
      .select("*")
      .order("tier", { ascending: true });

    if (allAchievementsError) {
      console.error("Error fetching all achievements:", allAchievementsError);
      return [];
    }

    // Create a map of unlocked achievement IDs
    const unlockedAchievementIds = new Set(
      (userAchievements as UserAchievementRow[])?.map((ua: UserAchievementRow) => ua.achievement_id) || []
    );

    // Transform achievements into badge format
    const badges = (allAchievements as AchievementRow[])?.map((achievement: AchievementRow) => {
      const userAchievement = (userAchievements as UserAchievementRow[])?.find((ua: UserAchievementRow) => ua.achievement_id === achievement.id);
      const isUnlocked = unlockedAchievementIds.has(achievement.id);

      return {
        title: achievement.title,
        description: achievement.description,
        date: userAchievement?.unlocked_at 
          ? new Date(userAchievement.unlocked_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric", 
              year: "numeric"
            })
          : "",
        earned: isUnlocked,
        icon: achievement.icon || "🏆",
        achievementId: achievement.id,
        tier: achievement.tier,
        xpReward: achievement.xp || 0,
        unlockedAt: userAchievement?.unlocked_at
      };
    }) || [];

    return badges;
  } catch (error) {
    console.error("Error in getUserBadges:", error);
    return [];
  }
}

type UserRow = {
  id: string | number;
  username?: string;
  name?: string;
  email?: string;
  role?: string;
  level?: string;
  age?: number;
  location?: string;
  created_at?: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  
  try {
    const body = await request.json();
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: "Database configuration missing" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(
            cookiesToSet: { name: string; value: string; options?: object }[],
          ) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(
                name,
                value,
                options as Parameters<typeof cookieStore.set>[2],
              );
            });
          },
        },
      },
    );

    // Get authenticated user
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser || String(authUser.id) !== userId) {
      return NextResponse.json(
        { error: "Unauthorized - can only update own profile" },
        { status: 401 }
      );
    }

    // Update user_profiles table
    const { error: updateError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        bio: body.bio,
        location: body.location,
        website: body.website,
        github: body.github,
        linkedin: body.linkedin,
        twitter: body.twitter,
        avatar_url: body.avatarUrl,
        banner_url: body.bannerUrl,
        updated_at: new Date().toISOString()
      });

    if (updateError) {
      console.error('Profile update error:', updateError);
      return NextResponse.json(
        { error: "Failed to update profile", details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.error("Unexpected error in profile POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return NextResponse.json(
        { error: "Database configuration missing" },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(
            cookiesToSet: { name: string; value: string; options?: object }[],
          ) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(
                name,
                value,
                options as Parameters<typeof cookieStore.set>[2],
              );
            });
          },
        },
      },
    );

    // Determine the authenticated user for isOwnProfile check
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    let user: UserRow | null = null;

    // Single optimized query with multiple conditions
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .or(`username.eq.${userId},id.eq.${userId},id.eq.${Number(userId)}`)
      .limit(1)
      .single();

    if (!error && data) {
      user = data;
    } else if (UUID_REGEX.test(userId)) {
      // Fallback for UUID if needed
      const { data: uuidData, error: uuidError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (!uuidError && uuidData) user = uuidData;
    } else if (/^\d+$/.test(userId)) {
      // Fallback for integer ID if needed
      const { data: intData, error: intError } = await supabase
        .from("users")
        .select("*")
        .eq("id", Number(userId))
        .single();
      if (!intError && intData) user = intData;
    }

    if (!user) {
      // If user not found in database, check if they exist in auth but haven't created a profile yet
      const { data: authUser } = await supabase.auth.getUser();
      
      if (authUser.user && (String(authUser.user.id) === userId || authUser.user.email === userId)) {
        // User exists in auth but not in database, create a basic profile
        const basicProfile = {
          username: authUser.user.email?.split("@")[0] || String(authUser.user.id),
          displayName: authUser.user.email?.split("@")[0] || "New User",
          email: authUser.user.email,
          bio: "Game developer passionate about learning and creating amazing experiences.",
          avatarInitial: authUser.user.email?.charAt(0).toUpperCase() || "U",
          rank: "Beginner",
          location: "Not specified",
          joinDate: authUser.user.created_at
            ? new Date(authUser.user.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Unknown",
          website: "",
          github: "",
          linkedin: "",
          twitter: "",
          isOwnProfile: true,
          stats: [
            {
              value: "0",
              title: "Lessons Completed",
              subtitle: "Just getting started",
              icon: "BookOpen",
            },
            {
              value: "1",
              title: "Days Streak",
              subtitle: "Welcome aboard!",
              icon: "Flame",
            },
            {
              value: "0",
              title: "Games Built",
              subtitle: "Your first game awaits",
              icon: "Gamepad2",
            },
            {
              value: "0h",
              title: "Learning Time",
              subtitle: "Start your journey",
              icon: "Clock",
            },
          ],
          projects: [],
          badges: [],
          activities: [],
          skills: [],
        };

        return NextResponse.json(basicProfile);
      }

      return NextResponse.json(
        { error: "User not found", userId },
        { status: 404 },
      );
    }

    const isOwnProfile =
      authUser != null && String(authUser.id) === String(user.id);

    // Get extended profile from user_profiles table (private details)
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', String(user.id))
      .single();

    // Combine the data - users table provides shareable info, user_profiles provides extended details
    const profile = {
      id: String(user.id),              // From users table (for sharing)
      username: user.username || userId,     // From users table (for sharing)
      displayName: user.name ?? user.email?.split("@")[0] ?? "Unknown User", // From users table (for sharing)
      // Only expose email to the profile owner
      ...(isOwnProfile ? { email: user.email } : {}),
      bio: profileData?.bio || "Game developer passionate about learning and creating amazing experiences.",
      avatarInitial:
        user.name?.charAt(0).toUpperCase() ??
          user.email?.charAt(0).toUpperCase() ??
          "U",
      rank: user.level ?? "Beginner",
      location: profileData?.location || "Not specified",
      joinDate: user.created_at
        ? new Date(user.created_at).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
        : "Unknown",
      website: profileData?.website || "",
      github: profileData?.github || "",
      linkedin: profileData?.linkedin || "",
      twitter: profileData?.twitter || "",
      isOwnProfile,
      stats: [
        {
          value: user.age?.toString() ?? "N/A",
          title: "Age",
          subtitle: "Years old",
          icon: "User",
        },
        {
          value: user.level ?? "Beginner",
          title: "Level",
          subtitle: "Current rank",
          icon: "Trophy",
        },
        {
          value: user.role ?? "Member",
          title: "Role",
          subtitle: "User role",
          icon: "Shield",
        },
        {
          value: user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "Unknown",
          title: "Joined",
          subtitle: "Member since",
          icon: "Calendar",
        },
      ],
      projects: [],
      badges: await getUserBadges(supabase, String(user.id)),
      activities: [],
      skills: [],
    };

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
