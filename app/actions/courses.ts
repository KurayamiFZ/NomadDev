"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { uploadVideoToR2, uploadImageToR2 } from "@/lib/r2Upload";

export async function createCourse(formData: FormData) {
  try {
    // Extract form fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const videoFile = formData.get("video") as File;
    const thumbnailFile = formData.get("thumbnail") as File | null;

    // Validate required fields
    if (!title?.trim()) {
      return { success: false, error: "Course title is required" };
    }
    if (!description?.trim()) {
      return { success: false, error: "Course description is required" };
    }
    if (!category?.trim()) {
      return { success: false, error: "Course category is required" };
    }
    if (!videoFile || videoFile.size === 0) {
      return { success: false, error: "Video file is required" };
    }

    // Upload video to R2
    let videoUrl: string;
    try {
      const uploadResult = await uploadVideoToR2(videoFile, {
        folder: "courses",
        metadata: {
          courseTitle: title,
          category: category,
        },
      });
      videoUrl = uploadResult.url;
    } catch (uploadError) {
      console.error("Video upload failed:", uploadError);
      return {
        success: false,
        error:
          uploadError instanceof Error
            ? uploadError.message
            : "Failed to upload video",
      };
    }

    // Upload thumbnail if provided
    let thumbnailUrl: string | null = null;
    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        const thumbResult = await uploadImageToR2(thumbnailFile, {
          folder: "thumbnails",
          metadata: { courseTitle: title },
        });
        thumbnailUrl = thumbResult.url;
      } catch (thumbError) {
        console.error("Thumbnail upload failed:", thumbError);
        // Non-fatal — continue without thumbnail
      }
    }

    // Insert course into Supabase
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("videos")
        .insert({
          title: title.trim(),
          description: description.trim(),
          category: category.trim(),
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase insertion error:", error);
        // If database insertion fails, we should ideally delete the uploaded video
        // For now, we'll just return the error
        return {
          success: false,
          error: `Database error: ${error.message}`,
        };
      }

      // Revalidate cache for admin pages
      revalidatePath("/admin/videos");
      revalidatePath("/admin/add");

      return {
        success: true,
        data: {
          id: data.id,
          title: data.title,
          video_url: data.video_url,
        },
      };
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      return {
        success: false,
        error:
          dbError instanceof Error
            ? dbError.message
            : "Database operation failed",
      };
    }
  } catch (error) {
    console.error("Course creation failed:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get all courses (for admin dashboard)
 *
 * @returns Promise resolving to courses list or error
 */
export async function getCourses() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching courses:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch courses",
    };
  }
}
