import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'react-feather';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 160px); // Fixed two columns of 160px each
  gap: 1rem;
  width: 100%;
  padding: 2rem 0;
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 160px); // Keep two columns on mobile
    gap: 0.75rem;
    padding: 1rem 0;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 160px; // Fixed width
  height: 160px; // Fixed height
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
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    img {
      transform: scale(1.05);
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
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  background-color: rgba(255, 255, 255, 0.05);
  
  &.loading {
    filter: blur(10px);
  }
`;

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(4px);
`;

const GalleryGrid = ({ images, setHideHeader }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to hide both header and bottom navigation
  const hideNavigation = () => {
    setHideHeader(true);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('hide-bottom-nav');
  };

  // Function to show both header and bottom navigation
  const showNavigation = () => {
    setHideHeader(false);
    document.body.style.overflow = '';
    document.body.classList.remove('hide-bottom-nav');
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    hideNavigation();
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    showNavigation();
  };

  const showNext = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedImage(images[nextIndex]); // Update the selected image
    }
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedImage(images[prevIndex]); // Update the selected image
    }
  };

  const handleKeyDown = (e) => {
    if (selectedImage) { // Only handle keyboard events when lightbox is open
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrevious();
      }
      e.preventDefault(); // Prevent any default keyboard behavior
    }
  };

  // Set up keyboard event listener
  useEffect(() => {
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedImage, currentIndex]); // Add dependencies

  // Cleanup effect
  useEffect(() => {
    return () => {
      showNavigation(); // Ensure navigation is shown when component unmounts
    };
  }, []);

  return (
    <>
      <Grid>
        {images.map((image, index) => (
          <ImageContainer
            key={index}
            onClick={() => openLightbox(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Image
              src={image.src} // Use square thumbnail
              alt={image.alt || `Gallery image ${index + 1}`}
              loading="lazy"
              className={isLoading ? 'loading' : ''}
              onLoad={() => setIsLoading(false)}
            />
          </ImageContainer>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedImage && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <LightboxContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <CloseButton
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </CloseButton>
              
              <NavigationButton
                className="prev"
                onClick={showPrevious}
                disabled={currentIndex === 0}
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </NavigationButton>

              <motion.img
                key={selectedImage.src} // Add key to force re-render
                src={selectedImage.fullSrc || selectedImage.src}
                alt={selectedImage.alt || 'Selected image'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              <NavigationButton
                className="next"
                onClick={showNext}
                disabled={currentIndex === images.length - 1}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </NavigationButton>

              <ImageCounter>
                {currentIndex + 1} / {images.length}
              </ImageCounter>
            </LightboxContent>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
