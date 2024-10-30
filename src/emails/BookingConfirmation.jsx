import React from 'react';

export const BookingConfirmationTemplate = (formData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; text-align: center;">Hvala za vaše sporočilo</h1>
      
      <p style="color: #666; line-height: 1.6;">
        Pozdravljeni ${formData.personalInfo.fullName},
      </p>
      
      <p style="color: #666; line-height: 1.6;">
        Hvala, da ste nas kontaktirali. V roku tedna dni se slišimo in dorečemo vse glede sodelovanja. 
        Komaj čakamo, da skupaj ustvarimo nekaj res posebnega!
      </p>

      <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #333; margin-bottom: 15px;">Vaši podatki:</h2>
        <p><strong>Ime:</strong> ${formData.personalInfo.fullName}</p>
        <p><strong>Email:</strong> ${formData.personalInfo.email}</p>
        <p><strong>Telefon:</strong> ${formData.personalInfo.phone}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Detajli tetovaže:</h3>
        <p><strong>Velikost:</strong> ${formData.tattooDetails.size}</p>
        <p><strong>Lokacija:</strong> ${formData.tattooDetails.location}</p>
        <p><strong>Stil:</strong> ${formData.tattooDetails.style}</p>
        <p><strong>Prva tetovaža:</strong> ${formData.tattooDetails.isFirstTattoo === 'yes' ? 'Da' : 'Ne'}</p>
      </div>

      <p style="color: #666; line-height: 1.6;">
        Lep pozdrav,<br />
        Mat Cap Tattoo Team
      </p>

      <div style="margin-top: 40px; text-align: center; color: #999; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Mat Cap Tattoo. Vse pravice pridržane.</p>
      </div>
    </div>
  `;
};
