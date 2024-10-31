import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'react-feather';

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
  padding: 0;
  
  @media (min-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm);
  
  @media (min-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const LightboxImage = styled(motion.img)`
  max-height: 85vh;
  max-width: 90vw;
  object-fit: contain;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  border-radius: var(--radius-md);
  
  @media (min-width: 768px) {
    max-height: 90vh;
    max-width: 85vw;
    border-radius: var(--radius-lg);
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  /* Hide on mobile */
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    width: 48px;
    height: 48px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  &.prev {
    left: var(--spacing-sm);
  }
  
  &.next {
    right: var(--spacing-sm);
  }
  
  @media (min-width: 768px) {
    &.prev { left: var(--spacing-md); }
    &.next { right: var(--spacing-md); }
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
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

const Lightbox = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNext, 
  onPrevious,
  setHideHeader // Optional prop for hiding header/navigation
}) => {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowLeft':
        onPrevious();
        break;
      case 'ArrowRight':
        onNext();
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  }, [isOpen, onNext, onPrevious, onClose]);

  // Handle touch events
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }
  };

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      setHideHeader?.(true);
      document.body.classList.add('hide-bottom-nav');
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      setHideHeader?.(false);
      document.body.classList.remove('hide-bottom-nav');
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      setHideHeader?.(false);
      document.body.classList.remove('hide-bottom-nav');
    };
  }, [isOpen, setHideHeader]);

  // Add keyboard event listeners
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && images[currentIndex] && (
        <LightboxOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <LightboxContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </CloseButton>

            <NavigationButton
              className="prev"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </NavigationButton>

            <LightboxImage
              key={images[currentIndex].src}
              src={images[currentIndex].fullSrc || images[currentIndex].src}
              alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <NavigationButton
              className="next"
              onClick={onNext}
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
  );
};

export default Lightbox; 