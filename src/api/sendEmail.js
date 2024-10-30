export async function sendBookingEmail(formData) {
  try {
    console.log('Sending email with form data:', formData);
    
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Server error:', data);
      throw new Error(data.error || 'Failed to send email');
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email'
    };
  }
}
