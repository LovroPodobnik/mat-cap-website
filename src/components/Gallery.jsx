import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`

const Gallery = ({ images }) => {
  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <GalleryImage
          key={image.alt}
          src={image.src}
          alt={image.alt}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        />
      ))}
    </GalleryContainer>
  )
}

export default Gallery