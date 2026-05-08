/**
 * API Route for fetching lessons (courses) from Supabase
 *
 * GET /api/lessons - Returns all courses from the videos table
 */

import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('API/lessons: URL present?', !!url);
    console.log('API/lessons: KEY present?', !!key, 'starts with', key?.slice(0, 8));

    if (!url || !key) {
      return NextResponse.json(
        { success: false, error: 'Missing Supabase env vars', data: [] },
        { status: 500 }
      );
    }

    const supabase = createSupabaseClient(url, key);

    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: true });

    console.log('API/lessons: rows=', data?.length ?? 0, 'error=', error?.message ?? 'none');

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, data: [] },
        { status: 500 }
      );
    }

    const rows = data ?? [];
    const lessons = rows.map((row, index) => ({
      id: row.id,
      title: row.title,
      description: row.description ?? '',
      category: row.category ?? '',
      video_url: row.video_url ?? null,
      thumbnail_url: row.thumbnail_url ?? null,
      duration: '',
      current: index === 0,
      completed: false,
      locked: false,
    }));

    return NextResponse.json({ success: true, data: lessons, count: lessons.length });
  } catch (error) {
    console.error('API/lessons: unexpected error', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: [] },
      { status: 500 }
    );
  }
}
