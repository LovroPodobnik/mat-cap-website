import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  
  .slick-slide {
    padding: 0.5rem;
    perspective: 1000px;
  }

  .slick-dots {
    bottom: -2.5rem;
    
    li button:before {
      color: var(--color-text);
      opacity: 0.5;
      transition: all 0.3s ease;
    }
    
    li.slick-active button:before {
      color: var(--color-primary);
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
    
    &:before {
      color: var(--color-primary);
      opacity: 0.8;
      font-size: 24px;
      transition: all 0.3s ease;
    }
    
    &:hover:before {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }
`;

const CarouselSlide = styled(motion.div)`
  padding: 0 10px;
  transform-style: preserve-3d;
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: 1;
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
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

const ImageCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)", // Custom easing
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <CarouselSlide key={index}>
            <AnimatePresence initial={false} custom={currentSlide}>
              <ImageWrapper
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
              >
                <CarouselImage
                  src={image}
                  alt={`Slide ${index + 1}`}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  custom={currentSlide}
                  loading="lazy"
                  transition={{
                    opacity: { duration: 0.4 },
                    transform: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                  }}
                />
              </ImageWrapper>
            </AnimatePresence>
          </CarouselSlide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ImageCarousel;
