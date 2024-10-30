const { MailerSend } = require('mailersend');

const mailersend = new MailerSend({
  apiKey: 'mlsn.70197367de8063a2f7dfe5cb69419089e46635a998e7f81f0fb430ecc70fb3ed'
});

async function verifyDomain() {
  try {
    console.log('Checking domain status...');
    const response = await mailersend.email.domain.verify("trial-yzkq340d7y6ld796.mlsender.net");
    console.log('Domain verification response:', response);
  } catch (error) {
    console.error('Error verifying domain:', error);
  }
}

verifyDomain();
