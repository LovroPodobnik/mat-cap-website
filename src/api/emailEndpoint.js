import { mailerSend } from '../config/mailerSend';
import { EmailParams, Sender, Recipient } from "mailersend";

export async function sendEmail(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const sentFrom = new Sender("podobnik.lovro@gmail.com", "Mat Cap Tattoo");
    
    // Rest of the email sending logic...
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
