import React from 'react'
import { FooterContainer, FooterContent, FooterText, FooterLink } from '../styles/FooterStyles'

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy;2022 Matcap Tattoo.</FooterText>
        <FooterText>All rights reserved.</FooterText>
        <FooterText>
          by <FooterLink href="https://lovropodobnik.si" target="_blank" rel="noopener noreferrer">lovropodobnik.si</FooterLink>
        </FooterText>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer