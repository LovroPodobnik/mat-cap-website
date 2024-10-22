import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MasonryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`;

const MasonryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 150px;
  grid-auto-flow: dense;
  gap: 8px;
  padding: 8px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 200px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 300px;
  }
`;

const MasonryItem = styled(motion.div)`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  
  &:nth-child(3n) {
    grid-row: span 2;
  }
  
  &:nth-child(5n) {
    grid-column: span 2;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.6) 20%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0.9) 60%,
    rgba(0, 0, 0, 0.95) 80%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const imageUrls = [
  'https://matcap.si/images/55975ADA-7B2A-4996-B0F4-E8811F38CDBA.jpg',
  'https://matcap.si/images/IMG_3196.jpg',
  'https://matcap.si/images/IMG_3258.jpg',
  'https://matcap.si/images/IMG_3046.jpg',
  'https://matcap.si/images/IMG_3580.jpg',
];

const MasonryBackground = ({ itemCount = 20 }) => {
  return (
    <MasonryContainer>
      <MasonryGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(itemCount)].map((_, index) => (
          <MasonryItem 
            key={index} 
            variants={itemVariants} 
            imageUrl={imageUrls[index % imageUrls.length]}
          />
        ))}
      </MasonryGrid>
      <GradientOverlay />
    </MasonryContainer>
  );
};

export default MasonryBackground;
