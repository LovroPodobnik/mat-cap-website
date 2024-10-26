import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import FormInput from './FormInput'
import { Upload, X } from 'react-feather'
import FormSelect from './FormSelect'
import Switch from './Switch'
import { uploadImage, deleteImage } from '../../config/supabase'

const StepContainer = styled(motion.div)`
  // Add any specific styling needed
`

const RadioGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-size: var(--font-size-sm);
`

const RadioOptions = styled.div`
  display: flex;
  gap: 1rem;
`

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
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

const ImagePreview = styled.div`
  position: relative;
  margin-top: 1rem;
  max-width: 200px;
  
  img {
    width: 100%;
    height: auto;
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

const TattooDetailsStep = ({ formData, setFormData, onFocus }) => {
  const [uploading, setUploading] = useState(false);

  const handleLocationImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Delete existing image if there is one
      if (formData.tattooDetails.locationImage) {
        const path = formData.tattooDetails.locationImage.split('/').pop();
        await deleteImage(path, 'location');
      }

      const result = await uploadImage(file, 'location');
      if (!result.success) throw new Error(result.error);

      setFormData(prev => ({
        ...prev,
        tattooDetails: {
          ...prev.tattooDetails,
          locationImage: result.url
        }
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeLocationImage = async () => {
    if (!formData.tattooDetails.locationImage) return;

    try {
      const path = formData.tattooDetails.locationImage.split('/').pop();
      await deleteImage(path, 'location');

      setFormData(prev => ({
        ...prev,
        tattooDetails: {
          ...prev.tattooDetails,
          locationImage: null
        }
      }));
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Failed to remove image');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      tattooDetails: {
        ...prev.tattooDetails,
        [name]: value
      }
    }));
  };

  const tattooStyles = [
    { value: 'black-grey', label: 'Črno-siva' },
    { value: 'realistic', label: 'Realistična' },
    { value: 'traditional', label: 'Tradicionalna' },
    { value: 'neo-traditional', label: 'Neo-tradicionalna' },
    { value: 'minimalist', label: 'Minimalistična' },
    { value: 'watercolor', label: 'Vodene barve' },
    { value: 'geometric', label: 'Geometrijska' },
    { value: 'tribal', label: 'Tribal' }
  ];

  return (
    <StepContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <FormInput
        label="Velikost tetovaže (cm)"
        name="size"
        value={formData.tattooDetails.size}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="npr. 10x15"
        required
      />
      
      <FormInput
        label="Lokacija na telesu"
        name="location"
        value={formData.tattooDetails.location}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="npr. Leva roka, notranja stran zapestja"
        required
      />

      <FormSelect
        label="Stil tetovaže"
        name="style"
        options={tattooStyles}
        value={formData.tattooDetails.style}
        onChange={handleChange}
        onFocus={onFocus}
      />

      <Switch
        label="Je to vaša prva tetovaža?"
        name="isFirstTattoo"
        isOn={formData.tattooDetails.isFirstTattoo === 'yes'}
        onToggle={(e) => handleChange({ 
          target: { 
            name: 'isFirstTattoo', 
            value: e.target.value ? 'yes' : 'no' 
          }
        })}
        onFocus={onFocus}
      />

      <ImageUploadContainer>
        <Label>Slika lokacije (opcijsko)</Label>
        <UploadButton>
          <Upload size={16} />
          {uploading ? 'Nalagam...' : 'Naloži sliko'}
          <input
            type="file"
            accept="image/*"
            onChange={handleLocationImageUpload}
            onFocus={onFocus}
            disabled={uploading}
          />
        </UploadButton>

        {formData.tattooDetails.locationImage && (
          <ImagePreview>
            <img 
              src={formData.tattooDetails.locationImage} 
              alt="Location preview" 
            />
            <RemoveButton onClick={removeLocationImage}>
              <X size={12} />
            </RemoveButton>
          </ImagePreview>
        )}
      </ImageUploadContainer>
    </StepContainer>
  )
}

export default TattooDetailsStep
