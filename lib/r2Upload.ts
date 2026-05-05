/**
 * Cloudflare R2 Upload Utility
 * 
 * Handles video uploads to Cloudflare R2 storage using S3-compatible SDK.
 * Keeps all credentials and upload logic on the server side.
 */

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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
