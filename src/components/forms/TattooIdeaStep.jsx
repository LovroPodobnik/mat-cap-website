import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Upload, X } from 'react-feather'
import { uploadImage, deleteImage } from '../../config/supabase';

const StepContainer = styled(motion.div)`
  // Add any specific styling needed
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.07);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-size: var(--font-size-sm);
`

const ImageUploadContainer = styled.div`
  margin-top: 1.5rem;
`

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-text);
  font-size: var(--font-size-sm);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-primary);
  }

  input {
    display: none;
  }
`

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const ImagePreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

const RemoveButton = styled.button`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: scale(1.1);
  }
`

const TattooIdeaStep = ({ formData, setFormData, onFocus }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      tattooIdea: {
        ...prev.tattooIdea,
        description: e.target.value
      }
    }));
  };

  const handleImageUpload = async (e) => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const files = Array.from(e.target.files);
      const totalFiles = files.length;
      let completedFiles = 0;

      const uploadPromises = files.map(async (file) => {
        // Show original size
        console.log(`Original size of ${file.name}:`, file.size / 1024 / 1024, 'MB');

        if (file.size > 10 * 1024 * 1024) { // 10MB limit for original files
          alert('File size must be less than 10MB');
          return null;
        }

        const result = await uploadImage(file);
        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
        
        return result.success ? result.url : null;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null);

      setFormData(prev => ({
        ...prev,
        tattooIdea: {
          ...prev.tattooIdea,
          referenceImages: [...prev.tattooIdea.referenceImages, ...validUrls]
        }
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = async (index) => {
    const imageUrl = formData.tattooIdea.referenceImages[index];
    // Extract path from URL
    const path = imageUrl.split('/').pop();
    
    // Delete from storage
    await deleteImage(path);

    // Update form data
    setFormData(prev => ({
      ...prev,
      tattooIdea: {
        ...prev.tattooIdea,
        referenceImages: prev.tattooIdea.referenceImages.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <StepContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div>
        <Label>Opis ideje za tetovažo</Label>
        <TextArea
          value={formData.tattooIdea.description}
          onChange={handleDescriptionChange}
          onFocus={onFocus}
          placeholder="Opišite vašo idejo za tetovažo..."
          required
        />
      </div>

      <ImageUploadContainer>
        <Label>Referenčne slike (opcijsko)</Label>
        <UploadButton>
          <Upload size={16} />
          Naloži slike
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            onFocus={onFocus}
          />
        </UploadButton>

        <ImagePreviewGrid>
          {formData.tattooIdea.referenceImages.map((image, index) => (
            <ImagePreview key={index}>
              <img src={image} alt={`Reference ${index + 1}`} />
              <RemoveButton onClick={() => removeImage(index)}>
                <X size={12} />
              </RemoveButton>
            </ImagePreview>
          ))}
        </ImagePreviewGrid>
      </ImageUploadContainer>
    </StepContainer>
  )
}

export default TattooIdeaStep
