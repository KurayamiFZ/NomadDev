import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  
  try {
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
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2]);
            });
          },
        },
      }
    );

    // Get user's unlocked achievements with achievement details
    const { data: userAchievements, error } = await supabase
      .from("user_achievements")
      .select(`
        *,
        achievement(*)
      `)
      .eq("user_id", userId)
      .order("unlocked_at", { ascending: false });

    if (error) {
      console.error("Error fetching user achievements:", error);
      return NextResponse.json(
        { error: "Failed to fetch user achievements" },
        { status: 500 }
      );
    }

    // Get all achievements to determine which ones are locked
    const { data: allAchievements, error: allAchievementsError } = await supabase
      .from("achievement")
      .select("*")
      .order("tier", { ascending: true });

    if (allAchievementsError) {
      console.error("Error fetching all achievements:", allAchievementsError);
      return NextResponse.json(
        { error: "Failed to fetch achievements" },
        { status: 500 }
      );
    }

    // Create a map of unlocked achievement IDs
    const unlockedAchievementIds = new Set(
      userAchievements?.map(ua => ua.achievement_id) || []
    );

    // Transform achievements into badge format - use achievement's unlocked field as source of truth
    const badges = allAchievements?.map(achievement => {
      const userAchievement = userAchievements?.find(ua => ua.achievement_id === achievement.id);
      const isUnlocked = unlockedAchievementIds.has(achievement.id) || achievement.unlocked;

      return {
        title: achievement.title,
        description: achievement.description,
        date: userAchievement?.unlocked_at || (achievement.unlocked ? achievement.created_at : ""),
        earned: isUnlocked,
        icon: achievement.icon || "🏆",
        achievementId: achievement.id,
        tier: achievement.tier,
        xpReward: achievement.xp || achievement.xpReward || 0,
        unlockedAt: userAchievement?.unlocked_at || (achievement.unlocked ? achievement.created_at : null)
      };
    }) || [];

    return NextResponse.json({
      badges,
      unlockedCount: userAchievements?.length || 0,
      totalCount: allAchievements?.length || 0
    });

  } catch (error) {
    console.error("User achievements API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
