"use client";

import { useState, useRef, useCallback } from "react";
import { Save, Upload, X, AlertCircle, ImagePlus } from "lucide-react";
import { createCourse } from "@/app/actions/courses";
import { cn } from "@/lib/utils";

interface NewCourseProps {
  isActive?: boolean;
}

interface FormState {
  title: string;
  description: string;
  category: string;
  videoFile: File | null;
  videoPreviewUrl: string | null;
  thumbnailFile: File | null;
  thumbnailPreviewUrl: string | null;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category: "",
  videoFile: null,
  videoPreviewUrl: null,
  thumbnailFile: null,
  thumbnailPreviewUrl: null,
};

export default function NewCourse({ isActive = false }: NewCourseProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const updateField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleVideoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Revoke previous object URL to avoid memory leak
      setForm((prev) => {
        if (prev.videoPreviewUrl) URL.revokeObjectURL(prev.videoPreviewUrl);
        return {
          ...prev,
          videoFile: file,
          videoPreviewUrl: URL.createObjectURL(file),
        };
      });
    },
    [],
  );

  const handleThumbnailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setForm((prev) => {
        if (prev.thumbnailPreviewUrl) URL.revokeObjectURL(prev.thumbnailPreviewUrl);
        return {
          ...prev,
          thumbnailFile: file,
          thumbnailPreviewUrl: URL.createObjectURL(file),
        };
      });
    },
    [],
  );

  const clearThumbnail = useCallback(() => {
    setForm((prev) => {
      if (prev.thumbnailPreviewUrl) URL.revokeObjectURL(prev.thumbnailPreviewUrl);
      return { ...prev, thumbnailFile: null, thumbnailPreviewUrl: null };
    });
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  }, []);

  const clearVideo = useCallback(() => {
    setForm((prev) => {
      if (prev.videoPreviewUrl) URL.revokeObjectURL(prev.videoPreviewUrl);
      return { ...prev, videoFile: null, videoPreviewUrl: null };
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!form.title.trim()) errs.push("Course title is required.");
    if (!form.description.trim()) errs.push("Course description is required.");
    if (!form.category) errs.push("Course category is required.");
    if (!form.videoFile) errs.push("A video file is required.");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const errs = validate();
    setErrors(errs);
    if (errs.length > 0) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("category", form.category);
      formData.append("video", form.videoFile!);
      if (form.thumbnailFile) formData.append("thumbnail", form.thumbnailFile);

      const result = await createCourse(formData);

      if (result.success) {
        setMessage({ type: "success", text: "Course created successfully!" });
        setForm((prev) => {
          if (prev.videoPreviewUrl) URL.revokeObjectURL(prev.videoPreviewUrl);
          if (prev.thumbnailPreviewUrl) URL.revokeObjectURL(prev.thumbnailPreviewUrl);
          return EMPTY_FORM;
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (thumbInputRef.current) thumbInputRef.current.value = "";
        setErrors([]);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to create course.",
        });
      }
    } catch (err) {
      console.error("Course creation failed:", err);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid =
    form.title.trim() &&
    form.description.trim() &&
    form.category &&
    form.videoFile;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-black text-white">Create New Course</h2>

      {/* Success / Error Banner */}
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg border",
            message.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400",
          )}
        >
          {message.text}
        </div>
      )}

      {/* ── Course Information ─────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Course Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Course Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            placeholder="Enter course title"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Course Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none h-32 resize-none"
            placeholder="Enter course description"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            <option value="Godot">Godot</option>
            <option value="RobloxStudio">Roblox Studio</option>
            <option value="Unity">Unity</option>
            <option value="Unreal">Unreal</option>
            <option value="Blender">Blender</option>
            <option value="3D">3D</option>
            <option value="Animation">Animation</option>
            <option value="Game Design">Game Design</option>
          </select>
        </div>
      </div>

      {/* ── Thumbnail Upload + Preview ──────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">
          Thumbnail
          <span className="ml-2 text-xs font-normal text-gray-500">optional</span>
        </h3>

        <input
          ref={thumbInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleThumbnailChange}
          disabled={isSubmitting}
        />

        {form.thumbnailPreviewUrl ? (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-black border border-gray-700 h-48">
              <img
                src={form.thumbnailPreviewUrl}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className="truncate max-w-xs font-medium">{form.thumbnailFile?.name}</span>
              <span>
                {form.thumbnailFile
                  ? (form.thumbnailFile.size / 1024).toFixed(0) + " KB"
                  : ""}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => thumbInputRef.current?.click()}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-700 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                Change Image
              </button>
              <button
                type="button"
                onClick={clearThumbnail}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => !isSubmitting && thumbInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-8 text-center transition-colors",
              isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            )}
          >
            <ImagePlus className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">Click to select a thumbnail</p>
            <p className="text-sm text-gray-500 mt-1">JPEG, PNG, WebP or GIF &mdash; max 10 MB</p>
          </div>
        )}
      </div>

      {/* ── Video Upload + Preview ─────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Course Video</h3>

        {/* Hidden file input — triggered by click, not a separate upload button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,.mp4,.webm,.mov,.avi"
          className="hidden"
          onChange={handleVideoChange}
          disabled={isSubmitting}
        />

        {form.videoPreviewUrl ? (
          /* ── Preview state ── */
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-black border border-gray-700">
              <video
                src={form.videoPreviewUrl}
                controls
                className="w-full max-h-72 object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className="truncate max-w-xs font-medium">
                {form.videoFile?.name}
              </span>
              <span>
                {form.videoFile
                  ? (form.videoFile.size / (1024 * 1024)).toFixed(1) + " MB"
                  : ""}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-700 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                Change Video
              </button>
              <button
                type="button"
                onClick={clearVideo}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          /* ── Empty / drop zone state ── */
          <div
            onClick={() => !isSubmitting && fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-8 text-center transition-colors",
              isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            )}
          >
            <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">Click to select a video</p>
            <p className="text-sm text-gray-500 mt-1">
              Supported: MP4, WebM, MOV, AVI (max 3 GB)
            </p>
          </div>
        )}
      </div>

      {/* ── Validation Errors ──────────────────────────────────── */}
      {errors.length > 0 && (
        <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <ul className="space-y-1 text-sm list-none">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Submit ────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? "Creating Course..." : "Create Course"}
        </button>
      </div>
    </form>
  );
}
