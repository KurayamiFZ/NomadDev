import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

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
      .or(`username.eq.${username},id.eq.${username},id.eq.${Number(username)}`)
      .limit(1)
      .single();

    if (!error && data) {
      user = data;
    } else if (UUID_REGEX.test(username)) {
      // Fallback for UUID if needed
      const { data: uuidData, error: uuidError } = await supabase
        .from("users")
        .select("*")
        .eq("id", username)
        .single();
      if (!uuidError && uuidData) user = uuidData;
    } else if (/^\d+$/.test(username)) {
      // Fallback for integer ID if needed
      const { data: intData, error: intError } = await supabase
        .from("users")
        .select("*")
        .eq("id", Number(username))
        .single();
      if (!intError && intData) user = intData;
    }

    if (!user) {
      // If user not found in database, check if they exist in auth but haven't created a profile yet
      const { data: authUser } = await supabase.auth.getUser();
      
      if (authUser.user && (String(authUser.user.id) === username || authUser.user.email === username)) {
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
        { error: "User not found", username },
        { status: 404 },
      );
    }

    const isOwnProfile =
      authUser != null && String(authUser.id) === String(user.id);

    const profile = {
      username: user.username ?? String(user.id),
      displayName: user.name ?? user.email?.split("@")[0] ?? "Unknown User",
      // Only expose email to the profile owner
      ...(isOwnProfile ? { email: user.email } : {}),
      bio: user.role ? `User with role: ${user.role}` : "Game Developer",
      avatarInitial:
        user.name?.charAt(0).toUpperCase() ??
        user.email?.charAt(0).toUpperCase() ??
        "U",
      rank: user.level ?? "Beginner",
      location: user.location ?? "Not specified",
      joinDate: user.created_at
        ? new Date(user.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
        : "Unknown",
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
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
      badges: [],
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
