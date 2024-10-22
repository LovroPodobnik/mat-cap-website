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
import ImageCarousel from '../components/ImageCarousel'
import 'leaflet/dist/leaflet.css'

const PageContainer = styled(Container)`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ContactCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  color: var(--color-primary);
`

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;

  @media (max-width: 768px) {
    height: 250px;
  }
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  color: var(--color-text);
  margin: 0 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`

const FooterText = styled(SmallText)`
  text-align: center;
  opacity: 0.7;
`

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`;

const Contact = () => {
  const position = [46.225890, 14.612338] // Latitude and longitude for Glavni trg 7, 1241 Kamnik, Slovenia

  const galleryImages = [
    '/Images/About/IMG_2045-min-min.jpeg',
    '/Images/About/IMG_3188-min-min.jpeg',
    '/Images/About/IMG_3197-min-min.jpeg',
    '/Images/About/IMG_3589-min-min.jpeg'
  ];

  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <StaggerContainer>
          <H1>Kontaktirajte nas</H1>
          <Spacing size="1rem" />
          
          <ContactGrid>
            <ContactCard>
              <IconWrapper><MapPin size={24} /></IconWrapper>
              <H2>Naslov</H2>
              <Paragraph>Glavni trg 7, 1241 Kamnik, Slovenija</Paragraph>
            </ContactCard>
            <ContactCard>
              <IconWrapper><Phone size={24} /></IconWrapper>
              <H2>Telefon</H2>
              <Paragraph><a href="tel:+38640208816">+386 40 208 816</a></Paragraph>
            </ContactCard>
            <ContactCard>
              <IconWrapper><Mail size={24} /></IconWrapper>
              <H2>E-pošta</H2>
              <Paragraph><a href="mailto:tattoo@matcap.si">tattoo@matcap.si</a></Paragraph>
            </ContactCard>
            <ContactCard>
              <IconWrapper><Clock size={24} /></IconWrapper>
              <H2>Delovni čas</H2>
              <Paragraph>
                Pon - Pet: 10:00 - 18:00<br />
                Sob: Po dogovoru<br />
                Ned: Zaprto
              </Paragraph>
            </ContactCard>
          </ContactGrid>

          <Button 
            as="a" 
            href="https://goo.gl/maps/XYZ123" 
            target="_blank" 
            rel="noopener noreferrer"
            variant="outline"
            size="medium"
          >
            Pokaži na zemljevidu <ExternalLink size={14} style={{ marginLeft: '0.5rem' }} />
          </Button>

          <Spacing size="2rem" />

          <H2>Naše delo</H2>
          <CarouselWrapper>
            <ImageCarousel images={galleryImages} />
          </CarouselWrapper>

          <MapWrapper>
            <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  Matcap Tattoo Studio<br />Glavni trg 7, 1241 Kamnik
                </Popup>
              </Marker>
            </MapContainer>
          </MapWrapper>

          <Divider />

          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} />
            </SocialLink>
          </SocialLinks>

          <Spacing size="2rem" />
          
          <FooterText>©2022 Matcap Tattoo. Vse pravice pridržane.</FooterText>
          <FooterText>
            Izdelava: <a href="https://lovropodobnik.si" target="_blank" rel="noopener noreferrer">lovropodobnik.si</a>
          </FooterText>
        </StaggerContainer>
      </PageContainer>
    </motion.div>
  )
}

export default Contact
