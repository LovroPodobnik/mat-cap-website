import { Resend } from 'resend';
import { BookingConfirmation } from '../emails/BookingConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail(formData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Mat Cap Tattoo <info@matcap.si>',
      to: [formData.personalInfo.email],
      subject: 'Hvala za vaše sporočilo - Mat Cap Tattoo',
      react: <BookingConfirmation formData={formData} />,
      attachments: formData.tattooIdea.referenceImages.map((image, index) => ({
        filename: `reference-${index + 1}.jpg`,
        content: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
      }))
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}
