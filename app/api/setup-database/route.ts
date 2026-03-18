import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

    // First, let's check the actual table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from("achievement")
      .select("*")
      .limit(1);

    if (tableError) {
      console.error("Error checking achievement table:", tableError);
      return NextResponse.json({
        error: "Table doesn't exist or access denied",
        details: tableError,
        instructions: [
          "Please run the setup-database.sql script in your Supabase SQL editor",
          "The script will create the proper table structure with all required columns"
        ]
      }, { status: 400 });
    }

    // Check what columns exist
    const existingColumns = tableInfo && tableInfo.length > 0 ? Object.keys(tableInfo[0]) : [];
    console.log("Existing columns:", existingColumns);

    // If icon column doesn't exist, we need to add it
    if (!existingColumns.includes('icon')) {
      return NextResponse.json({
        error: "Table structure is incomplete. Missing 'icon' column.",
        existingColumns,
        instructions: [
          "Please run the setup-database.sql script in your Supabase SQL editor",
          "The script will add the missing columns and proper table structure"
        ]
      }, { status: 400 });
    }

    // If we get here, tables exist, let's insert sample data
    const { error: insertError } = await supabase
      .from("achievement")
      .upsert([
        { id: 1, title: 'Quick Start', description: 'Completed first lesson', tier: 1, xp: 10, icon: '🚀' },
        { id: 2, title: 'Hot Streak', description: '7 day learning streak', tier: 2, xp: 25, icon: '🔥' },
        { id: 3, title: 'First Game', description: 'Built and published first game', tier: 2, xp: 50, icon: '🎮' },
        { id: 4, title: 'Dedicated Learner', description: '100+ hours of learning', tier: 3, xp: 75, icon: '📚' },
        { id: 5, title: 'Week Champion', description: 'Top learner of the week', tier: 4, xp: 100, icon: '👑' }
      ])
      .select();

    if (insertError) {
      console.error("Error inserting sample achievements:", insertError);
      return NextResponse.json(
        { error: "Failed to insert sample achievements", details: insertError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Database check completed successfully!",
      status: "Tables exist and sample data inserted"
    });

  } catch (error) {
    console.error("Database setup error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
