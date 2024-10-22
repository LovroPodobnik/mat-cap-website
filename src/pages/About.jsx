import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import StaggerContainer from '../components/StaggerContainer'
import { pageTransition } from '../styles/GlobalStyles'
import { H1, H2, Paragraph } from '../components/Typography'
import Spacing from '../components/Spacing'
import Container from '../components/Container'
import Button from '../components/Button'

const PageContainer = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const ImageWrapper = styled.div`
  margin: 2rem 0;
  text-align: center;
`

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const About = () => {
  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <StaggerContainer>
          <H1 align="center">About Matcap Tattoo</H1>
          <Spacing size="2rem" />
          
          <Section>
            <H2 align="center">My Journey</H2>
            <Paragraph align="center">
              I remember how my hands trembled when I drew the first line on skin. My brother was the first brave soul who allowed me to tattoo the letter 'c' on his leg - right in our basement at home.
            </Paragraph>
          </Section>
          
          <ImageWrapper>
            <Image src="/path/to/first-tattoo-image.jpg" alt="My first tattoo" />
          </ImageWrapper>
          
          <Section>
            <H2 align="center">Artistic Exploration</H2>
            <Paragraph align="center">
              Like every artist, I've always been fascinated by art. During classes, I preferred drawing in notebooks rather than writing. I experimented with various art and design mediums, worked as a graphic designer, but always felt something was missing. That is, until I started tattooing in 2013.
            </Paragraph>
            <Paragraph align="center">
              In search of new knowledge and experiences, I often travel abroad for guest spots or tattoo at events and festivals.
            </Paragraph>
          </Section>
          
          <Section>
            <H2 align="center">My Style</H2>
            <Paragraph align="center">
              I express myself best in black and grey realism, semi-realism, and calligraphic scripts. My favorite subjects are animals and sculptures, but I'm open to both large and small tattoos. I also enjoy stepping out of my comfort zone, exploring other tattooing styles or adding colors to black work.
            </Paragraph>
          </Section>
          
          <Spacing size="2rem" />
          
          <Button variant="primary" size="large" to="/gallery" align="center">
            View My Work
          </Button>
        </StaggerContainer>
      </PageContainer>
    </motion.div>
  )
}

export default About
