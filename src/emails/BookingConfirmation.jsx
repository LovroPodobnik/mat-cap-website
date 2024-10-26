import * as React from 'react';
import { 
  Html, 
  Button, 
  Head, 
  Preview, 
  Body, 
  Container, 
  Section, 
  Text, 
  Hr,
  Link
} from "@react-email/components";

export function BookingConfirmation({ formData }) {
  return (
    <Html>
      <Head />
      <Preview>Hvala za vaše sporočilo - Mat Cap Tattoo</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Hej {formData.personalInfo.fullName}!</Text>
            <Text style={paragraph}>
              Hvala, da si nas kontaktiral/a. V roku tedna dni se slišimo in dorečemo vse glede sodelovanja. 
              Komaj čakamo, da skupaj ustvarimo nekaj res posebnega!
            </Text>

            <Text style={paragraph}>Povzetek vašega povpraševanja:</Text>
            
            <Text style={details}>
              <strong>Velikost:</strong> {formData.tattooDetails.size}<br />
              <strong>Lokacija:</strong> {formData.tattooDetails.location}<br />
              <strong>Stil:</strong> {formData.tattooDetails.style}<br />
              <strong>Prva tetovaža:</strong> {formData.tattooDetails.isFirstTattoo === 'yes' ? 'Da' : 'Ne'}
            </Text>

            <Text style={paragraph}>
              {formData.tattooIdea.description}
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              Sledite nam na družbenih omrežjih:
            </Text>

            <Section style={socialLinks}>
              <Link 
                href="https://instagram.com/matcaptattoo" 
                style={socialLink}
              >
                Instagram
              </Link>
              <Link 
                href="https://facebook.com/matcaptattoo" 
                style={socialLink}
              >
                Facebook
              </Link>
            </Section>

            <Text style={signature}>
              Lep pozdrav,<br />
              Mat Cap Tattoo
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#000000',
  color: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#f4b942',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '24px',
};

const details = {
  fontSize: '14px',
  lineHeight: '24px',
  margin: '24px 0',
  padding: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
};

const hr = {
  borderColor: 'rgba(255, 255, 255, 0.1)',
  margin: '20px 0',
};

const socialLinks = {
  marginTop: '32px',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
};

const socialLink = {
  color: '#f4b942',
  textDecoration: 'none',
};

const signature = {
  fontSize: '16px',
  fontStyle: 'italic',
  marginTop: '32px',
  color: '#f4b942',
};

export default BookingConfirmation;
