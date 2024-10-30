const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Main email sending function
async function sendEmail(to, subject, htmlContent, textContent) {
  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: {
        email: process.env.MAILERSEND_SENDER_EMAIL,
        name: process.env.MAILERSEND_SENDER_NAME
      },
      to: [to],
      subject: subject,
      html: htmlContent,
      text: textContent
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Email send failed: ${response.status} - ${text}`);
  }

  return {
    messageId: response.headers.get('x-message-id'),
    status: response.status
  };
}

// Booking endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { formData } = req.body;
    console.log('Processing booking for:', formData.personalInfo.fullName);

    // Send confirmation to client
    const clientResponse = await sendEmail(
      {
        email: formData.personalInfo.email,
        name: formData.personalInfo.fullName
      },
      "Hvala za vaše sporočilo - Mat Cap Tattoo",
      `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Hvala za vaše sporočilo</h1>
          <p>Pozdravljeni ${formData.personalInfo.fullName},</p>
          <p>Prejeli smo vaše sporočilo in se vam bomo kmalu oglasili.</p>
          
          <div style="margin: 20px 0; padding: 20px; background: #f8f8f8;">
            <h2>Vaši podatki:</h2>
            <p><strong>Ime:</strong> ${formData.personalInfo.fullName}</p>
            <p><strong>Email:</strong> ${formData.personalInfo.email}</p>
            <p><strong>Telefon:</strong> ${formData.personalInfo.phone}</p>
          </div>
        </div>
      `,
      `Hvala za vaše sporočilo. Oglasili se vam bomo v najkrajšem možnem času.`
    );

    // Send notification to studio
    const studioResponse = await sendEmail(
      {
        email: "studio@matcaptattoo.com",
        name: "Mat Cap Tattoo"
      },
      "Nova rezervacija - Mat Cap Tattoo",
      `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Nova rezervacija</h1>
          <div style="margin: 20px 0; padding: 20px; background: #f8f8f8;">
            <h2>Podatki stranke:</h2>
            <p><strong>Ime:</strong> ${formData.personalInfo.fullName}</p>
            <p><strong>Email:</strong> ${formData.personalInfo.email}</p>
            <p><strong>Telefon:</strong> ${formData.personalInfo.phone}</p>
            
            <h2>Detajli tetovaže:</h2>
            <p><strong>Velikost:</strong> ${formData.tattooDetails.size}</p>
            <p><strong>Lokacija:</strong> ${formData.tattooDetails.location}</p>
            <p><strong>Stil:</strong> ${formData.tattooDetails.style}</p>
            <p><strong>Prva tetovaža:</strong> ${formData.tattooDetails.isFirstTattoo === 'yes' ? 'Da' : 'Ne'}</p>
            
            <h2>Opis ideje:</h2>
            <p>${formData.tattooIdea.description}</p>
          </div>
        </div>
      `,
      `Nova rezervacija od ${formData.personalInfo.fullName}`
    );

    res.json({
      success: true,
      messages: {
        client: clientResponse,
        studio: studioResponse
      }
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message
      }
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Email configuration:', {
    senderEmail: process.env.MAILERSEND_SENDER_EMAIL,
    senderName: process.env.MAILERSEND_SENDER_NAME
  });
});
