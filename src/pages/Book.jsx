import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import StaggerContainer from '../components/StaggerContainer'
import { pageTransition } from '../styles/GlobalStyles'

const PageContainer = styled.div`
  padding: 2rem 0;
`

const Title = styled.h1`
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 0.02em;
`

const Book = () => {
  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <StaggerContainer>
          <Title>Book Now</Title>
          {/* Add booking form or content here */}
        </StaggerContainer>
      </PageContainer>
    </motion.div>
  )
}

export default Book