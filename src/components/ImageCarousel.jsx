import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Maximize2, ChevronLeft, ChevronRight } from 'react-feather';
import Lightbox from './Lightbox';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  
  /* Remove default arrow styles */
  .slick-prev,
  .slick-next {
    display: none !important;
  }
  
  .slick-slide {
    > div {
      padding: 0;
    }
  }

  /* Custom dots styles */
  .slick-dots {
    bottom: -2rem;
    display: flex !important;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0;
    margin: 0;
    
    li {
      width: auto;
      height: auto;
      margin: 0;
      
      button {
        width: var(--carousel-dot-size);
        height: var(--carousel-dot-size);
        padding: 0;
        border-radius: 50%;
        background: var(--carousel-dot-color);
        border: 1px solid var(--carousel-dot-border);
        transition: all 0.3s ease;
        
        &:before {
          display: none;
        }
      }
      
      &.slick-active button {
        width: var(--carousel-dot-size-active);
        height: var(--carousel-dot-size-active);
        background: var(--carousel-dot-color-active);
        border-color: var(--carousel-dot-color-active);
      }
    }
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  padding-top: 100%; // 1:1 ratio
  overflow: hidden;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 768px) {
    border-radius: var(--radius-lg);
  }
`;

const CarouselImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Desktop styles */
  @media (hover: hover) {
    opacity: 0;
    
    ${CarouselContainer}:hover & {
      opacity: 1;
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.7);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-50%) scale(1.05);
    }
    
    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
  
  /* Mobile styles */
  @media (hover: none) {
    width: 32px;
    height: 32px;
    opacity: 1;
    background: rgba(0, 0, 0, 0.7);
    
    &.prev {
      left: 0.5rem;
    }

    &.next {
      right: 0.5rem;
    }
    
    &:active {
      background: rgba(0, 0, 0, 0.9);
      transform: translateY(-50%) scale(0.95);
    }
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const ExpandIcon = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.75rem;
  border-radius: 50%;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageCarousel = ({ images, setHideHeader }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sliderRef = useRef(null);

  const formattedImages = images.map(image => {
    if (typeof image === 'string') {
      return {
        src: image,
        fullSrc: image,
        alt: 'Gallery image'
      };
    }
    return image;
  });

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          swipe: true,
          touchThreshold: 10,
          adaptiveHeight: true,
          autoplay: false
        }
      }
    ]
  };

  return (
    <CarouselContainer>
      <SliderWrapper>
        <NavigationButton
          className="prev"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </NavigationButton>

        <NavigationButton
          className="next"
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </NavigationButton>

        <Slider ref={sliderRef} {...settings}>
          {formattedImages.map((image, index) => (
            <div key={index}>
              <ImageWrapper
                onClick={() => setIsLightboxOpen(true)}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
              >
                <ExpandIcon
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Maximize2 size={24} />
                </ExpandIcon>
                <CarouselImage
                  src={image.src}
                  alt={image.alt || `Slide ${index + 1}`}
                  loading="lazy"
                />
              </ImageWrapper>
            </div>
          ))}
        </Slider>
      </SliderWrapper>

      <Lightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={formattedImages}
        currentIndex={currentSlide}
        onNext={handleNext}
        onPrevious={handlePrevious}
        setHideHeader={setHideHeader}
      />
    </CarouselContainer>
  );
};

export default ImageCarousel;
