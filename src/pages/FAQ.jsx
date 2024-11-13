import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import StaggerContainer from '../components/StaggerContainer'
import { H1 } from '../components/Typography'
import { pageTransition } from '../styles/GlobalStyles'
import FAQAccordion from '../components/FAQAccordion'

const PageContainer = styled.div`
  padding: var(--page-padding-top) 0;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height));
  
  @media (max-width: 768px) {
    padding: var(--page-padding-top-mobile) 0;
  }
`

const FAQContainer = styled.div`
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--content-padding);
  
  @media (max-width: 768px) {
    padding: var(--spacing-md) var(--spacing-sm);
  }
`

const StyledH1 = styled(H1)`
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-md);
  }
`

const FAQ = () => {
  const [hideHeader, setHideHeader] = React.useState(false);

  const faqData = [
    {
      question: "Ali oblikujete tetovaže vnaprej ali na samem terminu?",
      answer: "Večina dizajnov se riše na samem terminu, ko ste že v studiu. Tako lahko skupaj s stranko prilagodimo dizajn glede na vaše želje in ga uskladimo z mestom tetovaže na telesu. Na ta način zagotovimo, da bo končni rezultat popolnoma prilagojen vam. Če imate že vnaprej pripravljene ideje ali reference, jih prinesite s seboj!"
    },
    {
      question: "Ali ponujate darilne bone?",
      answer: "Da, v našem studiu lahko kupite darilne bone za tetovaže. Bone lahko unovčite za katero koli storitev ali tetovažo po vaših željah."
    },
    {
      question: "Kako se lahko naročim na tetovažo?",
      answer: "Naročite se lahko preko spletnega obrazca na spletni strani www.matcap.si ali telefonskega klica."
    },
    {
      question: "Ali moram plačati aro ob rezervaciji termina?",
      answer: "Da, ob rezervaciji termina je potrebno plačati kavcijo, ki zagotovi vaš termin. Kavcijo se odšteje od končne cene tetovaže."
    },
    {
      question: "Kakšna je cena tetovaže?",
      answer: "Cena je odvisna od velikosti, kompleksnosti in lokacije tetovaže. Priporočamo, da nas kontaktirate za okvirno oceno."
    },
    {
      question: "Kako dolgo traja postopek tetoviranja?",
      answer: "Čas tetoviranja je odvisen od velikosti in zahtevnosti dizajna. Majhne tetovaže lahko trajajo manj kot uro, večje pa več ur ali celo več sej."
    },
    {
      question: "Ali tetovirate na občutljivih delih telesa?",
      answer: "Da, vendar se pred tetoviranjem na občutljivih delih vedno pogovorimo o vseh morebitnih tveganjih in posebnih navodilih za nego."
    },
    {
      question: "Ali lahko prinesem svoj dizajn?",
      answer: "Seveda! Z veseljem bomo vaš dizajn prilagodili, če bo potrebno, da ustreza tetovaži."
    },
    {
      question: "Kako naj skrbim za svojo tetovažo po posegu?",
      answer: "Po tetoviranju boste prejeli natančna navodila za nego, ki vključujejo čiščenje, vlaženje in izogibanje soncu ali vodi v prvih tednih."
    },
    {
      question: "Je tetoviranje boleče?",
      answer: "Bolečina je subjektivna in je odvisna od vaše tolerance ter lokacije tetovaže. Večina strank pravi, da je bolečina znosna."
    },
    {
      question: "Ali so barve, ki jih uporabljate, varne?",
      answer: "Uporabljamo le visoko kakovostne in varne barve, ki so certificirane in primerne za uporabo na koži."
    },
    {
      question: "Ali je tetoviranje varno?",
      answer: "Da, pri nas uporabljamo sterilno opremo in se strogo držimo vseh zdravstvenih in higienskih standardov."
    },
    {
      question: "Ali lahko odstranim tetovažo, če mi ne bo všeč?",
      answer: "Tetovaže so trajne, vendar je možno odstraniti tetovažo z laserjem, čeprav to ni vedno popolno. Dobro premislite pred tetoviranjem."
    }
  ];

  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <FAQContainer>
          <StaggerContainer>
            <StyledH1 $align="center">Pogosta vprašanja</StyledH1>
            <FAQAccordion 
              items={faqData} 
              setHideHeader={setHideHeader} 
            />
          </StaggerContainer>
        </FAQContainer>
      </PageContainer>
    </motion.div>
  )
}

export default FAQ
