import { createClient } from '@supabase/supabase-js'
import imageCompression from 'browser-image-compression';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Compression options
const compressionOptions = {
  maxSizeMB: 1,              // Maximum size in MB
  maxWidthOrHeight: 1920,    // Max width/height
  useWebWorker: true,        // Use web worker for better performance
  initialQuality: 0.7,       // Initial quality (0 to 1)
};

// Helper function to compress image
async function compressImage(file) {
  try {
    console.log('Original file size:', file.size / 1024 / 1024, 'MB');
    
    const compressedFile = await imageCompression(file, compressionOptions);
    
    console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');
    
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    return file; // Return original file if compression fails
  }
}

// Helper function to upload image with type
export async function uploadImage(file, type = 'reference') {
  const bucket = type === 'reference' ? 'tattoo-references' : 'tattoo-locations';
  
  try {
    // Compress image before upload
    const compressedFile = await compressImage(file);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, compressedFile, {
        cacheControl: '3600',
        contentType: `image/${fileExt}`
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
}

// Helper function to delete image with type
export async function deleteImage(path, type = 'reference') {
  const bucket = type === 'reference' ? 'tattoo-references' : 'tattoo-locations';
  
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error: error.message };
  }
}
