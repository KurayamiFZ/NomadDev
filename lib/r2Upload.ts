/**
 * Cloudflare R2 Upload Utility
 * 
 * Handles video uploads to Cloudflare R2 storage using S3-compatible SDK.
 * Keeps all credentials and upload logic on the server side.
 */

import { PutObjectCommand, ListObjectsV2Command, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// R2 Configuration
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadVideoToR2(
  file: File,
  options: {
    folder?: string;
    metadata?: Record<string, string>;
  } = {}
): Promise<{ url: string; key: string }> {
  try {
    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only MP4, WebM, MOV, and AVI files are allowed.');
    }

    // Validate file size (3GB max)
    const maxSize = 3 * 1024 * 1024 * 1024; // 3GB
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 3GB.');
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueId = uuidv4();
    const timestamp = Date.now();
    const folder = options.folder || 'courses';
    const key = `${folder}/${timestamp}-${uniqueId}.${fileExtension}`;

    // Prepare upload command
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: file,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadTime: new Date().toISOString(),
        ...options.metadata,
      },
    });

    // Upload to R2
    await r2Client.send(command);

    // Construct public URL (adjust based on your R2 setup)
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return {
      url: publicUrl,
      key: key,
    };
  } catch (error) {
    console.error('R2 upload error:', error);
    throw new Error(`Failed to upload video: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch lesson metadata from Cloudflare R2 storage
 * 
 * @param folder - The folder to fetch lessons from (default: 'lessons')
 * @returns Promise resolving to array of lesson objects
 */
export async function fetchLessonsFromR2(folder: string = 'lessons'): Promise<any[]> {
  try {
    // List all objects in the lessons folder
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      Prefix: `${folder}/`,
    });

    const listResponse = await r2Client.send(listCommand);
    const objects = listResponse.Contents || [];

    console.log('Found objects in R2:', objects.length);

    // Fetch metadata for each lesson
    const lessons = [];
    
    for (const object of objects) {
      if (object.Key?.endsWith('.json')) {
        try {
          // Get the JSON metadata file
          const getCommand = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: object.Key,
          });

          const getResponse = await r2Client.send(getCommand);
          
          // Convert stream to string
          const bodyContents = await streamToString(getResponse.Body);
          const lessonData = JSON.parse(bodyContents);

          // Add video URL if video file exists
          const videoKey = object.Key.replace('.json', '.mp4');
          lessons.push({
            ...lessonData,
            id: lessonData.id || parseInt(object.Key?.split('/').pop()?.split('.')[0] || '0'),
            videoUrl: `${process.env.R2_PUBLIC_URL}/${videoKey}`,
            key: object.Key,
          });
        } catch (error) {
          console.error(`Error fetching lesson ${object.Key}:`, error);
        }
      }
    }

    // Sort lessons by ID
    return lessons.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching lessons from R2:', error);
    throw new Error(`Failed to fetch lessons: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Helper function to convert stream to string
 */
async function streamToString(stream: any): Promise<string> {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

/**
 * Delete a video file from Cloudflare R2
 * 
 * @param key - The object key to delete
 * @returns Promise resolving when deletion is complete
 */
export async function deleteVideoFromR2(key: string): Promise<void> {
  try {
    // This would require implementing delete functionality
    // For now, we'll leave it as a placeholder
    console.log('Delete video:', key);
    // Implementation would use DeleteObjectCommand
  } catch (error) {
    console.error('R2 delete error:', error);
    throw new Error(`Failed to delete video: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
