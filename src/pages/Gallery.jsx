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

  const galleryImages = [
    {
      src: '/Images/Gallery/IMG_2042-min-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_2042-min-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_2045-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_2045-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    },
    {
      src: '/Images/Gallery/IMG_3047-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3047-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_3188-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3188-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    },
    {
      src: '/Images/Gallery/IMG_3196-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3196-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_3197-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3197-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    },
    {
      src: '/Images/Gallery/IMG_3198-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3198-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_3257-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3257-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    },
    {
      src: '/Images/Gallery/IMG_3258-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3258-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_3259-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3259-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    },
    {
      src: '/Images/Gallery/IMG_3580-min-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3580-min-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_3581-min-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3581-min-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    },
    {
      src: '/Images/Gallery/IMG_3589-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3589-min.jpeg',
      alt: 'Tattoo artwork',
      category: 'realism'
    },
    {
      src: '/Images/Gallery/IMG_3820-min-min.jpeg',
      fullSrc: '/Images/Gallery/IMG_3820-min-min.jpeg',
      alt: 'Tattoo design',
      category: 'blackwork'
    }
  ];

  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <GalleryContainer>
          <StaggerContainer>
            <H1 $align="center">Galerija del</H1>
            
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
