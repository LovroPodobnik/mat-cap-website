import React, { useCallback } from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: all 0.3s ease;
  transform: scale(1);
  
  ${ImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const GalleryImage = ({ src, fullSrc, alt, onLoad }) => {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <ImageWrapper>
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        $loaded={loaded}
      />
    </ImageWrapper>
  );
};

export default React.memo(GalleryImage); 