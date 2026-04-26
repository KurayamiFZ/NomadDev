import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: NextRequest) {
  return handleProfileUpdate(request);
}

export async function POST(request: NextRequest) {
  return handleProfileUpdate(request);
}

async function handleProfileUpdate(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Profile update request body:', body);
    
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
    console.log('Authenticated user:', authUser);
    
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized - not authenticated" },
        { status: 401 }
      );
    }

    const userId = authUser.id; // Keep as UUID for users table
    console.log('User ID:', userId);

    // Update users table for display name if provided
    if (body.name) {
      const { error: nameUpdateError } = await supabase
        .from('users')
        .update({ name: body.name })
        .eq('id', userId);

      if (nameUpdateError) {
        console.error('Name update error:', nameUpdateError);
        return NextResponse.json(
          { error: "Failed to update display name", details: nameUpdateError.message },
          { status: 500 }
        );
      }
    }

    // Check if profile exists first
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('user_id')
      .eq('user_id', String(userId))
      .single();
    
    console.log('Existing profile:', existingProfile);

    let result;
    if (existingProfile) {
      // Update existing profile
      result = await supabase
        .from('user_profiles')
        .update({
          bio: body.bio,
          location: body.location,
          website: body.website,
          github: body.github,
          linkedin: body.linkedin,
          twitter: body.twitter,
          avatar_url: body.avatarUrl,
          banner_url: body.bannerUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', String(userId));
    } else {
      // Insert new profile
      result = await supabase
        .from('user_profiles')
        .insert({
          user_id: String(userId),
          bio: body.bio,
          location: body.location,
          website: body.website,
          github: body.github,
          linkedin: body.linkedin,
          twitter: body.twitter,
          avatar_url: body.avatarUrl,
          banner_url: body.bannerUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    }

    const { error: updateError } = result;

    if (updateError) {
      console.error('Profile update error:', updateError);
      return NextResponse.json(
        { error: "Failed to update profile", details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.error("Unexpected error in profile update:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
