import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { MapPin, Phone, Mail } from 'react-feather'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { pageTransition } from '../styles/GlobalStyles'
import StaggerContainer from '../components/StaggerContainer'
import { H1, H2, Paragraph } from '../components/Typography'
import Spacing from '../components/Spacing'
import ImageCarousel from '../components/ImageCarousel'
import HoverGif from '../components/HoverGif'
import SectionSwitcher from '../components/SectionSwitcher'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

const AboutContainer = styled(motion.div)`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--content-padding);
  
  @media (min-width: 768px) {
    padding: var(--spacing-lg) var(--content-padding);
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: min(600px, calc(100vw - 2 * var(--content-padding)));
  margin: var(--spacing-md) calc(var(--content-padding) * -1);
  
  @media (min-width: 768px) {
    margin: var(--spacing-lg) auto;
  }
`;

const ContentSection = styled.section`
  margin-bottom: var(--spacing-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 768px) {
    margin-bottom: var(--spacing-xl);
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: var(--spacing-md);

  @media (min-width: 768px) {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.3s ease;
    padding: 0.5rem;
    margin: -0.5rem;
    display: inline-block;

    &:hover {
      color: var(--color-primary);
    }
  }
`;

const IconWrapper = styled.div`
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
  padding: var(--spacing-sm);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const MapWrapper = styled(motion.div)`
  width: 100%;
  height: 50vh;
  min-height: 250px;
  max-height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  margin: var(--spacing-md) 0;

  .leaflet-container {
    height: 100%;
    width: 100%;
    background: #333;
  }

  .leaflet-popup-content-wrapper {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: var(--radius-md);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .leaflet-popup-tip {
    background: rgba(0, 0, 0, 0.8);
  }
  
  @media (min-width: 768px) {
    margin: var(--spacing-lg) 0;
  }
`;

const About = () => {
  const [activeSection, setActiveSection] = useState('matcap')
  const position = [46.225890, 14.612338] // Kamnik coordinates

  const matCapImages = [
    {
      src: '/Images/Matcap/01.jpg',
      fullSrc: '/Images/Matcap/01.jpg',
      alt: 'Mat Cap Tattoo studio image 1'
    },
    {
      src: '/Images/Matcap/02.jpg',
      fullSrc: '/Images/Matcap/02.jpg',
      alt: 'Mat Cap Tattoo studio image 2'
    },
    {
      src: '/Images/Matcap/03.jpg',
      fullSrc: '/Images/Matcap/03.jpg',
      alt: 'Mat Cap Tattoo studio image 3'
    },
    {
      src: '/Images/Matcap/04.jpg',
      fullSrc: '/Images/Matcap/04.jpg',
      alt: 'Mat Cap Tattoo studio image 4'
    },
    {
      src: '/Images/Matcap/05.jpg',
      fullSrc: '/Images/Matcap/05.jpg',
      alt: 'Mat Cap Tattoo studio image 5'
    }
  ];

  const studioImages = [
    {
      src: '/Images/Studio/01.jpg',
      fullSrc: '/Images/Studio/01.jpg',
      alt: 'Studio image 1'
    },
    {
      src: '/Images/Studio/02.jpg',
      fullSrc: '/Images/Studio/02.jpg',
      alt: 'Studio image 2'
    },
    {
      src: '/Images/Studio/03.jpg',
      fullSrc: '/Images/Studio/03.jpg',
      alt: 'Studio image 3'
    },
    {
      src: '/Images/Studio/04.jpg',
      fullSrc: '/Images/Studio/04.jpg',
      alt: 'Studio image 4'
    },
    {
      src: '/Images/Studio/05.jpg',
      fullSrc: '/Images/Studio/05.jpg',
      alt: 'Studio image 5'
    }
  ];

  const renderMatCapContent = () => (
    <>
      <ContentSection>
        <H2>Začetki</H2>
        <Paragraph>
          Spomnim se, kako so se mi{' '}
          <HoverGif 
            gifUrl="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExandqc3o4YmsyOGk1cnhlbWc5NXg0d2RmYnNueTI1YWZ0ZXVhNmRqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bDgVQW4bTLsgo/giphy.gif"
          >
            tresle roke
          </HoverGif>
          , ko sem v kožo zarisal prvo linijo. Prva žrtev, ki si je dovolil tetovirati 
          črko c na nogo - in to kar doma v kleti - je bil moj brat.
        </Paragraph>
        <Paragraph>
          Po desetletju tetoviranja, ze dolgo ne delam več doma. Pa tudi klet sem rajši 
          zamenjal za prijetnejši ambient in odprl studio v starem mestnem jedru kamnika. 
          Mat cap tattoo studio nosi ime po vzdevku, ki so mi ga nadeli kolegi - zanje 
          nisem Matic - kličejo me Cap.
        </Paragraph>
        <CarouselWrapper>
          <ImageCarousel images={matCapImages} />
        </CarouselWrapper>
      </ContentSection>
      <Spacing size="1rem" />
      <ContentSection>
        <H2>Umetniška pot</H2>
        <Paragraph>
          Kot vsak artist, sem bil tudi jaz vedno fasciniran nad umetnostjo. V zvezke sem med 
          poukom rajši risal, kot pisal.
        </Paragraph>
        <Paragraph>
          Preizkusil sem se v različnih medijih umetnosti in oblikovanja, delal kot grafični 
          oblikovalec in vedno znova ugotovil, da nič od tega ni zame. Dokler nisem leta 2013 
          začel tetovirati.
        </Paragraph>
      </ContentSection>
      <Spacing size="1rem" />
      <ContentSection>
        <H2>Izkušnje in stil</H2>
        <Paragraph>
          V iskanju novega znanja in izkušenj, se vedno rad odpravim na gostovanja v tujino 
          ali pa tetoviram na prireditvah in festivalih.
        </Paragraph>
        <Paragraph>
          Najraje se izražam v črno-sivem realizmu, semi-realizmu in kaligrafskih napisih. 
          Od motivov najrajši ustvarjam živali in skulpture, k meni pa lahko prideš po velik 
          ali majhen tattoo.
        </Paragraph>
      </ContentSection>
    </>
  )

  const renderStudioContent = () => (
    <>
      <ContentSection>
        <H2>Studio</H2>
        <Paragraph>
          Studio se nahaja v starem mestnem jedru Kamnika, v prijetnem ambientu, kjer se 
          prepletata zgodovina in moderna umetnost.
        </Paragraph>
        <Paragraph>
          Opremljen je z najsodobnejšo opremo in materiali, ki zagotavljajo varno in 
          sterilno okolje za tetoviranje.
        </Paragraph>
        <CarouselWrapper>
          <ImageCarousel images={studioImages} />
        </CarouselWrapper>
      </ContentSection>
      <Spacing size="1rem" />
      <ContentSection>
        <H2>Pristop</H2>
        <Paragraph>
          Pri tetoviranju prisegam na sproščen odnos, sodelovanje pri kreiranju tetovaž in unikatnost.
          V studiu sem ustvaril prijeten ambient, ki podpira kreativni proces in stranki omogoči, 
          da v procesu tetoviranja umirjeno uživa.
        </Paragraph>
      </ContentSection>
      <Spacing size="1rem" />
      <ContentSection>
        <H2>Lokacija</H2>
        <ContactCard whileHover={{ y: -5 }}>
          <IconWrapper><MapPin size={24} /></IconWrapper>
          <Paragraph>Glavni trg 7, 1241 Kamnik, Slovenija</Paragraph>
          <Spacing size="1rem" />
        </ContactCard>
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
      </ContentSection>
    </>
  )

  return (
    <AboutContainer {...pageTransition}>
      <StaggerContainer>
        <H1 $align="center">O meni</H1>
        <SectionSwitcher 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
        {activeSection === 'matcap' ? renderMatCapContent() : renderStudioContent()}
      </StaggerContainer>
    </AboutContainer>
  )
}

export default About
