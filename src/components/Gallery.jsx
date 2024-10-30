import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const GalleryImage = styled(motion.div)`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const ResponsiveGallery = ({ images, onImageClick }) => {
  return (
    <ImageGrid>
      {images.map((image, index) => (
        <GalleryImage
          key={image.src}
          onClick={() => onImageClick?.(image, index)}
          whileHover={{ y: -5 }}
        >
          <img src={image.src} alt={image.alt} loading="lazy" />
        </GalleryImage>
      ))}
    </ImageGrid>
  );
};