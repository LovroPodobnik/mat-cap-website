import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => (props.$height / props.$width) * 100}%;
  background-color: #1a1a1a; // Placeholder color
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const OptimizedImage = ({ src, thumbnail, alt, width, height, onLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <ImageContainer $width={width} $height={height}>
      <StyledImage
        src={thumbnail || src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        onLoad={() => {
          setImageLoaded(true);
          onLoad?.();
        }}
        $loaded={imageLoaded}
      />
    </ImageContainer>
  );
};

export default OptimizedImage; 