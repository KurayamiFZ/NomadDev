"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseclient";
import { fetchProgress, upsertProgress } from "@/lib/progress";
import { updateStreak } from "@/lib/xp";
import Icon from "@/app/components/icons";

const SAVE_INTERVAL_MS = 10_000; // save every 10 s while playing
const COMPLETION_THRESHOLD = 90; // mark complete at 90%

export default function CoursePage() {
  const params = useParams();
  const id = params?.id as string;

  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streakFiredRef = useRef(false);

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // ── Load course + restore position ──────────────────────────────────────
  useEffect(() => {
    if (!id) return;

    async function load() {
      const [{ data: courseData }, saved] = await Promise.all([
        supabase.from("videos").select("*").eq("id", id).single(),
        fetchProgress(id),
      ]);

      setCourse(courseData ?? null);

      if (saved) {
        setProgressPercent(saved.progress_percent);
        setIsCompleted(saved.status === "completed");

        if (saved.last_watched_time > 0 && videoRef.current) {
          const apply = () => {
            if (videoRef.current)
              videoRef.current.currentTime = saved.last_watched_time;
          };
          if (videoRef.current.readyState >= 1) {
            apply();
          } else {
            videoRef.current.addEventListener("loadedmetadata", apply, {
              once: true,
            });
          }
        }
      }

      setLoading(false);
    }

    load();
  }, [id]);

  // ── Save helper ──────────────────────────────────────────────────────────
  const doSave = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !id || !video.duration) return;

    const pct = Math.min(
      100,
      Math.round((video.currentTime / video.duration) * 100),
    );
    setProgressPercent(pct);
    if (pct >= COMPLETION_THRESHOLD) setIsCompleted(true);
    await upsertProgress(id, video.currentTime, video.duration);
  }, [id]);

  // ── Start interval on play ───────────────────────────────────────────────
  const handlePlay = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(doSave, SAVE_INTERVAL_MS);
    // Fire streak update once per page load
    if (!streakFiredRef.current) {
      streakFiredRef.current = true;
      updateStreak().catch(() => {});
    }
  }, [doSave]);

  // ── Save immediately on pause/end ────────────────────────────────────────
  const handlePauseOrEnd = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    doSave();
  }, [doSave]);

  // ── Live progress bar update (no DB write) ───────────────────────────────
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgressPercent(
      Math.min(100, Math.round((v.currentTime / v.duration) * 100)),
    );
  }, []);

  // ── Save on unmount / tab close ──────────────────────────────────────────
  useEffect(() => {
    const onUnload = () => doSave();
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      doSave();
    };
  }, [doSave]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
        <p className="text-gray-400">Хичээл олдсонгүй</p>
        <Link
          href="/home/lessons"
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          ← Хичээлүүдрүү буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back nav */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
        <Link
          href="/home/lessons"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Icon name="ChevronLeft" className="w-4 h-4" />
          Хичээлүүд
        </Link>
        {isCompleted && (
          <span className="ml-auto flex items-center gap-1 text-green-400 text-sm font-medium">
            <Icon name="CheckCircle" className="w-4 h-4" />
            Дууссан
          </span>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Video player */}
        <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          {course.video_url ? (
            <video
              ref={videoRef}
              src={course.video_url}
              controls
              className="w-full aspect-video"
              preload="metadata"
              onPlay={handlePlay}
              onPause={handlePauseOrEnd}
              onEnded={handlePauseOrEnd}
              onTimeUpdate={handleTimeUpdate}
            />
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gray-900">
              <Icon name="Video" className="w-12 h-12 text-gray-600" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Явц</span>
            <span
              className={`font-bold ${isCompleted ? "text-green-400" : "text-purple-400"}`}
            >
              {progressPercent}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isCompleted
                  ? "bg-green-500"
                  : "bg-linear-to-r from-purple-500 to-pink-500"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Course info */}
        <div className="space-y-3">
          {course.category && (
            <span className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-purple-300">
              {course.category}
            </span>
          )}
          <h1 className="text-3xl font-black">{course.title}</h1>
          {course.description && (
            <p className="text-gray-400 leading-relaxed">{course.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
