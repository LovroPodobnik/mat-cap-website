import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const CarouselSlide = styled.div`
  padding: 0 10px;
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  padding-top: 100%; // This creates a 1:1 aspect ratio
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
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

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <CarouselSlide key={index}>
            <ImageWrapper
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CarouselImage
                src={image}
                alt={`Slide ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </ImageWrapper>
          </CarouselSlide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ImageCarousel;
