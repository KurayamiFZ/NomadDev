/**
 * API Route for fetching lessons from Cloudflare R2 storage
 * 
 * GET /api/lessons - Returns all lessons from R2 storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchLessonsFromR2 } from '@/lib/r2Upload';

export async function GET(request: NextRequest) {
  try {
    // Fetch lessons from R2 storage
    const lessons = await fetchLessonsFromR2();
    
    console.log(`API: Fetched ${lessons.length} lessons from R2`);

    return NextResponse.json({
      success: true,
      data: lessons,
      count: lessons.length,
    });
  } catch (error) {
    console.error('API Error fetching lessons:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch lessons',
        data: [],
      },
      { status: 500 }
    );
  }
}
