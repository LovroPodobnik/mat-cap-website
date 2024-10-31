import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import StaggerContainer from '../components/StaggerContainer'
import GalleryGrid from '../components/GalleryGrid'
import { H1 } from '../components/Typography'
import { pageTransition } from '../styles/GlobalStyles'

const PageContainer = styled.div`
  padding: var(--spacing-xl) 0;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height));
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg) 0;
  }
`;

const GalleryContainer = styled.div`
  width: 100%;
  max-width: min(600px, 100%);
  margin: 0 auto;
  padding: 0 var(--content-padding);
  position: relative;
  z-index: 20;
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  padding: 0 var(--spacing-sm);
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: 1px solid rgba(255, 255, 255, ${props => props.$isActive ? '0.2' : '0.1'});
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-text)'};
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-size-sm);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const Gallery = ({ setHideHeader }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'realism', label: 'Realism' },
    { id: 'blackwork', label: 'Blackwork' }
  ];

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

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    return galleryImages.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <PageContainer>
        <GalleryContainer>
          <H1 $align="center">Galerija del</H1>
          
          <CategoryFilter>
            {categories.map(category => (
              <FilterButton
                key={category.id}
                $isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.label}
              </FilterButton>
            ))}
          </CategoryFilter>

          <GalleryGrid 
            images={filteredImages} 
            setHideHeader={setHideHeader}
          />
        </GalleryContainer>
      </PageContainer>
    </motion.div>
  );
};

export default Gallery;
