const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

async function sendTestEmail() {
  try {
    const mailersend = new MailerSend({
      apiKey: 'mlsn.70197367de8063a2f7dfe5cb69419089e46635a998e7f81f0fb430ecc70fb3ed'
    });

    const sentFrom = new Sender(
      "MS_vr9sVY@trial-yzkq340d7y6ld796.mlsender.net", 
      "Mat Cap Tattoo"
    );

    const recipients = [
      new Recipient("podobnik.lovro@gmail.com", "Lovro Podobnik")
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Test Email - Mat Cap Tattoo")
      .setHtml("<h1>Test Email</h1><p>This is a test email from Mat Cap Tattoo booking system.</p>");

    const response = await mailersend.email.send(emailParams);
    console.log('Test email sent:', response);
  } catch (error) {
    console.error('Test email failed:', error);
  }
}

sendTestEmail();
