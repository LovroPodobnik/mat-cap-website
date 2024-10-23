import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { pageTransition } from '../styles/GlobalStyles'
import StaggerContainer from '../components/StaggerContainer'
import { H1, H2, Paragraph } from '../components/Typography'
import Spacing from '../components/Spacing'
import ImageCarousel from '../components/ImageCarousel'

const AboutContainer = styled(motion.div)`
  padding: 2rem 0;
  max-width: var(--max-width);
  margin: 0 auto;
`

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 3rem auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const ContentSection = styled.section`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const About = () => {
  const galleryImages = [
    '/Images/About/IMG_2045-min-min.jpeg',
    '/Images/About/IMG_3188-min-min.jpeg',
    '/Images/About/IMG_3197-min-min.jpeg',
    '/Images/About/IMG_3589-min-min.jpeg'
  ];

  return (
    <AboutContainer {...pageTransition}>
      <StaggerContainer>
        <ContentSection>
          <H1 align="center">Moja zgodba</H1>
          <Spacing size="2rem" />
        </ContentSection>
        
        <ContentSection>
          <H2>Začetki</H2>
          <Paragraph>
            Spomnim se, kako so se mi tresle roke, ko sem v kožo zarisal prvo linijo. 
            Prva žrtev, ki si je dovolil tetovirati črko c na nogo - in to kar doma v kleti - je bil moj brat.
          </Paragraph>
          <Spacing size="1rem" />
          
          <Paragraph>
            Po desetletju tetoviranja, ze dolgo ne delam več doma. Pa tudi klet sem rajši zamenjal 
            za prijetnejši ambient in odprl studio v starem mestnem jedru kamnika. Mat cap tattoo 
            studio nosi ime po vzdevku, ki so mi ga nadeli kolegi - zanje nisem Matic - kličejo me Cap.
          </Paragraph>
        </ContentSection>
        
        <CarouselWrapper>
          <ImageCarousel images={galleryImages} />
        </CarouselWrapper>

        <ContentSection>
          <H2>Umetniška pot</H2>
          <Paragraph>
            Kot vsak artist, sem bil tudi jaz vedno fasciniran nad umetnostjo. V zvezke sem med 
            poukom rajši risal, kot pisal.
          </Paragraph>
          <Spacing size="1rem" />
          
          <Paragraph>
            Preizkusil sem se v različnih medijih umetnosti in oblikovanja, delal kot grafični 
            oblikovalec in vedno znova ugotovil, da nič od tega ni zame. Dokler nisem leta 2013 
            začel tetovirati.
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <H2>Izkušnje in stil</H2>
          <Paragraph>
            V iskanju novega znanja in izkušenj, se vedno rad odpravim na gostovanja v tujino 
            ali pa tetoviram na prireditvah in festivalih.
          </Paragraph>
          <Spacing size="1rem" />
          
          <Paragraph>
            Najraje se izražam v črno-sivem realizmu, semi-realizmu in kaligrafskih napisih. 
            Od motivov najrajši ustvarjam živali in skulpture, k meni pa lahko prideš po velik 
            ali majhen tattoo. Rad grem tudi iz svoje cone udobja in posežem po drugih stilih 
            tetoviranja ali pa črninam dodam barve.
          </Paragraph>
        </ContentSection>
      </StaggerContainer>
    </AboutContainer>
  )
}

export default About
