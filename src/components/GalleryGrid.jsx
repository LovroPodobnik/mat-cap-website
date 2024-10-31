import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';

const Grid = styled.div`
  display: grid;
  width: 100%;
  padding: 2rem 0;
  gap: 1rem;
  
  /* Mobile-first approach with larger images */
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    gap: 1.5rem;
    justify-content: center;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  /* Desktop hover effects */
  @media (hover: hover) {
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-5px);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
      
      &::before {
        opacity: 1;
      }
      
      img {
        transform: scale(1.05);
        filter: sepia(0) contrast(1) brightness(1);
      }
    }
  }
  
  /* Mobile touch effect */
  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      
      img {
        filter: sepia(0) contrast(1) brightness(1);
      }
    }
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  background-color: rgba(255, 255, 255, 0.05);
  will-change: transform, filter;
  filter: sepia(0.2) contrast(0.95) brightness(0.95);
`;

const GalleryGrid = ({ images, setHideHeader }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    const images = document.querySelectorAll('[data-src]');
    images.forEach(img => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = useCallback((index) => {
    setImagesLoaded(prev => new Set(prev).add(index));
  }, []);

  const handleImageClick = useCallback((index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  return (
    <>
      <Grid>
        {images.map((image, index) => (
          <ImageContainer
            key={index}
            onClick={() => handleImageClick(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: imagesLoaded.has(index) ? 1 : 0,
              y: imagesLoaded.has(index) ? 0 : 20 
            }}
            transition={{ 
              duration: 0.3,
              delay: Math.min(index * 0.1, 0.3) // Cap the delay at 0.3s
            }}
          >
            <Image
              data-src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
              loading="lazy"
            />
          </ImageContainer>
        ))}
      </Grid>

      <Lightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
        setHideHeader={setHideHeader}
      />
    </>
  );
};

export default React.memo(GalleryGrid);
