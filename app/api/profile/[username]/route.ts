import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  console.log('=== PROFILE API CALLED ===');
  console.log('Full request URL:', request.url);
  
  try {
    const resolvedParams = await params;
    const username = resolvedParams.username;
    console.log('Username parameter:', username);
    console.log(`Fetching profile for username: ${username}`);

    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    console.log('Creating Supabase client...');
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return []; },
          setAll() { /* no-op */ },
        },
      },
    );

    // Try multiple approaches to find the user
    let user = null;
    let searchMethod = '';

    // Method 1: Try as UUID (for Supabase auth IDs)
    if (username.includes('-') && username.length === 36) {
      console.log(`Trying UUID search for: ${username}`);
      const { data: uuidUser, error: uuidError } = await supabase
        .from('users')
        .select('*')
        .eq('id', username)
        .single();
      
      console.log('UUID search result:', { uuidUser, uuidError });
      
      if (!uuidError && uuidUser) {
        user = uuidUser;
        searchMethod = 'UUID';
      }
    }

    // Method 2: Try as integer ID
    if (!user && !isNaN(parseInt(username))) {
      console.log(`Trying integer ID search for: ${username}`);
      const { data: idUser, error: idError } = await supabase
        .from('users')
        .select('*')
        .eq('id', parseInt(username))
        .single();
      
      console.log('Integer ID search result:', { idUser, idError });
      
      if (!idError && idUser) {
        user = idUser;
        searchMethod = 'integer_ID';
      }
    }

    // Method 3: Try as email prefix if ID searches failed
    if (!user) {
      console.log(`Trying email prefix search for: ${username}`);
      const { data: emailUser, error: emailError } = await supabase
        .from('users')
        .select('*')
        .like('email', `${username}@%`)
        .limit(1);
      
      console.log('Email prefix search result:', { emailUser, emailError });
      
      if (!emailError && emailUser && emailUser.length > 0) {
        user = emailUser[0];
        searchMethod = 'email_prefix';
      }
    }

    // Method 4: Try exact email match if other methods failed
    if (!user) {
      console.log(`Trying exact email search for: ${username}`);
      const { data: exactEmailUser, error: exactEmailError } = await supabase
        .from('users')
        .select('*')
        .eq('email', username)
        .single();
      
      console.log('Exact email search result:', { exactEmailUser, exactEmailError });
      
      if (!exactEmailError && exactEmailUser) {
        user = exactEmailUser;
        searchMethod = 'exact_email';
      }
    }

    // Method 5: Try as name/email prefix if other methods failed
    if (!user) {
      console.log(`Trying name search for: ${username}`);
      const { data: nameUser, error: nameError } = await supabase
        .from('users')
        .select('*')
        .ilike('name', `%${username}%`) // Use ilike for case-insensitive partial match
        .limit(1);
      
      console.log('Name search result:', { nameUser, nameError });
      
      if (!nameError && nameUser && nameUser.length > 0) {
        user = nameUser[0];
        searchMethod = 'name_partial';
      }
    }

    if (!user) {
      console.error('User not found with any method');
      return NextResponse.json(
        { 
          error: 'User not found', 
          username,
          searchMethods: ['UUID', 'integer_ID', 'email_prefix', 'exact_email', 'name']
        },
        { status: 404 }
      );
    }

    console.log(`User found using method: ${searchMethod}`, user);

    // Transform database user to profile format with safe defaults
    const profile = {
      username: user.id, // Use the actual ID (UUID or integer)
      displayName: user.name || (user.email ? user.email.split('@')[0] : 'Unknown User'),
      email: user.email, // Add email field
      bio: user.role ? `User with role: ${user.role}` : 'Game Developer',
      avatarInitial: user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U'),
      rank: user.level || 'Beginner',
      location: user.email || 'Not specified',
      joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown',
      website: '',
      github: '',
      linkedin: '',
      twitter: '',
      isOwnProfile: false,
      stats: [
        {
          value: user.age ? user.age.toString() : 'N/A',
          title: "Age",
          subtitle: "Years old",
          icon: "User",
        },
        {
          value: user.level || 'Beginner',
          title: "Level",
          subtitle: "Current rank",
          icon: "Trophy",
        },
        {
          value: user.role || 'Member',
          title: "Role",
          subtitle: "User role",
          icon: "Shield",
        },
        {
          value: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown',
          title: "Joined",
          subtitle: "Member since",
          icon: "Calendar",
        },
      ],
      projects: [], // Empty since no project data in database
      badges: [], // Empty since no badge data in database
      activities: [], // Empty since no activity data in database
      skills: [], // Empty since no skills data in database
    };

    console.log(`Successfully created profile for ${username} using ${searchMethod}`);
    return NextResponse.json(profile);

  } catch (error) {
    console.error('Unexpected error in profile API:', error);
    const resolvedParams = await params;
    const username = resolvedParams.username;
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        username: username
      },
      { status: 500 }
    );
  }
}
