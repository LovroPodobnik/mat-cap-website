import React from 'react'
import styled from 'styled-components'
import StaggerContainer from './StaggerContainer'
import Button from './Button'
import { H1, Paragraph } from './Typography'
import Spacing from './Spacing'

const HeroContainer = styled.div`
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
`

const HeroContent = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;
  ${props => props.removeBackground ? `
    // Add any styles for transparent background here
  ` : `
    background-color: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  `}
`

const Hero = ({ removeBackground = false }) => {
  return (
    <HeroContainer>
      <HeroContent removeBackground={removeBackground}>
        <StaggerContainer delay={0.2}>
          <H1 align="center">Mat Cap Tattoo Studio</H1>
          <Spacing size="1rem" />
          <Paragraph align="center">
            Naj vaše ideje zaživijo na koži. Rad izstopim iz cone udobja in ustvarim nekaj povsem novega. Pridite z idejo, odidite
            s tetovažo, ki presega pričakovanja.
          </Paragraph>
          <Spacing size="2rem" />
          <Button variant="outline" size="medium" to="/book">DOGOVORI SE ZA POSVET</Button>
        </StaggerContainer>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero
