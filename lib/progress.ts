import { supabase } from './supabaseclient';
import { awardXP, XP } from './xp';

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  last_watched_time: number;
  duration: number;
  progress_percent: number;
  status: 'in-progress' | 'completed';
  updated_at: string;
}

/** Fetch saved progress for one course. Returns null if none or not logged in. */
export async function fetchProgress(courseId: string): Promise<CourseProgress | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_course_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle();

  if (error) console.error('[progress] fetchProgress:', error.message);
  return data ?? null;
}

/**
 * Upsert progress for the current user.
 * Calculates progress_percent from currentTime/duration.
 * Marks status = "completed" when >= 90%.
 */
export async function upsertProgress(
  courseId: string,
  currentTime: number,
  duration: number,
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const progress_percent =
    duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;
  const status: 'in-progress' | 'completed' =
    progress_percent >= 90 ? 'completed' : 'in-progress';

  const { error } = await supabase.from('user_course_progress').upsert(
    {
      user_id: user.id,
      course_id: courseId,
      last_watched_time: Math.floor(currentTime),
      duration: Math.floor(duration),
      progress_percent,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,course_id' },
  );

  if (error) { console.error('[progress] upsertProgress:', error.message); return; }

  // Award XP — idempotent, duplicates are silently ignored
  if (status === 'completed') {
    await Promise.all([
      awardXP('lesson_complete', `lesson:${courseId}`, XP.LESSON_COMPLETE),
      awardXP('course_complete', `course:${courseId}`, XP.COURSE_COMPLETE),
    ]);
  } else if (progress_percent >= 25) {
    await awardXP('lesson_watch', `watch:${courseId}`, XP.LESSON_WATCH);
  }
}

export interface InProgressCourse {
  course_id: string;
  progress_percent: number;
  last_watched_time: number;
  updated_at: string;
  videos: {
    id: string;
    title: string;
    description: string | null;
    category: string | null;
    thumbnail_url: string | null;
    video_url: string | null;
  } | null;
}

/**
 * Returns the most recently watched in-progress course for the hero widget.
 * Sorted by updated_at DESC then progress_percent DESC.
 * Returns null if user has no in-progress courses.
 */
export async function fetchMostRecentInProgress(): Promise<InProgressCourse | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Step 1: get the most recent in-progress row
  const { data: progressRow, error: pErr } = await supabase
    .from('user_course_progress')
    .select('course_id, progress_percent, last_watched_time, updated_at')
    .eq('user_id', user.id)
    .neq('status', 'completed')
    .order('updated_at', { ascending: false })
    .order('progress_percent', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (pErr) { console.error('[progress] fetchMostRecentInProgress (progress):', pErr.message); return null; }
  if (!progressRow) return null;

  // Step 2: fetch the matching video row
  const { data: video, error: vErr } = await supabase
    .from('videos')
    .select('id, title, description, category, thumbnail_url, video_url')
    .eq('id', progressRow.course_id)
    .maybeSingle();

  if (vErr) { console.error('[progress] fetchMostRecentInProgress (video):', vErr.message); return null; }

  return {
    course_id: progressRow.course_id,
    progress_percent: progressRow.progress_percent,
    last_watched_time: progressRow.last_watched_time,
    updated_at: progressRow.updated_at,
    videos: video ?? null,
  };
}
