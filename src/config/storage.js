import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import imageCompression from 'browser-image-compression';

// Compression options
const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  initialQuality: 0.7,
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
    return file;
  }
}

// Upload image
export async function uploadImage(file, type = 'reference') {
  const bucket = type === 'reference' ? 'tattoo-references' : 'tattoo-locations';
  
  try {
    console.log('Starting upload to bucket:', bucket);
    const compressedFile = await compressImage(file);
    const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
    const filePath = `${bucket}/${fileName}`;
    const storageRef = ref(storage, filePath);
    
    console.log('Uploading to path:', filePath);
    await uploadBytes(storageRef, compressedFile);
    const url = await getDownloadURL(storageRef);
    
    console.log('Upload successful, URL:', url);
    return { success: true, url };
  } catch (error) {
    console.error('Error uploading image:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      serverResponse: error.serverResponse
    });
    return { success: false, error: error.message };
  }
}

// Delete image
export async function deleteImage(url) {
  try {
    // Extract the path from the URL
    const path = url.split('.app/')[1].split('?')[0];
    const imageRef = ref(storage, path);
    
    await deleteObject(imageRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error: error.message };
  }
} 