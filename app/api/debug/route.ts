import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET() {
  console.log('=== DEBUG API CALLED ===');
  
  try {
    // Check environment variables
    const envCheck = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
      supabaseKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    };
    
    console.log('Environment check:', envCheck);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({
        error: 'Missing environment variables',
        envCheck,
        step: 'environment'
      });
    }

    // Create Supabase client
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

    // Test connection by checking the users table
    console.log('Testing database connection...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    console.log('Table query result:', { tableInfo, tableError });

    if (tableError) {
      return NextResponse.json({
        error: 'Table query failed',
        tableError: tableError.message,
        envCheck,
        step: 'table_access'
      });
    }

    // Get all users to see the data structure
    console.log('Fetching all users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Users query result:', { users, usersError });

    if (usersError) {
      return NextResponse.json({
        error: 'Users query failed',
        usersError: usersError.message,
        envCheck,
        step: 'users_query'
      });
    }

    // Analyze the data structure
    const userSample = users && users.length > 0 ? users[0] : null;
    const dataStructure = userSample ? Object.keys(userSample) : [];
    
    console.log('Data structure analysis:', {
      totalUsers: users?.length || 0,
      sampleUser: userSample,
      dataStructure
    });

    return NextResponse.json({
      success: true,
      envCheck,
      step: 'complete',
      data: {
        totalUsers: users?.length || 0,
        sampleUser: userSample,
        dataStructure,
        allUsers: users?.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          age: u.age,
          level: u.level,
          role: u.role,
          created_at: u.created_at
        })) || []
      },
      message: "Check the 'allUsers' array above to see actual user names in your database"
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      error: 'Unexpected error',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      step: 'exception'
    });
  }
}
