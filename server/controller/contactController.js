const Contact = require('../model/contactModel');
const sendEmail = require('../utils/sendMail');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    // Create contact entry
    const contact = new Contact({
      name,
      email,
      description
    });
    await contact.save();

    // Send confirmation email to user
    const userSubject = 'Thank you for contacting us';
    const userHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Your message:</p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${description}
        </p>
        <p>Best regards,<br/>Hospital Management Team</p>
      </div>
    `;

    // Send notification email to admin
    const adminSubject = 'New Contact Form Submission';
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${description}
        </p>
      </div>
    `;

    await Promise.all([
      sendEmail(email, userSubject, userHtml),
      sendEmail('admin@hospital.com', adminSubject, adminHtml)
    ]);

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message
    });
  }
};