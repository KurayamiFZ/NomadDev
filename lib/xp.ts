/**
 * XP & Streak System
 *
 * Idempotent XP awards via xp_events (UNIQUE constraint prevents doubles).
 * Streak tracking via user_stats.last_active_date.
 */

import { supabase } from './supabaseclient';
import { getLevelFromXP } from './level-system';

// ── XP reward amounts ────────────────────────────────────────────────────────
export const XP = {
  LESSON_WATCH:    10,   // any meaningful watch (≥ 25%)
  LESSON_COMPLETE: 50,   // lesson watched ≥ 90%
  COURSE_COMPLETE: 100,  // all lessons in a course done
  DAILY_STREAK:    20,   // maintaining daily streak
} as const;

export type XPEventType =
  | 'lesson_watch'
  | 'lesson_complete'
  | 'course_complete'
  | 'daily_streak';

export interface UserStats {
  xp: number;
  level: number;
  streak_count: number;
  last_active_date: string | null;
}

// ── Core: award XP (idempotent) ──────────────────────────────────────────────
/**
 * Award XP for an event. Safe to call multiple times — duplicates are silently
 * ignored via the UNIQUE(user_id, event_type, ref_id) constraint on xp_events.
 *
 * @param eventType  - type of event
 * @param refId      - unique identifier for this specific event instance
 * @param xpAmount   - override default XP amount for this event type
 */
export async function awardXP(
  eventType: XPEventType,
  refId: string,
  xpAmount?: number,
): Promise<{ awarded: boolean; newXP: number; newLevel: number }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { awarded: false, newXP: 0, newLevel: 1 };

  const amount = xpAmount ?? XP[eventType.toUpperCase().replace(/-/g, '_') as keyof typeof XP] ?? 0;

  // Insert XP event — silently fails on duplicate (UNIQUE violation = code 23505)
  const { error: evtErr } = await supabase.from('xp_events').insert({
    user_id: user.id,
    event_type: eventType,
    ref_id: refId,
    xp_awarded: amount,
  });

  if (evtErr) {
    if (evtErr.code === '23505') return { awarded: false, newXP: 0, newLevel: 1 };
    console.error('[xp] insert event:', evtErr.message);
    return { awarded: false, newXP: 0, newLevel: 1 };
  }

  // Fetch current XP then upsert updated stats
  const { data: current } = await supabase
    .from('user_stats')
    .select('xp')
    .eq('user_id', user.id)
    .maybeSingle();

  const newXP = (current?.xp ?? 0) + amount;
  const newLevel = getLevelFromXP(newXP);

  await supabase.from('user_stats').upsert(
    { user_id: user.id, xp: newXP, level: newLevel, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' },
  );

  return { awarded: true, newXP, newLevel };
}

// ── Streak update ─────────────────────────────────────────────────────────────
/**
 * Call once per learning session (e.g. on video play).
 * Increments streak if yesterday was the last active day.
 * Resets to 1 if more than a day has passed.
 * Awards streak XP once per day (deduped by date string).
 */
export async function updateStreak(): Promise<{ streakCount: number; bonusAwarded: boolean }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { streakCount: 0, bonusAwarded: false };

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const { data: stats } = await supabase
    .from('user_stats')
    .select('streak_count, last_active_date')
    .eq('user_id', user.id)
    .maybeSingle();

  const lastActive = stats?.last_active_date as string | null;
  const currentStreak = stats?.streak_count ?? 0;

  if (lastActive === today) {
    return { streakCount: currentStreak, bonusAwarded: false };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newStreak = lastActive === yesterdayStr ? currentStreak + 1 : 1;

  await supabase.from('user_stats').upsert(
    {
      user_id: user.id,
      streak_count: newStreak,
      last_active_date: today,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  const { awarded } = await awardXP('daily_streak', `streak:${today}`, XP.DAILY_STREAK);
  return { streakCount: newStreak, bonusAwarded: awarded };
}

// ── Fetch user stats ──────────────────────────────────────────────────────────
export async function getUserStats(userId?: string): Promise<UserStats> {
  const uid =
    userId ?? (await supabase.auth.getUser()).data.user?.id;
  if (!uid) return { xp: 0, level: 1, streak_count: 0, last_active_date: null };

  const { data } = await supabase
    .from('user_stats')
    .select('xp, level, streak_count, last_active_date')
    .eq('user_id', uid)
    .maybeSingle();

  return data ?? { xp: 0, level: 1, streak_count: 0, last_active_date: null };
}
