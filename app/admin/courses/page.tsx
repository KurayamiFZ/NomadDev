import { getCourses } from "@/app/actions/courses";
import { Video, Calendar, Tag, ExternalLink } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  Godot: "Godot",
  RobloxStudio: "Roblox Studio",
  Unity: "Unity",
  Unreal: "Unreal",
  Blender: "Blender",
  "3D": "3D",
  Animation: "Animation",
  "Game Design": "Game Design",
};

export default async function Courses() {
  const result = await getCourses();
  const courses = result.success ? (result.data ?? []) : [];

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Courses</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {courses.length} course{courses.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>
      </div>

      {/* Error state */}
      {!result.success && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 mb-6">
          Failed to load courses: {result.error}
        </div>
      )}

      {/* Empty state */}
      {courses.length === 0 && result.success && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 font-medium">No courses yet</p>
          <p className="text-gray-600 text-sm mt-1">
            Add your first course from the Add page.
          </p>
        </div>
      )}

      {/* Courses grid */}
      {courses.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course: any) => (
            <div
              key={course.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-colors"
            >
              {/* Thumbnail / video preview */}
              <div className="relative h-40 bg-black flex items-center justify-center border-b border-gray-800">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : course.video_url ? (
                  <video
                    src={course.video_url}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                ) : (
                  <Video className="w-10 h-10 text-gray-600" />
                )}
                {/* Category pill */}
                <span className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-purple-600/30">
                  <Tag className="w-3 h-3" />
                  {CATEGORY_LABELS[course.category] ?? course.category ?? "—"}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-white text-lg leading-snug line-clamp-2">
                  {course.title}
                </h3>

                {course.description && (
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {course.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1">
                  {/* Date */}
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {course.created_at
                      ? new Date(course.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )
                      : "—"}
                  </span>

                  {/* Video link */}
                  {course.video_url && (
                    <a
                      href={course.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      View video
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
