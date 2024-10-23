import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import StaggerContainer from '../components/StaggerContainer'
import GalleryGrid from '../components/GalleryGrid'
import { H1 } from '../components/Typography'
import { pageTransition } from '../styles/GlobalStyles'
import { Grid, Layout } from 'react-feather'
import ExperimentalGallery from '../components/ExperimentalGallery'

const PageContainer = styled.div`
  padding: 4rem 0;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
`

const GalleryContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 20;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`

const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`

const ToggleButton = styled(motion.button)`
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: 1px solid rgba(255, 255, 255, ${props => props.$isActive ? '0.2' : '0.1'});
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-text)'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const Gallery = ({ setHideHeader }) => {
  const [viewMode, setViewMode] = useState('grid');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setHideHeader(mode === 'experimental'); // Hide header in experimental mode
  };

  const handleCloseExperimental = () => {
    setViewMode('grid');
    setHideHeader(false); // Show header when closing experimental view
  };

  // Using high-resolution images with proper aspect ratios
  const galleryImages = [
    {
      src: 'https://picsum.photos/800/800?random=1', // Square for thumbnail
      fullSrc: 'https://picsum.photos/1200/1600?random=1', // Original aspect ratio for lightbox
      alt: 'Black and grey realism tattoo',
      category: 'realism'
    },
    {
      src: 'https://picsum.photos/800/800?random=2',
      fullSrc: 'https://picsum.photos/1200/1600?random=2',
      alt: 'Blackwork tattoo design',
      category: 'blackwork'
    },
    {
      src: 'https://picsum.photos/800/800?random=3',
      fullSrc: 'https://picsum.photos/1200/1600?random=3',
      alt: 'Custom lettering tattoo',
      category: 'lettering'
    },
    {
      src: 'https://picsum.photos/800/800?random=4',
      fullSrc: 'https://picsum.photos/1200/1600?random=4',
      alt: 'Realistic portrait tattoo',
      category: 'realism'
    }
  ];

  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <GalleryContainer>
          <StaggerContainer>
            <H1 align="center">Galerija del</H1>
            
            <ViewToggle>
              <ToggleButton
                onClick={() => handleViewModeChange('grid')}
                $isActive={viewMode === 'grid'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid size={16} />
                Grid View
              </ToggleButton>
              <ToggleButton
                onClick={() => handleViewModeChange('experimental')}
                $isActive={viewMode === 'experimental'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Layout size={16} />
                Free View
              </ToggleButton>
            </ViewToggle>

            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GalleryGrid 
                    images={galleryImages} 
                    setHideHeader={setHideHeader}
                  />
                </motion.div>
              ) : (
                <ExperimentalGallery 
                  images={galleryImages} 
                  onClose={handleCloseExperimental}
                  setHideHeader={setHideHeader} // Pass setHideHeader to ExperimentalGallery
                />
              )}
            </AnimatePresence>
          </StaggerContainer>
        </GalleryContainer>
      </PageContainer>
    </motion.div>
  );
};

export default Gallery;
