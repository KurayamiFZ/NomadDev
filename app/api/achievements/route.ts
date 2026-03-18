import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
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

    // Get all achievements from database
    const { data: achievements, error } = await supabase
      .from("achievement")
      .select("*")
      .order("tier", { ascending: true });

    if (error) {
      console.error("Error fetching achievements:", error);
      return NextResponse.json(
        { error: "Failed to fetch achievements" },
        { status: 500 }
      );
    }

    return NextResponse.json(achievements || []);
  } catch (error) {
    console.error("Achievements API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { achievementId } = body;

    if (!achievementId) {
      return NextResponse.json(
        { error: "Achievement ID is required" },
        { status: 400 }
      );
    }

    // Check if user already has this achievement
    const { data: existingUserAchievement, error: checkError } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", user.id)
      .eq("achievement_id", achievementId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // Not found error
      console.error("Error checking user achievement:", checkError);
      return NextResponse.json(
        { error: "Failed to check achievement status" },
        { status: 500 }
      );
    }

    if (existingUserAchievement) {
      return NextResponse.json(
        { error: "Achievement already unlocked" },
        { status: 409 }
      );
    }

    // Get achievement details
    const { data: achievement, error: achievementError } = await supabase
      .from("achievement")
      .select("*")
      .eq("id", achievementId)
      .single();

    if (achievementError || !achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    // Unlock the achievement for the user
    const { data: userAchievement, error: unlockError } = await supabase
      .from("user_achievements")
      .insert([
        {
          user_id: user.id,
          achievement_id: achievementId,
          unlocked_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (unlockError) {
      console.error("Error unlocking achievement:", unlockError);
      return NextResponse.json(
        { error: "Failed to unlock achievement" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Achievement unlocked successfully!",
      achievement: achievement,
      userAchievement: userAchievement
    });

  } catch (error) {
    console.error("Unlock achievement API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
