import { createServerClient } from "@supabase/ssr";

export async function GET() {
  console.log('Users API route hit - fetching from database');
  
  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return Response.json(
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
          getAll() {
            return [];
          },
          setAll() {
            // No-op for API routes
          },
        },
      },
    );

    console.log('Querying users table...');
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, age, created_at, level, role')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return Response.json(
        { error: 'Database query failed', details: error.message },
        { status: 500 }
      );
    }

    console.log('Raw users data:', users);

    if (!users || users.length === 0) {
      console.log('No users found in database, returning empty array');
      return Response.json([]);
    }

    const formattedUsers = users.map(user => ({
      username: user.id, // Use the actual ID (could be UUID or integer)
      displayName: user.name || (user.email ? user.email.split('@')[0] : 'Unknown User'),
      rank: user.level || 'Beginner',
      email: user.email, // Include email for display
    }));

    console.log(`Successfully fetched ${formattedUsers.length} users from database:`, formattedUsers);
    console.log('Sample user data structure:', formattedUsers[0]);
    return Response.json(formattedUsers);
    
  } catch (error) {
    console.error('Unexpected error in users API:', error);
    return Response.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
