import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendBookingEmail(formData) {
  try {
    // For now, just simulate a successful email send
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    // Log the form data for development
    console.log('Form data to be sent:', formData);

    return { success: true };

  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error.message || 'An unknown error occurred'
    };
  }
}
