import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.span`
  position: relative;
  display: inline-block; // This helps with positioning
`;

const GifContainer = styled(motion.div)`
  position: absolute;
  z-index: 100;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  left: 50%;
  transform: translateX(-50%); // Center horizontally
  bottom: calc(100% + 10px); // Position above the text with 10px gap
`;

const GifImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverTrigger = styled.span`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  color: var(--color-accent);
`;

const HoverGif = ({ text, gifUrl, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Container>
      <HoverTrigger
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children || text}
      </HoverTrigger>
      <AnimatePresence>
        {isHovered && (
          <GifContainer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <GifImage 
              src={gifUrl} 
              alt="Hover GIF"
              loading="lazy" // Add lazy loading
            />
          </GifContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default HoverGif;
