const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'happeningatmanoa@gmail.com',
      pass: 'schoolpassword',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'happeningatmanoa@gmail.com',
    to: 'recipient_email@example.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js using Nodemailer.',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error:', error);
    }
    console.log('Email sent:', info.response);
  });
