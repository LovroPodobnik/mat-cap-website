import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { MapPin, Phone, Mail, ExternalLink, Clock, Instagram, Facebook } from 'react-feather'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import StaggerContainer from '../components/StaggerContainer'
import { pageTransition } from '../styles/GlobalStyles'
import { H1, H2, Paragraph, SmallText } from '../components/Typography'
import Spacing from '../components/Spacing'
import Button from '../components/Button'
import Container from '../components/Container'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

const PageContainer = styled(Container)`
  padding: var(--page-padding-top) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - var(--header-height));

  @media (max-width: 768px) {
    padding: var(--page-padding-top-mobile) var(--spacing-sm);
  }
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  width: 100%;
  margin: var(--spacing-xl) 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
`

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.07);
  }

  a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }
  }
`

const IconWrapper = styled.div`
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const MapWrapper = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  margin: var(--spacing-xl) 0;

  .leaflet-container {
    height: 100%;
    width: 100%;
    background: #333;
  }

  .leaflet-popup-content-wrapper {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .leaflet-popup-tip {
    background: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 768px) {
    height: 300px;
    margin: var(--spacing-lg) 0;
  }
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
`

const SocialLink = styled(motion.a)`
  color: var(--color-text);
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-primary);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: var(--spacing-xl) 0;
`

const StyledH1 = styled(H1)`
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-md);
  }
`;

const Contact = () => {
  const position = [46.225890, 14.612338]

  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <StaggerContainer>
          <StyledH1 $align="center">Kontaktirajte nas</StyledH1>
          
          <ContactGrid>
            <ContactCard whileHover={{ y: -5 }}>
              <IconWrapper><MapPin size={24} /></IconWrapper>
              <H2>Naslov</H2>
              <Paragraph>Glavni trg 7, 1241 Kamnik, Slovenija</Paragraph>
            </ContactCard>

            <ContactCard whileHover={{ y: -5 }}>
              <IconWrapper><Phone size={24} /></IconWrapper>
              <H2>Telefon</H2>
              <Paragraph>
                <a href="tel:+38640208816">+386 40 208 816</a>
              </Paragraph>
            </ContactCard>

            <ContactCard whileHover={{ y: -5 }}>
              <IconWrapper><Mail size={24} /></IconWrapper>
              <H2>E-pošta</H2>
              <Paragraph>
                <a href="mailto:tattoo@matcap.si">tattoo@matcap.si</a>
              </Paragraph>
            </ContactCard>

            <ContactCard whileHover={{ y: -5 }}>
              <IconWrapper><Clock size={24} /></IconWrapper>
              <H2>Delovni čas</H2>
              <Paragraph>
                Pon - Pet: 10:00 - 18:00<br />
                Sob: Po dogovoru<br />
                Ned: Zaprto
              </Paragraph>
            </ContactCard>
          </ContactGrid>

          <MapWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MapContainer 
              center={position} 
              zoom={15} 
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={position}>
                <Popup>
                  <strong>Matcap Tattoo Studio</strong><br />
                  Glavni trg 7, 1241 Kamnik
                </Popup>
              </Marker>
            </MapContainer>
          </MapWrapper>

          <Button 
            as="a" 
            href="https://goo.gl/maps/XYZ123" 
            target="_blank" 
            rel="noopener noreferrer"
            variant="outline"
            size="medium"
          >
            Odpri v Google Maps <ExternalLink size={14} style={{ marginLeft: '0.5rem' }} />
          </Button>

          <Divider />

          <SocialLinks>
            <SocialLink 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={24} />
            </SocialLink>
            <SocialLink 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook size={24} />
            </SocialLink>
          </SocialLinks>

          <SmallText style={{ opacity: 0.7, textAlign: 'center' }}>
            ©2024 Matcap Tattoo. Vse pravice pridržane.
          </SmallText>
        </StaggerContainer>
      </PageContainer>
    </motion.div>
  )
}

export default Contact
