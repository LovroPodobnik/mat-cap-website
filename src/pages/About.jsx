import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { pageTransition } from '../styles/GlobalStyles'

const AboutContainer = styled(motion.div)`
  padding: 2rem 0;
`

const About = () => {
  return (
    <AboutContainer {...pageTransition} className="container">
      <h1>About Us</h1>
      {/* Add your about page content here */}
    </AboutContainer>
  )
}

export default About
