import React from 'react';

export const BookingConfirmation = ({ formData }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation</title>
      </head>
      <body style="
        background-color: #000000;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        padding: 20px;
      ">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f4b942;">Hej ${formData.personalInfo.fullName}!</h1>
          
          <p>
            Hvala, da si nas kontaktiral/a. V roku tedna dni se slišimo in dorečemo vse glede sodelovanja. 
            Komaj čakamo, da skupaj ustvarimo nekaj res posebnega!
          </p>

          <div style="
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          ">
            <h3>Povzetek vašega povpraševanja:</h3>
            <p>
              <strong>Velikost:</strong> ${formData.tattooDetails.size}<br>
              <strong>Lokacija:</strong> ${formData.tattooDetails.location}<br>
              <strong>Stil:</strong> ${formData.tattooDetails.style}<br>
              <strong>Prva tetovaža:</strong> ${formData.tattooDetails.isFirstTattoo === 'yes' ? 'Da' : 'Ne'}
            </p>

            <p>${formData.tattooIdea.description}</p>
          </div>

          <div style="margin-top: 40px;">
            <p>Sledite nam na družbenih omrežjih:</p>
            <p>
              <a href="https://instagram.com/matcaptattoo" style="color: #f4b942; margin-right: 20px;">Instagram</a>
              <a href="https://facebook.com/matcaptattoo" style="color: #f4b942;">Facebook</a>
            </p>
          </div>

          <p style="
            margin-top: 40px;
            font-style: italic;
            color: #f4b942;
          ">
            Lep pozdrav,<br>
            Mat Cap Tattoo
          </p>
        </div>
      </body>
    </html>
  `;
};

export default BookingConfirmation;
